# Oseti準拠 日本語感情分析ツール / Oseti-based Japanese Sentiment Analysis Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/nozomi-sawada/oseti-sentiment-analyzer)](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/releases)

Webブラウザ上で動作する日本語テキストの感情分析ツールです。東北大学の日本語評価極性辞書を使用し、テキストの感情極性（ポジティブ/ネガティブ）を分析します。

A web-based sentiment analysis tool for Japanese text that analyzes sentiment polarity (positive/negative) using the Japanese Sentiment Polarity Dictionary from Tohoku University.

---

## 📌 このプロジェクトについて / About This Project

本ツールは、池上有希乃氏が開発した[Oseti](https://github.com/ikegami-yukino/oseti)ライブラリの考え方に基づいた、**独立したWebベースの実装**です。

元のOsetiはPython用のライブラリですが、本ツールはブラウザ上で動作し、拡張機能（後方否定・並列否定検出）を追加しています。

This is an **independent web-based implementation** inspired by the [Oseti library](https://github.com/ikegami-yukino/oseti) by Yukino Ikegami. While the original Oseti is a Python library, this tool runs in web browsers and includes extended features for backward and parallel negation detection.

---

## ✨ 特徴 / Features

- 🌐 **ブラウザベース**: サーバー不要、ブラウザだけで動作 / Server-free, runs entirely in browser
- 🚀 **クイックスタート**: サンプル辞書（41語）で即座に試用可能 / Quick start with sample dictionary (41 words)
- 📊 **高精度分析**: Kuromoji形態素解析器（IPAdic辞書使用）による実用的な単語分割 / Practical word segmentation using Kuromoji morphological analyzer
- 🔄 **拡張機能**: 後方否定・並列否定検出に対応 / Extended features for backward & parallel negation detection
- 📝 **文ごとの分析**: 感情の変化を追跡可能 / Sentence-by-sentence analysis to track sentiment changes
- 🎨 **視覚的な結果**: ハイライト表示で分かりやすい / Visual results with highlighted words
- 🔬 **研究用データ出力**: Pythonライブラリ互換形式で結果を出力 / Research-ready output compatible with Python library format
- 🔒 **プライバシー保護**: すべての処理がローカルで完結 / All processing done locally

---

## 🚀 デモ / Demo

⚠️ **重要 / Important**: GitHub Pagesのオンラインデモは初回読み込みに5-10分以上かかり、環境によっては動作しない場合があります。**ローカル実行を強く推奨します。**

⚠️ The online demo on GitHub Pages may take 5-10+ minutes to load initially and may not work depending on your environment. **We strongly recommend local execution.**

**推奨 / Recommended**: [ローカルで実行する方法 / How to Run Locally](#-重要な注意事項--important-notes)

**参考 / Reference**: [オンラインデモ（非推奨） / Online Demo (Not Recommended)](https://nozomi-sawada.github.io/oseti-sentiment-analyzer/)


---

## 📖 クイックスタート / Quick Start

### 1️⃣ ローカルで試す / Try Locally (Recommended)

**推奨される方法 / Recommended Method:**

1. **リポジトリをダウンロード / Download Repository**
   
   **方法A: Git Clone**
```bash
   git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
   cd oseti-sentiment-analyzer
```
   
   **方法B: ZIP ダウンロード / Download ZIP**
   - リポジトリページで「**Code**」→「**Download ZIP**」
   - ZIPファイルを解凍

2. **ブラウザで開く / Open in Browser**
   - `index.html` をダブルクリック、またはブラウザにドラッグ&ドロップ

3. **サンプル辞書で試す / Try with Sample Dictionary**
   - 「✨ サンプル辞書で試す」ボタンをクリック
   - サンプルテキストで分析を体験

**⚠️ 注意 / Note**: サンプル辞書は41語のみで、デモ用です。本格的な分析には完全な辞書（約18,000語）が必要です。

### 2️⃣ 完全版で使用 / Full Version

本リポジトリには**完全な日本語評価極性辞書（約18,000語）が含まれています**：

1. リポジトリをダウンロード後、`dictionaries/japanese_sentiment_dictionary.txt` を確認
2. このファイルをツールにアップロード、またはテキストとして貼り付け
3. 本格的な感情分析を開始

**ファイルの場所 / File Location:**
```
oseti-sentiment-analyzer/
└── dictionaries/
    └── japanese_sentiment_dictionary.txt  ← このファイルを使用
```

---
## ⚠️ 重要な注意事項 / Important Notes

### GitHub Pagesでの動作について / About GitHub Pages Demo

GitHub Pagesのオンラインデモには以下の制限があります：

**The GitHub Pages online demo has the following limitations:**

#### 🐌 初回読み込みが非常に遅い / Very Slow Initial Loading

- Kuromoji形態素解析辞書（約10MB）のダウンロードに**5-10分以上**かかります
- ネットワーク環境により、さらに時間がかかる場合があります
- Loading the Kuromoji dictionary (~10MB) takes **5-10+ minutes**
- May take even longer depending on network conditions

#### ❌ 環境によっては動作しない / May Not Work in Some Environments

以下のような問題が発生する可能性があります：

- 読み込みが完了しない / Loading never completes
- 「ページが応答しません」エラー / "Page unresponsive" errors  
- ブラウザがフリーズする / Browser freezing
- メモリ不足エラー / Out of memory errors

#### 🎓 授業・研究での使用について / For Educational and Research Use

**授業や研究で使用する場合は、必ずローカル実行を推奨してください。**

**For educational and research purposes, we strongly recommend local execution.**

---

### ✅ 推奨: ローカル実行 / Recommended: Local Execution

**なぜローカル実行が推奨されるのか / Why Local Execution is Recommended:**

- ✅ **確実に動作する** / Works reliably
- ✅ **読み込みが速い**（初回のみ数分、2回目以降は数秒） / Fast loading (few minutes first time, seconds after)
- ✅ **ネットワーク不要**（辞書読み込み後） / No network required (after dictionary loads)
- ✅ **学生全員が同時にアクセスしても問題なし** / No issues with many students accessing simultaneously

**ローカル実行の手順 / Local Execution Steps:**

1. **ダウンロード / Download**
```bash
   git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
```
   または「Code」→「Download ZIP」/ Or "Code" → "Download ZIP"

2. **実行 / Run**
   - `index.html` をブラウザで開く / Open `index.html` in browser
   - 初回のみKuromoji辞書の読み込みに数分 / First time: few minutes for dictionary loading
   - 2回目以降は数秒で起動 / Subsequent times: starts in seconds

3. **辞書を使用 / Use Dictionary**
   - リポジトリ内の `dictionaries/japanese_sentiment_dictionary.txt` をツールにアップロード
   - Upload `dictionaries/japanese_sentiment_dictionary.txt` from the repository to the tool

---

### 📊 オンラインデモ vs ローカル実行 / Online Demo vs Local Execution

| 項目 / Item | オンラインデモ / Online Demo | ローカル実行 / Local Execution |
|------------|---------------------------|-------------------------------|
| 初回起動 / First Launch | 5-10分以上 / 5-10+ min | 2-5分 / 2-5 min |
| 2回目以降 / Subsequent | 5-10分以上 / 5-10+ min | 数秒 / Seconds |
| 安定性 / Stability | 不安定 / Unstable | 安定 / Stable |
| 推奨度 / Recommendation | ❌ 非推奨 / Not Recommended | ✅ 推奨 / Recommended |

---
## 📚 辞書ファイルについて / About Dictionary Files

### ✅ 辞書ファイルの提供 / Dictionary File Availability

本リポジトリには**完全な日本語評価極性辞書（約18,000語）が含まれています**。
すぐに使い始めることができます。

**The complete Japanese Sentiment Polarity Dictionary (~18,000 words) is included in this repository.**
You can start using it immediately.

#### 📁 提供ファイル / Provided Files

```
oseti-sentiment-analyzer/
├── dictionaries/
│   └── japanese_sentiment_dictionary.txt  ← 完全版辞書（18,541語）
│
├── sample/
│   └── sample_dictionary.txt              ← サンプル辞書（41語）
│
└── dictionary/                             ← 変換用スクリプト
    ├── convert_dictionary.py
    └── convert_dictionary.ipynb
```

**使用する辞書ファイル / Dictionary File to Use:**
- **`dictionaries/japanese_sentiment_dictionary.txt`** - 完全版辞書（名詞編+用言編）
  - Complete dictionary (Nouns + Predicates)
  - 18,541語 / 18,541 words
  - そのまま使用可能 / Ready to use

#### 🎓 辞書のクレジット / Dictionary Credits

この辞書は東北大学 乾・岡崎研究室による「日本語評価極性辞書」をテキスト形式に変換したものです。

This dictionary is a text-format conversion of the "Japanese Sentiment Polarity Dictionary" by Tohoku University's Inui-Okazaki Laboratory.

**出典 / Source:**
- https://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html

**著作者 / Author:**
- 東北大学 乾・岡崎研究室 / Inui-Okazaki Laboratory, Tohoku University

**参考文献 / References:**

**名詞編 / Nouns:**
```bibtex
@inproceedings{higashiyama2008,
  author = {東山昌彦 and 乾健太郎 and 松本裕治},
  title = {述語の選択選好性に着目した名詞評価極性の獲得},
  booktitle = {言語処理学会第14回年次大会論文集},
  pages = {584--587},
  year = {2008}
}
```

**用言編 / Predicates:**
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
```

#### ⚖️ ライセンス / License

元の辞書のライセンス条件に従い、適切なクレジット表記のもとで配布しています。

Distributed under the original dictionary's license terms with proper attribution.

- ✅ 自由に使用可能 / Free to use
- ✅ 商用利用可能（クレジット表記必須）/ Commercial use allowed (with attribution)
- ✅ 研究・教育利用推奨 / Recommended for research and education

---

### 📊 辞書統計 / Dictionary Statistics

完全辞書（18,541語）の内訳 / Full dictionary breakdown (18,541 words):

| カテゴリ / Category | 語数 / Words | 割合 / Ratio |
|---------|------|------|
| ポジティブ / Positive | 5,458語 | 29.4% |
| ネガティブ / Negative | 8,129語 | 43.8% |
| 中立 / Neutral | 4,954語 | 26.7% |

---

### 📋 辞書ファイルの形式 / Dictionary Format

```
単語[TAB]スコア
word[TAB]score
```

例 / Example:
```
楽しい	1.0
悲しい	-1.0
嬉しい	1.0
辛い	-1.0
普通	0.0
```

---

### 🔄 （オプション）自分で辞書を変換したい場合 / Optional: Convert Dictionary Yourself

最新版の辞書を使いたい場合や、変換プロセスを確認したい場合は、元のファイルから自分で変換することも可能です。

If you want to use the latest version or verify the conversion process, you can convert from the original files yourself.

#### ステップ1: 元の辞書ファイルをダウンロード / Step 1: Download Original Dictionary

東北大学のサイトから以下のファイルをダウンロード / Download from Tohoku University:

🔗 [日本語評価極性辞書 / Japanese Sentiment Polarity Dictionary](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

必要なファイル / Required files:
- `pn.csv.m3.120408.trim` (名詞編・約13,000語 / Nouns, ~13,000 words)
- `wago.121808.pn` (用言編・約5,000語 / Predicates, ~5,000 words)

#### ステップ2: 辞書を変換 / Step 2: Convert Dictionary

本リポジトリの `dictionary/` フォルダ内にある変換スクリプトを使用します。

Use the conversion scripts in the `dictionary/` folder of this repository.

**方法A: Pythonスクリプトを使用 / Method A: Using Python Script**

```bash
# dictionary/フォルダに移動 / Navigate to dictionary/ folder
cd dictionary/

# ダウンロードしたファイルを配置 / Place downloaded files
# - pn.csv.m3.120408.trim
# - wago.121808.pn

# 変換実行 / Run conversion
python convert_dictionary.py

# japanese_sentiment_dictionary.txt が生成されます
# This will generate japanese_sentiment_dictionary.txt
```

**方法B: Jupyter Notebookを使用 / Method B: Using Jupyter Notebook**

```bash
cd dictionary/
jupyter notebook convert_dictionary.ipynb
# セルを実行 / Execute cells
```

**方法C: 手動変換 / Method C: Manual Conversion**

詳細は [dictionary/README.md](dictionary/README.md) を参照 / See [dictionary/README.md](dictionary/README.md) for details

---

## 💻 ローカルで実行 / Local Usage

### オプション1: 直接実行 / Option 1: Direct Execution

```bash
git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
cd oseti-sentiment-analyzer
# index.htmlをブラウザで開く / Open index.html in your browser
```

### オプション2: ローカルサーバー / Option 2: Local Server

```bash
# Pythonを使用 / Using Python
python -m http.server 8000

# Node.jsを使用 / Using Node.js
npx http-server

# ブラウザで http://localhost:8000 を開く / Open http://localhost:8000 in browser
```

---

## 🎯 使用例 / Usage Examples

### サンプル辞書でのクイックテスト / Quick Test with Sample Dictionary

```
入力 / Input: "今日のイベントは最高だった。料理も音楽も素晴らしかった!"
結果 / Result: スコア +0.833 (強いポジティブ / Strong Positive)
```

### 完全辞書での高度な分析 / Advanced Analysis with Full Dictionary

```
入力 / Input: "このレストランは雰囲気も料理も良くない。サービスも期待できない。"
結果 / Result: スコア -0.583 (強いネガティブ / Strong Negative)
拡張機能 / Extended Features: 並列否定「雰囲気も料理も良くない」、後方否定「期待できない」を検出
```

### 文ごとの分析例 / Sentence-by-Sentence Analysis Example

```
入力 / Input: "映画は面白かった。でも音楽も演技も良くなかった。"

文1 / Sentence 1: "映画は面白かった。"
  → スコア: +1.0 (ポジティブ / Positive)
  
文2 / Sentence 2: "でも音楽も演技も良くなかった。"
  → スコア: -0.667 (ネガティブ / Negative)
  → 並列否定検出: 「音楽も演技も」+ 後方否定「良くない」
  
全体 / Overall: スコア +0.167 (弱いポジティブ / Weak Positive)
```

---

## ⚠️ 拡張機能について / About Extended Features

本ツールは元のOsetiライブラリに加えて、以下の独自機能を実装しています：

This tool implements the following original features in addition to the original Oseti library:

### 否定検出の拡張 / Extended Negation Detection

元のOsetiは、否定語（ない・ず・ぬ等）が現れたとき**直前の感情語1語のみ**を反転します（「楽しくない」は元のOsetiでも検出可能です）。本ツールの拡張機能は、これに加えて助詞を挟んだ否定や、1つの否定語が複数の感情語にかかるケースを検出します。拡張機能をOFFにすると、元のOsetiと同じ「直前の感情語1語のみを反転する」互換モードで動作します。

The original Oseti flips only the **single emotion word immediately preceding** a negation word ("楽しくない" is detected by the original Oseti as well). The extended features of this tool additionally detect negation across particles and negation affecting multiple words. When the extended features are turned OFF, the tool runs in a compatibility mode that mirrors the original Oseti's behavior.

**拡張機能の対応例 / Examples handled by the extended features:** 
- `お金がない` (no money)
- `希望はない` (no hope)
- `期待できない` (cannot expect)
- `満足できない` (cannot satisfy)

### 並列否定検出 / Parallel Negation Detection

複数の感情語が並列助詞で繋がれた否定表現に対応しています。

Supports negation patterns with multiple emotion words connected by parallel particles.

**対応例 / Examples:** 
- `お金も希望もない` (no money or hope)
- `雰囲気も料理も良くない` (neither atmosphere nor food is good)
- `サービスも期待できない` (cannot expect service either)

### 研究での使用 / Use in Research

**重要 / Important**: 研究で使用する際は、この拡張機能（後方否定・並列否定検出）を使用したことを論文に明記してください。

When using in research, please specify that these extended features were used.

---

## ⚙️ 技術仕様 / Technical Specifications

### システム要件 / System Requirements

- ✅ モダンブラウザ / Modern browser (Chrome, Firefox, Safari, Edge)
- ✅ JavaScript有効化 / JavaScript enabled
- ✅ インターネット接続（初回のみ、Kuromoji.jsのCDN読み込み用）
- ✅ Internet connection (first time only, for loading Kuromoji.js from CDN)

### 依存ライブラリ / Dependencies

- **Kuromoji.js** v0.1.2 (Apache License 2.0) - 形態素解析 / Morphological analysis
- CDNから自動読み込み / Automatically loaded from CDN:
  - `https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/`

### ブラウザ互換性 / Browser Compatibility

モダンブラウザ（2020年以降）で動作確認 / Tested on modern browsers (2020+):

- ✅ Chrome/Edge (Chromium-based)
- ✅ Firefox
- ✅ Safari

**必要な機能 / Required features:**
- ES6 JavaScript support
- FileReader API
- Clipboard API (for copy function)

**注**: 正確な最小バージョンは未検証です。互換性の問題があればIssuesでご報告ください。  
*Note: Exact minimum versions are not verified. Please report compatibility issues via Issues.*

### アーキテクチャ / Architecture

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

## 🔬 研究用データ出力 / Research Data Output

本ツールは、元のOseti Pythonライブラリの出力形式を**参考にした**データを出力します。

This tool outputs data in a format **inspired by** the original Oseti Python library.

**⚠️ 重要 / Important:**
- 基本的な形式は類似していますが、完全な互換性は保証されていません
- Basic format is similar, but full compatibility is not guaranteed
- `-NEGATION`サフィックスは本ツール独自の拡張機能です
- The `-NEGATION` suffix is a unique extension of this tool
- 研究で使用する際は、これらの違いを論文に明記してください
- When using in research, please specify these differences in your paper

### 出力形式 / Output Format

#### 1. `analyzer.analyze()` 形式

文ごとの感情スコア配列 / Array of sentiment scores per sentence:

```python
[0.8333333333, -0.7500000000, 0.1666666667]
```

#### 2. `analyzer.count_polarity()` 形式

文ごとのポジティブ/ネガティブ単語数 / Count of positive/negative words per sentence:

```json
[
  {"positive": 3, "negative": 0},
  {"positive": 0, "negative": 3},
  {"positive": 1, "negative": 2}
]
```

#### 3. `analyzer.analyze_detail()` 形式

検出された感情語の詳細 / Detailed emotion words detected:

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

**注 / Note**: 
- `-NEGATION`サフィックスは後方否定・並列否定検出時に付与される本ツール独自の表記です
- The `-NEGATION` suffix is a unique notation of this tool, added when backward/parallel negation is detected
- 元のOseti Pythonライブラリでは異なる表記方法を使用している可能性があります
- The original Oseti Python library may use different notation methods

---

## 🛠️ 技術スタック / Tech Stack

- **Frontend**: Pure HTML/CSS/JavaScript (No framework required)
  - `index.html` — UI層 / UI layer
  - `analyzer.js` — 分析エンジン（UI非依存・テスト可能）/ Analysis engine (UI-independent, testable)
- **Morphological Analyzer**: Kuromoji.js (IPAdic dictionary)
- **Dictionary**: Japanese Sentiment Polarity Dictionary (Tohoku University)
- **License**: MIT License (tool), Tohoku University License (dictionary)

---

## 🧪 テスト / Tests

分析エンジン（`analyzer.js`）には自動テストがあります。Node.js 18以上で実行できます：

The analysis engine (`analyzer.js`) has automated tests. Requires Node.js 18+:

```bash
# 単体テスト（依存パッケージ不要）/ Unit tests (no dependencies required)
node --test tests/analyzer.test.js

# 統合テスト込み（実際のKuromoji形態素解析を使用）
# Including integration tests (uses the real Kuromoji morphological analyzer)
npm run test:integration
```

テストは否定処理（oseti互換モード・拡張モード）、複合語マッチング、文分割、ハイライトHTML生成（エスケープ・重複語の回帰テスト）などを検証します。GitHub ActionsでもPush/PRごとに自動実行されます。

Tests cover negation handling (oseti-compatible and extended modes), compound word matching, sentence splitting, and highlight HTML generation (escaping and repeated-word regression tests). They also run automatically on every push/PR via GitHub Actions.

---

## 📖 引用・クレジット / Citations & Credits

### このツールの引用 / Citing This Tool

研究でこのツールを使用される場合は、以下を引用してください：

When using this tool in research, please cite:

```bibtex
@software{sawada2025oseti,
  author = {Sawada, Nozomi},
  title = {Oseti-based Japanese Sentiment Analysis Tool},
  year = {2025},
  url = {https://github.com/nozomi-sawada/oseti-sentiment-analyzer},
  note = {Version 1.0}
}
```

**注**: 将来、正式版リリース時にDOIを取得する予定です。

### 辞書の引用（必須）/ Dictionary Citations (Required)

本ツールを使用する場合、以下の文献も**必ず**引用してください：

When using this tool, you **must** also cite the following papers:

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

### 論文での記載例 / Citation Examples in Papers

**日本語:**
> 感情分析には、Sawada (2025) が開発したOseti準拠日本語感情分析ツールを使用し、東北大学の日本語評価極性辞書 (小林ら, 2005; 東山ら, 2008) およびKuromoji形態素解析器を用いた。後方否定・並列否定検出の拡張機能を有効化して分析を行った。

**English:**
> For sentiment analysis, we used the Oseti-based Japanese Sentiment Analysis Tool (Sawada, 2025), employing the Japanese Sentiment Polarity Dictionary from Tohoku University (Kobayashi et al., 2005; Higashiyama et al., 2008) and the Kuromoji morphological analyzer. The extended features for backward and parallel negation detection were enabled.

### 関連プロジェクトのクレジット / Related Projects Credits

#### 辞書 / Dictionary
- **日本語評価極性辞書** / Japanese Sentiment Polarity Dictionary
- 東北大学 乾・岡崎研究室 / Tohoku University Inui-Okazaki Lab
- [公式サイト / Official Site](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

#### 形態素解析 / Morphological Analysis
- **Kuromoji.js** (Apache License 2.0)
- [GitHub Repository](https://github.com/takuyaa/kuromoji.js)

#### アルゴリズム / Algorithm
- **Oseti** by Yukino Ikegami
- [GitHub Repository](https://github.com/ikegami-yukino/oseti)
- 本ツールはOsetiの考え方を参考にした独立実装です
- This tool is an independent implementation inspired by Oseti

---

## 📜 ライセンス / License

MIT License - 詳細は [LICENSE](LICENSE) を参照してください / See [LICENSE](LICENSE) for details

**⚠️ 重要 / Important:** 
- 本ツール自体はMITライセンスです / This tool itself is under MIT License
- 辞書ファイルは東北大学のライセンスに従います / Dictionary files are subject to Tohoku University's license
- 商用利用の場合は、必ず東北大学の利用規約を確認してください
- For commercial use, please check Tohoku University's terms of use

---

## 🔗 関連プロジェクト / Related Projects

- [Oseti (Original Python Library)](https://github.com/ikegami-yukino/oseti) - by Yukino Ikegami
- [Kuromoji.js](https://github.com/takuyaa/kuromoji.js) - Japanese Morphological Analyzer
- [日本語評価極性辞書](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html) - Tohoku University

---

## 📋 報告・貢献 / Issues & Contributions

### バグ報告・機能リクエスト / Bug Reports & Feature Requests

技術的な問題や改善提案は、GitHubのIssuesをご利用ください：

For technical issues or improvement suggestions, please use GitHub Issues:

- 🐛 **バグ報告 / Bug Reports**: [Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)
- 💡 **機能リクエスト / Feature Requests**: [Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)

### 貢献方法 / How to Contribute

Pull Requestを歓迎します / Pull Requests are welcome:

1. このリポジトリをFork / Fork this repository
2. 機能ブランチを作成 / Create a feature branch
   ```bash
   git checkout -b feature/improvement
   ```
3. 変更をコミット / Commit your changes
   ```bash
   git commit -m 'Add improvement'
   ```
4. ブランチにPush / Push to the branch
   ```bash
   git push origin feature/improvement
   ```
5. Pull Requestを作成 / Create a Pull Request

**⚠️ 注意 / Note**: このプロジェクトは研究目的で開発されており、個別のサポート対応は行っておりません。技術的な質問はIssuesで公開質問としてお願いします。

This project is developed for research purposes, and individual support is not provided. Please post technical questions as public issues.

---

## 📊 開発状況 / Development Status

このプロジェクトは**研究目的**で開発されました。

This project was developed for **research purposes**.

### 受け付けているもの / Accepting

- ✅ バグ報告 / Bug reports (via Issues)
- ✅ Pull Request（品質向上・バグ修正）/ Pull Requests (quality improvements, bug fixes)
- ⚠️ 機能リクエスト / Feature requests (implementation not guaranteed)

### 受け付けていないもの / Not Accepting

- ❌ 個別の技術サポート / Individual technical support
- ❌ カスタマイズ依頼 / Customization requests

---

## 📝 更新履歴 / Changelog

### Version 1.1 (2026)

**バグ修正 / Bug Fixes:**
- 否定検出トグルOFF時に否定処理が一切行われなかった問題を修正。OFF時は元のOsetiと同じ「否定語が直前の感情語1語のみを反転する」互換モードで動作するようになりました / Fixed: turning OFF the extended negation detection disabled ALL negation handling; OFF now runs an oseti-compatible mode
- 同じ感情語が複数回出現するとハイライト表示のHTMLが壊れる問題を修正（トークン位置ベースの生成に変更）/ Fixed broken highlight HTML when the same word appears multiple times (now position-based rendering)
- Kuromoji（CDN）の読み込みに失敗するとツール全体が操作不能になる問題を修正。失敗時は簡易トークナイザーで動作を継続します / Fixed: the entire tool became unresponsive when the Kuromoji CDN failed to load; it now falls back to the simple tokenizer
- 3語以上の複合語（例:「さじ を 投げる」約1,000件）が辞書照合されなかった問題を修正 / Fixed: compound words of 3+ tokens (~1,000 entries) were never matched
- 入力テキスト・辞書語をHTMLエスケープするよう修正（XSS対策）/ Added HTML escaping for input text and dictionary words (XSS protection)
- 否定語「でき+ない」が検出語リストに二重表示される問題を修正 / Fixed duplicate display of "でき+ない" negation
- 未知語（Kuromojiのbasic_formが「*」）の照合を修正 / Fixed matching for unknown words (basic_form "*")

**変更 / Changes:**
- 全体スコアを「文ごとのスコアの平均」に統一（本家Osetiの `analyze()` の平均と一致）/ Overall score is now the mean of sentence scores (consistent with averaging the original Oseti's `analyze()` output)
- 分析エンジンを `analyzer.js` に分離し、自動テスト（単体・統合）とCIを追加 / Extracted the analysis engine into `analyzer.js` with automated tests and CI
- 辞書ロード時に、スコアが矛盾する重複語を警告表示 / Dictionary loading now warns about duplicate words with conflicting scores
- 変換スクリプトが重複・矛盾エントリを検出して報告するように / The conversion script now detects and reports duplicate/conflicting entries
- 改行を文境界として扱うように / Newlines are now treated as sentence boundaries

### Version 1.0 (2025)
- 初回リリース / Initial release
- 後方否定検出機能 / Backward negation detection
- 並列否定検出機能 / Parallel negation detection
- 文ごとの分析機能 / Sentence-by-sentence analysis
- Kuromoji形態素解析器の統合 / Kuromoji morphological analyzer integration
- 研究用データ出力（Pythonライブラリ互換形式）/ Research-ready data output (Python library compatible format)
- サンプル辞書（41語）の提供 / Sample dictionary (41 words) provided
- 完全辞書（18,541語）の同梱 / Complete dictionary (18,541 words) included

---

## 🔮 今後の展望 / Future Work

以下の機能は技術的に実装可能で、将来追加される可能性があります：

The following features are technically feasible and may be added in the future:

- [ ] **バッチ処理機能** / Batch processing (multiple texts at once)
- [ ] **辞書のエクスポート** / Dictionary export functionality
- [ ] **CSV/Excel一括分析** / Bulk analysis from CSV/Excel files
- [ ] **可視化グラフ** / Sentiment score visualization charts



**© 2025 Nozomi Sawada**

**Developed for academic research purposes.**