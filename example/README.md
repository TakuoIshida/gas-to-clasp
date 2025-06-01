# example ディレクトリ概要

このディレクトリは、Google Apps Script（GAS）プロジェクトをTypeScript＋Vite＋claspで管理・開発・デプロイするためのサンプル構成です。

## 主な構成

- **src/**  
  TypeScriptソースコードおよび `appsscript.json` マニフェストファイルを配置
- **dist/**  
  ビルド後のJavaScriptファイルと `appsscript.json` を出力
- **vite.config.ts**  
  Viteのビルド設定ファイル
- **Makefile**  
  claspやビルド、デプロイを簡単に実行するためのコマンド集
- **.clasp.json**  
  claspの設定ファイル（GASプロジェクトIDやルートディレクトリ指定）

## 開発・デプロイ手順

### 1. プロジェクト作成

```sh
make create-project title=プロジェクト名 parentId=親フォルダID
```
- 新規GASプロジェクトを作成します。

### 2. コードのビルド

```sh
npm run build
```
- ViteでTypeScriptコードを `dist/` にビルドします。

### 3. GASへのpush

```sh
make push
```
- ビルド＆`appsscript.json`コピー後、`clasp push`でGASにアップロードします。

### 4. デプロイ

```sh
make deploy
```
- GASプロジェクトをバージョン管理＆デプロイします。

### 5. その他

- `make pull` : GAS側の最新コードをローカルに取得
- `make login` : clasp認証

## 注意点

- `src/appsscript.json` を `dist/` にコピーしてからpushします。
- claspの `rootDir` は `dist` になっています。
- GASのサービス（SpreadsheetApp等）を使う場合は、TypeScriptで型定義（@types/google-apps-script）を導入してください。

---

## 参考

- [Google Apps Script公式ドキュメント](https://developers.google.com/apps-script)
- [clasp公式ドキュメント](https://github.com/google/clasp)
- [Vite公式ドキュメント](https://vitejs.dev/)
