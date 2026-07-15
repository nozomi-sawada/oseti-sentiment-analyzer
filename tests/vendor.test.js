'use strict';
/**
 * Kuromoji同梱ファイルの回帰テスト。
 * vendor/ の欠落や index.html の参照切れを検出する。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('vendor: 同梱のkuromoji.jsと辞書ファイルが存在する', function () {
    assert.ok(fs.existsSync(path.join(root, 'vendor/kuromoji/kuromoji.js')));
    assert.ok(fs.existsSync(path.join(root, 'vendor/kuromoji/LICENSE-2.0.txt')));
    assert.ok(fs.existsSync(path.join(root, 'vendor/kuromoji/NOTICE.md')));

    // kuromoji.js v0.1.2 の辞書は12ファイル構成
    const dictFiles = fs.readdirSync(path.join(root, 'vendor/kuromoji/dict'))
        .filter(function (f) { return f.endsWith('.dat.gz'); });
    assert.strictEqual(dictFiles.length, 12, '辞書ファイル(.dat.gz)は12個のはず: ' + dictFiles.join(', '));
});

test('vendor: index.htmlが同梱版を参照し、CDNフォールバックを持つ', function () {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
    assert.ok(html.includes('src="vendor/kuromoji/kuromoji.js"'), '同梱kuromoji.jsのscriptタグがない');
    assert.ok(html.includes("'vendor/kuromoji/dict'"), '同梱辞書のdicPath参照がない');
    assert.ok(html.includes('https://cdn.jsdelivr.net/npm/kuromoji@0.1.2'), 'CDNフォールバックのURLがない');
});
