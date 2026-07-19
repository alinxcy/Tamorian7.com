# Knowledge Garden

AIと何かを作りながら得た知見を、**育てて・繋げて・探せる**ようにする個人ナレッジ
ガーデン(公開デジタルガーデン)。Astro でビルドし、クラウド静的ホストに git push で
自動デプロイして完結させる。参考: [TNKS1407](https://tnks1407.com/)。

仕様の詳細は [`spec/`](spec/):

- [`spec/knowledge-garden-spec.md`](spec/knowledge-garden-spec.md) — 全体仕様 (v2)
- [`spec/garden-muse-skill-spec.md`](spec/garden-muse-skill-spec.md) — 追記/着火スキル仕様

## コンセプト

- **主役は知見の蓄積**(セカンドブレイン)。作品カタログではない
- コンテンツは2本立て: **常緑ノート(garden)**= 育てる / **ログ(log)**= 流す
- **情報設計が主役機能** — 検索・タグ・目次・ノート間リンクを核に据える

## 現状: Phase 1(ローカルで完結)

Astro + Pagefind。ハード・ドメイン不要でローカル確認できる。

```
astro.config.mjs
src/
  site.config.ts        サイト名・著者(単一の情報源)
  content.config.ts     garden / log の Content Collections(zodで検証)
  content/
    garden/*.md         常緑ノート(kind: note | work)
    log/*.md            ログ(日付順)
  layouts/Base.astro
  components/NoteCard.astro
  lib/util.ts           取得・タグ集計・日付整形
  pages/
    index.astro         構造化トップ(タグ / 育成中ノート / 最新ログ)
    garden/             一覧・詳細(目次つき)
    log/                一覧・詳細
    works/              kind: work の抽出ビュー
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

- 常緑ノート: `src/content/garden/<slug>.md`(frontmatter: `title` `updated` `tags`
  `kind`(note|work) ほか。work は `status` `url` `repo` `emoji` 任意)
- ログ: `src/content/log/<YYYY-MM-DD>.md`(frontmatter: `title` `date` `tags`)
- 本文中の `/garden/<slug>/` へのリンクでノート同士を繋げられる

将来は [garden-muse スキル](spec/garden-muse-skill-spec.md) で「提案→承認→追記」を
型化する(Phase 3)。

## 今後(仕様書参照)

- Phase 2: バックリンク/関連ノート + クラウド静的ホストへ公開
- Phase 3: garden-muse スキル(捕獲 + 好奇心ドリブンの着火)
- Phase 4: 知識グラフ / MOC / RSS・OG の作り込み
