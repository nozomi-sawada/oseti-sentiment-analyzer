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

test('同梱辞書: 重複・矛盾エントリがなく、全行が有効', function () {
    const content = fs.readFileSync(
        path.join(__dirname, '..', 'dictionaries', 'japanese_sentiment_dictionary.txt'), 'utf-8');
    const r = A.parseLexicon(content);
    assert.strictEqual(r.errorCount, 0, '不正な行が ' + r.errorCount + ' 行ある');
    assert.strictEqual(r.duplicateCount, 0, '重複が ' + r.duplicateCount + ' 件ある');
    assert.strictEqual(r.conflictCount, 0, 'スコアが矛盾する重複が ' + r.conflictCount + ' 件ある');
    assert.strictEqual(r.wordCount, 18528, '語数が想定(18,528)と異なる: ' + r.wordCount);
});

test('VERSION: セマンティックバージョン形式でpackage.jsonと一致する', function () {
    assert.match(A.VERSION, /^\d+\.\d+\.\d+$/);
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
    assert.strictEqual(A.VERSION, pkg.version);
});
