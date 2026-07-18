# 辞書の補正記録 / Dictionary Corrections

東北大学の日本語評価極性辞書は**名詞編**と**用言編**から構成されており、両者を統合すると同じ語に異なる極性が付く場合があります。同梱辞書 `japanese_sentiment_dictionary.txt` では、評価が矛盾していた以下の3語を、語の一般的な極性にもとづいて妥当な値に補正しました。**分析にはこの補正後の値が使われます。** ツールの「辞書一覧」タブでは、これらの語に元辞書の記載（両方のスコア）が併記されます。

The Japanese Sentiment Polarity Dictionary (Tohoku University) consists of a **noun edition** and a **predicate edition**; merging them can assign conflicting polarities to the same word. In the bundled `japanese_sentiment_dictionary.txt`, the following three words with conflicting scores were corrected to reasonable values based on each word's general polarity. **Analysis uses these corrected values.** In the tool's "Dictionary" tab, the original source scores are shown alongside these words.

| 単語 / Word | 元辞書のスコア / Source scores | 補正後 / Corrected | 理由 / Rationale |
|---|---|---|---|
| 賛成 | 名詞編 0.0 / 用言編 1.0 <br>(noun ed. 0.0 / predicate ed. 1.0) | **+1.0** | 「賛成」は肯定的な語 / generally positive |
| 規律 | 名詞編に 0.0 と 1.0 <br>(noun ed. 0.0 and 1.0) | **0.0** | 文脈依存のため中立として扱う / context-dependent, treated as neutral |
| 買い得 です | 用言編に -1.0 と 1.0 <br>(predicate ed. -1.0 and 1.0) | **+1.0** | 「買い得」は肯定的な語（-1.0は誤りと判断） / "bargain" is positive (-1.0 judged erroneous) |

その他の重複10語はスコアが一致していたため、単純に1エントリへ統合しました（内容の変更はありません）。

The other 10 duplicate words had identical scores and were simply merged into one entry (no change in content).

---

## 論文等での記載例 / How to describe this in a paper

> 同梱辞書は、東北大学の日本語評価極性辞書（名詞編・用言編）を統合したものである。統合時に評価が矛盾していた3語（賛成・規律・買い得です）については、元辞書の両スコアを併記した上で、語の一般的な極性にもとづき妥当な値に補正した（本リポジトリの `dictionaries/CORRECTIONS.md` を参照）。

> The bundled dictionary merges the noun and predicate editions of the Japanese Sentiment Polarity Dictionary (Tohoku University). For the three words with conflicting scores after merging (賛成, 規律, 買い得です), both source scores are recorded and the entries were corrected to reasonable values based on each word's general polarity (see `dictionaries/CORRECTIONS.md` in this repository).
