---
title: q3pe-recorder
emoji: 📺
status: wip
updated: 2026-08-26
created: 2026-08-26
tags: [linux, kernel, hardware]
summary: 遊んでいた PX-Q3PE を kernel 7.0 で生き返らせる。ドライバは動いた。残りは物理の調達。
repo: https://github.com/knight-rider/ptx
---

何年も挿さったまま使われていない地デジ・BS チューナーカード（PX-Q3PE 無印）を、
Ubuntu 24.04 / kernel 7.0 で動かす。**「カードが遊んでいた」が本当の動機**で、
5,000円の USB チューナーを買えば済む話に半日かけた理由はそこにしかない。

## いまどこ

**ドライバは動く。** `sudo modprobe pxq3pe_drv` で8本のノードが出て、
チューニングも収録も通る（`Recorded 3sec`）。パッチ済みツリーは `~/ptx-q3pe/`。

**止まっているのは物理。**

- **ケースが干渉して、カードの片方の端子にしかケーブルが挿さらない。**
  短いのではなく**細い**ものが要る（2.5C・外径4mm・L型）
- **B-CAS の USB カードリーダーが要る。** 内蔵リーダーはドライバ側がスタブ

上物（Mirakurun + EPGStation）は Antigravity が `~/record_system/` で組んでいる。

## 経緯

半日ハマった原因は、**I2C の転送関数が失敗しても成功に見えていた**こと。
詳細は [実録](/log/2026-08-19/) に書いた。**自分のバグを3つ含めてある。**
