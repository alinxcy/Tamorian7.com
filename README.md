# Works Portal

AIと作ったもの・これから作るものの一覧カタログと、制作で得た知識ノートを
自宅サーバー(Raspberry Pi)で公開するためのリポジトリ。参考:
[TNKS1407](https://tnks1407.com/)。外部依存を極力減らし、静的ファイル配信で
完結させる。コンテンツ追加は「Claude がデータファイルを追記する」運用が前提。

仕様の詳細は [`spec/`](spec/) を参照:

- [`spec/works-portal-spec.md`](spec/works-portal-spec.md) — ポータル全体の仕様
- [`spec/work-publisher-skill-spec.md`](spec/work-publisher-skill-spec.md) — 作品自動登録スキルの仕様

## 現状: Phase 1(ローカルで完結)

ハードウェア・ドメイン不要で、PC 上でカタログと docs をブラウザ確認できる状態。

```
config.json              サイト名・ドメイン・パスの単一の情報源
works.schema.json        works.json のスキーマ
portal/
  index.html             カタログ(works.json をJSで読み込み描画)
  works.json             作品データ(1エントリ = 1作品)
  assets/style.css       素の CSS(外部依存なし)
  docs/                  ← ビルド生成物(git 管理外)
docs/                     知識ノートの Markdown ソース
scripts/
  validate_works.py      works.json をスキーマ検証(依存ゼロ)
  build_docs.py          Markdown → HTML(依存ゼロ)
  build.sh               検証 → docs ビルド
```

## 使い方

### ビルド(検証 + docs 生成)

```sh
bash scripts/build.sh
```

`works.json` がスキーマ違反なら**ビルドを中止**し、既存の出力を維持する。
Claude の追記運用による JSON 構文ミスがそのまま公開される事故を防ぐため。

### ローカルで表示

`fetch` を使うため `file://` では動かない。簡易サーバー経由で開く:

```sh
python3 -m http.server -d portal 8080
# → http://localhost:8080/
```

### 作品を追加する

`portal/works.json` の `works` 配列に1オブジェクト追記して `bash scripts/build.sh`。

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
  "status": "published",
  "date": "2026-07-18"
}
```

- 必須: `id` `title` `description` `category` `status` `date`
- `status`: `published`(公開中) / `wip`(制作中) / `planned`(構想中)
- `id` は `^[a-z0-9][a-z0-9-]*$`、`date` は `YYYY-MM-DD`

### 記事(知識ノート)を追加する

`docs/` に Markdown を1枚置いて `bash scripts/build.sh`。frontmatter で
`title` / `date` / `tags` / `work_id`(任意)を指定する。`work_id` を書くと
カタログの該当作品へリンクする。

## 今後(仕様書参照)

- Phase 2: ドメイン取得・Pi セットアップ(Caddy + cloudflared)・公開
- Phase 3: 作品のサブドメイン公開
- Phase 4: work-publisher スキル実装
- Phase 5: デイリーブログ自動生成
