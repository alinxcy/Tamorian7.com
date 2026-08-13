---
schema_version: 1
last_updated: 2026-08-13T11:39+09:00
current_focus: "life-os の描画側ができた。実データで state-hub のスキーマの過不足を見る"
projects:
  - slug: state-hub
    status: active
    progress: 0.95
    next_action: "pending 2件に決着条件を書けるか人間と詰める。スキーマ変更の要否はそこで決まる"
    next_action_at: "STATE.md の pending[]"
  - slug: life-os
    status: active
    progress: 0.3
    next_action: "ページを実際に使い、本文の「作業中の暗黙知」も描画すべきか判断する"
    next_action_at: "src/pages/state.astro"
  - slug: knowledge-garden
    status: paused
    progress: 0.8
    next_action: "Phase 2 の成果を main へマージし、deploy 対象ブランチを切り替える"
    next_action_at: ".github/workflows/deploy.yml"
pending:
  - id: main-merge-timing
    question: "main へのマージをいつ行うか。試験運用の区切りをどう判断するか"
    raised: 2026-08-13
  - id: publish-default-flip
    question: "publish の default を true から false へ反転させるか(デフォルト非公開)"
    raised: 2026-08-13
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **life-os** — `/state/` が動いた。`STATE.md` のフロントマターを読んで
   進捗バーを描く最小ページ (`src/pages/state.astro`)。公開する（[DECISIONS.md](DECISIONS.md)）。
2. **state-hub** — 実装・検証は済み。描画側ができたので、実データで
   スキーマの過不足が見えるようになった。残りは `pending` の扱いの詰め。
3. **knowledge-garden** — 器とパイプラインは Phase 1 で概ね動いている。
   main への集約が残っている。

state-hub と life-os が互いに待ち合っていた（「スキーマが固まるまで着手しない」×
「使ってみないと固まらない」）。描画側を先に作って断った。

## 2. 次のアクション

### life-os — 描画対象を広げるか決める

`/state/` はフロントマター（`current_focus` / `projects[]` / `pending[]`）だけを描く。
`overall` は `projects[].progress` の平均から**ページ側で導出**している
（STATE.md には持たない。二重管理を避けるため）。

- **直前に試したこと**: `readFileSync(new URL('../../STATE.md', import.meta.url))`。
- **ダメだった理由**: `astro build` はフロントマターを `dist/.prerender/chunks/` に
  バンドルしてから実行するので、`import.meta.url` が**チャンクの位置**を指し、
  `dist/STATE.md` を探して ENOENT。→ `import src from '../../STATE.md?raw'` に変更。
  `?raw` はソース位置基準で解決される。**`astro dev` では前者でも動く**ので、
  ローカルの dev だけでは気づけない。
- **次の判断**: 本文（作業中の暗黙知）も描画するか。ただし描画対象を
  `scratch/` など非公開寄りのものへ広げるなら、公開の決定を取り直す必要がある。

### state-hub — pending の扱いを詰める

描画側を作って分かったのは、**足りないのは `projects[]` ではなく `pending[]` の方**。

- **観察できたこと**: `next_action_at` は文字列1個で足りた。今回の作業は
  `src/pages/state.astro` と `src/layouts/Base.astro` の2箇所に及んだが、
  **着手する場所は1つ**で表せる。増やさなくてよい。
- **困ったこと**: `pending[]` に「何が揃えば決められるか / 誰が答えるか」が無い。
  ページには「人間の判断待ち」と出るが、待っている対象が読み手に分からない。
  下の2件が両方これで止まっている。
- **ただしフィールドは足していない。** 決着条件は `question` の文字列に
  書き込めるので、まずそれで足りるか試す。足りないと分かってからキーを足す。

### knowledge-garden — main への集約

- 書き換えが要る箇所は2つ。`9c3d91b` のコミットメッセージが申し送っている。
  - `.github/workflows/deploy.yml` の `push.branches`
  - `garden.config.json` の `branch`（現在は `claude/state-hub-phase-2`）
- `CLAUDE.md` は「squash して歴史を綺麗にしない」方針なので、マージは squash しない。
- **マージすると `/state/` が公開サイトに載る。** 中身は既に public な STATE.md なので
  新たな開示は無いが、集約前に一度自分で見ておくこと。

## 3. 作業中の暗黙知

### 環境（このマシン）

- **node 22.23.2 は `~/.local/lib/node22`**（nodejs.org 公式バイナリ、SHA256 検証済み）。
  `npm test` / `npm run check` / `npm run build` はローカルで通る。`node_modules` も導入済み。
- **PATH は非ログインシェルでは効かない。** `~/.local/bin` を載せているのは
  `.profile` の既存行と `.bashrc` への追記だが、どちらも非ログインシェルでは読まれない。
  **コマンドが `command not found` になったら `bash -lc '...'` で実行する。**
- `sudo` にパスワードが要る。apt は使えない。
- GitHub 認証は SSH（`~/.ssh/id_ed25519`）。`origin` は fetch=HTTPS / push=SSH。
- CI も検証経路になる。`.github/workflows/check.yml` は `on: push` にブランチ指定が無く
  全ブランチで発火する。`deploy.yml` は handoff ブランチのみをトリガにしているので、
  **Phase 2 へ push しても公開サイトは動かない**。試験運用として安全。

### Astro 側の注意

- **`.astro` のフロントマターで `import.meta.url` を基準に相対パスを解くと壊れる。**
  ビルド時は `dist/.prerender/chunks/` にバンドルされてから実行されるため。
  `src/` の外のファイルを読むなら `import x from '../../y?raw'` を使う。
- **`src/pages/` に置いたものは必ず公開される。** static 出力なので例外は無い。
  `_` 接頭辞は dev でもルートにならないので「ローカル専用ページ」には使えない。
- スキーマの正本は `scripts/state.mjs`（`parseYamlSubset` / `splitFrontmatter` /
  `validateState` を export）。**描画側で YAML を読み直さない。**
  パーサが2つあると、検証が通す記法と描画が読める記法がズレても気づけない。

### リポジトリの構造について分かったこと

- **main と作業ブランチが乖離している。** main は1コミット (`Add files via upload`) で
  spec 2本のみ。実体は handoff ブランチ以降にある。
  default branch は main だが、CI も deploy も main では動かない。
- **リポジトリは public。** `private=false` を GitHub API で確認済み。
  全21コミットを横断して機密スキャン済み、検出ゼロ。`.env` は履歴上も存在しない。
- `publish: z.boolean().default(true)` が公開制御（`src/content.config.ts:5`）。
  ただし **default が true**（公開寄り）。そして `publish: false` はサイト表示の制御であって、
  **機密の防壁ではない** — リポジトリが public な以上、ソースは読める。
  なお `publish` が効くのは `src/content/` 配下のコレクションだけで、
  **`/state/` のような素のページには効かない**。
- `public/` は Astro の予約語（無加工で配信される）。既に `public/pagefind/`（生成物）と
  `public/widgets/`（配信物）で使用中。ここに「公開承認済み文書の置き場」という
  第三の意味を重ねると事故る。
- `garden.config.json` が設定の唯一の情報源。新しいパス概念を足すならここ。
  `branch` はコードから参照されない宣言値（Skill / Agent が読む）。

### 既知の未処理

- `npm run check` は **error 0 / warn 0**。`reversible-vs-irreversible.md:60` の「必ず」は
  文章を変えず `<!-- reason: -->` で意図を明示した（観測の一般化ではなく、
  分割を選ぶときに自分が課す条件。根拠は直前の段落にある）。
  **判定を通すために断定を薄めるのはやらない。** 意図的な断定は理由を添えて残す。
- `npm audit` に指摘がある（`npm ci` 時に表示）。未調査。
- `astro dev` はデーモンとして起動する（`astro dev stop` で停止、`astro dev status` で確認）。
  `npm run dev` がすぐ exit 0 で戻るのはそのため。落ちたわけではない。
- **headless Firefox でのスクリーンショットは取れない。** 既存の Firefox プロセスと衝突し、
  別プロファイル（`--no-remote --profile`）でも画像を出力せず終了する。
  見た目の確認は `astro dev` + 実ブラウザで行う。
