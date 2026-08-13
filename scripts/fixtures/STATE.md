---
schema_version: 1
last_updated: 2026-08-13T10:11+09:00
current_focus: "意図的に壊した fixture。落ちるべきものが落ちることを確認する"
owner: alinxcy
projects:
  - slug: good-project
    status: active
    progress: 0.5
    next_action: "何かする"
    next_action_at: "scripts/state.mjs"
  - slug: bad-status
    status: ongoing
    progress: 1.5
    next_action: "status と progress が不正"
    next_action_at: "どこか"
pending:
  - id: sample
    question: "raised の書式が不正"
    raised: 2026/08/13
---

# 壊れた STATE.md

`good-project` は本文に出てくるが、`bad-status` は出てこない(slug 不一致の検出用)。

## 未確定・確認待ち

pending[] と二重になっている見出し(重複の検出用)。

## これまでの経緯

履歴らしき見出し(墓場の検出用)。
