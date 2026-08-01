# Knowledge Garden

AIと何かを作りながら得た知見を、**育てて・繋げて・探せる**ようにする個人ナレッジ
ガーデン(公開デジタルガーデン)。Astro でビルドし、クラウド静的ホストに git push で
自動デプロイして完結させる。参考: [TNKS1407](https://tnks1407.com/)。

仕様の詳細は [`spec/`](spec/):

- [`spec/knowledge-garden-spec.md`](spec/knowledge-garden-spec.md) — 全体仕様 (v2)
- [`spec/content-pipeline-spec.md`](spec/content-pipeline-spec.md) — 運用パイプライン仕様
  (4層モデル / Works の三態 / seed-catcher・devlog-writer・honest-gate・cartographer)
- [`spec/garden-muse-skill-spec.md`](spec/garden-muse-skill-spec.md) — 追記/着火スキル仕様

## コンセプト

- **主役は知見の蓄積**(セカンドブレイン)。作品カタログではない
- コンテンツは3本立て: **Garden**= 主題で育てる / **Log**= 実録を流す / **Works**= プロジェクト
  - Garden と Works は切り口が違う。Garden は主題の横串、Works はプロジェクトの縦串
  - `project:` を書くと Works ページが Garden/Log を自動集約するハブになる
- **情報設計が主役機能** — 検索・タグ・目次・ノート間リンクを核に据える

## 現状: Phase 1(ローカルで完結)

Astro + Pagefind。ハード・ドメイン不要でローカル確認できる。

```
astro.config.mjs
src/
  site.config.ts        サイト名・著者(単一の情報源)
  content.config.ts     garden / log の Content Collections(zodで検証)
  content/
    garden/*.md         Garden(主題単位・育てる)
    log/*.md            Log(実録・日付順)
    works/*.md          Works(プロジェクト単位・三態)
  layouts/Base.astro
  components/NoteCard.astro
  lib/util.ts           取得・タグ集計・日付整形
  pages/
    index.astro         構造化トップ(タグ / 育成中ノート / 最新ログ)
    garden/             一覧・詳細(目次つき)
    log/                一覧・詳細
    works/              一覧・詳細(project 集約 + 作業リンク)
    tags/               タグ一覧・タグ別
    search.astro        Pagefind 全文検索
```

## 使い方

```sh
npm install
npm run dev       # 開発サーバ (http://localhost:4321)。※検索は未生成
npm run build     # astro build + pagefind(検索インデックス生成)
npm run preview   # ビルド結果を配信。検索もここで有効
```

- frontmatter は Content Collections の zod スキーマで**ビルド時に検証**される。
  壊れていればビルドが失敗して弾かれる
- **全文検索(Pagefind)** はビルド後に生成されるため、`dev` では効かない。
  `build` → `preview`(または本番)で有効

## ノート/ログの追加

- Garden: `src/content/garden/<slug>.md`(`title` `updated` `tags` ほか)
- Log: `src/content/log/<YYYY-MM-DD>.md`(`title` `date` `tags`)
- Works: `src/content/works/<slug>.md`(`title` `status` ほか)。
  テンプレートは [`.claude/templates/work.md`](.claude/templates/work.md)
- Garden / Log に `project: <works の slug>` を書くと、Works ページに自動で集約される
- 本文中の `/garden/<slug>/` へのリンクでノート同士を繋げられる(バックリンクに出る)

追記は Skill [`tamorian7`](.claude/skills/tamorian7/SKILL.md) が「一問→承認→追記」で
型化する。棚卸し・外部探索・公開前レビューといった重い作業は
[`.claude/agents/`](.claude/agents/) のサブエージェントに出す(会話を汚さないため)。
設定は [`garden.config.json`](garden.config.json) が唯一の情報源。

## 今後(仕様書参照)

- Phase 2: バックリンク/関連ノート + クラウド静的ホストへ公開
- Phase 3: garden-muse スキル(捕獲 + 好奇心ドリブンの着火)
- Phase 4: 知識グラフ / MOC / RSS・OG の作り込み
