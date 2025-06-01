# 概要
GASをClaspに移動する動作テスト

## GASについて
GASは2ファイルで、処理の内容としては、スプレッドシートから値を読み取り、JSON形式の値に変換のうえ、ドライブに値をテキストファイルとして保存するものです。

# clasp導入の流れ
- リポジトリに元のGASをpushしておく
- 当該リポジトリをcloneしてclaspをインストールし設定を行う
- GASをTypeScriptで書き換え、リポジトリにファイルをpushす
- claspでデプロイする


## 参考
https://sqripts.com/2025/03/13/104667/

## トラブルシューティング
- APIの有効化エラー
  - 表示されたLinkからAPIを有効にする。
```
User has not enabled the Apps Script API. Enable it by visiting https://script.google.com/home/usersettings then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```

- このアプリはGoogleで確認されていません
  - 「プログラムが、Google関連のあなたの情報の一部にアクセスしようとしている」場合に表示されます
  　- スクリプトが、SpreadsheetやDocsなどのDriveデータにアクセスする場合
  　- 外部APIを使用して作られたスクリプトの場合
  　- その他Googleと関連付けられているあなたの情報にアクセスしようとする場合
  　- [こちら](https://best-cloud.jp/google-apps-script-authentication/)で対応