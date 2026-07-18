# Works Portal — 作品カタログ & 知識ノート 仕様書 (v1)

## 概要

AIと作ったもの(これから作るものを含む)の一覧カタログと、制作過程で得た知識・ノウハウを蓄積するドキュメントサイトを、自宅サーバー(Raspberry Pi)で公開する。参考サイトは [TNKS1407](https://tnks1407.com/)。外部依存を極力減らし、静的ファイル配信で完結させる。コンテンツの追加は「Claudeにデータファイルを追記させる」運用を前提とし、人間が管理画面を操作する仕組みは作らない。

## 前提(ユーザー側の準備作業)

- 独自ドメインの取得(未取得。Cloudflare Registrar での取得を推奨 — Tunnel と管理が一元化されるため)
- Cloudflare アカウント作成、ドメインの DNS を Cloudflare に置く
- Raspberry Pi (Pi 4 以上推奨、Pi 3 でも可) + Raspberry Pi OS Lite

## システム構成

```
[閲覧者]
   │ https
   ▼
[Cloudflare] ──(Tunnel/暗号化)──▶ [自宅 Raspberry Pi]
  ・DNS                              ├─ cloudflared (常駐)
  ・ワイルドカード                   └─ Caddy (リバースプロキシ + 静的配信)
    *.example.com                         ├─ /srv/portal/   → example.com (カタログ+docs)
                                          └─ /srv/works/xxx → xxx.example.com (Phase 3)
```

- ポート開放は行わない。外部からの入口は Cloudflare Tunnel のみ
- Caddy はホスト名でルーティング。作品を増やすときは Caddyfile に 1 ブロック足すだけ

## コンポーネント仕様

### 1. カタログ (トップページ)

- 単一の `index.html` + `works.json` を JS で読み込んで描画する構成
- `works.json` の 1 エントリ:

```json
{
  "id": "stepper-lab",
  "title": "Stepper Physics Lab",
  "emoji": "🧲",
  "description": "2行程度の説明",
  "category": "engineering",
  "tags": ["JavaScript", "Canvas"],
  "url": "https://stepper.example.com",
  "repo": "https://github.com/xxx/yyy",
  "status": "published | wip | planned",
  "date": "2026-07-18"
}
```

- `status` により表示を分ける: `planned`(これから作るもの)は「構想中」バッジで一覧に出す。これが「これから作成するものの管理」の実体
- カテゴリ別グルーピング、タグ表示、件数表示。検索は v1 では不要
- 新作追加 = Claude が `works.json` に 1 オブジェクト追記するだけ、を必ず満たすこと

### 2. 知識ノート (docs)

- `docs/` 配下に Markdown ファイルを置き、ビルド時に HTML 化する
- 静的サイトジェネレータは軽量なものを選定してよい(未確定事項参照)。ただし「md ファイルを 1 個置く → ビルド → 反映」以上の手順を要求しないこと
- 各記事の frontmatter: `title`, `date`, `tags`, 関連作品の `work_id`(任意)。work_id があればカタログ側の作品カードから記事へリンクする
- 記事追加も Claude 追記運用: 会話で得た知見を Claude が md ファイルとして書き出し、リポジトリに置く流れを想定

### 3. デイリーブログ (自動生成)

- `blog/` 配下に日付名の md (`2026-07-18.md`) を毎日 1 本生成し、docs と同じ仕組みで HTML 化・一覧表示する
- 素材はハイブリッド方式。生成時の優先順位:
  1. `drafts/` フォルダに素材(メモ・チャット断片・リンク)があればそれを記事に仕上げ、使用済み素材は `drafts/used/` へ移動
  2. 素材が無ければ当日の git log・変更差分からノウハウ/進捗記事を書く
  3. どちらも無ければ雑談・ふりかえり記事。毎日必ず 1 本出ることを保証する
- 実行基盤: 最終形は Pi 上の cron + claude CLI ヘッドレス実行(生成→ビルド→デプロイまで一直線)。ただし立ち上げ期は手元 PC で半自動運用し、プロンプトと出力品質が安定してから Pi に移す(Phase 5 参照)
- 生成失敗・品質異常に気づけるよう、実行結果を通知する手段を用意する(手段は未確定事項)

### 4. 作品自動登録スキル (work-publisher)

- Claude (claude.ai / Claude Code) 用のユーザースキル。作品が完成した文脈で発動し、公開までを型化する
- 動作は「提案→承認→反映」。勝手に公開しない:
  1. 完成物から `works.json` エントリ案(タイトル・説明・タグ・カテゴリ・サブドメイン案)を生成して提示
  2. 承認後: `works.json` 追記、スキーマ検証、Caddyfile / cloudflared 設定への追記、`/srv/works/` への配置、デプロイ、公開 URL の疎通確認
  3. あわせて「制作で得た知見」を `drafts/` に 1 枚投げ込む(翌日のブログ素材になる)
- スキル定義の詳細は別紙 `work-publisher-skill-spec.md`

### 5. 配信・公開まわり

- Caddy: 静的配信、gzip、ホスト名ルーティング。HTTPS 終端は Cloudflare 側なので Caddy は http でよい
- cloudflared: `config.yml` にホスト名→ローカルポートの対応を書く。`*.example.com` をワイルドカードで Tunnel に向ける
- デプロイ: GitHub リポジトリを正とし、Pi 側は `git pull` + ビルドを行う `deploy.sh` 1 本で更新完了とする(自動化は Todo)

### 6. 既知の限界と補完

- 自宅サーバーのため停電・回線断でサイトが落ちる。v1 では許容する(個人ポートフォリオであり SLA 不要)
- Claude 追記運用は JSON 構文ミスのリスクがある → ビルド/デプロイ時に `works.json` のスキーマ検証を行い、壊れていたら反映を中止して前の状態を維持すること

## 非機能・開発方針

- 外部 CDN・重いフレームワークに依存しない。素の HTML/CSS/JS を基本とする(何年後でも動くこと)
- 設定値(ドメイン名、パス)はハードコードせず 1 箇所にまとめる
- リポジトリ構成例: `portal/`(カタログ), `docs/`(記事md), `infra/`(Caddyfile, cloudflared config, deploy.sh), `works.schema.json`
- 開発言語: フロントは JS、スクリプト類は bash または Python

## 開発の進め方(フェーズ分け)

1. **Phase 1 — ローカルで完結**: カタログページ(`index.html` + `works.json` + スキーマ検証スクリプト)と docs ビルドを PC 上で作り、ブラウザで確認できる状態にする。ハードウェア・ドメイン不要
2. **Phase 2 — 公開**: ドメイン取得、Pi セットアップ(Caddy + cloudflared)、`deploy.sh` 整備、`example.com` で公開
3. **Phase 3 — 作品のサブドメイン公開**: 既存作品を `/srv/works/` に置き、`xxx.example.com` で配信。Caddyfile と Tunnel 設定への追記手順をドキュメント化
4. **Phase 4 — 運用の型化**: work-publisher スキル実装。「新作を登録する」「知見を記事化する」手順を固定する
5. **Phase 5 — デイリーブログ**: 生成プロンプトを作り、まず手元 PC で数日試運転して型を固める → Pi の cron + claude CLI に移して無人化。通知手段もここで整備

## Todo(v1 スコープ外)

- git push で自動デプロイ(webhook / GitHub Actions + self-hosted runner)
- アクセス統計、コメント/フィードバックフォーム
- 作品カードのプレビュー画像自動生成
- 全文検索

## 未確定事項(実装時に判断してよいこと)

- ブログ生成失敗時の通知手段(メール / Discord webhook / LINE Notify 代替 等)
- claude CLI の認証を Pi に置く方法(サブスク認証 or API キー)。コストと管理性で実装時に選ぶ

- docs のビルド方法: 軽量 SSG(Eleventy, mkdocs 等)か自前スクリプトかは実装側で選定してよい。ただし依存最小の方針を優先
- カタログのデザイン詳細(配色・レイアウト)。TNKS1407 の「カテゴリ折りたたみ + カード + タグ」構成を参考にする
- works.json のスキーマ検証の実装手段(ajv / Python jsonschema 等)
- Caddy ではなく nginx を使いたい事情があれば変更可。理由をコミットメッセージに残すこと
