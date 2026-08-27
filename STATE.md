---
schema_version: 2
last_updated: 2026-08-27T12:05+09:00
current_focus: "Skill が26本あって3本しか見えていなかった。一元化の方針を決めるのが先。9/5 の LAN 振り直しは日付の律速として並走"
projects:
  - slug: life-os
    status: active
    summary: "状態と運営の仕組みそのもの。非公開リポジトリ alinxcy/life-os が本体で、公開できる結論だけをこのサイトへ出す"
    next_action: "Skill 26本をどこに集約するか決める。~/.claude/skills/ に寄せると全リポジトリで効く"
    next_action_at: "~/.claude/handoffs/DECISIONS.md と tools/skill_map.py"
    link: "/works/life-os/"
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
    next_action: "枠の上限を点で押さえる。5時間で48万は通り58万で落ちた。ローカルLLM比較はその後"
    next_action_at: "LM Studio と ~/.claude/handoffs/tools/make_index.py"
    link: "/works/fugu-lab/"
  - slug: atelier-lab
    status: active
    summary: "アトリエ(作業場)の計測と制御。20A の天井の中で何を動かせるかを実測で決める"
    next_action: "PZEM-004T v3.0(TTL版) と ESP32-DevKitC を注文する。冷蔵庫の測定は結論まで出た"
    next_action_at: "https://github.com/alinxcy/atelier-lab"
    link: "https://github.com/alinxcy/atelier-lab"
  - slug: kuroko-chat
    status: active
    summary: "常時起動セッション(クロコ)の窓口を自前のローカルアプリに移す。実装は Antigravity"
    next_action: "Phase 0(読む窓)を Antigravity に渡すか、先に LAN 振り直しをするか決める。サイドチャットを仕様に追加済み"
    next_action_at: "~/kuroko-chat/SPEC.md"
    link: "/state/"
  - slug: peak-shifter
    status: blocked
    summary: "JEPX の価格差に負荷を寄せる。取り分の8割が LED栽培棚で、その棚がまだ無い"
    next_action: "棚を待つ。冷蔵庫もポタ電も実測で消えたので、いま作る対象が残っていない"
    next_action_at: "atelier-lab の jepx/peakshift.py"
    link: "https://github.com/alinxcy/atelier-lab"
pending:
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
  - id: home-router-add
    question: "自宅のルータは壁埋め込みで触れない。自分のルータを1台足して 192.168.x を作るか。Tailscale は 100.64.1.x のままでは入れられない"
    raised: 2026-08-26
  - id: works-to-projects
    question: "/works/ を /projects/ に改名するか。既存リンクが動くのと、works の手書き本文を projects の本文として生かすかがセットで決まる"
    raised: 2026-08-27
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
  - id: kuroko-chat-order
    question: "kuroko-chat の Phase 0(読む窓)を先に Antigravity へ渡すか、先に LAN 振り直し+Tailscale をやるか。Phase 1 に入るとスマホから触れなくなるので順番が効く"
    raised: 2026-08-22
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **Skill の一元化** — **26本あって、私が見えていたのは3本だった**（2026-08-27）。
   置き場所で効く範囲が決まる。`~/.claude/skills/` の1本だけが全リポジトリで効いていた。
   **判断1つで動く**（`pending: skills-single-home`）。
2. **LAN の振り直し** — **9/5 の PC 移設までに必ず要る。** `kuroko-chat` の Phase 1 と
   自宅ラズパイの両方が待っている。**トークンを使わない物理作業**なので別枠。
   手順は `~/.claude/handoffs/2026-09-05-lan-runbook.md`。**現地5分の確認で分岐が決まる。**
3. **kuroko-chat** — 仕様は固まった。**着手の順番だけが未決**（`pending: kuroko-chat-order`）。
4. **knowledge-garden** — v3 は動いた。**サイトには出していない**（デプロイ元へ未反映）。
   残るは `/works/` → `/projects/` の改名の判断。
5. **fugu-lab** — 枠の形は測れた。索引の作り直しが**残り19本**、夜間ジョブが拾う。
6. **q3pe-recorder** / **atelier-lab** — **どちらも買い物待ち。** 手を動かす作業が無い。
7. **peak-shifter** — **実測で対象が2つ消えた。** 棚が来るまで作るものが無い。
8. **life-os** — 運営の仕組みそのもの（ を統合）。**本体は非公開リポジトリ。**

**詰まり方が3種類に分かれている。**
`knowledge-garden` は書けば進む。`q3pe-recorder` と `atelier-lab` は物が届くまで動けない。
`Skill の一元化` と `kuroko-chat` は**人間が決めれば動く**。**判断1つで進む方が一番安い。**

## 2. 次のアクション

### Skill の一元化 — 置き場所を決める（判断1つで動く）

**26本ある。私が見えていたのは3本だった**（2026-08-27 に `tools/skill_map.py` で数えた）。

```
~/.claude/skills/          1本   offload                    ← **どこでも効く**
Tamorian7.com/.claude/     2本   tamorian7 / update-state
fugu-lab/.claude/          6本
claudePlayGround/.claude/ 17本   ← 手元にクローンすら無かった
```

- **効く範囲は置き場所で決まる。** リポジトリ側のものはそこを出ると消える。
  今夜 `atelier-lab` と `fugu-lab` を直したとき、`tamorian7` も `update-state` も効いていない
- **重複4本は1バイトも違わなかった**（`frontend-design` / `md` / `skill-creator` /
  `skill-harvester`）。「いいとこ取り」する差は無い。**配布の問題であって品質の問題ではない**
- **既に道具は揃っている。** `skill-harvester`（候補の検出）/ `skill-creator`（作成とA/B評価）/
  `skill-optimizer`（診断）/ `skill-return`（還流）/ `playground-spawn`（切り出し）。
  **設計は完成していて運用が止まっている**（最終 push は 2026-07-20）
- **決めること**: `~/.claude/skills/` に寄せるか、`claudePlayGround` を配布元のまま維持するか
  （`pending: skills-single-home` / `playground-role`）

### 作る2本（着手前 / 検証）

**skill-harvester と自分の判断で、別々のものが出た。合わせて2本にする。**

| | 入力 | 出るもの | いつ効く |
|---|---|---|---|
| **着手前** | メモリの `type: feedback` 9本 | 作る前に探す / 日付を叩く / 索引を信じず本文 | **作る前** |
| **検証** | 今夜踏んだバグ5件 | 0件を検査するな / 副作用まで見ろ / 母集団を疑え / 単位 / 分母 | **作った後** |

**片方では防げない。** `作る前に探す` を守っても、作った検査が0件を検査していたら素通りする。

**メモリの1行では止まらなかった。** `search-before-designing` は既にあるのに、
2026-08-27 に4回、既にあるものを作り直しかけた。**手順で道具の呼び出しを含むものは Skill へ。**

### kuroko-chat — 順番を決める（判断1つで動く）

- **仕様は `~/kuroko-chat/SPEC.md`。実測は `probes/` 5本。** 推測で書いた行は無い。
- **選ぶのは2つのうちどちらを先にやるか。**
  - **A. Phase 0（読む窓）を Antigravity に渡す** — 今日から動ける。
    transcript を読むだけなので**既存の Remote Control を壊さない**
  - **B. 先に LAN 振り直し + Tailscale** — 退路を作ってから全部やる。作業中ネットが落ちる
- **なぜ順番が効くか**: `/remote-control` は `--print` で拒否される（実測）。
  **アプリがセッションを持った瞬間、スマホからクロコに触れなくなる。**
  実装で回避できないので、Tailscale は Phase 1 の**前**に要る。
- **引き継ぐべきセッションを取り違えていた。** スマホで「常時起動プロセス・接続済み」と
  出ているのは `kind:"background"` の方。`pts/0` の `tamorian7-com-da`（`interactive`）は
  **2日前から idle**。仕様書は修正済み。
- **`~/kuroko-chat` は private。** `config/` に File Bridge の許可ルートが入るため。

### knowledge-garden — v3 は動いた。残るは改名の判断

- **トップをダッシュボードにした**（2026-08-27）。STATE.md を機械が描き、
  記事は人が書く。プロジェクトごとに紐づく記事をチップで出す（2軸の交点）。
- **`/seeds/` の一覧が存在していなかった。** 詳細ページだけあってリンク先が無い状態。
- **`/toolbox/` を作った。** INVENTORY.md を描くだけで、手では書かない。
  読めなかったらビルドを止める（黙って空を描くと古いのか壊れたのか分からない）。
- **ナビを6本に固定した**（Garden / Log / Works / Seeds / Toolbox / Search）。
  上が動くと置き場所を覚えられなくなる。Tags と State はトップの下段から。
- **seeds の `url` を必須から外した。** 種の入口は2つあるのに、必須のままだと
  会話由来のものが1本も入らない。→ `pending: seed-url-optional`
- **残っているのは判断1つ**: `/works/` を `/projects/` に改名するか
  （`pending: works-to-projects`）。**リンクが動くので勝手にやらない。**

### q3pe-recorder — 買い物待ち。ドライバ側は完成

- **動く。** `sudo modprobe pxq3pe_drv` の1コマンドで 8本のノードが出て、
  チューニングも収録も通る（`Recorded 3sec`）。
- **止まっている理由は物理。** ケースが干渉してカードの片方の端子にしか挿さらない。
  **短いのではなく細いケーブル**が要る（S-2.5C-FB、外径4mm、**差込式L型**）。
  ねじ式は本体が太く回す空間も要るので不利。
- **B-CAS の USB カードリーダーが要る**（SCM SCR3310/v2.0、**USB-A の型**）。
  カード本体は所持済み。
- **測ってから買う**: 端子面から干渉物までの mm / どちら向きが空いているか /
  干渉物は何か。**スロットカバーの縁ならタダで解決する。**
- 上物（Mirakurun + EPGStation）は Antigravity が `~/record_system/` で配管まで通した。
  **2026-08-26 に実際に読んだ**（`~/.claude/handoffs/2026-08-26-record-system-findings.md`）。
  **`dbtype: sqlite` は既に済んでいた。** 残るは docker-compose の postgres 残骸と、
  **バグ2件**: `encode.cmd` が存在しない `config/enc.js` を指している（録画は通るので
  エンコードで初めて落ちる）／ `dummy-gr`（`sleep 30`）が `isDisabled: false` のまま。
- **`tuners.yml` の偶数=t／奇数=s は正しく書けている。**

### fugu-lab — 索引の作り直しが残り19本

- **落ちる原因が分かった（2026-08-20）。** アプリのバグではない。
  **コールドブートで消える。** ログは正常終了のまま終わっていた。
- Q3PE の作業でマシンを2回落としたので、**手起動の運用はもう保たない**。
  `systemd --user` のサービスにして `enable --now` するのが筋。
- **フォールバックは動いていなかった**（2026-08-27 に判明）。鍵をサービスだけが
  環境変数で渡していて、CLI から呼ぶと届かない。**一度も成功したことがなかった。**
  `~/.claude/secrets/sakana-api-key` を直接読むよう直し、一段目を殺して確認済み。
  なお**枠切れの受け皿にはならない**（枠はアカウント単位）。効くのはアプリが落ちたときだけ。
- **枠は日次ではなく5時間窓**（2026-08-27 実測）。最初の1回で窓が開く。
  **48万トークンは通り、58万で落ちた。** 大きいバッチは窓の頭に置く。
  → `garden/five-hour-window.md`。**投げる前に `tools/window.py` で残りを見る**
- **品質ゲートが一度も何も止めていなかった**（2026-08-27 朝に発覚）。判定して報告して
  `exit(3)` するが、**書いたファイルを消していなかった**。呼ぶ側は「無ければ作る」ので
  次の回は飛ばす。対象56本のうち31本が落ちる品質のまま溜まっていた。
  → 落ちたら `.rejected` へ退避する。**残り19本を夜間ジョブが作り直す**
- **識別子が20個未満の会話では残存率の判定を棄権する。** 日本語だけの議論では
  2〜5個しか取れず、0/50/100% の粗い値しか出ない。**測れないことと悪いことは違う**
- `ttft_s` を `number | null` にする件は `pending: fugu-ttft-null` へ移した。

### atelier-lab — まだ何も買っていない

- 部品構成は決まっている。**PZEM-004T v3.0（クランプ100A、TTL版）+ ESP32-DevKitC**。
- **用途は趣味の実時間表示と月次集計。** アラートは要らないと本人が判断した。
- **落ちた瞬間のデータが取れない問題**は未解決。監視装置が同じ回路にあると、
  ブレーカーが落ちた瞬間に ESP32 も死ぬ。
- 住所・賃料・不動産会社の連絡先は**このリポジトリにも atelier-lab にも書かない**。

### peak-shifter — 実測で対象が2つ消えた（2026-08-27）

**「棚を待たずに v1 を作るか」への材料が揃った。答えは「待つ」に寄った。**

- **冷蔵庫は動かす価値が無い。** 6日・147.9時間の実測で月1,344円。
  **一日中平らに使っても −6円**しか変わらず、**理想の上限でも月303円**
  （18時間ぶんの冷気を溜める前提なので、実際はその何分の一か）
- **ポタ電も見合わない。** 08-27 はこの期間で最も差が大きい日のひとつだが、
  ピーク限定の分岐点 64.6% を推定 66.3% がかろうじて上回るだけで、
  **得は 100W×4h で30日18円**。電池の値段は1円も入れていない
- **残るのは LED栽培棚だけ。** 大きさと**時間の自由度**の両方があるのはこれしかない

**「動かせる負荷」の条件は2つあって、大きいことと、何時間もずらせること。**
冷蔵庫は後者が無く、ポタ電は変換で食われる。→ `garden/fixed-cost-kills-arbitrage.md`

- **143日の実測での取り分**（`jepx/peakshift.py`）。
  ```
  [電池不要] LED栽培棚 200W×12h  毎日窓を引き直して → 年 1,586〜3,948円
  [電池不要] ポタ電600Wh 毎日充電  充電窓の選択だけ   → 年 1,168円
  [要改造 ] 待機0.6kWh/日を電池経由 → 年   825円  インバータのアイドル5Wで相殺される
  ```
  **棚の数字を 2026-08-27 に直した。** 元の年5,185円は**最良の窓と最悪の窓の差**で、
  **誰も最悪の窓は選ばない。** 素朴に昼で回す前提なら1,586円、夜なら3,948円。
  **どちらかは「制御が無かったら自分がいつ点けていたか」で決まる。**
  **v1 に電池は要らない。** 取り分のほぼ全部がソフトだけで取れる。
  **上の「月18円」と矛盾しない。** ポタ電の年1,141円は
  「どうせ充電するなら安い窓で」という話（損失ゼロ）で、
  月18円は「電池を通してピークを肩代わりさせる」話（往復66%で食われる）。
  **前者はやる価値があり、後者は無い。**
- **固定スケジュールでは駄目**。ただし**理由を取り違えていた**（2026-08-27 に数え直した）。
  「`README` の『夏は昼が最安』は崩れている」と書いていたが、**それは 8/21 の1日で言っていた。**
  149日ぶんで最安2時間の開始時刻を数えると:
  ```
  昼  09-16 に来た日  94/149 = 63%   最頻は 11時台(32日)
  深夜 00-06 に来た日  16/149 = 11%
  ```
  **README は傾向としては正しい。** 崩れているのではなく、**規則ではなく傾向**だった。
  だから固定では駄目で、**毎日引き直す設計で正しい**（結論は変わらない）。
- **そして「深夜に充電しておけば安い」という直感は9割方外れる。**
  素朴な深夜(02-04)は 12.93円で、毎日の最安 7.25円より **78%高い**。
  **制御の価値は最適解に勝つことではなく、外れた直感に勝つことにある。**
- **棚は存在せず、何を育てるかも未定**（葉物80-100W か 実もの220W+ かで倍半分変わる）。
  設計そのものは 2026-07-30 に済んでいる（170×80cm、床置きトロ舟＋天面吊りLED）。

### life-os — 運営の仕組みそのもの（state-hub を統合した）

**2026-08-27 に3つを1つにした。** `state-hub`（状態ファイルの役割分け）と
`life-os`（それを描くページ）は**同じものを2つの名前で呼んでいた**。
描く役はトップのダッシュボードが吸収したので、名前の方を運営全体に寄せた。

**本体は非公開リポジトリ `alinxcy/life-os`**（旧 `claude-handoffs`）。
ローカルは `~/.claude/handoffs` のまま — 直書きしている箇所が多すぎて、
パスを変える価値が無い。

```
public   Tamorian7.com    作っているもの・技術の結論
private  life-os          運営・生活の側（電力・冷蔵庫・会話ログ・道具32本）
```

- **決定は `life-os/DECISIONS.md` に書く**（2026-08-27 に新設）。
  `Tamorian7.com/DECISIONS.md` は公開物の決定。**寿命が違うので統合しない**
- **`pending[]` に決着条件のキーは足していない。** `question` の文字列に
  書き込めるので、まずそれで足りるか試す。足りないと分かってからキーを足す
- **`pending` が12件に増えた。** 溜まりすぎたら「捨てる」も選択肢にする
- **`next_action_at` は文字列1個で足りている。** 着手する場所は1つで表せる

**いま詰まっているのは Skill の一元化**（`pending: skills-single-home`）。
26本あって常に効くのは1本だけ、という状態が続いている。

## 3. 作業中の暗黙知

### 環境（このマシン）

- **node 22.23.2 は `~/.local/lib/node22`**（nodejs.org 公式バイナリ、SHA256 検証済み）。
- **PATH は非ログインシェルでは効かない。**
  **コマンドが `command not found` になったら `bash -lc '...'` で実行する。**
- **`sudo` と `apt` は使える。** パスワードはリポジトリ外に保管してある。
- **`gh` 2.45.0 が入っている**（認証済み、git 操作は SSH）。
- GitHub 認証は SSH（`~/.ssh/id_ed25519`）。`origin` は fetch=HTTPS / push=SSH。
- **スクリーンショットは `shot <URL> <出力.png>`**（`~/.local/bin/shot`、playwright）。
  JS 描画のページは `--selector` で要素の出現を待たせる。
  **headless Firefox は使えない。**
- **手起動したサーバは再起動で消える。** Q3PE の作業でコールドブートを繰り返したので、
  常駐させたいものは `systemd --user` に載せる。

### kuroko-chat の土台 — Claude Code を自前で常駐させる口（2026-08-22 実測）

**この節は kuroko-chat の実装根拠。** 詳細は `~/kuroko-chat/SPEC.md` §2。

- **セッションには3種別ある**: `interactive` / **`Remote Control`** / `cloud`。
  `claude agents --json` と `ListAgents` で見分けられる。**別物なので混ぜない。**
- **日常の会話相手は `kind:"background"` の方。** スマホで「常時起動プロセス」と
  出ているのがそれ。`pts/0` の `tamorian7-com-da` は `interactive` で **idle のまま**。
- **`claude -p --input-format stream-json --output-format stream-json --verbose` が
  自作クライアントの口。** `--verbose` が無いと起動時エラー。stdin を開けたままなら常駐する。
- **`ScheduleWakeup` は headless でも発火する。** `/loop` を載せ替えても死なない。
- **`/remote-control` は `--print` では使えない。** headless の
  `terminal_slash_commands` は `["doctor","color"]` の2つだけ。
- **`rate_limit_event` はストリームにしか流れず、transcript には残らない。**
  残枠情報が要るなら**セッションを自分で持つしかない**。後から取り返せない。

### PX-Q3PE（2026-08-19 に判明。再訪時にゼロから調べ直さないため）

- **px4_drv は使えない。** 対応一覧に無印 Q3PE が無く、ソースが USB 専用。
  使うのは `knight-rider/ptx` の chardev 版。パッチ済みツリーは `~/ptx-q3pe/`。
- **`sudo modprobe pxq3pe_drv` で載る**（`/lib/modules/.../extra` に導入済み、`depmod` 済み）。
  作り直したら `sudo sh ~/ptx-q3pe/tools/install.sh` で入れ替える。
- **デバイスノードは `/dev/pxq3pe_drv0<N><t|s>` の8本。地上波と衛星が交互**
  （偶数=t=GR、奇数=s=BS/CS）。`0-3 が GR` ではない。
- **`SW_CTL(0x948)` に全ビット立てて戻すと I2C の詰まりが解ける。**
  これが分かるまで、失敗のたびにコールドブートが要った。
  **`CTL_STAT=0` も PCI ファンクションリセットも効かない**（カードが PCIe リセットを無視する）。
- **内蔵 B-CAS リーダーは使えない。** ドライバ側が `return 0` のスタブ。

### ブランチとデプロイ

- **deploy 元ブランチを作業ブランチの位置まで早送りしてある。**
  `deploy.yml` の `push.branches` は `claude/code-handoff-phase-1-ruj6je` のままだが、
  そのブランチが `claude/state-hub-phase-2` と同じコミットを指している。
- push しただけでは公開されないが、**早送りすると即座に公開される。**
- main は1コミット (`Add files via upload`) のまま。**`/blob/main/STATE.md` は 404**。
  GitHub へのリンクは `garden.config.json` の `branch` を使って組み立てる。
- `.github/workflows/check.yml` はブランチ指定が無く全ブランチで発火する。

### Astro 側の注意

- **`.astro` のフロントマターで `import.meta.url` を基準に相対パスを解くと壊れる。**
  `src/` の外のファイルを読むなら `import x from '../../y?raw'` を使う。
- **`src/pages/` に置いたものは必ず公開される。** static 出力なので例外は無い。
- スキーマの正本は `scripts/state.mjs`。**描画側で YAML を読み直さない。**
- **リンクは必ず `/` から始めるか `http(s)://` にする。** サブパス配信なので相対パスは壊れる。

### 他の AI に外注するとき

- **渡せるのは仕様が先にある作業だけ。** seeds は `spec/` に frontmatter まで
  書いてあったから切り出せた。仕様の無いものを渡すと、判断ごと外注することになる。
- **プロンプトに「触るな」を列挙しておくと守る。** Codex は実際に触らず報告だけ返した。
- **別マシンなら push させる。** 「push しない」は同一マシンの作法。
- **Windows の罠は3つ**（`scratch/2026-08-16.md`）: clone 時点で CRLF に変換される /
  portable Node は子プロセスの PATH に `node.exe` が無く install script が落ちる /
  PowerShell の `>` は UTF-16 を吐く。
- **相手の成果物を見てから申し送りを書く（2026-08-19 に失敗した）。**
  `~/record_system/` を見ずに Antigravity へ指示を出し、pcscd の置き場所を逆に伝えた。
  デバイス名も「未確定」のまま渡した。**先に読めば両方防げた。**

### 公開範囲

- **リポジトリは public。** `publish: false` はサイト表示の制御であって機密の防壁ではない。
  `publish` が効くのは `src/content/` 配下だけで、`/state/` のような素のページには効かない。
- `public/` は Astro の予約語（無加工で配信される）。第三の意味を重ねない。
- **`atelier-lab` は private のままにすると決めた**（[DECISIONS.md](DECISIONS.md)）。
  このページからのリンクは**本人以外には 404 に見える**。既知の状態として許容している。
- **自動車関係は本人の承認まで載せない**（`CLAUDE.md`）。Q3PE の録画サーバは対象外。

### 導出ファイルの書き出し（2026-08-27 に痛い目を見た）

- **委託先の枠が切れて判定が全滅し、`SEED-POOL.md` を空で上書きした。**
  スクリプトは終了コード0で、ファイルを書き、前の90件を消した。
- **`~/.claude/handoffs/tools/safe_write.py` を通す。** 前より半分未満になるなら書かない。
  `tmp` へ書いて `os.replace` するので、途中で落ちても半端なファイルが残らない。
- **道具を job の tmp に置かない。** ジョブと一緒に消える。`tools/` へ移す。
- **systemd のユニットは `tools/` に控えがある。** 毎日動くものが手元にしか無かった。

### Skill とフック（2026-08-27）

- **Skill は置き場所で効く範囲が決まる。** `~/.claude/skills/` は全リポジトリ、
  `<repo>/.claude/skills/` はその中だけ。**全体は26本あり、常に効くのは1本だけ**
- **`tools/skill_map.py` で数える。** `inventory.py` は「いま効いているもの」しか出さない
- **Skill 呼び出しはフックで拾える。** `PostToolUse` / `PostToolUseFailure` の
  `matcher: "Skill"`。`tool_input.skill` に名前が入る。**再読込なしで効いた**
- 記録は `~/.claude/handoffs/skill-use.jsonl`。記録係は**何が起きても終了コード0**で返す。
  記録が本体を巻き込んで止めるのは本末転倒

### 検査を書くときの決めごと（2026-08-27 に2回続けて踏んだ）

- **検査を足したら、必ず一度わざと落として、期待した副作用まで見る。**
  終了コードとログでは足りない。**「ゲートに掛かった」と出るのに成果物が残っていた**
- **対象が0件なら「検査した」ことにしない。** 空のループは常に通る。
  `walk()` が `.md` しか返さず `.astro` が0件だった
- **閾値を決めるとき、その母集団が疑っている当のものの産物でないか確かめる。**
  ゲートに掛かって残った索引を含む分布で、そのゲートの閾値を決めかけた
- **単位を揃える。** `len()` は文字数、ファイルサイズはバイト。日本語は1文字3バイトで
  **3倍甘くなる**。日付は `toISOString()` が UTC で、JST の朝方が前日になる
- **分母が足りない指標は棄権させる。** 落とすのと測れないのは違う

### 既知の未処理

- `npm run check` は **error 0 / warn 0**。`reversible-vs-irreversible.md:60` の「必ず」は
  文章を変えず `<!-- reason: -->` で意図を明示した。
  **判定を通すために断定を薄めるのはやらない。**
- **`npm audit` は 3件**（high: js-yaml `GHSA-5p4m-2wfm-xmqj` / nanoid `GHSA-2v37-7h3g-55p8`、
  moderate: postcss `GHSA-fxqj-rqcc-2cmp`）。すべて `npm audit fix` で消えると出ている。未実施。
  **これは Linux 側でやる。** CI が ubuntu で `npm ci` するので、Windows で
  lockfile を再生成すると linux 用の optional dependency が落ちてデプロイが壊れうる。
- **`npm test` は CI に載っていない**（`deploy.yml` は `check` と `build` のみ）。
  赤くなっても誰も止まらないので、**手で回すしか無い。**
- `astro dev` はデーモンとして起動する（`astro dev stop` / `astro dev status`）。
  `npm run dev` がすぐ exit 0 で戻るのはそのため。落ちたわけではない。
- **スキーマを変えたらスキルも直す。** `update-state` の SKILL.md が v1 のまま
  `progress` を書けと指示していた（08-20 に修正）。**`CLAUDE.md` の表だけ直しても、
  スキルを素直に読んだ人が踏む。**
