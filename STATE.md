---
schema_version: 2
last_updated: 2026-10-01T00:23+09:00
current_focus: "通知と見張りをラズパイに集め、定時の仕事・キュー・録画・充電の失敗が全部スマホに届くようにした。いまはアトリエのローカルLLMを測りながら育てている——種の選別は聞き方を直して62→79〜83%、10/1 12時の最安コマで小型4本を足したリーグ戦を回す"
projects:
  - slug: local-llm
    status: active
    summary: "アトリエの LLM PC（RTX 2080 Ti 11GB）の小さいモデルを、毎日の仕事で測りながら育てる。最終目標は、このセッションでやっている作業をローカル主導でこなし、難しいところだけ外に振ること"
    next_action: "10/1 12時のリーグ戦の結果を見て、種の選別で「用が足りる最小のモデル」を決める"
    next_action_at: "~/atelier-lab/llm-train/ledger.jsonl と league.py（計画は llm-train/PLAN.md）"
    link: "https://github.com/alinxcy/atelier-lab"
  - slug: atelier-lab
    status: active
    summary: "アトリエ(作業場)の計測と制御。20A の天井の中で何を動かせるかを実測で決める。通知と見張り（ntfy・Uptime Kuma・MQTT）もラズパイに置いた"
    next_action: "操作盤の「PC のプラグを切る前の確認」を実機で締める。「やめる」で切れないのは確認済み、「切る」で本当に切れるのは未確認"
    next_action_at: "~/atelier-lab/wake/panel.py の PROTECT と、キュー 20260830-201348-486"
    link: "https://github.com/alinxcy/atelier-lab"
  - slug: q3pe-recorder
    status: active
    summary: "遊んでいた PX-Q3PE を kernel 7.0 で生き返らせた。録画→CM検出(自宅)→安い枠でアトリエの GPU エンコ→Drive まで一本につながり、毎日回っている"
    next_action: "9/30 に入れた失敗の通知（録画の抜け・CM 0件・後処理の失敗）を1週間見て、誤報と見逃しを数える"
    next_action_at: "~/record_system/tools/rec_postproc.py の tell()"
    link: "https://github.com/knight-rider/ptx"
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
  - slug: fugu-lab
    status: blocked
    summary: "Sakana Fugu を月額契約すべきか判断するための計測環境。チャットで使い、使用データを溜める"
    next_action: "契約をどうするか決める。判断期限の9月末を過ぎた"
    next_action_at: "~/atelier-lab/llm-train/PLAN.md（ローカルで代わりを育てる計画）"
    link: "/works/fugu-lab/"
  - slug: kuroko-chat
    status: active
    summary: "常時起動セッション(クロコ)の窓口を自前のローカルアプリに移す。実装は Antigravity"
    next_action: "キューの画面（agy 製の queue.html）を Claude の予測版と並べて、本人が選ぶ。Phase 0 はその後"
    next_action_at: "~/atelier-lab/wake/queue.html"
    link: "/state/"
  - slug: peak-shifter
    status: blocked
    summary: "JEPX の価格差に負荷を寄せる。取り分の8割が LED栽培棚で、その棚がまだ無い。いま寄せているのはキューの計算仕事だけ"
    next_action: "栽培棚の LED が入るのを待つ。水耕の苗は9/28に仕込んだが、光は昼の自然光だけ"
    next_action_at: "~/atelier-lab/wake/queue.py（最安の枠・電力の大きい順）と jepx/peakshift.py"
    link: "https://github.com/alinxcy/atelier-lab"
pending:
  - id: fugu-contract-after-deadline
    question: "Fugu の契約をどうするか。判断期限の9月末を過ぎた。ローカルLLMの育成を「Fugu の代わりを作る計画」とするなら、結果が出るまで課金を増やさず現状維持、が計画書の案"
    raised: 2026-10-01
  - id: llm-train-resources
    question: "大きいモデルを試す前提の確認。Google Cloud の無料クレジットの額・期限・使えるサービスと、手元に 2080 Ti がもう1枚あるか"
    raised: 2026-09-30
  - id: yahoo-watch-go
    question: "ヤフオクの見張りをやるか。読み取りの部品はできたが、規約はスクレイピングを名指しせず、包括条項（提供目的を超えた利用・BOT での操作）がある。やるなら何を見張るか"
    raised: 2026-09-30
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
  - id: playground-role
    question: "claudePlayGround を配布元にするか保管庫にするか。skill-return という還流の仕組みまで作ってあるが、5週間動いていない"
    raised: 2026-08-27
  - id: kuroko-chat-session-switch
    question: "kuroko-chat にセッション切り替えを入れるか。2026-09-10 に「会話の履歴が原因で道具が使えなくなり、中からは直せない」状態が実際に起きた。本質は切り替えではなく『書き出してから切り替える』(update-state を走らせ、成功したら新セッション)。Phase 1 の窓より前に来る可能性がある"
    raised: 2026-09-10
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **通知と見張りをラズパイに集めた（9/30）** — ntfy（スマホとブラウザへの通知。
   tailnet の中だけの HTTPS）、Uptime Kuma（生存の見張り）、Mosquitto（MQTT）。
   定時の仕事の失敗、キューの失敗、録画の抜けと CM 0件、充電の異常が**全部スマホに届く**。
   **どれも一度わざと失敗させて、届くのを確かめた**
2. **ローカルLLMの育成を始めた（9/30）** — 計画は `llm-train/PLAN.md`。
   段は L0 判定・要約 → L1 見立て → L2 手順の実行（スマホで承認）→ L3 小さな修正 → L4 段取り。
   **測ってから育てる**。いまは L0 で、題材は3つ（種の選別・朝の3行・ヤフオクの見張り）
3. **朝の3行（毎朝5:30）** — 事実は機械が集め、LLM は選んで言葉にするだけ。
   事実に無い数字が入ったら機械の版に落ちる。入口のタイルとスマホに出る。
   **10/1 から通知に 👍/👎 のボタン**が付き、押すとラズパイに記録される（見せた版 llm/rule と一緒に）
4. **操作盤を作り直した（9/30〜10/1）** — 24時間の図を画面の幅で描き、拡大・移動・値の読み取り。
   室温と湿度は目盛り付きの2段。**PC のプラグは切る前に確認を挟み、サーバーも確認なしの「切る」を断る**
5. **キューを電力の大きい順に回す（9/30）** — 安い枠は短いので、食う方を先に置く。
   実測: LLM の推論 約310W、録画のエンコード 約95W
6. **録画** — 毎日回っている（9/30 は11本をエンコード）
7. **peak-shifter と栽培棚** — 水耕の苗は仕込んだが、LED の棚はまだ

**詰まり方は3種類。** 書けば進むもの、物が届くまで動けないもの、
**人間が決めれば動くもの**。判断1つで進む方が一番安い。

## 2. 次のアクション

### local-llm — リーグ戦の結果から「用が足りる最小のモデル」を決める

10/1 12:00 の最安コマで、小型4本（qwen3 1.7B・4B、gemma3 1B・4B）を入れて、
手持ちの全モデル × 聞き方 v1/v2 を「銀の正解集」428語で回す。結果は台帳とスマホに届く。

- 直前に試したこと: 聞き方 v2（定義の書き直し＋境目の例。例には問題集に無い語だけを使う）で、
  gemma4 62→79%、qwen3:8b 63→83%。**同じ条件で2回解かせると 2.6点ぶれた** → 1回の差で順位を決めない
- 間違い方: 会社名・ファイル名・関数名・版番号を「種」にしてしまう。量子化の型名や評価用データの名前を落とす。
  次の聞き方 v3 はここを狙う（`llm-train/seeds/NOTES.md`）
- 銀の正解集は Fugu の癖を含む。**銀で満点に近づくのは「Fugu に似た」でしかない**。
  本命（金）は、アングラさんの一次判定（173語）→ クロコの裁定で作る。依頼書は本人が渡す待ち
- 評価の道具 `eval.py` はコデちゃんへの依頼書まで（`llm-train/task_codex_eval.md`）。本人が起動する待ち
- **聞き方 v3 を足した（10/1）**: 会社名・拡張子付き・大文字と _ の識別子・版番号・自分で名付けた名前は「語」、
  形式名・ベンチマーク・拡張機能は「種」。同じリーグ戦で qwen3:8b と gemma4 から先に測る。
  例に問題集の語を使わないことはテストで照合している（最初の照合は大文字小文字を区別していて、わざと混ぜた語を見逃した）

### atelier-lab — PC のプラグの確認を実機で締める

- 「やめる」→ 切れないことは、本番の操作盤で確認した（プラグは on のまま、切る要求は送られない）
- **「切る」→ 本当に切れることは未確認。** PC の電源が落ちて WoL が効かなくなるので、
  PC を落としてよい時にアトリエで試す（切ったら入れ直して、電源ボタンを押す）
- 直前に試したこと: 偽の switch で、守りをわざと外すと確認なしの「切る」が通ってしまうのを見てから戻した

### q3pe-recorder — 通知の誤報と見逃しを数える

録画の抜け（5分以上）、CM 0件（探したのに0件だったときだけ）、後処理の失敗がスマホに届く。
1週間ぶんを見て、閾値を直す。

### fugu-lab — 契約を決める

判断期限の9月末を過ぎた（pending）。ローカルの育成が Fugu の代わりになるかは、
リーグ戦と金の正解集で測ってから言える。Fugu の過去の判定は、401回中246回が利用上限のエラーだった。

### knowledge-garden — /works/ を /projects/ に改名するか決める

リンクが動くので本人の確認待ち。log は毎日1本ずつ書いている（9/28・9/29 を足した）。
棚卸しの結果も毎日サイトへ反映している。

### foundation — 外注の振り分けを1箇所にまとめる

次の1手は 9/17 から変わっていない（進み具合は、この棚卸しでは確かめていない）。
台帳の置き場は `foundation/delegation/`。

### kuroko-chat — キューの画面を本人が選ぶ

agy 製の `queue.html` と Claude の予測版を並べて選ぶ。Phase 0（読む窓）はその後。

## 3. 作業中の暗黙知

### 検査は一度わざと落とし、副作用まで見る

終了コードとログでは足りない。操作盤の守りは、偽の switch が**呼ばれた回数**で見た。
キューの並べ替えは逆順に壊して、テストが落ちることを確かめてから戻した。

### Ollama の出力は JSON スキーマで縛る

`format="json"` だけだと、gemma4 は60語を渡しても1件のオブジェクトで終わる。
**結果の配列をスキーマで縛ると 60/60 返る。** 使い終わったら `keep_alive: 0` で降ろす
（載ったままだと、PC を寝かせる道具が「使用中」と見て断る）。

### 置き場所を先に確かめる

通知と見張りを自宅の PC に入れてから、話の流れがラズパイの余力の話だったと気づいた。
**何をどこで動かすかは、入れる前に一度口に出す。**

### ラズパイでは systemd の MemoryMax が効かない

カーネルが `cgroup_disable=memory` で起動している。「上限を付けた」と言った後で、
`MemoryCurrent` が `[not set]` と出て気づいた。代わりに OOMScoreAdjust（尽きたら先に落ちる側）にした。

### ntfy のブラウザ通知は https が要る

Chrome のフラグでは通らない。ntfy の Web アプリ自身が https かどうかを見ている。
tailnet の中だけの HTTPS（Tailscale の serve）で解いた。外には出していない。

### 図は viewBox を固定して縮めない

操作盤の図は幅960固定で、スマホでは字も図も3分の1（高さ78px）に縮んでいた。
**実際の幅で描き直し、画面の向きが変わったら描き直す。**

### 例外を握りつぶす try/catch は、壊れても何も言わない

操作盤の描き直しで変数の宣言を1つ落とし、図が丸ごと出なくなった。
読み込みの try/catch が例外を捨てるので、画面は空のまま黙っていた。ブラウザで関数を直接呼んで見つけた。

### pending は古びる。現物を見る

10/1 の棚卸しで、**決まっていたのに pending に残っていた2件**を見つけた
（充電の締切14時・LLM PC をアトリエに置く）。承認がコードのコメントにだけあった。
**本人に判断を仰ぐ前に、現物と DECISIONS.md を見る。**

### 日付は毎回 `date` を叩く

長いセッションでは「今日」がずれる。**相対日付を書く前に確認する。**
