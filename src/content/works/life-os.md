---
title: life-os
emoji: 🪴
status: planned
updated: 2026-08-26
created: 2026-08-26
tags: [astro, meta, design]
summary: STATE.md を人間が読める形に描画するページ。進捗率をやめ、要約とリンクのハブにした。
---

`STATE.md` のフロントマターを読んで `/state/` に描く。**中身は書かない。**

## v2 でやめたこと

**進捗率を持つのをやめた。** 誰も見ないまま二重管理になっていた。
状態は `status`（active / paused / blocked / done）で表し、
**中身は `summary` の一文で説明する。**

## 踏んだ罠

`astro build` はフロントマターを `dist/.prerender/chunks/` にバンドルしてから実行するので、
`import.meta.url` が**チャンクの位置**を指して ENOENT になる。
`import src from '../../STATE.md?raw'` に変えた。

**`astro dev` では前者でも動く**ので、ローカルの dev だけでは気づけない。

## これから

[サイト v3](/log/2026-08-26/) で、**このページをトップのダッシュボードに吸収する**予定。
`/state/` を独立させるより、**入口そのものを状態にする**方が使う。
