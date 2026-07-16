# Oseti準拠 日本語感情分析ツール

**日本語** | [English](README.en.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/nozomi-sawada/oseti-sentiment-analyzer)](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/releases)

Webブラウザ上で動作する日本語テキストの感情分析ツールです。東北大学の日本語評価極性辞書を使用し、テキストの感情極性（ポジティブ/ネガティブ）を分析します。

---

## このプロジェクトについて

本ツールは、池上有希乃氏が開発した[Oseti](https://github.com/ikegami-yukino/oseti)ライブラリの考え方に基づいた、**独立したWebベースの実装**です。

元のOsetiはPython用のライブラリですが、本ツールはブラウザ上で動作し、拡張機能（後方否定・並列否定検出）を追加しています。

---

## 特徴

- **ブラウザベース**: サーバー不要、ブラウザだけで動作
- **クイックスタート**: サンプル辞書（41語）ですぐに試せます
- **形態素解析**: Kuromoji形態素解析器（IPAdic辞書使用）による単語分割
- **拡張機能**: 後方否定・並列否定検出に対応
- **文ごとの分析**: 感情の変化を追跡可能
- **視覚的な結果**: ハイライト表示で分かりやすい
- **研究用データ出力**: Pythonライブラリ互換形式で結果を出力
- **プライバシー保護**: すべての処理がローカルで完結

---

## デモ

**オンラインデモ**: https://nozomi-sawada.github.io/oseti-sentiment-analyzer/

**注**: 初回は形態素解析辞書（約18MB）の読み込みに数分かかることがあります。2回目以降はブラウザのキャッシュにより数秒で起動します。詳細は[注意事項](#注意事項)を参照してください。

---

## クイックスタート

### 1. すぐに試す

**オンラインデモ:**

ブラウザで https://nozomi-sawada.github.io/oseti-sentiment-analyzer/ を開くだけで使えます。インストールは不要です。

**ローカルで実行する場合:**

1. **リポジトリをダウンロード**

   **方法A: Git Clone**
```bash
   git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
   cd oseti-sentiment-analyzer
```

   **方法B: ZIP ダウンロード**
   - リポジトリページで「**Code**」→「**Download ZIP**」
   - ZIPファイルを解凍

2. **ブラウザで開く**
   - `index.html` をダブルクリック、またはブラウザにドラッグ&ドロップ

3. **サンプル辞書で試す**
   - 「✨ サンプル辞書で試す」ボタンをクリック
   - サンプルテキストで分析を体験

**注**: サンプル辞書は41語のみのデモ用です。実際の分析には完全版辞書（約18,000語）を使用してください。

### 2. 完全版で使用

本ツールには**完全な日本語評価極性辞書（約18,000語）が同梱されています**。

ツール上部の「**📖 完全版辞書を読み込む**」ボタンをクリックするだけで読み込めます（オンラインデモ・ローカルサーバー実行時）。

`index.html` を直接開いている場合は、リポジトリ内の `dictionaries/japanese_sentiment_dictionary.txt` を「ファイルから」タブでアップロードしてください。

**ファイルの場所:**
```
oseti-sentiment-analyzer/
└── dictionaries/
    └── japanese_sentiment_dictionary.txt  ← このファイルを使用
```

---
## 注意事項

### 初回読み込みについて

形態素解析用のKuromoji辞書（約18MB、リポジトリに同梱）を初回に読み込むため、回線によっては数分かかることがあります。2回目以降はブラウザのキャッシュにより数秒で起動します。

読み込みに失敗した場合、ツールは簡易トークナイザーで動作を継続しますが、分析精度が下がります。その場合はページの再読み込みをお試しください。

### オフラインでの利用

リポジトリ一式をダウンロードすれば、ローカルサーバー経由で完全オフラインで利用できます：

```bash
git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
cd oseti-sentiment-analyzer
python -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

**注**: `index.html` をダブルクリックで直接開くこともできますが、その場合はブラウザのセキュリティ制約により同梱辞書を読み込めないため、辞書はCDNから取得されます（インターネット接続が必要です）。

---
## 辞書ファイルについて

### 辞書ファイルの提供

本リポジトリには**完全な日本語評価極性辞書（約18,000語）が含まれています**。
すぐに使い始めることができます。

#### 提供ファイル

```
oseti-sentiment-analyzer/
├── dictionaries/
│   └── japanese_sentiment_dictionary.txt  ← 完全版辞書（18,528語）
│
├── sample/
│   └── sample_dictionary.txt              ← サンプル辞書（41語）
│
└── dictionary/                             ← 変換用スクリプト
    ├── convert_dictionary.py
    └── convert_dictionary.ipynb
```

**使用する辞書ファイル:**
- **`dictionaries/japanese_sentiment_dictionary.txt`** - 完全版辞書（名詞編+用言編）
  - 18,528語（重複除去済み）
  - そのまま使用可能

#### 辞書のクレジット

この辞書は東北大学 乾・岡崎研究室による「日本語評価極性辞書」をテキスト形式に変換したものです。

**出典:**
- https://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html

**著作者:**
- 東北大学 乾・岡崎研究室

**参考文献:** 引用情報（BibTeX）は後述の「[引用・クレジット](#引用クレジット)」の節を参照してください。

#### ライセンス

元の辞書のライセンス条件に従い、適切なクレジット表記のもとで配布しています。

- ✅ 自由に使用可能
- ✅ 商用利用可能（クレジット表記必須）
- ✅ 研究・教育利用推奨

---

### 辞書統計

完全辞書（18,528語）の内訳:

| カテゴリ | 語数 | 割合 |
|---------|------|------|
| ポジティブ | 5,448語 | 29.4% |
| ネガティブ | 8,126語 | 43.9% |
| 中立 | 4,954語 | 26.7% |

---

### 辞書ファイルの形式

```
単語[TAB]スコア
```

例:
```
楽しい	1.0
悲しい	-1.0
嬉しい	1.0
辛い	-1.0
普通	0.0
```

---

### （オプション）自分で辞書を変換したい場合

最新版の辞書を使いたい場合や、変換プロセスを確認したい場合は、元のファイルから自分で変換することも可能です。

#### ステップ1: 元の辞書ファイルをダウンロード

東北大学のサイトから以下のファイルをダウンロード:

[日本語評価極性辞書](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

必要なファイル:
- `pn.csv.m3.120408.trim` (名詞編・約13,000語)
- `wago.121808.pn` (用言編・約5,000語)

#### ステップ2: 辞書を変換

本リポジトリの `dictionary/` フォルダ内にある変換スクリプトを使用します。

**方法A: Pythonスクリプトを使用**

```bash
# dictionary/フォルダに移動
cd dictionary/

# ダウンロードしたファイルを配置
# - pn.csv.m3.120408.trim
# - wago.121808.pn

# 変換実行
python convert_dictionary.py

# japanese_sentiment_dictionary.txt が生成されます
```

**方法B: Jupyter Notebookを使用**

```bash
cd dictionary/
jupyter notebook convert_dictionary.ipynb
# セルを実行
```

**方法C: 手動変換**

詳細は [dictionary/README.md](dictionary/README.md) を参照

---

## ローカルで実行

### オプション1: 直接実行

```bash
git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
cd oseti-sentiment-analyzer
# index.htmlをブラウザで開く
```

この方法では、辞書の読み込みにインターネット接続が必要です（[注意事項](#注意事項)を参照）。

### オプション2: ローカルサーバー（完全オフライン対応）

```bash
# Pythonを使用
python -m http.server 8000

# Node.jsを使用
npx http-server

# ブラウザで http://localhost:8000 を開く
```

---

## 使用例

### サンプル辞書でのクイックテスト

```
入力: "今日のイベントは最高だった。料理も音楽も素晴らしかった!"
結果: スコア +0.833 (強いポジティブ)
```

### 完全辞書での高度な分析

```
入力: "このレストランは雰囲気も料理も良くない。サービスも期待できない。"
結果: スコア -0.500 (強いネガティブ)

文1: 「良い ない」が否定込みの複合語として辞書に直接マッチ(-1.0)。
     「雰囲気」(+1.0)・「料理」(0.0)と合算され、文スコアは 0.000
文2: 後方否定により「サービス」「期待」が反転し、文スコアは -1.000
```

**注**: サンプル辞書と完全版辞書では収録語とスコアが異なるため、同じ文でも結果が変わります（この文はサンプル辞書では -0.583 になります）。

### 文ごとの分析例（サンプル辞書使用）

```
入力: "映画は面白かった。でも音楽も演技も良くなかった。"

文1: "映画は面白かった。"
  → スコア: +1.0 (ポジティブ)

文2: "でも音楽も演技も良くなかった。"
  → スコア: -0.667 (ネガティブ)
  → 並列否定検出: 「音楽も演技も」+ 後方否定「良くない」

全体: スコア +0.167 (弱いポジティブ)
```

---

## 拡張機能について

本ツールは元のOsetiライブラリに加えて、以下の独自機能を実装しています：

### 否定検出の拡張

元のOsetiは、否定語（ない・ず・ぬ等）が現れたとき**直前の感情語1語のみ**を反転します（「楽しくない」は元のOsetiでも検出可能です）。本ツールの拡張機能は、これに加えて助詞を挟んだ否定や、1つの否定語が複数の感情語にかかるケースを検出します。拡張機能をOFFにすると、元のOsetiと同じ「直前の感情語1語のみを反転する」互換モードで動作します。

**拡張機能の対応例:**
- `お金がない`
- `希望はない`
- `期待できない`
- `満足できない`

### 並列否定検出

複数の感情語が並列助詞で繋がれた否定表現に対応しています。

**対応例:**
- `お金も希望もない`
- `雰囲気も料理も良くない`
- `サービスも期待できない`

### 研究での使用

**重要**: 研究で使用する際は、この拡張機能（後方否定・並列否定検出）を使用したことを論文に明記してください。

---

## 技術仕様

### システム要件

- ✅ モダンブラウザ (Chrome, Firefox, Safari, Edge)
- ✅ JavaScript有効化
- インターネット接続は、オンラインデモの利用時と `index.html` を直接（ダブルクリックで）開く場合のみ必要です。ローカルサーバー経由なら不要です

### 依存ライブラリ

- **Kuromoji.js** v0.1.2 (Apache License 2.0) - 形態素解析
  - リポジトリに同梱（`vendor/kuromoji/`、IPAdic辞書込み）
  - 同梱版を読み込めない場合はCDN（jsdelivr）にフォールバック

### ブラウザ互換性

モダンブラウザ（2020年以降）で動作確認:

- ✅ Chrome/Edge (Chromium系)
- ✅ Firefox
- ✅ Safari

**必要な機能:**
- ES6 JavaScript support
- FileReader API
- Clipboard API（コピー機能用）

**注**: 正確な最小バージョンは未検証です。互換性の問題があればIssuesでご報告ください。

### アーキテクチャ

```
┌─────────────────────────────────────┐
│   Web Browser (Client-Side)         │
├─────────────────────────────────────┤
│  HTML Interface                     │
│  ├─ File Upload / Text Input        │
│  ├─ Dictionary Management           │
│  └─ Results Visualization           │
├─────────────────────────────────────┤
│  JavaScript Analysis Engine         │
│  ├─ Kuromoji.js (Tokenization)      │
│  ├─ Sentiment Scoring               │
│  ├─ Negation Detection              │
│  └─ Sentence-level Analysis         │
├─────────────────────────────────────┤
│  Data (Local Storage)               │
│  ├─ Dictionary (user-provided)      │
│  └─ Analysis Results                │
└─────────────────────────────────────┘
```

---

## 研究用データ出力

本ツールは、元のOseti Pythonライブラリの出力形式を**参考にした**データを出力します。

**注:**
- 基本的な形式は類似していますが、完全な互換性は保証されていません
- `-NEGATION`サフィックスは本ツール独自の拡張機能です
- 研究で使用する際は、これらの違いを論文に明記してください

### 出力形式

#### 1. `analyzer.analyze()` 形式

文ごとの感情スコア配列:

```python
[0.8333333333, -0.7500000000, 0.1666666667]
```

#### 2. `analyzer.count_polarity()` 形式

文ごとのポジティブ/ネガティブ単語数:

```json
[
  {"positive": 3, "negative": 0},
  {"positive": 0, "negative": 3},
  {"positive": 1, "negative": 2}
]
```

#### 3. `analyzer.analyze_detail()` 形式

検出された感情語の詳細:

```json
[
  {
    "positive": ["楽しい", "素晴らしい", "最高"],
    "negative": [],
    "score": 0.8333333333
  },
  {
    "positive": [],
    "negative": ["良い-NEGATION", "期待-NEGATION"],
    "score": -0.7500000000
  }
]
```

**注**:
- `-NEGATION`サフィックスは後方否定・並列否定検出時に付与される本ツール独自の表記です
- 元のOseti Pythonライブラリでは異なる表記方法を使用している可能性があります

---

## 技術スタック

- **Frontend**: Pure HTML/CSS/JavaScript（フレームワーク不使用）
  - `index.html` — UI層
  - `analyzer.js` — 分析エンジン（UI非依存・テスト可能）
- **形態素解析**: Kuromoji.js (IPAdic辞書)
- **辞書**: 日本語評価極性辞書（東北大学）
- **ライセンス**: MITライセンス（ツール）、東北大学のライセンス（辞書）

---

## テスト

分析エンジン（`analyzer.js`）には自動テストがあります。Node.js 18以上で実行できます：

```bash
# 単体テスト（依存パッケージ不要）
node --test tests/analyzer.test.js

# 統合テスト込み（実際のKuromoji形態素解析を使用）
npm run test:integration
```

テストは否定処理（oseti互換モード・拡張モード）、複合語マッチング、文分割、ハイライトHTML生成（エスケープ・重複語の回帰テスト）などを検証します。GitHub ActionsでもPush/PRごとに自動実行されます。

---

## 引用・クレジット

### このツールの引用

研究でこのツールを使用される場合は、以下を引用してください：

```bibtex
@software{sawada2025oseti,
  author = {Sawada, Nozomi},
  title = {Oseti-based Japanese Sentiment Analysis Tool},
  year = {2025},
  url = {https://github.com/nozomi-sawada/oseti-sentiment-analyzer},
  note = {Version 1.1}
}
```

**注**: 将来、正式版リリース時にDOIを取得する予定です。

### 辞書の引用（必須）

本ツールを使用する場合、以下の文献も**必ず**引用してください：

```bibtex
@article{kobayashi2005,
  author = {小林のぞみ and 乾健太郎 and 松本裕治 and 立石健二 and 福島俊一},
  title = {意見抽出のための評価表現の収集},
  journal = {自然言語処理},
  volume = {12},
  number = {3},
  pages = {203--222},
  year = {2005}
}

@inproceedings{higashiyama2008,
  author = {東山昌彦 and 乾健太郎 and 松本裕治},
  title = {述語の選択選好性に着目した名詞評価極性の獲得},
  booktitle = {言語処理学会第14回年次大会論文集},
  pages = {584--587},
  year = {2008}
}
```

### 論文での記載例

> 感情分析には、Sawada (2025) が開発したOseti準拠日本語感情分析ツールを使用し、東北大学の日本語評価極性辞書 (小林ら, 2005; 東山ら, 2008) およびKuromoji形態素解析器を用いた。後方否定・並列否定検出の拡張機能を有効化して分析を行った。

### 関連プロジェクトのクレジット

#### 辞書
- **日本語評価極性辞書**
- 東北大学 乾・岡崎研究室
- [公式サイト](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

#### 形態素解析
- **Kuromoji.js** (Apache License 2.0)
- [GitHubリポジトリ](https://github.com/takuyaa/kuromoji.js)

#### アルゴリズム
- **Oseti** by 池上有希乃
- [GitHubリポジトリ](https://github.com/ikegami-yukino/oseti)
- 本ツールはOsetiの考え方を参考にした独立実装です

---

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください

**注:**
- 本ツール自体はMITライセンスです
- 辞書ファイルは東北大学のライセンスに従います
- 商用利用の場合は、必ず東北大学の利用規約を確認してください

---

## 関連プロジェクト

- [Oseti (Original Python Library)](https://github.com/ikegami-yukino/oseti) - by 池上有希乃
- [Kuromoji.js](https://github.com/takuyaa/kuromoji.js) - 日本語形態素解析器
- [日本語評価極性辞書](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html) - 東北大学

---

## 報告・貢献

### バグ報告・機能リクエスト

技術的な問題や改善提案は、GitHubのIssuesをご利用ください：

- **バグ報告**: [Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)
- **機能リクエスト**: [Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)

### 貢献方法

Pull Requestを歓迎します:

1. このリポジトリをFork
2. 機能ブランチを作成
   ```bash
   git checkout -b feature/improvement
   ```
3. 変更をコミット
   ```bash
   git commit -m 'Add improvement'
   ```
4. ブランチにPush
   ```bash
   git push origin feature/improvement
   ```
5. Pull Requestを作成

**注意**: このプロジェクトは研究目的で開発されており、個別のサポート対応は行っておりません。技術的な質問はIssuesで公開質問としてお願いします。

---

## 開発状況

このプロジェクトは**研究目的**で開発されました。

### 受け付けているもの

- ✅ バグ報告（Issues経由）
- ✅ Pull Request（品質向上・バグ修正）
- ⚠️ 機能リクエスト（実装は保証されません）

### 受け付けていないもの

- ❌ 個別の技術サポート
- ❌ カスタマイズ依頼

---

## 更新履歴

### Version 1.1 (2026)

**バグ修正:**
- 否定検出トグルOFF時に否定処理が一切行われなかった問題を修正。OFF時は元のOsetiと同じ「否定語が直前の感情語1語のみを反転する」互換モードで動作するようになりました
- 同じ感情語が複数回出現するとハイライト表示のHTMLが壊れる問題を修正（トークン位置ベースの生成に変更）
- Kuromoji（CDN）の読み込みに失敗するとツール全体が操作不能になる問題を修正。失敗時は簡易トークナイザーで動作を継続します
- 3語以上の複合語（例:「さじ を 投げる」約1,000件）が辞書照合されなかった問題を修正
- 入力テキスト・辞書語をHTMLエスケープするよう修正（XSS対策）
- 否定語「でき+ない」が検出語リストに二重表示される問題を修正
- 未知語（Kuromojiのbasic_formが「*」）の照合を修正

**変更:**
- 研究用データ出力に分析条件（ツールのバージョン・否定検出モード・トークナイザー・辞書語数・分析日時）を付記するように
- 同梱辞書から重複13行（うちスコアが矛盾する3語は最初の定義を採用）を除去（18,541語 → 18,528語）
- 完全版辞書をワンクリックで読み込む「📖 完全版辞書を読み込む」ボタンを追加
- UIの表示言語（日本語/英語）を切り替え可能に。READMEも日本語版と英語版に分割
- Kuromoji本体とIPAdic辞書をリポジトリに同梱（`vendor/kuromoji/`）。外部CDNに依存せず動作し、ローカルサーバー経由なら完全オフラインで利用可能に。同梱版を読み込めない場合はCDNにフォールバック
- 全体スコアを「文ごとのスコアの平均」に統一（本家Osetiの `analyze()` の平均と一致）
- 分析エンジンを `analyzer.js` に分離し、自動テスト（単体・統合）とCIを追加
- 辞書ロード時に、スコアが矛盾する重複語を警告表示
- 変換スクリプトが重複・矛盾エントリを検出して報告するように
- 改行を文境界として扱うように

### Version 1.0 (2025)
- 初回リリース
- 後方否定検出機能
- 並列否定検出機能
- 文ごとの分析機能
- Kuromoji形態素解析器の統合
- 研究用データ出力（Pythonライブラリ互換形式）
- サンプル辞書（41語）の提供
- 完全辞書（18,541語・当時）の同梱

---

## 今後の展望

以下の機能は技術的に実装可能で、将来追加される可能性があります：

- [ ] **バッチ処理機能**
- [ ] **辞書のエクスポート**
- [ ] **CSV/Excel一括分析**
- [ ] **可視化グラフ**



**© 2025 Nozomi Sawada**

**Developed for academic research purposes.**
