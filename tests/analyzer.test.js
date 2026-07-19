'use strict';
/**
 * analyzer.js の単体テスト
 * 実行: node --test tests/
 */
const test = require('node:test');
const assert = require('node:assert');
const A = require('../analyzer.js');

/**
 * 形態素解析結果を模したトークン列を作るヘルパー。
 * pairs: [surface, basicForm?] の配列。位置は表層形を連結した位置になる。
 */
function makeTokens(pairs) {
    let start = 0;
    return pairs.map(function (pair) {
        const surface = pair[0];
        const word = pair.length > 1 ? pair[1] : pair[0];
        const token = { word: word, surface: surface, start: start };
        start += surface.length;
        return token;
    });
}

/** makeTokens で作ったトークン列に対応する文テキスト */
function textOf(pairs) {
    return pairs.map(function (p) { return p[0]; }).join('');
}

function analyze(pairs, lexicon, options) {
    return A.analyzeSentence(textOf(pairs), makeTokens(pairs), lexicon, options);
}

// ============================================================
// escapeHtml
// ============================================================
test('escapeHtml: HTML特殊文字をエスケープする', function () {
    assert.strictEqual(
        A.escapeHtml('<script>alert("x&y\'")</script>'),
        '&lt;script&gt;alert(&quot;x&amp;y&#39;&quot;)&lt;/script&gt;'
    );
});

// ============================================================
// parseLexicon
// ============================================================
test('parseLexicon: 基本形式を読み込む', function () {
    const r = A.parseLexicon('楽しい\t1.0\n悲しい\t-1.0\n普通\t0.0\n');
    assert.strictEqual(r.wordCount, 3);
    assert.strictEqual(r.lexicon['楽しい'], 1.0);
    assert.strictEqual(r.lexicon['悲しい'], -1.0);
    assert.strictEqual(r.lexicon['普通'], 0.0);
    assert.strictEqual(r.errorCount, 0);
    assert.strictEqual(r.maxTokens, 1);
});

test('parseLexicon: 不正な行をスキップして数える', function () {
    const r = A.parseLexicon('楽しい\t1.0\nスコアなし\n単語\tabc\n\n  \n');
    assert.strictEqual(r.wordCount, 1);
    assert.strictEqual(r.errorCount, 2);
});

test('parseLexicon: CRLF改行を処理できる', function () {
    const r = A.parseLexicon('楽しい\t1.0\r\n悲しい\t-1.0\r\n');
    assert.strictEqual(r.wordCount, 2);
    assert.strictEqual(r.lexicon['楽しい'], 1.0);
});

test('parseLexicon: 重複を数え、評価が割れる語は両値をconflictsに保持', function () {
    const r = A.parseLexicon('賛成\t0.0\n賛成\t1.0\n楽しい\t1.0\n楽しい\t1.0\n');
    assert.strictEqual(r.wordCount, 2);
    assert.strictEqual(r.duplicateCount, 2);
    assert.strictEqual(r.conflictCount, 1);        // 賛成のみ値が割れている
    assert.strictEqual(r.lexicon['賛成'], 0.0);     // 代表値は最初の出現
    assert.deepStrictEqual(r.conflicts['賛成'], [0.0, 1.0]); // 両値を[最小,最大]で保持
    assert.ok(!r.conflicts['楽しい']);               // 同値の重複は矛盾ではない
});

test('parseLexicon: 複合語のトークン数からmaxTokensを算出する', function () {
    const r = A.parseLexicon('楽しい\t1.0\nさじ を 投げる\t-1.0\nかなう ない\t-1.0\n');
    assert.strictEqual(r.maxTokens, 3);
});

// ============================================================
// splitIntoSentences
// ============================================================
test('splitIntoSentences: 句点・感嘆符で分割し区切りは前の文に付く', function () {
    assert.deepStrictEqual(
        A.splitIntoSentences('楽しい。悲しい!普通'),
        ['楽しい。', '悲しい!', '普通']
    );
});

test('splitIntoSentences: 改行も文境界として扱う', function () {
    assert.deepStrictEqual(
        A.splitIntoSentences('楽しい\n悲しい'),
        ['楽しい\n', '悲しい']
    );
});

test('splitIntoSentences: 先頭の句点や空文字列で壊れない', function () {
    assert.deepStrictEqual(A.splitIntoSentences('。楽しい。'), ['楽しい。']);
    assert.deepStrictEqual(A.splitIntoSentences(''), []);
});

// ============================================================
// tokenizeSimple
// ============================================================
test('tokenizeSimple: 文字種で分割し開始位置を記録する', function () {
    const tokens = A.tokenizeSimple('これは楽しい映画ABC');
    assert.deepStrictEqual(tokens, [
        { word: 'これは', surface: 'これは', start: 0 },
        { word: '楽しい映画', surface: '楽しい映画', start: 3 },
        { word: 'ABC', surface: 'ABC', start: 8 }
    ]);
});

test('tokenizeSimple: 記号は区切りとして扱い位置がずれない', function () {
    const tokens = A.tokenizeSimple('最高、最高。');
    assert.deepStrictEqual(tokens, [
        { word: '最高', surface: '最高', start: 0 },
        { word: '最高', surface: '最高', start: 3 }
    ]);
});

// ============================================================
// 否定処理: oseti互換モード(拡張OFF)
// ============================================================
test('oseti互換: 「楽しくない」を否定として検出する', function () {
    const pairs = [['楽しく', '楽しい'], ['ない']];
    const r = analyze(pairs, { '楽しい': 1 }, { extendedNegation: false });
    assert.strictEqual(r.matchCount, 1);
    assert.strictEqual(r.totalScore, -1);
    assert.strictEqual(r.matchedWords[0].type, 'negated');
});

test('oseti互換: 二重否定は元に戻る', function () {
    const pairs = [['楽しく', '楽しい'], ['なく', 'ない'], ['ない']];
    const r = analyze(pairs, { '楽しい': 1 }, { extendedNegation: false });
    assert.strictEqual(r.totalScore, 1);
    assert.strictEqual(r.matchedWords[0].type, 'normal');
});

test('oseti互換: 否定は直前の感情語1語のみを反転する(並列否定は非対応)', function () {
    const pairs = [['お金'], ['も'], ['希望'], ['も'], ['ない']];
    const r = analyze(pairs, { 'お金': 1, '希望': 1 }, { extendedNegation: false });
    // 希望のみ反転: +1 + (-1) = 0
    assert.strictEqual(r.totalScore, 0);
    const kibou = r.matchedWords.find(function (w) { return w.word === '希望'; });
    const okane = r.matchedWords.find(function (w) { return w.word === 'お金'; });
    assert.strictEqual(kibou.type, 'negated');
    assert.strictEqual(okane.type, 'normal');
});

test('oseti互換: 感情語がない文では否定語だけあっても何も起きない', function () {
    const pairs = [['何'], ['も'], ['ない']];
    const r = analyze(pairs, { '楽しい': 1 }, { extendedNegation: false });
    assert.strictEqual(r.matchCount, 0);
    assert.strictEqual(r.score, 0);
});

// ============================================================
// 否定処理: 拡張モード(後方否定・並列否定)
// ============================================================
test('拡張: 並列否定「お金も希望もない」は両方を反転する', function () {
    const pairs = [['お金'], ['も'], ['希望'], ['も'], ['ない']];
    const r = analyze(pairs, { 'お金': 1, '希望': 1 }, { extendedNegation: true });
    assert.strictEqual(r.totalScore, -2);
    assert.strictEqual(r.negativeCount, 2);
});

test('拡張: 「雰囲気も料理も良くない」で3語すべて反転する', function () {
    const pairs = [['雰囲気'], ['も'], ['料理'], ['も'], ['良く', '良い'], ['ない']];
    const r = analyze(pairs, { '雰囲気': 0.5, '料理': 0.5, '良い': 1 }, { extendedNegation: true });
    assert.strictEqual(r.totalScore, -2);
    assert.ok(Math.abs(r.score - (-2 / 3)) < 1e-10);
});

test('拡張: 「期待できない」(可能形の否定)を検出する', function () {
    const pairs = [['期待'], ['でき'], ['ない']];
    const r = analyze(pairs, { '期待': 0.5 }, { extendedNegation: true });
    assert.strictEqual(r.totalScore, -0.5);
    assert.strictEqual(r.matchedWords[0].type, 'negated');
});

test('拡張: 内容語を挟んだ否定は反転しない(誤検出防止)', function () {
    // 「楽しい映画がない」: 映画(内容語)を挟むため 楽しい は反転しない
    const pairs = [['楽しい'], ['映画'], ['が'], ['ない']];
    const r = analyze(pairs, { '楽しい': 1 }, { extendedNegation: true });
    assert.strictEqual(r.matchedWords[0].type, 'normal');
    assert.strictEqual(r.totalScore, 1);
});

test('拡張: 「でき」+「ない」の否定語は1回だけ記録される(重複表示の修正)', function () {
    const pairs = [['期待'], ['でき'], ['ない']];
    const r = analyze(pairs, { '期待': 0.5 }, { extendedNegation: true });
    const negations = r.matchedWords.filter(function (w) { return w.type === 'negation'; });
    assert.strictEqual(negations.length, 1);
});

test('拡張: 中立語(スコア0)の否定で -0 にならない', function () {
    const pairs = [['普通'], ['では', 'では'], ['ない']];
    const r = analyze(pairs, { '普通': 0 }, { extendedNegation: true });
    assert.strictEqual(r.matchedWords[0].type, 'negated');
    assert.ok(!Object.is(r.matchedWords[0].score, -0));
});

// ============================================================
// 複合語マッチング
// ============================================================
test('複合語: 2トークンの複合語がマッチし、内部の否定語は個別に扱われない', function () {
    const pairs = [['かなう'], ['ない']];
    const r = analyze(pairs, { 'かなう ない': -1 }, { extendedNegation: true, maxTokens: 2 });
    assert.strictEqual(r.matchCount, 1);
    assert.strictEqual(r.totalScore, -1);
    assert.strictEqual(r.matchedWords[0].word, 'かなう ない');
    // 「ない」は複合語に取り込まれ、否定語として二重計上されない
    const negations = r.matchedWords.filter(function (w) { return w.type === 'negation'; });
    assert.strictEqual(negations.length, 0);
});

test('複合語: 3トークン以上の複合語もマッチする(旧実装は2トークンまで)', function () {
    const pairs = [['さじ'], ['を'], ['投げる']];
    const r = analyze(pairs, { 'さじ を 投げる': -1 }, { extendedNegation: true, maxTokens: 3 });
    assert.strictEqual(r.matchCount, 1);
    assert.strictEqual(r.totalScore, -1);
});

test('複合語: 最長一致を優先する', function () {
    const pairs = [['気'], ['に'], ['入る']];
    const r = analyze(pairs, { '気': -0.5, '気 に 入る': 1 }, { extendedNegation: true, maxTokens: 3 });
    assert.strictEqual(r.matchCount, 1);
    assert.strictEqual(r.matchedWords[0].word, '気 に 入る');
    assert.strictEqual(r.totalScore, 1);
});

test('複合語: 複合語の後の否定語が手前の語を誤って反転しない', function () {
    // 「楽しいが仕方がない」: 「仕方 が ない」の「ない」は複合語の一部
    const pairs = [['楽しい'], ['が'], ['仕方'], ['が'], ['ない']];
    const r = analyze(pairs, { '楽しい': 1, '仕方 が ない': -1 }, { extendedNegation: false, maxTokens: 3 });
    const tanoshii = r.matchedWords.find(function (w) { return w.word === '楽しい'; });
    assert.strictEqual(tanoshii.type, 'normal');
    assert.strictEqual(r.totalScore, 0); // +1 + (-1)
});

// ============================================================
// 部分一致(簡易トークナイザー用)
// ============================================================
test('部分一致: partialMatch有効時は前方一致で辞書を引く', function () {
    const pairs = [['楽しい映画']];
    const r = analyze(pairs, { '楽しい': 1 }, { partialMatch: true });
    assert.strictEqual(r.matchCount, 1);
    assert.strictEqual(r.matchedWords[0].word, '楽しい');
});

// ============================================================
// analyzeText(文分割・全体スコア・グローバル位置)
// ============================================================
test('analyzeText: 全体スコアは文ごとのスコアの平均(oseti準拠)', function () {
    const lexicon = A.parseLexicon('最高\t1.0\n最悪\t-1.0\n').lexicon;
    const r = A.analyzeText('最高。最悪。', lexicon, A.tokenizeSimple, {});
    assert.strictEqual(r.sentences.length, 2);
    assert.strictEqual(r.sentences[0].score, 1);
    assert.strictEqual(r.sentences[1].score, -1);
    assert.strictEqual(r.score, 0);
});

test('analyzeText: 感情語のない文もスコア0として平均に含まれる', function () {
    const lexicon = A.parseLexicon('最高\t1.0\n').lexicon;
    const r = A.analyzeText('最高。これはただの文。', lexicon, A.tokenizeSimple, {});
    assert.strictEqual(r.score, 0.5);
});

test('analyzeText: matchedWordsの位置はテキスト全体での位置になる', function () {
    const lexicon = A.parseLexicon('最高\t1.0\n').lexicon;
    const text = 'とても最高。すごく最高。';
    const r = A.analyzeText(text, lexicon, A.tokenizeSimple, {});
    const positions = r.matchedWords.map(function (w) { return w.start; });
    positions.forEach(function (start, i) {
        const w = r.matchedWords[i];
        assert.strictEqual(text.slice(w.start, w.end), w.surface);
    });
    assert.deepStrictEqual(positions.sort(function (a, b) { return a - b; }), [3, 9]);
});

// ============================================================
// buildHighlightHtml(旧実装のHTML破壊バグの回帰テスト)
// ============================================================
test('highlight: 同じ語が複数回出現してもHTMLが壊れない', function () {
    const lexicon = A.parseLexicon('最高\t1.0\n').lexicon;
    const text = '最高。最高。';
    const r = A.analyzeText(text, lexicon, A.tokenizeSimple, {});
    const html = A.buildHighlightHtml(text, r.matchedWords);

    // title属性の中にタグが入り込まない(旧実装のバグ)
    assert.ok(!/title="[^"]*</.test(html), 'title属性内にタグが混入している: ' + html);
    // spanは開始・終了とも2個ずつ
    assert.strictEqual((html.match(/<span/g) || []).length, 2);
    assert.strictEqual((html.match(/<\/span>/g) || []).length, 2);
});

test('highlight: 入力テキストのHTMLはエスケープされる(XSS対策)', function () {
    const lexicon = A.parseLexicon('最高\t1.0\n').lexicon;
    const text = '<img src=x onerror=alert(1)>最高';
    const r = A.analyzeText(text, lexicon, A.tokenizeSimple, {});
    const html = A.buildHighlightHtml(text, r.matchedWords);
    assert.ok(html.indexOf('<img') === -1);
    assert.ok(html.indexOf('&lt;img') !== -1);
});

test('highlight: 重なった区間はスキップされ本文が二重に出力されない', function () {
    const text = '楽しくない';
    const matched = [
        { word: '楽しい', surface: '楽しく', type: 'negated', score: -1, start: 0, end: 3 },
        { word: 'ない', surface: 'ない', type: 'negation', score: 0, start: 3, end: 5 },
        { word: 'ない', surface: 'ない', type: 'negation', score: 0, start: 3, end: 5 } // 重複
    ];
    const html = A.buildHighlightHtml(text, matched);
    assert.strictEqual((html.match(/<span/g) || []).length, 2);
    // タグを除去すると元のテキストに一致する
    const plain = html.replace(/<[^>]+>/g, '');
    assert.strictEqual(plain, text);
});

test('highlight: 否定反転された語のtitleに(否定反転)が表示される', function () {
    const pairs = [['楽しく', '楽しい'], ['ない']];
    const r = analyze(pairs, { '楽しい': 1 }, { extendedNegation: true });
    const html = A.buildHighlightHtml(textOf(pairs), r.matchedWords);
    assert.ok(html.indexOf('(否定反転)') !== -1);
});
