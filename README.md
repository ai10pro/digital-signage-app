# Digital-Signage-app

**ブラウザで動作するデジタルサイネージアプリ**

## 概要

- 高専祭のデジタルサイネージの初期バージョンとして作成
  - デジタルサイネージの活用で初めて学校に来る人でも場所がわかるのではないかと考えた
- Next.js,supabaseの勉強として
  - 約2年、Reactにてチーム開発を行いその経験を活かして作成
  - Webアプリケーションのバックエンド処理を勉強するため
- ブラウザ動作アプリケーションのためあらゆる端末で表示可能
- 2025年1月24日制作開始

## 使用技術

| 技術        | バージョン |
| ----------- | ---------- |
| Next.js     | 14.2.23    |
| TailwindCSS | 3.4.1      |
| TypeScript  | 5          |
| Prisma      | 6.3.0      |
| Supabase    | N/A        |

## 開発環境

- OS: Windows 11Home 24H2
- IDE: Visual Studio Code
- Node.js: 18.16.0
- npm: 9.6.7
- データベース: Supabase
- その他ツール: Git

## 動作確認機種

- Windows11 Home 24H2
  - Chrome バージョン133.0.6943.127
  - Microsoft Edge バージョン 133.0.3065.69
- iOS 18.3.1(トップページのみ)

## 更新履歴

- 2025/01/24:First commit
- 2025/02/16:サイネージ部分完成
- 2025/02/19:仮デプロイ
- 2025/02/20:各種管理者権限部分の作成
-

## 更新（追加）予定

- 管理者権限のログイン認証
- Player権限の追加
- Supabaseを通してクライアントページリロード

## 各種手順

### インストール（ローカル開発）

※ローカルでの実行ではSupabaseと接続を行うため.envファイルに環境変数を用意する必要がある。

1. リポジトリのクローン・ディレクトリに移動
   ```sh
   git clone "https://github.com/ai10pro/digital-signage-app"
   cd digital-signage-app
   ```
2. 依存関係のインストール
   ```shell
   npm i
   ```
3. アプリの起動(開発)
   ```shell
   npm run dev
   ```
4. （補足）prisma studioの起動
   ```sh
   npx prisma studio
   ```

### Webページへのアクセス（デプロイ済み）

デプロイ済みのサイトは次のURLである。
[digital-signage-app](https://digital-signage-app-demo.vercel.app/)
