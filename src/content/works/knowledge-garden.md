---
title: Knowledge Garden(このサイト)
emoji: 🌱
status: wip
updated: 2026-07-19
created: 2026-07-18
tags: [astro, cloudflare, meta, digital-garden]
summary: AIと作りながら得た知見を、育てて・繋げて・探せるようにする個人ナレッジガーデン。今まさに作っているこのサイト自身。
repo: https://github.com/alinxcy/Tamorian7.com
---

AI と何かを作る過程で得た知見を、自分用に貯めていく **公開デジタルガーデン**。
Astro でビルドし、クラウド静的ホストに git push で自動デプロイして完結させる。

## 何が主役か

主役は **知見の蓄積(セカンドブレイン)** であって、作品カタログではない。
作品は「作った経緯・学びを育てられるノート」の一種(`kind: work`)として扱い、
[常緑ノート](/garden/) の中の1ビュー(`/works`)に置く。

## 2本立てのコンテンツ

- **常緑ノート(garden)** — トピック単位で何度も育て、相互リンクで繋ぐ
- **ログ(log)** — 日付順に流す作業記録・雑記

なぜ分けるのかは [ストリーム型とガーデン型](/garden/stream-vs-garden/) に書いた。

## 情報設計が主役機能

参考にした個人サイトの物足りなさは「探しにくい・構造が弱い」ことだった。
だからこのサイトは **検索・タグ・目次・ノート間リンク** を飾りではなく核に据える。
そこが凡庸だと、作る意味が薄れるので。

## スタック

- Astro(Content Collections + zod で frontmatter を検証)
- Pagefind(クライアント側の全文検索・バックエンド不要)
- Cloudflare Pages もしくは GitHub Pages に自動デプロイ(予定)

技術選定の背景は [なぜ素HTMLではなくAstroか](/garden/why-astro-over-vanilla/) を参照。
