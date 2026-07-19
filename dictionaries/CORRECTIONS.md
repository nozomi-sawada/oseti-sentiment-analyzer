# 評価が矛盾する語の扱い / Handling of Words with Conflicting Scores

東北大学の日本語評価極性辞書は**名詞編**と**用言編**から構成されており、両者を統合すると同じ語に異なる極性が付く場合があります。同梱辞書を統合したところ、評価が2つに割れる語が3つありました。

**同梱辞書ファイル `japanese_sentiment_dictionary.txt` は、変換された元の辞書をそのまま保持しています（値の変更・削除は一切ありません）。** これら3語は元辞書のとおり2行（両方のスコア）で収録されており、ツールは両方の値を読み取って提示します。

The Japanese Sentiment Polarity Dictionary (Tohoku University) consists of a **noun edition** and a **predicate edition**; merging them can assign conflicting polarities to the same word. Three words ended up with two different scores.

**The bundled `japanese_sentiment_dictionary.txt` preserves the converted source dictionary as-is (no values were changed or removed).** These three words appear on two lines (both scores) exactly as in the source, and the tool reads and presents both values.

## 対象の3語 / The three words

| 単語 / Word | 元辞書のスコア（2行）/ Source scores (two lines) |
|---|---|
| 賛成 | 名詞編 0.0 / 用言編 1.0 (noun ed. 0.0 / predicate ed. 1.0) |
| 規律 | 名詞編に 0.0 と 1.0 (noun ed. 0.0 and 1.0) |
| 買い得 です | 用言編に -1.0 と 1.0 (predicate ed. -1.0 and 1.0) |

## ツールでの挙動 / Behavior in the tool

- ツールは辞書データの**重複行から評価の割れ（両値）を自動検出**します。特定の語をコード側に決め打ちしていません。/ The tool **detects conflicts (both values) automatically from the duplicate lines** in the dictionary data; no specific words are hard-coded.
- **辞書一覧・検出語リスト**: 元辞書の両スコアを併記します（例:「賛成 0.00 / +1.00」）。/ The dictionary list and detected-word list show both source scores.
- **分析結果**: これらの語が分析テキストに含まれる場合、総合スコアと文スコアを**「下限〜上限」の範囲**で表示します（下限=小さい方の値、上限=大きい方の値）。研究用データ出力（`analyzer.analyze()` 形式）も `# lower:` と `# upper:` の2行になります。/ When such words appear in the analyzed text, the overall and per-sentence scores are shown as a **lower–upper range**; the research data output splits `analyzer.analyze()` into `# lower:` and `# upper:` lines.

## 同値の重複10語について / About the 10 identical duplicates

上記3語のほかに、名詞編・用言編で**同じスコアが重複していた語が10語**あります（セーフティー・信用・帳消し・患い・清清・満腹・満足・賛同・過ち・駄目）。これらは値が同じなので分析結果に影響せず、ツールは自動的に1つにまとめます。ファイルには元のまま残しています。

Besides the three words above, **10 words are duplicated with identical scores** (values are the same, so they do not affect analysis; the tool merges them automatically). They remain in the file as in the source.

---

## 論文等での記載例 / How to describe this in a paper

> 同梱辞書は、東北大学の日本語評価極性辞書（名詞編・用言編）を変換・統合したものであり、元の値を変更していない。統合により評価が矛盾する語が3つ（賛成・規律・買い得です）生じたが、いずれか一方に決定せず、元辞書の両スコアを保持・提示した。これらの語を含む分析結果は、下限（小さい方の値）と上限（大きい方の値）の範囲として報告した。

> The bundled dictionary is a conversion/merge of the noun and predicate editions of the Japanese Sentiment Polarity Dictionary (Tohoku University), with no source values changed. Merging produced three words with conflicting scores (賛成, 規律, 買い得です); rather than choosing one value, both source scores are kept and presented, and analysis results involving these words are reported as a range between a lower bound (smaller value) and an upper bound (larger value).
