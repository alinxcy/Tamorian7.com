---
schema_version: 2
last_updated: 2026-08-17T21:58+09:00
current_focus: "fugu-lab の見取り図を works に置いた。記録が1件しか無い原因も判明。次は溜め直す"
projects:
  - slug: state-hub
    status: active
    summary: "STATE.md / DECISIONS.md / CLAUDE.md の役割を分けて、状態を1箇所に集める仕組み"
    next_action: "pending 2件に決着条件を書けるか人間と詰める。スキーマ変更の要否はそこで決まる"
    next_action_at: "STATE.md の pending[]"
    link: "/state/"
  - slug: life-os
    status: active
    summary: "STATE.md を人間が読める形に描画するページ。進捗率をやめ、要約とリンクのハブにした"
    next_action: "本文の「作業中の暗黙知」も描画すべきか、実際に使ってから判断する"
    next_action_at: "src/pages/state.astro"
    link: "/state/"
  - slug: knowledge-garden
    status: active
    summary: "このサイトそのもの。4層モデル(seeds/log/garden/works)で育てる Astro の器"
    next_action: "器はできたので中身を入れる。会話の脱線から種を1件、自分の言葉で拾う"
    next_action_at: "src/content/seeds/"
    link: "/works/knowledge-garden/"
  - slug: fugu-lab
    status: active
    summary: "Sakana Fugu を月額契約すべきか判断するための計測環境。チャットで使い、使用データを溜める"
    next_action: "chat アプリを起動してから外注する。落ちていると記録が残らないと判明した"
    next_action_at: "fugu-lab/tools/fugu_offload.py"
    link: "/works/fugu-lab/"
  - slug: atelier-lab
    status: active
    summary: "アトリエ(作業場)の計測と制御。20A の天井の中で何を動かせるかを実測で決める"
    next_action: "PZEM-004T v3.0(TTL版) と ESP32-DevKitC を注文する。まだ何も買っていない"
    next_action_at: "https://github.com/alinxcy/atelier-lab"
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
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **knowledge-garden** — seeds 層が入り、**4層が揃った**。器はもう無い言い訳。
   次は中身で、これは人間しかできない。
2. **life-os** — `/state/` が公開サイトに出た。進捗バーをやめ、
   **各プロジェクトの要約と飛び先を持つハブ**に作り替えた。
3. **state-hub** — 実装・検証は済み。残りは `pending` の扱いの詰め。
4. **fugu-lab** / **atelier-lab** — このページから辿れるようになった。
   どちらも「作ったが、まだ溜まっていない」段階。

**今どのプロジェクトも同じ形の詰まり方をしている。** 器はある、データが無い。
fugu-lab は使用実績が1件、atelier-lab は部品が未注文、seeds は0件。
作るのをやめて使う側に回らないと、どれも判断材料が出てこない。

## 2. 次のアクション

### life-os — 描画対象を広げるか決める

`/state/` はフロントマター（`current_focus` / `projects[]` / `pending[]`）だけを描く。

- **直前に試したこと**: `readFileSync(new URL('../../STATE.md', import.meta.url))`。
- **ダメだった理由**: `astro build` はフロントマターを `dist/.prerender/chunks/` に
  バンドルしてから実行するので、`import.meta.url` が**チャンクの位置**を指し、
  `dist/STATE.md` を探して ENOENT。→ `import src from '../../STATE.md?raw'` に変更。
  **`astro dev` では前者でも動く**ので、ローカルの dev だけでは気づけない。
- **次の判断**: 本文（作業中の暗黙知）も描画するか。ただし描画対象を
  `scratch/` など非公開寄りのものへ広げるなら、公開の決定を取り直す必要がある。

### state-hub — pending の扱いを詰める

描画側を作って分かったのは、**足りないのは `projects[]` ではなく `pending[]` の方**。

- **観察できたこと**: `next_action_at` は文字列1個で足りた。着手する場所は1つで表せる。
- **困ったこと**: `pending[]` に「何が揃えば決められるか / 誰が答えるか」が無い。
  ページには「人間の判断待ち」と出るが、待っている対象が読み手に分からない。
- **ただしフィールドは足していない。** 決着条件は `question` の文字列に
  書き込めるので、まずそれで足りるか試す。足りないと分かってからキーを足す。

### fugu-lab — 使わないと判断できない

- ダッシュボードは動く。だが**読み込めた実データは1件**で、そこから
  「表470 / 裏0 / 裏率0%」を出しているだけ。母数が話にならない。
- **1件しか無い理由が判明した(2026-08-17)。** `tools/fugu_offload.py` は
  **既定で chat アプリ経由**で叩き、アプリが落ちていると直接 API に
  フォールバックする。**フォールバック時は記録されない**(警告は stderr に出る)。
  外注は10回近くやったが、アプリが起きていたのは1回だけだった。
  → **運用だけで直る。外注の前に `chat/` を起動する。**
- **`ttft_s` の宿題は、この問題そのものだった。** 直接 API は非ストリーミングなので
  `ttft_s` が取れず、スキーマが必須の number と定めているため**書けない**。
  `number | null` にすれば、フォールバック経路でも記録が残せる。
  **schema は唯一の結合点**なので `chat/` と `dashboard/core/record.py` をセットで直す。
- 見取り図を [/works/fugu-lab/](/works/fugu-lab/) に置いた。構造と外注ルールはそちら。

### atelier-lab — まだ何も買っていない

- 部品構成は決まった。**PZEM-004T v3.0（クランプ100A、TTL版）+ ESP32-DevKitC**。
- **本命はグラフではなくアラート。**「16A 超えたら通知」が実用価値のほぼ全部。
  主幹が落ちると他室に波及するため、事後に眺めるグラフより事前に止める通知が要る。
- **落ちた瞬間のデータが取れない問題**が未解決。監視装置が同じ回路にあると、
  ブレーカーが落ちた瞬間に ESP32 も死ぬ。一番欲しい「落ちる直前」がまさに取れない。
- 住所・賃料・不動産会社の連絡先は**このリポジトリにも atelier-lab にも書かない**。

### knowledge-garden — 器から中身へ

- **seeds 層を Codex（Windows ノート PC）に外注して入った**（`258ccf3`）。
  仕様が `spec/content-pipeline-spec.md` に frontmatter まで書いてあったので、
  判断の要らない作業として切り出せた。**渡せたのは仕様が先にあったから。**
- **`/seeds/` の一覧とナビは作らない。** 種はストックではなくフロー。
  一覧を作ると実質ブログになり、「garden が主役」という設計がぶれる。
- **seeds だけ `publish` の既定が false。** 生の切り抜きが勝手に公開されないように。
  副作用として**在庫の件数を静的サイト側で数えられない**（`pending: seed-inventory-pressure`）。
- 残りは中身。**種が0件**で、入っている1件は動作確認用の fixture。

### knowledge-garden — main への集約

- 書き換えが要る箇所は2つ。`9c3d91b` のコミットメッセージが申し送っている。
  - `.github/workflows/deploy.yml` の `push.branches`
  - `garden.config.json` の `branch`
- `CLAUDE.md` は「squash して歴史を綺麗にしない」方針なので、マージは squash しない。

## 3. 作業中の暗黙知

### 環境（このマシン）

- **node 22.23.2 は `~/.local/lib/node22`**（nodejs.org 公式バイナリ、SHA256 検証済み）。
- **PATH は非ログインシェルでは効かない。**
  **コマンドが `command not found` になったら `bash -lc '...'` で実行する。**
- **`sudo` と `apt` は使える。** パスワードはリポジトリ外に保管してある。
- **`gh` 2.45.0 が入っている**（認証済み、git 操作は SSH）。リポジトリ作成や PR も通る。
- GitHub 認証は SSH（`~/.ssh/id_ed25519`）。`origin` は fetch=HTTPS / push=SSH。
- **スクリーンショットは `shot <URL> <出力.png>`**（`~/.local/bin/shot`、playwright）。
  JS 描画のページは `--selector` で要素の出現を待たせる。
  **headless Firefox は使えない** — 既存プロセスと衝突し、別プロファイルでも画像を出さない。

### ブランチとデプロイ（2026-08-16 に変わった）

- **deploy 元ブランチを作業ブランチの位置まで早送りした。**
  `deploy.yml` の `push.branches` は `claude/code-handoff-phase-1-ruj6je` のままだが、
  そのブランチが `claude/state-hub-phase-2` と同じコミットを指している。
- したがって **「Phase 2 へ push しても公開サイトは動かない」は今は成り立たない。**
  push しただけでは動かないが、**早送りすると即座に公開される**。
- main は1コミット (`Add files via upload`) のまま。**`/blob/main/STATE.md` は 404**
  になるので、GitHub へのリンクは `garden.config.json` の `branch` を使って組み立てる。
- `.github/workflows/check.yml` はブランチ指定が無く全ブランチで発火する。

### Astro 側の注意

- **`.astro` のフロントマターで `import.meta.url` を基準に相対パスを解くと壊れる。**
  `src/` の外のファイルを読むなら `import x from '../../y?raw'` を使う。
- **`src/pages/` に置いたものは必ず公開される。** static 出力なので例外は無い。
  `_` 接頭辞は dev でもルートにならないので「ローカル専用ページ」には使えない。
- スキーマの正本は `scripts/state.mjs`。**描画側で YAML を読み直さない。**
  パーサが2つあると、検証が通す記法と描画が読める記法がズレても気づけない。
- **リンクは必ず `/` から始めるか `http(s)://` にする。** サブパス配信なので、
  相対パスは base の下で壊れる。検証側でも弾いている。

### 他の AI に外注するとき（2026-08-16 に Codex へ seeds を渡して分かったこと）

- **渡せるのは仕様が先にある作業だけ。** seeds は `spec/` に frontmatter まで
  書いてあったから切り出せた。仕様の無いものを渡すと、判断ごと外注することになる。
- **プロンプトに「触るな」を列挙しておくと守る。** `STATE.md` / `DECISIONS.md` /
  `CLAUDE.md` / `package-lock.json` を明示したら、実際に触らず**報告だけ返してきた**。
  こちらのテスト破壊を踏んだときも、直さずに理由を書いて残した。これが正しい。
- **別マシンなら push させる。** 「push しない」は同一マシンの作法であって、
  他所で動かすと成果が取り出せなくなる。作業ブランチへの push は安全
  （`deploy.yml` のトリガーは `claude/code-handoff-phase-1-ruj6je` の方）。
- **Windows の罠は3つ**（Codex の実測、`scratch/2026-08-16.md`）:
  clone 時点で CRLF に変換されるので `core.autocrlf false` は clone 後だと手遅れ /
  portable Node は `npm.cmd` を絶対パスで起動しても子プロセスの PATH に
  `node.exe` が無く install script が落ちる / PowerShell の `>` は UTF-16 を吐く。

### 公開範囲

- **リポジトリは public。** `publish: false` はサイト表示の制御であって機密の防壁ではない。
  `publish` が効くのは `src/content/` 配下だけで、`/state/` のような素のページには効かない。
- `public/` は Astro の予約語（無加工で配信される）。ここに「公開承認済み文書の置き場」
  という第三の意味を重ねると事故る。
- **`atelier-lab` は private のままにすると決めた**（[DECISIONS.md](DECISIONS.md)）。
  このページからのリンクは**本人以外には 404 に見える**。既知の状態として許容している。

### 既知の未処理

- `npm run check` は **error 0 / warn 0**。`reversible-vs-irreversible.md:60` の「必ず」は
  文章を変えず `<!-- reason: -->` で意図を明示した。
  **判定を通すために断定を薄めるのはやらない。**
- **`npm audit` は 3件**（high: js-yaml `GHSA-5p4m-2wfm-xmqj` / nanoid `GHSA-2v37-7h3g-55p8`、
  moderate: postcss `GHSA-fxqj-rqcc-2cmp`）。すべて `npm audit fix` で消えると出ている。未実施。
  **これは Linux 側でやる。** CI が ubuntu で `npm ci` するので、Windows で
  lockfile を再生成すると linux 用の optional dependency が落ちてデプロイが壊れうる。
- **`scripts/state.test.mjs` を schema v2 に追随させ忘れていた**（08-16 に混入、08-17 に修正）。
  `npm test` は赤かったが、**`deploy.yml` は `check` と `build` しか回さない**ので
  CI も気づかない。テストは手で回すしか無い状態になっている。
- `astro dev` はデーモンとして起動する（`astro dev stop` / `astro dev status`）。
  `npm run dev` がすぐ exit 0 で戻るのはそのため。落ちたわけではない。
