---
title: Knowledge Garden(このサイト)
emoji: 🌱
status: wip
updated: 2026-08-17
created: 2026-07-18
tags: [astro, cloudflare, meta, digital-garden]
summary: AIと作りながら得た知見を、育てて・繋げて・探せるようにする個人ナレッジガーデン。今まさに作っているこのサイト自身。
repo: https://github.com/alinxcy/Tamorian7.com
---

AI と何かを作る過程で得た知見を、自分用に貯めていく **公開デジタルガーデン**。
Astro でビルドし、git push で自動デプロイして完結させる。

コンテンツは4層。**seeds**(拾いもの)と **log**(実録)が原料、
**garden**(主題ノート)と **works**(プロジェクト)が製品。
原料は増える一方でよく、製品は数を絞って育てる。

## いま動いているところ

- **4層すべて。** works は `project:` を書いたノート・ログ・種を
  自動集約するハブになる(このページ下部がそれ)
- **seeds は一覧を持たない。** 拾いものはストックではなくフローなので、
  `/seeds/` を作ると実質ブログになって garden が主役でなくなる。
  露出はタグページの混在表示と `/seeds/<slug>/` の詳細だけ
- **works の三態** — 構想 / 作業場 / 使い方 で本文の役割が入れ替わる。
  いまこのページは「作業場」
- **honest-gate の機械判定**(`npm run check`)が CI で回っている。
  リンク切れ・base パス直書き・公開なのに残った作業リンク、を落とす
- **Skill `tamorian7`** 1つと **Subagent 3体**。捕獲は Skill、加工は Agent
- タグページが garden / log / seeds / works を横断する

## いま詰まっているところ

- **種がまだ1つも無い。** 器はできたが中身がゼロ。
  入っている1件は動作確認用の fixture で、拾いものではない
- **未昇格の在庫を数える場所が無い。** 「溜まっているぞ」という圧を
  どこで見せるかが決まっていない。トップに出す案は、seeds の `publish` が
  既定 false なので静的サイトでは数えられず、そのままでは成立しない
- **本番ホストが未着手。** いまも GitHub Pages の使い捨てサンプル。
  Cloudflare Pages + 独自ドメインへの移行が残っている
- **サイト名「Tamorian7」は暫定。** セクション名 Garden との衝突を避けて
  置いただけで、確定ではない
- ローカル LLM に Skill を下ろすためのルータが未着手

## 次の一手

1. **会話の脱線から種を拾う。** 器はできたので、あとは使うだけ
2. `promotion-reviewer` を走らせて、在庫の棚卸しが機能するか見る
3. 本番ホストへ移行する。そのとき `base` を `/` に戻す

なぜ2本立てから4層になったかは
[ストリーム型とガーデン型](/garden/stream-vs-garden/)、
技術選定は [なぜ素HTMLではなくAstroか](/garden/why-astro-over-vanilla/) に。
