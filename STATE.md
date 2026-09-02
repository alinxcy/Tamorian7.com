---
schema_version: 2
last_updated: 2026-09-02T22:44+09:00
current_focus: "委託先が4つ(Fugu/Local/Codex/Antigravity)になり、どれも実行口が通った。次は振り分けを1箇所にまとめること。9/5 の LAN 振り直しは日付の律速として並走"
projects:
  - slug: foundation
    status: active
    summary: "状態と運営の仕組みそのもの。非公開リポジトリ alinxcy/foundation が本体で、公開できる結論だけをこのサイトへ出す"
    next_action: "外注の振り分けを1箇所にまとめる。台帳の置き場は foundation/delegation/ に決まった"
    next_action_at: "~/.claude/handoffs/tools/offload_log.py と 2026-09-02-night-batch.md の B1"
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
    next_action: "Fugu の得手を測り直す。要約は強く抽出は落ちる。向こうが謳うのはコーディングで、我々の使い方と合っていない"
    next_action_at: "~/atelier-lab/wake/bench_local.py と ~/.claude/handoffs/design/bench/"
    link: "/works/fugu-lab/"
  - slug: atelier-lab
    status: active
    summary: "アトリエ(作業場)の計測と制御。20A の天井の中で何を動かせるかを実測で決める"
    next_action: "エアコン導入と合わせて充電の設計を詰める。先読みは配線済みで、残りは大きな負荷が入ってから"
    next_action_at: "~/atelier-lab/wake/charge_plan.py と jepx/plan_vs_react.py"
    link: "https://github.com/alinxcy/atelier-lab"
  - slug: kuroko-chat
    status: active
    summary: "常時起動セッション(クロコ)の窓口を自前のローカルアプリに移す。実装は Antigravity"
    next_action: "先にキューの画面を作ってもらう。Phase 0 はその後。agy CLI が入ったので auto でも投げられる"
    next_action_at: "~/.claude/handoffs/tasks/2026-09-02-queue-dashboard.md"
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
  - id: skill-selfimprove-trigger
    question: "呼ぶたびの記録は始めた。PreToolUse で過去の失敗を実行前に注入するか、週次で Skill 本文へ蒸留するか"
    raised: 2026-08-27
  - id: playground-role
    question: "claudePlayGround を配布元にするか保管庫にするか。skill-return という還流の仕組みまで作ってあるが、5週間動いていない"
    raised: 2026-08-27
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

1. **委託の振り分けが実装になった** — `route.py` が「どこへ投げるか」を1箇所で決める。
   試験の母集団は**実際に下した判断**にした（今日の4回）。
   次は使いながら外れを見つけること。**台帳は `foundation/delegation/` に置いた**
2. **委託先ごとの得手が、測って出てきた** — 下の暗黙知欄。
   ただし**母数はまだ足りない**（Codex 5件、他は1〜2件）
3. **atelier-lab の充電が3段になった** — 95%以上は入れない / 50〜95%は先読み /
   30〜50%は反応的 / 30%未満は無条件。**配線済みで動いている**
4. **knowledge-garden — 記事が自動で書かれるようになった**。
   毎朝3時すぎの systemd timer。**本数は素材の「逆転の数」が決める**（上限3本）
5. **9/5 の LAN 振り直し** — 日付が律速。並走させる
6. **q3pe-recorder** / **peak-shifter** — どちらも**物待ち**

**詰まり方は3種類。** 書けば進むもの、物が届くまで動けないもの、
**人間が決めれば動くもの**。判断1つで進む方が一番安い。

## 2. 次のアクション

### foundation / fugu-lab — 振り分けを使いながら直す

`route.py` は今日書いてテスト14件が通っているが、**まだ1度も実運用で使っていない。**

- **外れたら台帳に残す。** 今日の試験で既に1件外している——
  agy の権限探り(5KB)を「小さいから自分でやる」に倒したが、実際は委託が正解だった
- **節約の型が2つある**と分かったのが収穫。
  かさばる仕事は字数で測れるが、**往復する仕事は字数では測れない**
- **fugu-lab の前提が揺れた。** Sakana が Fugu について謳うのは
  コーディングとコードレビューで、**要約・長文脈には一言も触れていない**。
  我々はほぼ要約にしか使っていない。**契約判断の土台が、間違った用途での評価かもしれない**
- 直前に確かめたこと: `~/.claude/skills/` の集約は **08-27 に既に終わっていた**。
  pending が6日間古かった。**現物を見ずに pending を信じると、決め直しが起きる**

### atelier-lab — エアコンが入るまで設計を進めない

先読み充電は配線済み。**効果は実測 0.21円/日**で、いまの622Whでは小さい。

- **必要量が締切までの枠をほぼ埋めるので、選ぶ余地がほとんど無い**
- 電池を大きくすると選択の余地が増える側の設計。**器を先に作った状態**
- 残りは「エアコンを含めた設計」で、**物が来るまで前提が無い**

### knowledge-garden — 配色を決めると先へ進む

9案が並んでいる（Claude 1 / Codex 4 / Antigravity 4）。
**決まれば `design/tokens.css` を切り出して、サイトと `panel.py` の両方から使える。**

- 3者が独立に**色相255度・彩度55%前後**へ着地した（`#5b3fbf` / `#5d38c9` / `#5937be`）
- 唯一の外れ値は Antigravity の「鮮紫・明快」（彩度85%）
- **暫定で進めることもできる。** トークンは1ファイルなので後から差し替えられる

### kuroko-chat — キューの画面が先に返ってきた

`agy` でキューの画面を作らせた（`~/atelier-lab/wake/queue.html`）。
要件は全部満たし、テスト9件も通る。**見た目はスレート＋緑で、庭の紫とは別物。**

- **Claude の予測版と並べて、本人が選ぶ**のが次
- Phase 0（読む窓）はその後

## 3. 作業中の暗黙知

### 委託先の得手（2026-09-02 実測。母数は足りていない）

    Fugu          全部読んで要約するのは強い。**干し草から針を探すのは落ちる**
                  しかも**空答で返る**ので、原文を数えないと気づけない
    granite4.2:8b ローカルで唯一、数字と日付を拾えた（罠 2/8・実測値 4/9）
    qwen3:8b/14b  **罠を1件も拾えなかった**（0/8）。入力は読めているのに
                  14b は 11GB では10分48秒かかり、使い物にならない
    Codex         **明示した禁止は完全に守る。書いていない空白は自分で埋める**
                  主担当の誤りを3回指摘し、3回とも正しかった
    agy           静的に全部展開する作りを選ぶ。振り幅が広い（彩度33〜85%）

**比較を汚さない。** 今日 agy のプロンプトにだけ「文言を増やすな」を足した。
**次は一字一句同じにする。**

### 節約の型は2つある

    かさばる仕事   節約 = 読まずに済んだ入力 − 読んだ出力     字数で測れる
    往復する仕事   節約 = **肩代わりさせた試行錯誤**          字数では測れない

字数の門をコード判定より前に置くと、**後者を丸ごと取りこぼす。**

### 規則を文書に書いても、守るのも見張るのも自分なら破る

「DECISIONS.md に書いたら STATE.md も見る」を規則にした**30分後に自分で破った。**
`state_stale.py` を **git log の時刻比較**にして、機械が言う形へ変えた。

### 入力が届いたことを、毎回確かめる

`ask_llm.py` は引数を渡すと**標準入力を丸ごと捨てていた。**
終了コード0で、読むものが無いまま創作した要約が返る。
**比較を仕込む前に気づかなければ、「何も読まずに書いた答え」を Fugu と比べていた。**

**出力の打ち切りと、入力の読み落としを混同しない。** カナリアが返らないのは
「読めていない」とは限らず、`num_predict` に張り付いただけのことがある。

### pending は古びる。現物を見る

`skills-single-home` は **08-27 に解決済み**だったのに、6日間 pending に残っていた。
**本人に判断を仰ぐ前に現物を見ていれば、決定そのものが不要だった。**

### 日付は毎回 `date` を叩く

長いセッションでは「今日」がずれる。**相対日付を書く前に確認する。**
