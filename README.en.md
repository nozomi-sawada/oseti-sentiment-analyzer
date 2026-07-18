# Oseti-based Japanese Sentiment Analysis Tool

[日本語](README.md) | **English**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/nozomi-sawada/oseti-sentiment-analyzer)](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/releases)

A web-based sentiment analysis tool for Japanese text that analyzes sentiment polarity (positive/negative) using the Japanese Sentiment Polarity Dictionary from Tohoku University.

---

## About This Project

This is an **independent web-based implementation** inspired by the [Oseti library](https://github.com/ikegami-yukino/oseti) by Yukino Ikegami. While the original Oseti is a Python library, this tool runs in web browsers and includes extended features for backward and parallel negation detection.

---

## Features

- **Browser-based**: Server-free, runs entirely in the browser
- **Quick start**: Try it right away with a sample dictionary (41 words)
- **Morphological analysis**: Word segmentation using the Kuromoji morphological analyzer (with the IPAdic dictionary)
- **Extended features**: Backward & parallel negation detection
- **Sentence-by-sentence analysis**: Track sentiment changes across sentences
- **Visual results**: Easy-to-read highlighted words
- **Research-ready output**: Results in a format compatible with the Python library
- **Privacy**: All processing is done locally

---

## Demo

**Online demo**: https://nozomi-sawada.github.io/oseti-sentiment-analyzer/

**Note**: On first use, loading the morphological analysis dictionary (~18MB) may take a few minutes. Subsequent launches start in seconds thanks to browser caching. See [Notes](#notes) for details.

---

## Quick Start

### 1. Try It Now

**Online demo:**

Just open https://nozomi-sawada.github.io/oseti-sentiment-analyzer/ in your browser. No installation needed.

**To run locally:**

1. **Download the repository**

   **Method A: Git clone**
```bash
   git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
   cd oseti-sentiment-analyzer
```

   **Method B: Download ZIP**
   - On the repository page, click "**Code**" → "**Download ZIP**"
   - Extract the ZIP file

2. **Open in a browser**
   - Double-click `index.html`, or drag & drop it into your browser

3. **Try the sample dictionary**
   - Click the "✨ Try with Sample Dictionary" button
   - Analyze the sample texts

**Note**: The sample dictionary contains only 41 words and is for demonstration. For real analysis, use the full dictionary (~18,000 words).

### 2. Use the Full Version

The **complete Japanese Sentiment Polarity Dictionary (~18,000 words)** is bundled with the tool.

Just click the "**📖 Load the Full Dictionary**" button at the top of the tool (when using the online demo or a local server).

If you opened `index.html` directly, upload `dictionaries/japanese_sentiment_dictionary.txt` from the repository via the "From File" tab.

**File location:**
```
oseti-sentiment-analyzer/
└── dictionaries/
    └── japanese_sentiment_dictionary.txt  ← use this file
```

---
## Notes

### About the First Load

The Kuromoji dictionary for morphological analysis (~18MB, bundled in this repository) is loaded on first use, which may take a few minutes depending on your connection. Subsequent launches start in seconds thanks to browser caching.

If loading fails, the tool keeps working with a simple tokenizer at reduced accuracy. In that case, try reloading the page.

### Offline Use

If you download the whole repository, the tool works fully offline via a local server:

```bash
git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
cd oseti-sentiment-analyzer
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

**Note**: You can also open `index.html` directly by double-clicking, but due to browser security restrictions the bundled dictionary cannot be loaded that way; the dictionary is then fetched from a CDN (internet connection required).

---
## About Dictionary Files

### Dictionary File Availability

The **complete Japanese Sentiment Polarity Dictionary (~18,000 words) is included in this repository.**
You can start using it immediately.

#### Provided Files

```
oseti-sentiment-analyzer/
├── dictionaries/
│   └── japanese_sentiment_dictionary.txt  ← full dictionary (18,528 words)
│
├── sample/
│   └── sample_dictionary.txt              ← sample dictionary (41 words)
│
└── dictionary/                             ← conversion scripts
    ├── convert_dictionary.py
    └── convert_dictionary.ipynb
```

**Dictionary file to use:**
- **`dictionaries/japanese_sentiment_dictionary.txt`** - full dictionary (nouns + predicates)
  - 18,528 words (deduplicated)
  - Ready to use

#### Dictionary Credits

This dictionary is a text-format conversion of the "Japanese Sentiment Polarity Dictionary" by Tohoku University's Inui-Okazaki Laboratory.

**Source:**
- https://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html

**Author:**
- Inui-Okazaki Laboratory, Tohoku University

**References:** For BibTeX entries, see the "[Citations & Credits](#citations--credits)" section below.

**On conflicting words:** For the three words whose scores conflict after merging the noun and predicate editions (賛成, 規律, 買い得です), we do not pick one value but **present both**. Analysis results involving these words are shown as a lower–upper range, and both source scores are listed in the dictionary and detected-word lists. See [dictionaries/CORRECTIONS.md](dictionaries/CORRECTIONS.md).

#### License

Distributed under the original dictionary's license terms with proper attribution.

- ✅ Free to use
- ✅ Commercial use allowed (with attribution)
- ✅ Recommended for research and education

---

### Dictionary Statistics

Full dictionary breakdown (18,528 words):

| Category | Words | Ratio |
|---------|------|------|
| Positive | 5,448 | 29.4% |
| Negative | 8,125 | 43.9% |
| Neutral | 4,955 | 26.8% |

---

### Dictionary Format

```
word[TAB]score
```

Example:
```
楽しい	1.0
悲しい	-1.0
嬉しい	1.0
辛い	-1.0
普通	0.0
```

---

### Optional: Convert the Dictionary Yourself

If you want to use the latest version or verify the conversion process, you can convert from the original files yourself.

#### Step 1: Download the Original Dictionary

Download the following files from Tohoku University:

[Japanese Sentiment Polarity Dictionary](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

Required files:
- `pn.csv.m3.120408.trim` (nouns, ~13,000 words)
- `wago.121808.pn` (predicates, ~5,000 words)

#### Step 2: Convert the Dictionary

Use the conversion scripts in the `dictionary/` folder of this repository.

**Method A: Python script**

```bash
# Navigate to the dictionary/ folder
cd dictionary/

# Place the downloaded files here
# - pn.csv.m3.120408.trim
# - wago.121808.pn

# Run the conversion
python convert_dictionary.py

# This will generate japanese_sentiment_dictionary.txt
```

**Method B: Jupyter Notebook**

```bash
cd dictionary/
jupyter notebook convert_dictionary.ipynb
# Execute the cells
```

**Method C: Manual conversion**

See [dictionary/README.md](dictionary/README.md) for details.

---

## Local Usage

### Option 1: Direct Execution

```bash
git clone https://github.com/nozomi-sawada/oseti-sentiment-analyzer.git
cd oseti-sentiment-analyzer
# Open index.html in your browser
```

This method requires an internet connection to load the dictionary (see [Notes](#notes)).

### Option 2: Local Server (Fully Offline)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Open http://localhost:8000 in your browser
```

---

## Usage Examples

### Quick Test with the Sample Dictionary

```
Input: "今日のイベントは最高だった。料理も音楽も素晴らしかった!"
Result: score +0.833 (strongly positive)
```

### Advanced Analysis with the Full Dictionary

```
Input: "このレストランは雰囲気も料理も良くない。サービスも期待できない。"
Result: score -0.500 (strongly negative)

Sentence 1: 「良い ない」matches directly as a pre-negated compound entry (-1.0).
            Combined with 「雰囲気」(+1.0) and 「料理」(0.0), the sentence scores 0.000
Sentence 2: backward negation flips 「サービス」 and 「期待」, so the sentence scores -1.000
```

**Note**: The sample and full dictionaries contain different words and scores, so the same text can score differently (this text scores -0.583 with the sample dictionary).

### Sentence-by-Sentence Analysis Example (using the sample dictionary)

```
Input: "映画は面白かった。でも音楽も演技も良くなかった。"

Sentence 1: "映画は面白かった。"
  → score: +1.0 (positive)

Sentence 2: "でも音楽も演技も良くなかった。"
  → score: -0.667 (negative)
  → parallel negation:「音楽も演技も」+ backward negation「良くない」

Overall: score +0.167 (weakly positive)
```

---

## About Extended Features

This tool implements the following original features in addition to the original Oseti library:

### Extended Negation Detection

The original Oseti flips only the **single emotion word immediately preceding** a negation word (ない, ず, ぬ, etc.) — "楽しくない" is detected by the original Oseti as well. The extended features of this tool additionally detect negation across particles and negation affecting multiple words. When the extended features are turned OFF, the tool runs in a compatibility mode that mirrors the original Oseti's behavior.

**Examples handled by the extended features:**
- `お金がない` (no money)
- `希望はない` (no hope)
- `期待できない` (cannot expect)
- `満足できない` (cannot be satisfied)

### Parallel Negation Detection

Supports negation patterns with multiple emotion words connected by parallel particles.

**Examples:**
- `お金も希望もない` (no money or hope)
- `雰囲気も料理も良くない` (neither the atmosphere nor the food is good)
- `サービスも期待できない` (cannot expect the service either)

### Use in Research

**Important**: When using this tool in research, please specify in your paper that these extended features (backward & parallel negation detection) were used.

---

## Technical Specifications

### System Requirements

- ✅ Modern browser (Chrome, Firefox, Safari, Edge)
- ✅ JavaScript enabled
- An internet connection is needed only for the online demo or when opening `index.html` directly (by double-clicking); not needed via a local server

### Dependencies

- **Kuromoji.js** v0.1.2 (Apache License 2.0) - morphological analysis
  - Bundled in the repository (`vendor/kuromoji/`, including the IPAdic dictionary)
  - Falls back to the CDN (jsdelivr) if the bundled files cannot be loaded

### Browser Compatibility

Tested on modern browsers (2020+):

- ✅ Chrome/Edge (Chromium-based)
- ✅ Firefox
- ✅ Safari

**Required features:**
- ES6 JavaScript support
- FileReader API
- Clipboard API (for the copy function)

**Note**: Exact minimum versions are not verified. Please report compatibility issues via Issues.

### Architecture

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

## Research Data Output

This tool outputs data in a format **inspired by** the original Oseti Python library.

**Note:**
- The basic format is similar, but full compatibility is not guaranteed
- The `-NEGATION` suffix is an extension unique to this tool
- When using in research, please specify these differences in your paper

### Output Format

#### 1. `analyzer.analyze()` format

Array of sentiment scores per sentence:

```python
[0.8333333333, -0.7500000000, 0.1666666667]
```

#### 2. `analyzer.count_polarity()` format

Count of positive/negative words per sentence:

```json
[
  {"positive": 3, "negative": 0},
  {"positive": 0, "negative": 3},
  {"positive": 1, "negative": 2}
]
```

#### 3. `analyzer.analyze_detail()` format

Details of the detected emotion words:

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

**Note**:
- The `-NEGATION` suffix is a notation unique to this tool, added when backward/parallel negation is detected
- The original Oseti Python library may use different notation

---

## Tech Stack

- **Frontend**: Pure HTML/CSS/JavaScript (no framework required)
  - `index.html` — UI layer
  - `analyzer.js` — analysis engine (UI-independent, testable)
- **Morphological analyzer**: Kuromoji.js (IPAdic dictionary)
- **Dictionary**: Japanese Sentiment Polarity Dictionary (Tohoku University)
- **License**: MIT License (tool), Tohoku University license (dictionary)

---

## Tests

The analysis engine (`analyzer.js`) has automated tests. Requires Node.js 18+:

```bash
# Unit tests (no dependencies required)
node --test tests/analyzer.test.js

# Including integration tests (uses the real Kuromoji morphological analyzer)
npm run test:integration
```

Tests cover negation handling (oseti-compatible and extended modes), compound word matching, sentence splitting, and highlight HTML generation (escaping and repeated-word regression tests). They also run automatically on every push/PR via GitHub Actions.

---

## Citations & Credits

### Citing This Tool

When using this tool in research, please cite:

```bibtex
@software{sawada2025oseti,
  author = {Sawada, Nozomi},
  title = {Oseti-based Japanese Sentiment Analysis Tool},
  year = {2025},
  url = {https://github.com/nozomi-sawada/oseti-sentiment-analyzer},
  note = {Version 1.1}
}
```

**Note**: A DOI is planned for a future official release.

### Dictionary Citations (Required)

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

### Citation Example in Papers

> For sentiment analysis, we used the Oseti-based Japanese Sentiment Analysis Tool (Sawada, 2025), employing the Japanese Sentiment Polarity Dictionary from Tohoku University (Kobayashi et al., 2005; Higashiyama et al., 2008) and the Kuromoji morphological analyzer. The extended features for backward and parallel negation detection were enabled.

### Related Projects Credits

#### Dictionary
- **Japanese Sentiment Polarity Dictionary**
- Inui-Okazaki Laboratory, Tohoku University
- [Official site](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

#### Morphological Analysis
- **Kuromoji.js** (Apache License 2.0)
- [GitHub repository](https://github.com/takuyaa/kuromoji.js)

#### Algorithm
- **Oseti** by Yukino Ikegami
- [GitHub repository](https://github.com/ikegami-yukino/oseti)
- This tool is an independent implementation inspired by Oseti

---

## License

MIT License - see [LICENSE](LICENSE) for details

**Note:**
- The tool itself is under the MIT License
- Dictionary files are subject to Tohoku University's license
- For commercial use, please check Tohoku University's terms of use

---

## Related Projects

- [Oseti (original Python library)](https://github.com/ikegami-yukino/oseti) - by Yukino Ikegami
- [Kuromoji.js](https://github.com/takuyaa/kuromoji.js) - Japanese morphological analyzer
- [Japanese Sentiment Polarity Dictionary](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html) - Tohoku University

---

## Issues & Contributions

### Bug Reports & Feature Requests

For technical issues or improvement suggestions, please use GitHub Issues:

- **Bug reports**: [Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)
- **Feature requests**: [Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)

### How to Contribute

Pull requests are welcome:

1. Fork this repository
2. Create a feature branch
   ```bash
   git checkout -b feature/improvement
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add improvement'
   ```
4. Push to the branch
   ```bash
   git push origin feature/improvement
   ```
5. Create a pull request

**Note**: This project is developed for research purposes, and individual support is not provided. Please post technical questions as public issues.

---

## Development Status

This project was developed for **research purposes**.

### Accepting

- ✅ Bug reports (via Issues)
- ✅ Pull requests (quality improvements, bug fixes)
- ⚠️ Feature requests (implementation not guaranteed)

### Not Accepting

- ❌ Individual technical support
- ❌ Customization requests

---

## Changelog

### Version 1.1 (2026)

**Bug fixes:**
- Fixed: turning OFF the extended negation detection disabled ALL negation handling; OFF now runs an oseti-compatible mode that flips only the single emotion word immediately preceding a negation word
- Fixed broken highlight HTML when the same word appears multiple times (now position-based rendering)
- Fixed: the entire tool became unresponsive when the Kuromoji CDN failed to load; it now falls back to the simple tokenizer
- Fixed: compound words of 3+ tokens (e.g. 「さじ を 投げる」, ~1,000 entries) were never matched
- Added HTML escaping for input text and dictionary words (XSS protection)
- Fixed duplicate display of the 「でき+ない」 negation
- Fixed matching for unknown words (Kuromoji basic_form "*")

**Changes:**
- The research data output now includes the analysis conditions (tool version, negation mode, tokenizer, dictionary size, and analysis timestamp)
- Consolidated 13 duplicate lines in the bundled dictionary (18,541 → 18,528 words); the 3 words with conflicting scores (賛成, 規律, 買い得です) present both values instead of picking one, and analysis results involving them are shown as a range ([dictionaries/CORRECTIONS.md](dictionaries/CORRECTIONS.md))
- Added a "📖 Load the Full Dictionary" button that loads the bundled full dictionary with one click
- The UI language (Japanese/English) is now switchable; the README is split into Japanese and English versions
- Bundled Kuromoji and the IPAdic dictionary (`vendor/kuromoji/`); the tool no longer depends on an external CDN and works fully offline via a local server, with CDN fallback
- The overall score is now the mean of sentence scores (consistent with averaging the original Oseti's `analyze()` output)
- Extracted the analysis engine into `analyzer.js` with automated tests and CI
- Dictionary loading now warns about duplicate words with conflicting scores
- The conversion script now detects and reports duplicate/conflicting entries
- Newlines are now treated as sentence boundaries

### Version 1.0 (2025)
- Initial release
- Backward negation detection
- Parallel negation detection
- Sentence-by-sentence analysis
- Kuromoji morphological analyzer integration
- Research-ready data output (Python library compatible format)
- Sample dictionary (41 words) provided
- Complete dictionary (18,541 words at the time) included

---

## Future Work

The following features are technically feasible and may be added in the future:

- [ ] **Batch processing** (multiple texts at once)
- [ ] **Dictionary export**
- [ ] **Bulk analysis from CSV/Excel files**
- [ ] **Sentiment score visualization charts**



**© 2025 Nozomi Sawada**

**Developed for academic research purposes.**
