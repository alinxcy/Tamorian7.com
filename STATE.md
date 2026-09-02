---
schema_version: 2
last_updated: 2026-09-02T12:39+09:00
current_focus: "副担当(Codex/Antigravity)への委託が回り始めた。委託先ごとの得手を測って振り分けを決めるのが次。9/5 の LAN 振り直しは日付の律速として並走"
projects:
  - slug: foundation
    status: active
    summary: "状態と運営の仕組みそのもの。非公開リポジトリ alinxcy/foundation が本体で、公開できる結論だけをこのサイトへ出す"
    next_action: "委託の台帳を Fugu 以外(Codex/Antigravity)へ広げる。まず置き場を foundation/delegation/ に決める"
    next_action_at: "~/.claude/handoffs/tools/offload_log.py と CODEX-HANDOFF.md"
    link: "/works/foundation/"
  - slug: knowledge-garden
    status: active
    summary: "このサイトそのもの。4層モデル(seeds/log/garden/works)で育てる Astro の器"
    next_action: "/works/ を /projects/ に改名するか決める。リンクが動くので本人の確認が要る"
    next_action_at: "src/pages/works/ と spec/site-v3.md"
    link: "/works/knowledge-garden/"
  - slug: q3pe-recorder
    status: blocked
    summary: "遊んでいた PX-Q3PE を kernel 7.0 で生き返らせる。ドライバは動いた"
    next_action: "極細アンテナケーブルと USB カードリーダーを注文する。上物側のバグ2件は洗い出し済み"
    next_action_at: "~/ptx-q3pe/(パッチ済み) と ~/record_system/(上物)"
    link: "https://github.com/knight-rider/ptx"
  - slug: fugu-lab
    status: active
    summary: "Sakana Fugu を月額契約すべきか判断するための計測環境。チャットで使い、使用データを溜める"
    next_action: "委託先が4つ(Fugu/Local/Codex/Antigravity)に増えたので、fugu-lab 単体でなく横断の台帳へ広げる"
    next_action_at: "LM Studio と ~/.claude/handoffs/tools/make_index.py"
    link: "/works/fugu-lab/"
  - slug: atelier-lab
    status: active
    summary: "アトリエ(作業場)の計測と制御。20A の天井の中で何を動かせるかを実測で決める"
    next_action: "Codex の SOC距離制御に必須修正2件を返した。直ってきたら SOC分と充電制御分を別々にマージする"
    next_action_at: "~/atelier-lab-codex-soc と ~/.claude/handoffs/REVIEW-2026-09-02-soc-charge.md"
    link: "https://github.com/alinxcy/atelier-lab"
  - slug: kuroko-chat
    status: active
    summary: "常時起動セッション(クロコ)の窓口を自前のローカルアプリに移す。実装は Antigravity"
    next_action: "Antigravity の Phase 0 進捗を確認する。ブランチ antigravity/phase0-read-window は切られたがコミットが無い"
    next_action_at: "~/kuroko-chat/SPEC.md"
    link: "/state/"
  - slug: peak-shifter
    status: blocked
    summary: "JEPX の価格差に負荷を寄せる。取り分の8割が LED栽培棚で、その棚がまだ無い"
    next_action: "棚を待つ。冷蔵庫もポタ電も実測で消えたので、いま作る対象が残っていない"
    next_action_at: "atelier-lab の jepx/peakshift.py"
    link: "https://github.com/alinxcy/atelier-lab"
pending:
  - id: dashboard-exposure-level
    question: "トップのダッシュボード(次の1手・未確定・ローカルパス)をどこまで公開に出すか。現状は全部見える"
    raised: 2026-08-31
  - id: main-merge-timing
    question: "main へのマージをいつ行うか。試験運用の区切りをどう判断するか"
    raised: 2026-08-13
  - id: publish-default-flip
    question: "publish の default を true から false へ反転させるか(デフォルト非公開)。seeds だけは既に false で入った"
    raised: 2026-08-13
  - id: seed-inventory-pressure
    question: "未昇格の種の在庫をどこで見せるか。仕様はトップと言うが publish 既定 false と噛み合わない。check の warn にする案もある"
    raised: 2026-08-17
  - id: fugu-ttft-null
    question: "fugu-lab の ttft_s を number | null にするか。schema は chat/ と dashboard/ の唯一の結合点なので、直すなら両方セット"
    raised: 2026-08-20
  - id: peakshift-before-shelf
    question: "栽培棚が無いままピークシフター v1 を作るか。棚の取り分を測り直したら年1,586〜3,948円で、元の5,000円強は最悪の窓と比べていた"
    raised: 2026-08-20
  - id: seed-url-optional
    question: "seeds の url を必須から外した(会話由来の種を入れるため)。既存の拾いものと同じ一覧に混ぜてよいか、分けるか"
    raised: 2026-08-27
  - id: skills-single-home
    question: "Skill 26本をどこに集約するか。~/.claude/skills/ に寄せると全リポジトリで効くが一覧が長くなる。claudePlayGround を配布元のまま維持する道もある"
    raised: 2026-08-27
  - id: skill-selfimprove-trigger
    question: "呼ぶたびの記録は始めた。PreToolUse で過去の失敗を実行前に注入するか、週次で Skill 本文へ蒸留するか"
    raised: 2026-08-27
  - id: playground-role
    question: "claudePlayGround を配布元にするか保管庫にするか。skill-return という還流の仕組みまで作ってあるが、5週間動いていない"
    raised: 2026-08-27
  - id: delegation-single-ledger
    question: "Fugu/Local/Codex/Antigravity を横断する委託の台帳をどこに置くか。foundation/delegation/ 配下を提案したが、fugu-lab を畳むのか併存させるのか未決"
    raised: 2026-09-02
  - id: charge-full-by-deadline
    question: "日次満充電の締切 full_by を何時にするか。Codex 案の17:00 は過去7日すべてでその日の最高値の87〜99.9%で、フォールバックが最も高い瞬間に発火する。Claude は14:00 を推奨"
    raised: 2026-09-02
  - id: localllm-at-atelier
    question: "LocalLLM のPCをアトリエに置いて、WoL で安い時間帯だけ起こすか。Fugu が止まったときの受け皿にもなる。peak-shifter にとっては初めての「大きくて時間の自由度がある負荷」"
    raised: 2026-08-28
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **委託が回り始めた。次は振り分けを測って決める** — 副担当が2つ動いている。
   Codex は数字の監査と SOC距離制御を出してきて、どちらも**分業ルールを守った上で
   実データに耐える成果**だった。Antigravity は UI 側を担当する方針。
   **足りないのは「どの仕事をどこへ投げるか」の記録**（`pending: delegation-single-ledger`）。
2. **atelier-lab の充電制御** — Codex の SOC距離モデルへレビューを返した。**必須修正2件**。
   直ってきたら SOC分と充電制御分を**別々に**マージする。本番反映（Piへの配備）はまだ。
3. **Skill の一元化** — **26本あって見えていたのは3本**（2026-08-27）。
   置き場所で効く範囲が決まる。**判断1つで動く**（`pending: skills-single-home`）。
4. **knowledge-garden — log を毎日出す仕組み** — 素材は本体が蒸留し、執筆は Fable、検証は honest-reviewer、
   直しは本体。**毎朝3時すぎに前日分を自動で書く**運用にした（2026-09-02）。
5. **9/5 の LAN 振り直し** — 日付が律速。並走させる。
6. **q3pe-recorder** / **peak-shifter** — どちらも**物待ち**。手を動かす作業が無い。

**詰まり方は3種類。** 書けば進むもの（log・委託の台帳）、物が届くまで動けないもの
（q3pe・栽培棚）、**人間が決めれば動くもの**（Skill の置き場・締切時刻・公開範囲）。
**判断1つで進む方が一番安い。**

## 2. 次のアクション

### atelier-lab — Codex の修正待ち。返した必須2件

回答は `~/.claude/handoffs/REVIEW-2026-09-02-soc-charge.md`。

- **`find_fulls()` の30W判定が1サンプルしかない。** 仕様は3サンプル連続。
  この差で 08-31 12:51 に**実際の誤検出**が起きていた——充電中(98.7W)に人が手で切り、
  6分後に自動で入れ直した直後の0Wを満充電と誤認。産物が `0.97 W` という無効な学習値
- **外部OFF検出にデバウンスが無い。** 1回の観測で自動運転を無期限休止する。
  同じ diff の `FULL_SAMPLES=3` や番犬の `GUARD_TICKS=3` と非対称
- **直前に試してダメだったこと**: テストは20件とも通る。**合成データなので30W判定の穴が
  露呈しない。** 実ログ4日分を通して初めて `0.97 W` が出た

### 委託の台帳 — 置き場を決めてから作る

**`fugu-lab` は「Fugu 1社の契約判断」に特化していて、4つに増えた委託先を載せる器ではない。**
`foundation/delegation/` 配下に寄せる案を出したが未決（`pending: delegation-single-ledger`）。

- **既にあるもの**: `offload_log.py`（Fugu の効果台帳）/ `offload_keep.py`（入出力の保存）/
  `CODEX-HANDOFF.md` / `ANTIGRAVITY-HANDOFF.md`。**素材は揃っていて、横断の索引だけが無い**
- **効果の測り方は決まっている**: 入力を避けた分 − 出力を読んだ分。`MIN_N = 3` で棄権する
- **直前に確かめたこと**: 今日の改名で参照は58件・9.4KB しか無く、**委託に出すと損だった**。
  「使うこと自体は目的でない」を実際に一度当てはめた

### Skill の一元化 — 置き場所を決める（判断1つで動く）

```
~/.claude/skills/          1本   offload                    ← どこでも効く
Tamorian7.com/.claude/     2本   tamorian7 / update-state
fugu-lab/.claude/          6本
claudePlayGround/.claude/ 17本   ← 手元にクローンすら無い
```

- **重複4本は1バイトも違わなかった。配布の問題であって品質の問題ではない**
- 道具は揃っている（`skill-harvester` / `skill-creator` / `skill-optimizer` / `skill-return`）。
  **設計は完成していて運用が止まっている**（最終 push は 2026-07-20）

### kuroko-chat — Antigravity の進捗を確認する

ブランチ `antigravity/phase0-read-window` は切られたが、**コミットがまだ無い**。
`probes/` の再現スクリプトを走らせて仕様の前提を確かめる段階のはず。**催促の前に確認する。**

## 3. 作業中の暗黙知

### 実データに通すまで、テストが通ったことに意味は無い

**2026-09-02 に2回続けて出た。** Codex の20件は全部通るのに、実ログ4日分を通したら
満充電の誤検出が1件出た。合成データは、書いた人が想定した壊れ方しか含まない。
**「テストが通った」は「まだ壊れ方を1つも見つけていない」と読む。**

### 委託は、入力が大きいか出力を読まないときだけ得

今日の改名で参照を数えたら**58件・9.4KB**。委託の指示を書いて結果を読む方が高くつく。
**断ることも測定のうち。** `offload_log.py` に載らない判断だが、載せる価値がある。

### 手で止めたものは、勝手に再開させない

旧実装の「次に判断が変わるまで尊重する」は**価格が動いた瞬間に解除される**ため、
「止めておきたい」意図を保持できなかった。2026-09-02 の朝、5時間20分見送ったあと
Claude が入れ直して差し戻された。**止め方が明示なら、解除も明示でなければ釣り合わない。**

### 充電の締切を夕方に置くと、フォールバックが最悪の時刻に当たる

過去7日で **17:00 はその日の最高値の87〜99.9%**。「締切までに満充電できなければ
価格条件を解除」という規則は、**1日で最も高い瞬間に発火する**。安い窓は7日中6日が
09:30〜13:00 に集中しているので、14:00 でも計画対象は変わらない。

### 操作の主体が一意に辿れることは、機能要件

2026-09-02 の朝、本人が手で切った操作を Claude が「委託先の検証操作ではないか」と誤って疑った。
**自動制御・人の操作・検証用の操作が混ざると、事故のとき原因が追えない。**
委託先には「検証で実機のプラグを操作しない」を明示した。

### 日付は毎回 `date` を叩く

長いセッションでは「今日」がずれる。**相対日付を書く前に確認する。**
