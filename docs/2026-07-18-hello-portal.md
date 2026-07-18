---
title: Works Portal を作りはじめた
date: 2026-07-18
tags: [portal, meta]
work_id: works-portal
---

AIと作ったもの・これから作るものを一覧化し、制作で得た知見を貯めていく
ポートフォリオサイトを作りはじめた。参考は [TNKS1407](https://tnks1407.com/)。

## 方針

- 外部 CDN・重いフレームワークに依存しない。素の HTML/CSS/JS を基本にする
- 設定値(ドメイン・パス)は `config.json` の1箇所にまとめる
- コンテンツ追加は「Claude がデータファイルを追記する」運用にする

## Phase 1 でやること

1. カタログページ(`index.html` + `works.json`)
2. `works.schema.json` によるスキーマ検証(壊れた JSON を弾く)
3. Markdown を HTML 化する docs ビルド

検証はビルド時に走らせ、`works.json` が壊れていたら反映を止める。
これで Claude の追記運用でも構文ミスがそのまま公開される事故を防げる。

> 立ち上げ期は PC 上で完結させ、ドメインや Raspberry Pi は Phase 2 以降で用意する。
