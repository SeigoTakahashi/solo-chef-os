# SoloChef OS

一人暮らしの「毎日レシピを考える手間」を極限まで減らし、健康的な自炊生活をサポートする相棒アプリ。

## プロジェクト概要

- **アプリ名**: SoloChef OS
- **コンセプト**: 「毎日続けられるように、手軽に・サクッと・簡単に」
- **目的**:
  - 毎日レシピを考案・決定する思考コスト（脳のメモリ）をゼロにする。
  - 2ステップの簡単操作で健康自炊飯を提案し、自炊の継続・健康増進・食品ロス削減を同時に実現する。
  - アカウント登録不要で、いつでもサクッと使える手軽さを追求。

## 画面遷移フロー

アカウント不要で、わずか2ステップでレシピが完成します。

```text
[画面 0: スタート]
       ⬇️ (はじめる)
[画面 1: 生成モード選択] ⇄ [戻る/次へ]
       ⬇️
[画面 2: 条件設定]     ⇄ [戻る/次へ]
       ⬇️
[画面 3: 生成中 (Loading)]
       ⬇️ (自動遷移)
[画面 4: レシピ結果] ➔ [もう一度つくる (画面0へ)]
```

## 技術スタック

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, TanStack Query, Zod, v0
- **Backend**: Go, Echo (Clean Architecture)
- **AI Integration**: Dify API
- **Infrastructure**: Docker, Docker Compose

## ディレクトリ構成

```text
solo-chef-os/
├── docker-compose.yml
├── backend/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── domain/         # ドメインモデル
│   │   ├── handler/        # リクエストハンドラー (Echo)
│   │   ├── usecase/        # ビジネスロジック
│   │   └── infrastructure/ # 外部API連携 (Dify Gateway)
│   ├── Dockerfile
│   ├── go.mod
│   └── go.sum
└── frontend/
    ├── src/
    │   ├── pages/          # 各ステップの画面コンポーネント (Step_0 ~ Step_4)
    │   ├── hooks/          # TanStack Query カスタムフック
    │   ├── schemas/        # Zod バリデーションスキーマ
    │   ├── components/     # 共通UIパーツ
    │   └── utils/          # APIフェッチ関数
    ├── public/
    │   └── solochefos_logo.svg
    ├── Dockerfile
    ├── package.json
    └── vite.config.ts

```

## Docker起動方法

ルートディレクトリで以下のコマンドを実行するだけで、フロントエンドとバックエンドが一括で立ち上がります。

```bash
docker compose up --build
```

起動後、ブラウザで [http://localhost:5173](http://localhost:5173) にアクセスしてください。

## 環境変数 (.env)

それぞれのディレクトリに `.env` ファイルを作成し、必要な変数を設定してください。

### Frontend (`frontend/.env`)

```env
# ローカル開発時: http://localhost:1323 / 本番環境: デプロイ先のAPI URL
VITE_ECHO_API_SERVER_URL=http://localhost:1323
```

### Backend (`backend/.env`)

```env
# DifyのAPIキー
DIFY_API_KEY=your_dify_api_key_here

# CORS許可対象のフロントエンドURL (ローカル開発時: http://localhost:5173 / 本番環境: デプロイ先のWeb URL)
FRONTEND_URL=http://localhost:5173

# サーバー起動ポート
PORT=1323
```
