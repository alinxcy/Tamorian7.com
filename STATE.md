---
schema_version: 2
last_updated: 2026-08-22T19:53+09:00
current_focus: "クロコの窓口を自前アプリに移す仕様が実測の上で固まった。Phase 0 を渡すか、先に LAN を振り直すかを決める段階"
projects:
  - slug: state-hub
    status: active
    summary: "STATE.md / DECISIONS.md / CLAUDE.md の役割を分けて、状態を1箇所に集める仕組み"
    next_action: "pending 5件に決着条件を書けるか人間と詰める。スキーマ変更の要否はそこで決まる"
    next_action_at: "STATE.md の pending[]"
    link: "/state/"
  - slug: life-os
    status: paused
    summary: "STATE.md を人間が読める形に描画するページ。進捗率をやめ、要約とリンクのハブにした"
    next_action: "描画対象を広げるかは、実際に使ってから決める。いまは判断材料が足りない"
    next_action_at: "src/pages/state.astro"
    link: "/state/"
  - slug: knowledge-garden
    status: active
    summary: "このサイトそのもの。4層モデル(seeds/log/garden/works)で育てる Astro の器"
    next_action: "Q3PE の実録を log に起こす。scratch/2026-08-19.md に材料は揃っている"
    next_action_at: "src/content/log/"
    link: "/works/knowledge-garden/"
  - slug: q3pe-recorder
    status: blocked
    summary: "遊んでいた PX-Q3PE を kernel 7.0 で生き返らせる。ドライバは動いた"
    next_action: "極細アンテナケーブルと USB カードリーダーを注文する。ドライバ側の作業は無い"
    next_action_at: "~/ptx-q3pe/(パッチ済み) と ~/record_system/(上物)"
    link: "https://github.com/knight-rider/ptx"
  - slug: fugu-lab
    status: active
    summary: "Sakana Fugu を月額契約すべきか判断するための計測環境。チャットで使い、使用データを溜める"
    next_action: "chat アプリを常駐化する。手起動だと再起動のたびに消え、記録が残らない"
    next_action_at: "fugu-lab/chat/ を systemd user service にする"
    link: "/works/fugu-lab/"
  - slug: atelier-lab
    status: active
    summary: "アトリエ(作業場)の計測と制御。20A の天井の中で何を動かせるかを実測で決める"
    next_action: "PZEM-004T v3.0(TTL版) と ESP32-DevKitC を注文する。まだ何も買っていない"
    next_action_at: "https://github.com/alinxcy/atelier-lab"
    link: "https://github.com/alinxcy/atelier-lab"
  - slug: kuroko-chat
    status: active
    summary: "常時起動セッション(クロコ)の窓口を自前のローカルアプリに移す。実装は Antigravity"
    next_action: "Phase 0(読む窓)を Antigravity に渡すか、先に LAN 振り直しをするか決める"
    next_action_at: "~/kuroko-chat/SPEC.md"
    link: "/state/"
  - slug: peak-shifter
    status: blocked
    summary: "JEPX の価格差に負荷を寄せる。取り分の8割が LED栽培棚で、その棚がまだ無い"
    next_action: "棚を待たずに v1 を作るか決める。作るなら対象はポタ電の充電窓だけになる"
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
    question: "栽培棚が無いままピークシフター v1 を作るか。棚を除くと取り分が年5000円強から1000円強に落ちる"
    raised: 2026-08-20
  - id: kuroko-chat-order
    question: "kuroko-chat の Phase 0(読む窓)を先に Antigravity へ渡すか、先に LAN 振り直し+Tailscale をやるか。Phase 1 に入るとスマホから触れなくなるので順番が効く"
    raised: 2026-08-22
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **kuroko-chat** — 仕様が固まった。**着手の順番だけが未決**（`pending: kuroko-chat-order`）。
   実装は Antigravity に出すので、こちらの手は空く。
2. **knowledge-garden** — 器は揃った。**中身が要る。**
   いま一番書ける材料は Q3PE の実録で、`scratch/2026-08-19.md` に4セクション分の原料がある。
3. **q3pe-recorder** — ドライバは動いた。**残りは買い物だけ**で、手を動かす作業が無い。
4. **fugu-lab** / **atelier-lab** — どちらも「作ったが、まだ溜まっていない」。
   fugu は常駐化、atelier は注文。**どちらも判断ではなく手続き。**
5. **peak-shifter** — 計算は終わっている。**作る対象が存在しない**ので止まっている。
6. **state-hub** / **life-os** — 実装は済み。使ってから決める段階。

**詰まり方が3種類に分かれた。**
`knowledge-garden` は書けば進む。`q3pe-recorder` と `atelier-lab` は物が届くまで動けない。
`kuroko-chat` は**人間が順番を決めれば動く**。**判断1つで進む方が一番安い。**

## 2. 次のアクション

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

### knowledge-garden — Q3PE を log に起こす

- **原料は揃っている。** `scratch/2026-08-19.md`（時系列、効かなかった手、自分のミス3件）。
- **4セクションが全部埋まる**と確認済み。1=カードが遊んでいた / 2=実測でわかったこと /
  3=刺さった罠 / 4=未確定のまま残したこと。
- **直前に間違えたこと**: 「2 は数字が要るので電波が来るまで書けない」と判断した。
  型の指定は「数字**には**単位と測定条件」であって、**数字を書けとは言っていない**。
  質的な実測（PCIe リセットを無視する、等）で 2 は埋まる。**書き時は今。**
- B-CAS の復号手順は書かない。**内蔵リーダーがスタブという事実だけに留める。**

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
  **DB を SQLite に寄せる指示がまだ渡っていない**（postgres コンテナが未使用のまま起動している）。

### fugu-lab — 手起動をやめる

- **落ちる原因が分かった（2026-08-20）。** アプリのバグではない。
  **コールドブートで消える。** ログは正常終了のまま終わっていた。
- Q3PE の作業でマシンを2回落としたので、**手起動の運用はもう保たない**。
  `systemd --user` のサービスにして `enable --now` するのが筋。
- **記録が残らない仕組みは変わっていない**: `tools/fugu_offload.py` は既定で chat 経由、
  アプリが落ちていると直接 API にフォールバックし、**その経路は記録されない**。
- `ttft_s` を `number | null` にする件は `pending: fugu-ttft-null` へ移した。

### atelier-lab — まだ何も買っていない

- 部品構成は決まっている。**PZEM-004T v3.0（クランプ100A、TTL版）+ ESP32-DevKitC**。
- **用途は趣味の実時間表示と月次集計。** アラートは要らないと本人が判断した。
- **落ちた瞬間のデータが取れない問題**は未解決。監視装置が同じ回路にあると、
  ブレーカーが落ちた瞬間に ESP32 も死ぬ。
- 住所・賃料・不動産会社の連絡先は**このリポジトリにも atelier-lab にも書かない**。

### peak-shifter — 計算は終わり、対象が無い

- **143日の実測で結論は出ている**（`jepx/peakshift.py`）。
  ```
  [電池不要] LED栽培棚 200W×12h  点灯窓の選択だけ  → 年 5,185円
  [電池不要] ポタ電600Wh 毎日充電  充電窓の選択だけ  → 年 1,141円
  [要改造 ] 待機0.6kWh/日を電池経由 → 年   820円  インバータのアイドル5Wで相殺される
  ```
- **v1 に電池は要らない。** 取り分のほぼ全部がソフトだけで取れる。
- **ただし8割が栽培棚に乗っている。** 棚は存在せず、何を育てるかも未定
  （葉物80-100W か 実もの220W+ かで必要W数が倍半分変わる）。
- **固定スケジュールでは駄目だという裏付けが取れた（2026-08-20）。**
  8/20 の最安窓は 09:30-13:30、**8/21 は 01:00-05:00**。
  `jepx/README.md` の「夏は昼が最安、深夜は安くない」は崩れている。
  **毎日引き直して窓を決める設計で正しい。**

### state-hub — pending の扱いを詰める

- **観察できたこと**: `next_action_at` は文字列1個で足りた。着手する場所は1つで表せる。
- **困ったこと**: `pending[]` に「何が揃えば決められるか / 誰が答えるか」が無い。
- **ただしフィールドは足していない。** 決着条件は `question` の文字列に書き込めるので、
  まずそれで足りるか試す。足りないと分かってからキーを足す。
- **pending が5件に増えた。** 溜まりすぎたら「捨てる」も選択肢にする。

### life-os — 使ってから決める

- `/state/` はフロントマター（`current_focus` / `projects[]` / `pending[]`）だけを描く。
- **直前に試したこと**: `readFileSync(new URL('../../STATE.md', import.meta.url))`。
- **ダメだった理由**: `astro build` はフロントマターを `dist/.prerender/chunks/` に
  バンドルしてから実行するので、`import.meta.url` が**チャンクの位置**を指し ENOENT。
  → `import src from '../../STATE.md?raw'` に変更。
  **`astro dev` では前者でも動く**ので、ローカルの dev だけでは気づけない。
- 本文（作業中の暗黙知）も描画するかは保留。`scratch/` など非公開寄りへ広げるなら、
  公開の決定を取り直す必要がある。

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

### Claude Code のセッション（2026-08-22 に実測。詳細は `~/kuroko-chat/SPEC.md` §2）

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
