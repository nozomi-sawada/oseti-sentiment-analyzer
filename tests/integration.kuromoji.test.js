'use strict';
/**
 * Kuromoji形態素解析器を使った統合テスト。
 * kuromoji がインストールされている場合のみ実行される(なければスキップ):
 *   npm install --no-save kuromoji
 *   node --test tests/
 *
 * index.html と同じ経路(実際の形態素解析 → analyzer.js)で、
 * サンプルテキストのスコアが変わっていないことを固定する回帰テスト。
 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const A = require('../analyzer.js');

let kuromoji = null;
try {
    kuromoji = require('kuromoji');
} catch (e) {
    // 未インストール時はスキップ
}

// index.html のサンプル辞書と同内容
const SAMPLE_DICTIONARY = [
    ['楽しい', 1.0], ['嬉しい', 1.0], ['幸せ', 1.0], ['好き', 1.0],
    ['素晴らしい', 1.0], ['美しい', 1.0], ['良い', 1.0], ['最高', 1.0],
    ['素敵', 1.0], ['感動', 1.0], ['充実', 1.0], ['頑張る', 1.0],
    ['美味しい', 1.0], ['面白い', 1.0], ['満足', 1.0],
    ['雰囲気', 0.5], ['料理', 0.5], ['サービス', 0.5], ['期待', 0.5],
    ['音楽', 0.5], ['演技', 0.5], ['質', 0.5],
    ['時間', 0.0], ['労力', 0.0], ['値段', 0.0], ['配送', 0.0],
    ['悲しい', -1.0], ['苦しい', -1.0], ['辛い', -1.0], ['嫌い', -1.0],
    ['最悪', -1.0], ['失敗', -1.0], ['不幸', -1.0], ['残念', -1.0],
    ['困る', -1.0], ['疲れる', -1.0], ['悪い', -1.0], ['遅刻', -1.0],
    ['無駄', -1.0], ['希望', 1.0], ['お金', 1.0]
].map(function (e) { return e[0] + '\t' + e[1].toFixed(1); }).join('\n');

test('統合テスト(Kuromoji使用)', { skip: !kuromoji && 'kuromoji未インストールのためスキップ' }, async function (t) {
    const dicPath = path.join(path.dirname(require.resolve('kuromoji/package.json')), 'dict');
    const tokenizer = await new Promise(function (resolve, reject) {
        kuromoji.builder({ dicPath: dicPath }).build(function (err, tk) {
            if (err) reject(err);
            else resolve(tk);
        });
    });

    // index.html の tokenizeWithKuromoji と同じ変換
    function tokenize(text) {
        return tokenizer.tokenize(text).map(function (tok) {
            const basic = (tok.basic_form && tok.basic_form !== '*') ? tok.basic_form : tok.surface_form;
            return { word: basic, surface: tok.surface_form, start: (tok.word_position || 1) - 1 };
        });
    }

    const parsed = A.parseLexicon(SAMPLE_DICTIONARY);
    const lexicon = parsed.lexicon;
    const opts = function (extended) {
        return { extendedNegation: extended, partialMatch: false, maxTokens: parsed.maxTokens };
    };

    await t.test('oseti互換モードでも「楽しくない」を検出する(旧実装は未検出)', function () {
        const r = A.analyzeText('楽しくない。', lexicon, tokenize, opts(false));
        assert.strictEqual(r.sentences[0].totalScore, -1);
        assert.strictEqual(r.sentences[0].matchedWords[0].type, 'negated');
    });

    await t.test('ポジティブなサンプル文', function () {
        const r = A.analyzeText('今日のイベントは最高だった。料理も音楽も素晴らしかった!', lexicon, tokenize, opts(true));
        // 文1: 最高(+1) / 文2: 料理(+0.5) 音楽(+0.5) 素晴らしい(+1)
        assert.strictEqual(r.sentences[0].score, 1);
        assert.ok(Math.abs(r.sentences[1].score - 2 / 3) < 1e-10);
        assert.ok(Math.abs(r.score - (1 + 2 / 3) / 2) < 1e-10); // ≒ 0.833
    });

    await t.test('並列否定を含むネガティブなサンプル文(拡張モード)', function () {
        const r = A.analyzeText('このレストランは雰囲気も料理も良くない。サービスも期待できない。', lexicon, tokenize, opts(true));
        // 文1: 雰囲気(-0.5) 料理(-0.5) 良い(-1) → -2/3
        // 文2: サービス(-0.5) 期待(-0.5) → -0.5
        assert.ok(Math.abs(r.sentences[0].score - (-2 / 3)) < 1e-10);
        assert.strictEqual(r.sentences[1].score, -0.5);
        assert.ok(r.score < 0);
    });

    await t.test('文ごとの分析サンプル(README記載例)', function () {
        const r = A.analyzeText('映画は面白かった。でも音楽も演技も良くなかった。', lexicon, tokenize, opts(true));
        assert.strictEqual(r.sentences[0].score, 1);
        assert.ok(Math.abs(r.sentences[1].score - (-2 / 3)) < 1e-10);
        assert.ok(Math.abs(r.score - (1 - 2 / 3) / 2) < 1e-10); // ≒ 0.167
    });

    await t.test('ハイライトHTMLが壊れない(同一語の複数回出現)', function () {
        const text = '料理は最高。音楽も最高。';
        const r = A.analyzeText(text, lexicon, tokenize, opts(true));
        const html = A.buildHighlightHtml(text, r.matchedWords);
        assert.ok(!/title="[^"]*</.test(html));
        const plain = html.replace(/<[^>]+>/g, '');
        assert.strictEqual(plain, text);
    });
});
