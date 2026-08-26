---
title: kuroko-chat
emoji: 🪟
status: planned
updated: 2026-08-26
created: 2026-08-26
tags: [ai, tooling, design]
summary: 常時起動している Claude Code セッションの窓口を、自前のローカルアプリに移す。
---

何日も動き続けている Claude Code のセッションに、**スマホの Remote Control から
話しかけている。** 会話は成立するが、2つ詰まる。

- **画像を遡れない。** 過去に渡した写真やスクショを後から探せない
- **ローカルファイルが開けない・渡せない**

## いまどこ

**仕様だけある**（`~/kuroko-chat/SPEC.md`、実装は未着手）。
**根拠は全部、実機を叩いて確かめた**（`probes/` に6本）。

- `claude -p --input-format stream-json` が公式の双方向経路
- **stdin を開けたままなら常駐する。** `ScheduleWakeup` も発火する
- **走行中の割り込み投入も、`interrupt` も、`set_model` も通る**
- **サイドチャットが本題を汚さない**（transcript のターン数が増えない）

## 順番が効く

`/remote-control` は `--print` で拒否されるので、
**アプリがセッションを持った瞬間、スマホからは触れなくなる。**

だから **LAN の振り直しと Tailscale が、書く口を作るより先**に要る。
実装で回避できない一方通行なので、順番を間違えると外出中に連絡が取れなくなる。
