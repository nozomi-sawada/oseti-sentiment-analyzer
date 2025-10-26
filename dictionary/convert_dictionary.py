#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
東北大学の日本語評価極性辞書をOseti形式に変換するスクリプト

入力ファイル:
  - pn.csv.m3.120408.trim (名詞編)
  - wago.121808.pn (用言編)

出力ファイル:
  - japanese_sentiment_dictionary.txt

使用方法:
  python convert_dictionary.py
"""

import os

def convert_dictionaries():
    """
    東北大学の日本語評価極性辞書をOseti形式に変換する
    
    処理の流れ:
      1. 名詞編(pn.csv.m3.120408.trim)を読み込み
      2. 用言編(wago.121808.pn)を読み込み
      3. 両方を統合してOseti形式で保存
    
    戻り値:
      bool: 成功した場合True、失敗した場合False
    """
    print("=" * 50)
    print("🔄 日本語感情分析辞書の変換を開始します")
    print("=" * 50)
    
    # 変換結果を格納するリスト
    output_lines = []
    
    # ========================================
    # 【1】名詞編の処理
    # ========================================
    print("\n【1】名詞編を処理中...")
    noun_file = 'pn.csv.m3.120408.trim'
    
    # ファイルの存在確認
    if not os.path.exists(noun_file):
        print(f"❌ エラー: {noun_file} が見つかりません")
        print(f"   ファイルをこのスクリプトと同じフォルダに配置してください")
        return False
    
    try:
        # UTF-8エンコーディングでファイルを開く
        with open(noun_file, 'r', encoding='utf-8') as f:
            noun_lines = f.readlines()
        
        # カウンター変数の初期化
        noun_count = 0        # 処理した総単語数
        noun_positive = 0     # ポジティブな単語数
        noun_negative = 0     # ネガティブな単語数
        noun_neutral = 0      # 中立的な単語数
        
        # 名詞編の各行を処理
        for line in noun_lines:
            line = line.strip()  # 前後の空白を削除
            if not line:         # 空行はスキップ
                continue
            
            # タブ区切りで分割
            # フォーマット: 単語[TAB]極性値
            # 例: "愛	p" → ['愛', 'p']
            parts = line.split('\t')
            if len(parts) < 2:   # データが不完全な行はスキップ
                continue
            
            # 単語と極性値を取得（クォートも削除）
            word = parts[0].strip().strip('"').strip("'")
            polarity = parts[1].strip()
            
            # 空の単語はスキップ
            if not word:
                continue
            
            # 極性値を数値スコアに変換
            # p (positive) → 1.0
            # n (negative) → -1.0
            # e (neutral/equilibrium) → 0.0
            if polarity == 'p':
                score = '1.0'
                noun_positive += 1
            elif polarity == 'n':
                score = '-1.0'
                noun_negative += 1
            elif polarity == 'e':
                score = '0.0'
                noun_neutral += 1
            else:
                continue  # 不明な極性値はスキップ
            
            # Oseti形式で出力リストに追加
            # フォーマット: 単語[TAB]スコア
            output_lines.append(f"{word}\t{score}\n")
            noun_count += 1
        
        # 名詞編の処理結果を表示
        print(f"✅ 名詞編: {noun_count}語を処理")
        print(f"   - ポジティブ: {noun_positive}語")
        print(f"   - ネガティブ: {noun_negative}語")
        print(f"   - 中立: {noun_neutral}語")
    
    except Exception as e:
        print(f"❌ エラー: 名詞編の処理中にエラーが発生 - {e}")
        return False
    
    # ========================================
    # 【2】用言編の処理
    # ========================================
    print("\n【2】用言編を処理中...")
    wago_file = 'wago.121808.pn'
    
    # ファイルの存在確認
    if not os.path.exists(wago_file):
        print(f"❌ エラー: {wago_file} が見つかりません")
        print(f"   ファイルをこのスクリプトと同じフォルダに配置してください")
        return False
    
    try:
        # UTF-8エンコーディングでファイルを開く
        with open(wago_file, 'r', encoding='utf-8') as f:
            wago_lines = f.readlines()
        
        # カウンター変数の初期化
        wago_count = 0        # 処理した総単語数
        wago_positive = 0     # ポジティブな単語数
        wago_negative = 0     # ネガティブな単語数
        
        # 用言編の各行を処理
        for line in wago_lines:
            line = line.strip()  # 前後の空白を削除
            if not line:         # 空行はスキップ
                continue
            
            # タブ区切りで分割
            # フォーマット: ラベル[TAB]単語
            # 例: "ポジ(感動)	嬉しい" → ['ポジ(感動)', '嬉しい']
            parts = line.split('\t')
            if len(parts) < 2:   # データが不完全な行はスキップ
                continue
            
            # ラベルと単語を取得
            label = parts[0].strip()   # 極性情報を含むラベル
            word = parts[1].strip()    # 単語本体
            
            # 空の単語はスキップ
            if not word:
                continue
            
            # ラベルに含まれる極性を判定してスコアに変換
            # 'ポジ' が含まれる → 1.0
            # 'ネガ' が含まれる → -1.0
            # その他 → 0.0
            if 'ポジ' in label:
                score = '1.0'
                wago_positive += 1
            elif 'ネガ' in label:
                score = '-1.0'
                wago_negative += 1
            else:
                score = '0.0'
            
            # Oseti形式で出力リストに追加
            output_lines.append(f"{word}\t{score}\n")
            wago_count += 1
        
        # 用言編の処理結果を表示
        print(f"✅ 用言編: {wago_count}語を処理")
        print(f"   - ポジティブ: {wago_positive}語")
        print(f"   - ネガティブ: {wago_negative}語")
    
    except Exception as e:
        print(f"❌ エラー: 用言編の処理中にエラーが発生 - {e}")
        return False
    
    # ========================================
    # 【3】辞書ファイルの保存
    # ========================================
    print("\n【3】辞書ファイルを保存中...")
    output_file = 'japanese_sentiment_dictionary.txt'
    
    try:
        # UTF-8エンコーディングで出力ファイルに書き込み
        with open(output_file, 'w', encoding='utf-8') as f:
            f.writelines(output_lines)
        
        print(f"✅ 保存完了: {output_file}")
    
    except Exception as e:
        print(f"❌ エラー: ファイルの保存中にエラーが発生 - {e}")
        return False
    
    # ========================================
    # 【4】変換結果のサマリー表示
    # ========================================
    print("\n" + "=" * 50)
    print("🎉 変換完了！")
    print("=" * 50)
    print(f"総単語数: {len(output_lines)}語")
    print(f"  - 名詞編: {noun_count}語")
    print(f"  - 用言編: {wago_count}語")
    print(f"出力ファイル: {output_file}")
    print("=" * 50)
    
    return True

def main():
    """
    メイン関数
    """
    # 辞書変換を実行
    success = convert_dictionaries()
    
    # 結果に応じたメッセージを表示
    if success:
        print("\n✅ すべての処理が正常に完了しました！")
        print("生成されたファイルをOsetiツールで使用できます。")
    else:
        print("\n❌ 処理中にエラーが発生しました。")
        print("ファイルの配置と形式を確認してください。")

if __name__ == "__main__":
    main()
