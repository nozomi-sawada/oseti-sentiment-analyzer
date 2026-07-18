# 辞書の矛盾語の扱い / Handling of Conflicting Dictionary Words

東北大学の日本語評価極性辞書は**名詞編**と**用言編**から構成されており、両者を統合すると同じ語に異なる極性が付く場合があります。同梱辞書 `japanese_sentiment_dictionary.txt` では、評価が矛盾していた3語を次の方針で扱いました。**分析にはここで決定した値が使われます。** ツールの「辞書一覧」タブでは、これらの語に元辞書の記載（両方のスコア）が併記されます。

The Japanese Sentiment Polarity Dictionary (Tohoku University) consists of a **noun edition** and a **predicate edition**; merging them can assign conflicting polarities to the same word. In the bundled `japanese_sentiment_dictionary.txt`, the three words with conflicting scores were handled as follows. **Analysis uses the resolved values.** In the tool's "Dictionary" tab, the original source scores are shown alongside these words.

## 方針 / Policy

- **明らかな誤りは訂正する** / Correct clear errors
- **どちらとも判断できない場合は中立(0.0)にする**（片方の極性に決めつけない）/ When neither value can be judged correct, use neutral (0.0) rather than imposing a polarity

## 対象の3語 / The three words

| 単語 / Word | 元辞書のスコア / Source scores | 決定値 / Resolved | 分類・理由 / Category & rationale |
|---|---|---|---|
| 買い得 です | 用言編に -1.0 と 1.0 <br>(predicate ed. -1.0 and 1.0) | **+1.0** | **誤りの訂正**: 「買い得」は明らかに肯定的な語であり、-1.0は誤りと判断 / **Error correction**: "bargain" is clearly positive; -1.0 judged erroneous |
| 賛成 | 名詞編 0.0 / 用言編 1.0 <br>(noun ed. 0.0 / predicate ed. 1.0) | **0.0** | **判断不能→中立**: 0.0と1.0のどちらが妥当か決められないため、極性を付けず中立とする / **Undecidable → neutral**: cannot determine which of 0.0 / 1.0 is correct, so no polarity is imposed |
| 規律 | 名詞編に 0.0 と 1.0 <br>(noun ed. 0.0 and 1.0) | **0.0** | **判断不能→中立**: 同上 / **Undecidable → neutral**: same as above |

その他の重複10語はスコアが一致していたため、単純に1エントリへ統合しました（内容の変更はありません）。

The other 10 duplicate words had identical scores and were simply merged into one entry (no change in content).

---

## 論文等での記載例 / How to describe this in a paper

> 同梱辞書は、東北大学の日本語評価極性辞書（名詞編・用言編）を統合したものである。統合時に評価が矛盾していた3語については、明らかな誤りである1語（買い得です）のみ訂正し、極性を判断できない2語（賛成・規律）は中立（0.0）として扱った。いずれも元辞書の両スコアを併記している（本リポジトリの `dictionaries/CORRECTIONS.md` を参照）。

> The bundled dictionary merges the noun and predicate editions of the Japanese Sentiment Polarity Dictionary (Tohoku University). Of the three words with conflicting scores after merging, only the one clear error (買い得です) was corrected; the two words whose polarity could not be determined (賛成, 規律) were treated as neutral (0.0). Both source scores are recorded for all three (see `dictionaries/CORRECTIONS.md` in this repository).
