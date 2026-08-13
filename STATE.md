---
schema_version: 1
last_updated: 2026-08-13T10:34+09:00
current_focus: "状態ハブ(STATE/DECISIONS)を新設し、Phase 2 ブランチで試験運用する"
projects:
  - slug: state-hub
    status: active
    progress: 0.85
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
    next_action: "Phase 1 の成果を main へマージし、deploy 対象ブランチを切り替える"
    next_action_at: ".github/workflows/deploy.yml"
pending:
  - id: state-validation-home
    question: "STATE.md のスキーマ検証を zod ではなく scripts/check.mjs に置いてよいか"
    raised: 2026-08-13
  - id: scratch-vs-tacit
    question: "scratch/ を廃止せず、STATE.md 暗黙知欄と役割分担にしてよいか"
    raised: 2026-08-13
  - id: main-merge-timing
    question: "main へのマージをいつ・どの単位で行うか"
    raised: 2026-08-13
---

# 現在の状態

このファイルは**スナップショット**。上書きのみ。履歴は残さない。
確定した決定とその理由は [DECISIONS.md](DECISIONS.md)。

## 1. 今やっていること / 優先順位

1. **state-hub** — `STATE.md` / `DECISIONS.md` / `update_state` スキルの新設。
   Phase 2 ブランチ (`claude/state-hub-phase-2`) で試験運用してから main へ。
2. **life-os** — Astro 上に自分用ダッシュボード。`STATE.md` のフロントマターを
   データソースにする。state-hub のスキーマが固まるまで着手しない。
3. **knowledge-garden** — 器とパイプラインは Phase 1 で概ね動いている。
   main への集約が残っている。

## 2. 次のアクション

### state-hub — 実運用してスキーマの過不足を洗う

`scripts/state.mjs`（検証）と `.claude/skills/update-state/`（更新手順）は実装済み。
残っているのは「使ってみて足りないものを見つける」段階。
スキーマを増やしたくなったら、描画側（life-os）とセットで直す。

- **直前に試したこと**: スキーマの正本を zod (`src/content.config.ts`) に置こうとした。
- **ダメだった理由**: `STATE.md` はリポジトリ直下にあり content collection の**外**。
  zod は `glob({ base: './src/content/...' })` の対象にしか効かず、
  `astro build` では検証されない。→ `scripts/state.mjs` に置いた。
- **YAML ライブラリを使わなかった理由**: npm 依存を足すと `package-lock.json` の
  再生成が要り、手元に node が無いので CI の `npm ci` がロック不一致で落ちる。
  受け付ける記法をサブセットに絞った自前パーサにした（外れた記法は error にする）。
- **スキルに持たせること**: STATE.md を読む → フロントマターを規定スキーマで更新 →
  本文を上書き → `node scripts/state.mjs` で検証してから書く →
  `last_updated` を実時刻に → 自動コミット。
  ただし `public/` への変更が含まれる場合は commit せず人間に確認。

### life-os — 着手前

- state-hub のスキーマが `schema_version: 1` で固まってから。
- 非公開データを扱うので GitHub Pages には載せない。`astro dev` でのローカル実行が最小構成。

### knowledge-garden — main への集約

- 書き換えが要る箇所は2つ。`9c3d91b` のコミットメッセージが申し送っている。
  - `.github/workflows/deploy.yml` の `push.branches`
  - `garden.config.json` の `branch`

## 3. 作業中の暗黙知

### 環境（このマシン）

- **node / npm が入っていない。** `npm run check` も `npm test` も `astro build` も
  ローカルで走らせられない。apt の候補は nodejs 18.19 だが、Astro 7 には古い可能性がある。
- **GitHub への push 認証が未完了。** SSH 鍵は生成済み
  (`~/.ssh/id_ed25519`)。公開鍵を GitHub に登録するまで push できない。
  `origin` は fetch=HTTPS / push=SSH に分けてある（public なので fetch は匿名で通る）。
- ただし **CI が検証経路になる**。`.github/workflows/check.yml` は `on: push` に
  ブランチ指定が無く、全ブランチで発火する。node 22 で `npm test` → `npm run check`
  → `npm run build` を回すので、**push さえ通れば手元に node が無くても検証できる**。
  つまり詰まっているのは SSH 鍵の登録だけ。
- `deploy.yml` は `claude/code-handoff-phase-1-ruj6je` のみをトリガにしているので、
  Phase 2 ブランチへ push しても**公開サイトには反映されない**。試験運用として安全。

### リポジトリの構造について分かったこと

- **main と作業ブランチが乖離している。** main は1コミット (`Add files via upload`) で
  spec 2本のみ。実体は全部 `claude/code-handoff-phase-1-ruj6je` (20コミット / 59ファイル)。
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

### 未検証のこと

- Astro 7 が node 18 で動くかどうか。未確認（CI は node 22 なので、
  ローカル検証を諦めるなら確認しなくてよい）。
- `update_state` スキルを実際に回したときに、YAML と本文の食い違いを
  検出できるか。パーサを書いてからでないと分からない。
