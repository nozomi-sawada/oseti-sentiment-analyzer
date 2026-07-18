# 評価が矛盾する語の扱い / Handling of Words with Conflicting Scores

東北大学の日本語評価極性辞書は**名詞編**と**用言編**から構成されており、両者を統合すると同じ語に異なる極性が付く場合があります。同梱辞書を統合したところ、評価が2つに割れる語が3つありました。**これらの語は、どちらか一方に決めつけず、両方の値を提示します。**

The Japanese Sentiment Polarity Dictionary (Tohoku University) consists of a **noun edition** and a **predicate edition**; merging them can assign conflicting polarities to the same word. Three words ended up with two different scores. **For these words we do not pick one value — we present both.**

## 対象の3語 / The three words

| 単語 / Word | 元辞書のスコア / Source scores |
|---|---|
| 賛成 | 名詞編 0.0 / 用言編 1.0 (noun ed. 0.0 / predicate ed. 1.0) |
| 規律 | 名詞編に 0.0 と 1.0 (noun ed. 0.0 and 1.0) |
| 買い得 です | 用言編に -1.0 と 1.0 (predicate ed. -1.0 and 1.0) |

## ツールでの挙動 / Behavior in the tool

- **辞書一覧・検出語リスト**: 元辞書の両スコアを併記します（例:「賛成 0.0 / +1.0」）。/ The dictionary list and detected-word list show both source scores (e.g., "賛成 0.0 / +1.0").
- **分析結果**: これらの語が分析テキストに含まれる場合、総合スコアと文スコアを**「下限〜上限」の範囲**で表示します（下限=小さい方の値を採用、上限=大きい方の値を採用）。研究用データ出力（`analyzer.analyze()` 形式）も `# lower:` と `# upper:` の2行になります。/ When such words appear in the analyzed text, the overall and per-sentence scores are shown as a **lower–upper range** (lower uses the smaller value, upper uses the larger). The research data output also splits into `# lower:` and `# upper:` lines.

## 単一値の辞書ファイルについて / About the single-value dictionary file

`japanese_sentiment_dictionary.txt` は「単語 TAB スコア」の1語1値形式のため、これら3語には**プレースホルダとして中立(0.0)**を格納しています。両方の値はツール（および本ファイル）が保持します。この形式の辞書を外部（Python等）でそのまま使う場合、これら3語は中立として扱われる点にご注意ください。

Because `japanese_sentiment_dictionary.txt` is a one-value-per-word format (word TAB score), these three words store a **neutral (0.0) placeholder**; both values are kept by the tool (and this file). If you use the single-value file directly elsewhere (e.g., in Python), note that these three words will be treated as neutral there.

その他の重複10語はスコアが一致していたため、単純に1エントリへ統合しました（内容の変更はありません）。/ The other 10 duplicate words had identical scores and were simply merged (no change in content).

---

## 論文等での記載例 / How to describe this in a paper

> 同梱辞書は、東北大学の日本語評価極性辞書（名詞編・用言編）を統合したものである。統合時に評価が矛盾していた3語（賛成・規律・買い得です）については、いずれか一方に決定せず、元辞書の両スコアを提示した。これらの語を含む分析結果は、下限（小さい方の値を採用）と上限（大きい方の値を採用）の範囲として報告した。

> The bundled dictionary merges the noun and predicate editions of the Japanese Sentiment Polarity Dictionary (Tohoku University). For the three words with conflicting scores after merging (賛成, 規律, 買い得です), we did not choose a single value but present both source scores; analysis results involving these words are reported as a range between a lower bound (using the smaller value) and an upper bound (using the larger value).
