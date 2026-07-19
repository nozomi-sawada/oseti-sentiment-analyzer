'use strict';
/**
 * 同梱辞書(dictionaries/japanese_sentiment_dictionary.txt)の整合性テスト。
 * 重複・矛盾エントリの混入と、想定外の語数変化を検出する。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const A = require('../analyzer.js');

test('同梱辞書: 元辞書のまま(全行有効、ユニーク18,528語)', function () {
    const content = fs.readFileSync(
        path.join(__dirname, '..', 'dictionaries', 'japanese_sentiment_dictionary.txt'), 'utf-8');
    const r = A.parseLexicon(content);
    assert.strictEqual(r.errorCount, 0, '不正な行が ' + r.errorCount + ' 行ある');
    assert.strictEqual(r.wordCount, 18528, 'ユニーク語数が想定(18,528)と異なる: ' + r.wordCount);
    // 元辞書は重複13行を含む(同値10 + 評価が割れる3)。データは元のまま保持している
    assert.strictEqual(r.duplicateCount, 13);
    assert.strictEqual(r.conflictCount, 3);
});

test('同梱辞書: 評価が割れる3語は両値がデータに保持されている', function () {
    const content = fs.readFileSync(
        path.join(__dirname, '..', 'dictionaries', 'japanese_sentiment_dictionary.txt'), 'utf-8');
    const r = A.parseLexicon(content);
    // 元辞書の両スコアがそのまま conflicts に入っていること(CORRECTIONS.md と一致)
    assert.deepStrictEqual(r.conflicts['賛成'], [0.0, 1.0]);
    assert.deepStrictEqual(r.conflicts['規律'], [0.0, 1.0]);
    assert.deepStrictEqual(r.conflicts['買い得 です'], [-1.0, 1.0]);
});

test('VERSION: セマンティックバージョン形式でpackage.jsonと一致する', function () {
    assert.match(A.VERSION, /^\d+\.\d+\.\d+$/);
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
    assert.strictEqual(A.VERSION, pkg.version);
});
