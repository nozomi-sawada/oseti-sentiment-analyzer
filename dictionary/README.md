# 日本語感情極性辞書 変換ツール / Dictionary Converter

このディレクトリには、東北大学の日本語評価極性辞書をOseti形式に変換するためのスクリプトが含まれています。

This directory contains scripts to convert the Tohoku University Japanese Sentiment Polarity Dictionary into Oseti format.

---

## 📋 必要なファイル / Required Files

変換には以下のファイルが必要です（東北大学から入手）:

You need the following files from Tohoku University:

1. **`pn.csv.m3.120408.trim`** - 名詞編（約13,000語） / Noun dictionary (~13,000 words)
2. **`wago.121808.pn`** - 用言編（約5,000語） / Predicate dictionary (~5,000 words)

### ダウンロード先 / Download

🔗 [日本語評価極性辞書 / Japanese Sentiment Polarity Dictionary](http://www.cl.ecei.tohoku.ac.jp/Open_Resources-Japanese_Sentiment_Polarity_Dictionary.html)

---

## 🚀 使用方法 / Usage

### 方法1: Pythonスクリプト / Method 1: Python Script

```bash
# 1. このディレクトリに移動 / Navigate to this directory
cd dictionary/

# 2. 辞書ファイルを配置 / Place dictionary files
# - pn.csv.m3.120408.trim
# - wago.121808.pn

# 3. 変換実行 / Run conversion
python convert_dictionary.py

# 4. 生成されたファイル / Generated file
# japanese_sentiment_dictionary.txt
```

### 方法2: Jupyter Notebook / Method 2: Jupyter Notebook

```bash
# 1. このディレクトリに移動 / Navigate to this directory
cd dictionary/

# 2. 辞書ファイルを配置 / Place dictionary files
# - pn.csv.m3.120408.trim
# - wago.121808.pn

# 3. Jupyter Notebookを起動 / Launch Jupyter Notebook
jupyter notebook convert_dictionary.ipynb

# 4. セルを順番に実行 / Execute cells in order

# 5. 生成されたファイル / Generated file
# japanese_sentiment_dictionary.txt
```

---

## 📊 変換結果 / Conversion Results

変換が成功すると以下のような統計が表示されます:

Upon successful conversion, you will see statistics like:

```
==================================================
🔄 日本語感情分析辞書の変換を開始します
==================================================

【1】名詞編を処理中...
✅ 名詞編: 13,264語を処理
   - ポジティブ: 3,352語
   - ネガティブ: 4,958語
   - 中立: 4,954語

【2】用言編を処理中...
✅ 用言編: 5,277語を処理
   - ポジティブ: 2,106語
   - ネガティブ: 3,171語

【3】辞書ファイルを保存中...
✅ 保存完了: japanese_sentiment_dictionary.txt

==================================================
🎉 変換完了！
==================================================
総単語数: 18,541語
  - 名詞編: 13,264語
  - 用言編: 5,277語
出力ファイル: japanese_sentiment_dictionary.txt
==================================================
```

---

## 📝 出力形式 / Output Format

生成される `japanese_sentiment_dictionary.txt` の形式:

The generated `japanese_sentiment_dictionary.txt` format:

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

### スコアの意味 / Score Meanings

- **1.0** = ポジティブ / Positive (p / ポジ)
- **-1.0** = ネガティブ / Negative (n / ネガ)
- **0.0** = 中立 / Neutral (e / ニュートラル)

---

## 🔧 トラブルシューティング / Troubleshooting

### エラー: ファイルが見つかりません

```
❌ エラー: pn.csv.m3.120408.trim が見つかりません
```

**解決方法 / Solution:**
1. `pn.csv.m3.120408.trim` と `wago.121808.pn` が `dictionary/` フォルダにあることを確認
2. ファイル名が正確に一致していることを確認（大文字小文字含む）

### エラー: エンコーディングエラー

```
UnicodeDecodeError: ...
```

**解決方法 / Solution:**
- 元のファイルがUTF-8でエンコードされていることを確認
- 必要に応じて、テキストエディタでUTF-8に変換

### 空のファイルが生成される

**確認事項 / Check:**
1. 元のファイルに正しいデータが含まれているか
2. ファイル形式がタブ区切りになっているか

---

## 📖 元の辞書について / About Original Dictionary

### 引用 / Citation

東山昌彦, 乾健太郎, 松本裕治.  
述語の選択選好性に着目した名詞評価極性の獲得.  
言語処理学会第14回年次大会論文集, pp.584-587, 2008.

Higashiyama, M., Inui, K., Matsumoto, Y.  
Learning Sentiment of Nouns from Selectional Preferences of Verbs and Adjectives.  
Proceedings of the 14th Annual Meeting of the Association for Natural Language Processing, pp.584-587, 2008.

### ライセンス / License

元の辞書のライセンスについては、東北大学の公式サイトを参照してください。

Please refer to Tohoku University's official website for the original dictionary license.

---

## 💡 ヒント / Tips

### ファイルの確認方法 / How to Check Files

```bash
# ファイルが存在するか確認 / Check if files exist
ls -la pn.csv.m3.120408.trim wago.121808.pn

# ファイルの最初の数行を確認 / View first few lines
head -5 pn.csv.m3.120408.trim
head -5 wago.121808.pn
```

### 生成された辞書の確認 / Check Generated Dictionary

```bash
# 総行数を確認 / Count total lines
wc -l japanese_sentiment_dictionary.txt

# 最初の10行を表示 / Display first 10 lines
head -10 japanese_sentiment_dictionary.txt

# ポジティブな単語の数 / Count positive words
grep "1.0$" japanese_sentiment_dictionary.txt | wc -l

# ネガティブな単語の数 / Count negative words
grep "\-1.0$" japanese_sentiment_dictionary.txt | wc -l
```

---

## 📧 問い合わせ / Contact

変換スクリプトに問題がある場合は、GitHubのIssuesで報告してください。

If you encounter issues with the conversion scripts, please report them via GitHub Issues.

🔗 [GitHub Issues](https://github.com/nozomi-sawada/oseti-sentiment-analyzer/issues)
