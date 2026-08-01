# seeds — 拾いものの型

`src/content/seeds/<YYYY-MM-DD>-<slug>.md`

```yaml
---
title: カメラの上でLLMが動く reCamera Pro
found: 2026-07-27          # 拾った日
url: https://...           # 出典(必須)
source: manual             # 会話から拾ったら manual、フィードなら feeds[].id
tags: [edge-ai, vlm]
why: 3 TOPS でVLMがオンデバイス。ローカル構成の判断が変わるかもしれない
status: inbox              # inbox | kept | promoted | dropped
publish: false             # 既定 false。kept にしたものだけ true にしうる
---
```

必須は `title` / `found` / `url` / `why` / `status`。

## 拾う条件は「脱線したもの」

会話の中で種になるのは、**本筋から逸れたもの**。本筋なら今やる。
逸れたから「あとで見る」の印になる。

- ユーザーが貼った URL
- 話の流れで出てきた道具・論文・製品で、いまは追わないもの
- 「へえ」と思ったが本筋ではなかったもの

## `why` は必須。書けないなら捨てる

URL とタイトルだけの拾いものは3ヶ月後に無価値になる。
「なぜ気になったか」の1〜2行だけが、後で昇格を判断する材料になる。

**会話から拾う場合、`why` はタダで手に入る** —— その話題が出た理由が会話に残って
いるから。ここが会話由来の種がフィード由来より質が高い理由。

## やらないこと

- 勝手に登録しない。**一問だけ聞いて承認を取る**
- 脱線を全部拾わない。拾いすぎると inbox が腐る
- 記事本文を書かない。seeds は種であって記事ではない
- 既定の `publish: false` を勝手に true にしない
