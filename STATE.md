---
schema_version: 1
last_updated: 2026-08-13T10:48+09:00
current_focus: "状態ハブ(STATE/DECISIONS)を Phase 2 ブランチで実運用し、スキーマの過不足を洗う"
projects:
  - slug: state-hub
    status: active
    progress: 0.9
    next_action: "update-state を実運用し、スキーマの過不足を洗う"
    next_action_at: "STATE.md"
  - slug: life-os
    status: paused
    progress: 0.0
    next_action: "STATE.md を読んで進捗バーを描く最小ページを作る"
    next_action_at: "src/pages/"
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

1. **state-hub** — `STATE.md` / `DECISIONS.md` / `update-state` スキル。
   実装と検証は済んだ。今は Phase 2 ブランチ (`claude/state-hub-phase-2`) で
   実際に回してみて、スキーマの過不足を洗う段階。
2. **life-os** — Astro 上に自分用ダッシュボード。`STATE.md` のフロントマターを
   データソースにする。state-hub のスキーマが固まるまで着手しない。
3. **knowledge-garden** — 器とパイプラインは Phase 1 で概ね動いている。
   main への集約が残っている。

## 2. 次のアクション

### state-hub — 実運用してスキーマの過不足を洗う

`scripts/state.mjs`（検証・35テスト PASS）と `.claude/skills/update-state/`（更新手順）は
実装済み。残っているのは「使ってみて足りないものを見つける」段階。
スキーマを増やしたくなったら、描画側（life-os）とセットで直す。

- **直前に試したこと**: スキーマの正本を zod (`src/content.config.ts`) に置こうとした。
- **ダメだった理由**: `STATE.md` はリポジトリ直下にあり content collection の**外**。
  zod は `glob({ base: './src/content/...' })` の対象にしか効かず、
  `astro build` では検証されない。→ `scripts/state.mjs` に置いた。
- **次に効きそうな観察点**: `next_action_at` が文字列1個で足りるか（複数箇所に
  またがる作業を表せない）。`pending[]` に「誰が答えるべきか」が要るか。
  実際に困るまで足さない。

### life-os — 着手前

- state-hub のスキーマが `schema_version: 1` で固まってから。
- 非公開データを扱うので GitHub Pages には載せない。`astro dev` でのローカル実行が最小構成。

### knowledge-garden — main への集約

- 書き換えが要る箇所は2つ。`9c3d91b` のコミットメッセージが申し送っている。
  - `.github/workflows/deploy.yml` の `push.branches`
  - `garden.config.json` の `branch`（現在は `claude/state-hub-phase-2`）
- `CLAUDE.md` は「squash して歴史を綺麗にしない」方針なので、マージは squash しない。

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

### リポジトリの構造について分かったこと

- **main と作業ブランチが乖離している。** main は1コミット (`Add files via upload`) で
  spec 2本のみ。実体は handoff ブランチ以降にある。
  default branch は main だが、CI も deploy も main では動かない。
- **リポジトリは public。** `private=false` を GitHub API で確認済み。
  全21コミットを横断して機密スキャン済み、検出ゼロ。`.env` は履歴上も存在しない。
- `publish: z.boolean().default(true)` が公開制御。ただし **default が true**（公開寄り）。
  そして `publish: false` はサイト表示の制御であって、**機密の防壁ではない**
  — リポジトリが public な以上、ソースは読める。
- `public/` は Astro の予約語（無加工で配信される）。既に `public/pagefind/`（生成物）と
  `public/widgets/`（配信物）で使用中。ここに「公開承認済み文書の置き場」という
  第三の意味を重ねると事故る。
- `garden.config.json` が設定の唯一の情報源。新しいパス概念を足すならここ。
  `branch` はコードから参照されない宣言値（Skill / Agent が読む）。

### 既知の未処理

- `npm run check` が warn を1件出す:
  `src/content/garden/reversible-vs-irreversible.md:60` の「必ず」。
  今回の変更とは無関係の既存コンテンツ。判断が要るので機械では消さない。
- `npm audit` に指摘がある（`npm ci` 時に表示）。未調査。
