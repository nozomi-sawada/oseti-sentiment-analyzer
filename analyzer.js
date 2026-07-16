/**
 * analyzer.js
 * Oseti準拠 日本語感情分析エンジン(UI非依存)
 *
 * ブラウザでは window.OsetiAnalyzer、Node.jsでは module.exports として公開されます。
 * 形態素解析器には依存せず、トークン列 [{word, surface, start}] を受け取って動作します。
 *   word    : 基本形(辞書照合に使用)
 *   surface : 表層形(表示・否定判定に使用)
 *   start   : 文内での開始文字位置(ハイライト生成に使用)
 *
 * 否定処理は2モード:
 *   - oseti互換モード(既定): 否定語(ない・ず・ぬ等)が現れたとき、直前の感情語1語のみを
 *     反転する。本家oseti(Python)の polarities[-1] 反転と同じ方式。
 *   - 拡張モード(extendedNegation: true): 各感情語の後方を探索し、助詞を挟んだ否定や
 *     並列助詞で複数語にかかる否定(並列否定)も検出する。
 */
(function (global) {
    'use strict';

    var VERSION = '1.1.0';

    // 否定語(基本形または表層形で照合)
    var NEGATION_WORDS = [
        'ない', 'ぬ', 'ん', 'ず', 'まい', 'ねえ', 'なかった', 'なく',
        'なければ', 'ざる', 'ませんでした', 'ません', 'ないで',
        'できない', 'できぬ', 'できません', 'られない', 'られぬ'
    ];

    var NEGATION_PARTICLES = ['は', 'くは', 'では', 'じゃ', 'が', 'も'];
    var PARALLEL_PARTICLES = ['も', 'と', 'や', 'とか', 'だの'];

    // 拡張否定検出で、感情語と否定語の間に許容する機能語
    var STANDARD_PATH_RE = /^(は|が|を|に|で|と|も|や|の|へ|から|まで|より|くは|では|じゃ|でき|き|られ|れ|せ|さ|し|く|て|た|だ|です|ます|たい|たく|よう)$/;
    var POTENTIAL_PATH_RE = /^(は|が|を|に|で|と|も|や|の|へ|から|まで|より|くは|では|じゃ|でき|き|られ|れ|せ|さ|し|く|て|た|だ|です|ます|たい|たく|よう|ず|ば|なら)$/;

    function hasWord(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Oseti形式(単語 TAB スコア)の辞書テキストを解析する。
     * 戻り値: { lexicon, wordCount, errorCount, duplicateCount, conflictCount, maxTokens }
     * 重複語は後の行を採用し、スコアが食い違う場合は conflictCount に計上する。
     */
    function parseLexicon(content) {
        var lines = String(content).split('\n');
        var lexicon = Object.create(null);
        var errorCount = 0;
        var duplicateCount = 0;
        var conflictCount = 0;
        var maxTokens = 1;

        for (var i = 0; i < lines.length; i++) {
            var trimmed = lines[i].trim();
            if (trimmed === '') continue;

            var parts = trimmed.split('\t');
            if (parts.length < 2) {
                errorCount++;
                continue;
            }

            var word = parts[0].trim();
            var score = parseFloat(parts[1]);
            if (!word || isNaN(score)) {
                errorCount++;
                continue;
            }

            if (word in lexicon) {
                duplicateCount++;
                if (lexicon[word] !== score) conflictCount++;
            }
            lexicon[word] = score;

            var tokenCount = word.split(' ').length;
            if (tokenCount > maxTokens) maxTokens = tokenCount;
        }

        return {
            lexicon: lexicon,
            wordCount: Object.keys(lexicon).length,
            errorCount: errorCount,
            duplicateCount: duplicateCount,
            conflictCount: conflictCount,
            maxTokens: maxTokens
        };
    }

    /** 句点・感嘆符・疑問符・改行で文に分割する。区切り文字は前の文に含める。 */
    function splitIntoSentences(text) {
        var parts = String(text).split(/([。!?！？\n]+)/);
        var result = [];

        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part === '') continue;

            if (/^[。!?！？\n]+$/.test(part)) {
                if (result.length > 0) {
                    result[result.length - 1] += part;
                }
            } else {
                result.push(part);
            }
        }

        return result.filter(function (s) {
            return s.trim() !== '';
        });
    }

    /** 文字種の切り替わりで区切る簡易トークナイザー(Kuromoji非使用時のフォールバック)。 */
    function tokenizeSimple(text) {
        var tokens = [];

        function getCharType(char) {
            if (/[぀-ゟ]/.test(char)) return 'hiragana';
            if (/[゠-ヿ]/.test(char)) return 'katakana';
            if (/[一-龯]/.test(char)) return 'kanji';
            if (/[a-zA-Z0-9]/.test(char)) return 'alphanumeric';
            return 'other';
        }

        var currentToken = '';
        var currentType = null;
        var currentStart = 0;

        function flush() {
            if (currentToken) {
                tokens.push({ word: currentToken, surface: currentToken, start: currentStart });
                currentToken = '';
                currentType = null;
            }
        }

        for (var i = 0; i < text.length; i++) {
            var char = text[i];
            var charType = getCharType(char);

            if (charType === 'other') {
                flush();
                continue;
            }

            if (currentType === null ||
                (currentType !== charType && !(currentType === 'kanji' && charType === 'hiragana'))) {
                flush();
                currentToken = char;
                currentType = charType;
                currentStart = i;
            } else {
                currentToken += char;
            }
        }

        flush();
        return tokens;
    }

    /** 感情語と否定語の間が機能語・並列助詞・他の感情語のみで繋がっているかを判定する。 */
    function isValidNegationPath(tokens, fromIdx, toIdx, negationType, consumed) {
        var pathRe = negationType === 'potential' ? POTENTIAL_PATH_RE : STANDARD_PATH_RE;

        for (var between = fromIdx + 1; between < toIdx; between++) {
            var word = tokens[between].word;
            var surface = tokens[between].surface;

            if (PARALLEL_PARTICLES.indexOf(word) !== -1 || NEGATION_PARTICLES.indexOf(word) !== -1) continue;
            if (consumed[between]) continue; // 他の感情語(並列否定の対象)は通過可

            if (negationType === 'potential') {
                if (pathRe.test(word) || pathRe.test(surface)) continue;
            } else {
                if (pathRe.test(word)) continue;
            }
            return false;
        }
        return true;
    }

    /**
     * 1文を分析する。
     *   sentenceText : 文のテキスト(トークンの start はこの文内の位置)
     *   tokens       : [{word, surface, start}]
     *   lexicon      : parseLexicon() が返す辞書
     *   options      : { extendedNegation, partialMatch, maxTokens }
     */
    function analyzeSentence(sentenceText, tokens, lexicon, options) {
        options = options || {};
        var maxTokens = options.maxTokens || 1;
        var consumed = new Array(tokens.length);
        var matches = [];
        var i, k;

        // 【1】辞書照合(最長一致・複合語はNトークンまで対応)
        for (i = 0; i < tokens.length; i++) {
            if (consumed[i]) continue;

            var found = null;
            var maxLen = Math.min(maxTokens, tokens.length - i);
            for (var len = maxLen; len >= 1; len--) {
                var key = tokens[i].word;
                for (k = 1; k < len; k++) key += ' ' + tokens[i + k].word;
                if (hasWord(lexicon, key)) {
                    found = { word: key, tokenCount: len };
                    break;
                }
            }

            // 簡易トークナイザー用: 前方部分一致(「楽しかった」→「楽し」など)
            if (!found && options.partialMatch) {
                var w = tokens[i].word;
                for (var l = w.length - 1; l >= 2; l--) {
                    if (hasWord(lexicon, w.substring(0, l))) {
                        found = { word: w.substring(0, l), tokenCount: 1 };
                        break;
                    }
                }
            }

            if (found) {
                var lastToken = tokens[i + found.tokenCount - 1];
                var start = tokens[i].start;
                var end = lastToken.start + lastToken.surface.length;
                matches.push({
                    index: i,
                    tokenCount: found.tokenCount,
                    word: found.word,
                    score: lexicon[found.word],
                    negated: false,
                    start: start,
                    end: end,
                    surface: sentenceText.slice(start, end)
                });
                for (k = 0; k < found.tokenCount; k++) consumed[i + k] = true;
            }
        }

        // 【2】否定語の検出(複合語に取り込まれたトークンは対象外)
        var negations = [];
        for (i = 0; i < tokens.length; i++) {
            if (consumed[i]) continue;

            var word2 = tokens[i].word;
            var surface2 = tokens[i].surface;
            var type = null;

            if (NEGATION_WORDS.indexOf(word2) !== -1 || NEGATION_WORDS.indexOf(surface2) !== -1) {
                type = 'standard';
            } else if (/(ない|ません|ぬ)$/.test(surface2)) {
                type = /^(でき|られ|み|え)/.test(surface2) ? 'potential' : 'standard';
            }

            if (type !== null) {
                // 「でき」+「ない」のような可能表現に続く否定は potential として扱う
                if (i > 0 && (tokens[i - 1].word === 'でき' || tokens[i - 1].surface === 'でき')) {
                    type = 'potential';
                }
                negations.push({ index: i, type: type });
            }
        }

        // 【3】否定の適用
        if (options.extendedNegation) {
            // 拡張モード: 各感情語の後方に否定語を探索(並列否定対応)
            for (i = 0; i < matches.length; i++) {
                var m = matches[i];
                if (m.tokenCount !== 1) continue; // 複合語は否定込みで辞書登録されている

                for (var n = 0; n < negations.length; n++) {
                    var negation = negations[n];
                    var range = negation.type === 'potential' ? 6 : 8;
                    if (negation.index <= m.index || negation.index - m.index > range) continue;

                    if (isValidNegationPath(tokens, m.index, negation.index, negation.type, consumed)) {
                        m.negated = true;
                        break;
                    }
                }
            }
        } else {
            // oseti互換モード: 否定語は直前の感情語1語のみを反転する
            // (本家osetiの polarities[-1] 反転と同じ。二重否定は元に戻る)
            for (var n2 = 0; n2 < negations.length; n2++) {
                var target = null;
                for (i = 0; i < matches.length; i++) {
                    if (matches[i].index < negations[n2].index) target = matches[i];
                    else break;
                }
                if (target) target.negated = !target.negated;
            }
        }

        // 【4】集計
        var totalScore = 0;
        var positiveCount = 0;
        var negativeCount = 0;
        var matchedWords = [];

        for (i = 0; i < matches.length; i++) {
            var mm = matches[i];
            var score = mm.negated ? -mm.score : mm.score;
            if (score === 0) score = 0; // -0 を +0 に正規化
            totalScore += score;
            if (score > 0) positiveCount++;
            else if (score < 0) negativeCount++;
            matchedWords.push({
                word: mm.word,
                surface: mm.surface,
                type: mm.negated ? 'negated' : 'normal',
                score: score,
                start: mm.start,
                end: mm.end
            });
        }

        for (i = 0; i < negations.length; i++) {
            var t = tokens[negations[i].index];
            matchedWords.push({
                word: t.word,
                surface: t.surface,
                type: 'negation',
                score: 0,
                start: t.start,
                end: t.start + t.surface.length
            });
        }

        var matchCount = matches.length;
        return {
            score: matchCount > 0 ? totalScore / matchCount : 0,
            totalScore: totalScore,
            matchCount: matchCount,
            positiveCount: positiveCount,
            negativeCount: negativeCount,
            matchedWords: matchedWords
        };
    }

    /**
     * テキスト全体を分析する。
     *   tokenize : function(sentenceText) → [{word, surface, start}]
     * 全体スコアは文ごとのスコアの単純平均(本家osetiの analyze() の平均に相当)。
     * matchedWords の start/end はテキスト全体での位置。
     */
    function analyzeText(text, lexicon, tokenize, options) {
        var sentences = splitIntoSentences(text);
        var sentenceResults = [];
        var allMatchedWords = [];
        var totalScore = 0;
        var matchCount = 0;
        var positiveCount = 0;
        var negativeCount = 0;
        var scoreSum = 0;
        var cursor = 0;

        for (var i = 0; i < sentences.length; i++) {
            var sentence = sentences[i];
            var offset = text.indexOf(sentence, cursor);
            if (offset === -1) offset = cursor;
            cursor = offset + sentence.length;

            var tokens = tokenize(sentence);
            var result = analyzeSentence(sentence, tokens, lexicon, options);

            sentenceResults.push({
                text: sentence,
                score: result.score,
                totalScore: result.totalScore,
                matchCount: result.matchCount,
                positiveCount: result.positiveCount,
                negativeCount: result.negativeCount,
                matchedWords: result.matchedWords
            });

            for (var j = 0; j < result.matchedWords.length; j++) {
                var mw = result.matchedWords[j];
                allMatchedWords.push({
                    word: mw.word,
                    surface: mw.surface,
                    type: mw.type,
                    score: mw.score,
                    start: mw.start + offset,
                    end: mw.end + offset
                });
            }

            totalScore += result.totalScore;
            matchCount += result.matchCount;
            positiveCount += result.positiveCount;
            negativeCount += result.negativeCount;
            scoreSum += result.score;
        }

        return {
            score: sentenceResults.length > 0 ? scoreSum / sentenceResults.length : 0,
            totalScore: totalScore,
            matchCount: matchCount,
            positiveCount: positiveCount,
            negativeCount: negativeCount,
            matchedWords: allMatchedWords,
            sentences: sentenceResults
        };
    }

    /**
     * トークン位置に基づいてハイライトHTMLを生成する。
     * テキストは一度だけ走査され、全区間がHTMLエスケープされるため、
     * 同じ語が何度出現しても入れ子や属性破壊は起こらない。
     */
    function buildHighlightHtml(text, matchedWords) {
        var items = matchedWords.slice().filter(function (m) {
            return typeof m.start === 'number' && typeof m.end === 'number' && m.end > m.start;
        }).sort(function (a, b) {
            return a.start - b.start || b.end - a.end;
        });

        var html = '';
        var cursor = 0;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.start < cursor) continue; // 重なる区間はスキップ

            html += escapeHtml(text.slice(cursor, item.start));
            var surface = escapeHtml(text.slice(item.start, item.end));

            if (item.type === 'negation') {
                html += '<span class="highlight-word" style="background-color: #fbbf24; color: white;">' + surface + '</span>';
            } else {
                var color = item.score > 0 ? '#48bb78' : (item.score < 0 ? '#fc8181' : '#718096');
                var title = '基本形: ' + escapeHtml(item.word) + ' | スコア: ' + item.score.toFixed(2) +
                    (item.type === 'negated' ? ' (否定反転)' : '');
                html += '<span class="highlight-word" style="background-color: ' + color + '; color: white;" title="' + title + '">' + surface + '</span>';
            }
            cursor = item.end;
        }

        html += escapeHtml(text.slice(cursor));
        return html;
    }

    var OsetiAnalyzer = {
        VERSION: VERSION,
        NEGATION_WORDS: NEGATION_WORDS,
        NEGATION_PARTICLES: NEGATION_PARTICLES,
        PARALLEL_PARTICLES: PARALLEL_PARTICLES,
        escapeHtml: escapeHtml,
        parseLexicon: parseLexicon,
        splitIntoSentences: splitIntoSentences,
        tokenizeSimple: tokenizeSimple,
        analyzeSentence: analyzeSentence,
        analyzeText: analyzeText,
        buildHighlightHtml: buildHighlightHtml
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = OsetiAnalyzer;
    }
    if (global) {
        global.OsetiAnalyzer = OsetiAnalyzer;
    }
})(typeof window !== 'undefined' ? window : this);
