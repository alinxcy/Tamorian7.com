# Tamorian7 / Knowledge Garden — 作業のルール

このリポジトリで作業するときの決めごと。**変わりにくいものだけ**を置く。
進行中の話は `STATE.md`、決定の理由は `DECISIONS.md`、設定値は `garden.config.json`。

- `STATE.md` — 今の状態。**上書きのみ**。履歴を書かない
- `DECISIONS.md` — 確定した決定と理由。**追記のみ**。撤回は消さず追記
- `garden.config.json` — 設定の唯一の情報源。値をドキュメントや SKILL.md に書かない
- `spec/knowledge-garden-spec.md` — 器の仕様 (v2)
- `spec/content-pipeline-spec.md` — 運用パイプライン(4層モデル / Skill と Agent)

## 作業の起点

作業ブランチは `garden.config.json` の `branch`。**main を基点にしない**
— main は1コミットしか無く、CI もデプロイも動かない。
デプロイ元は `deploy.yml` の `push.branches` で別に決まっている（試験中はズレていてよい）。

## 誰が何を書くか

| 対象 | 書ける人 |
|---|---|
| `CLAUDE.md` / `STATE.md` / `DECISIONS.md` | **Claude Code のみ** |
| コード・成果物・`src/content/` 配下 | Codex も可 |
| `public/` | Claude Code が書き、デプロイは人間が押す |

状態ファイルの書き手を一本化するのは、複数が書くと最新がどれか分からなくなるため。

## 公開と非公開

**このリポジトリは public。** ソースは誰でも読める。

- **`publish: false` は機密の防壁ではない。** サイト表示の制御でしかない
- したがって**機密はリポジトリに入れない**のが唯一の防衛線
- 入れないもの: 個人情報・連絡先 / 仕事関連(顧客名・未公開案件) / API キー・トークン
- `public/` は Astro の予約語(無加工で配信)。「公開承認済み文書の置き場」に流用しない

## STATE.md のスキーマ

フロントマターは Astro 側が読む契約なので、**勝手に増やさない・改名しない・型を変えない。**
変えたいときは提案して承認を取り、描画側とセットで直す。

| キー | 型 | 備考 |
|---|---|---|
| `schema_version` | int | 破壊的変更で +1 |
| `last_updated` | ISO 8601 (+09:00) | 実時刻。更新漏れに人間が気づけるように |
| `current_focus` | string | 本文「今やっていること」と食い違わせない |
| `projects[].slug` | string | 本文の見出しと 1:1 |
| `projects[].status` | `active`\|`paused`\|`blocked`\|`done` | |
| `projects[].summary` | string | 何をやっているものかを一文で。次の1手とは別物 |
| `projects[].next_action` | string | 次の1手を一文で |
| `projects[].next_action_at` | string | 着手するファイル/場所 |
| `projects[].link` | string | 飛び先。`/` 始まりか `http(s)://` のみ |
| `pending[].id` / `.question` / `.raised` | string / string / date | 未確定・確認待ち |

- **進捗率は持たない**(v2 で廃止)。誰も見ないまま二重管理になっていた。
  状態は `status` で表し、中身は `summary` で説明する
- 未確定は `pending[]` にだけ書き、本文には書かない
- 「直前に何を試して何がダメだったか」は本文の**作業中の暗黙知**へ。`slug` で紐づける

## 記録の仕込み(最重要)

**実録の厚みは、書く技術ではなく「転んだ瞬間の時系列が残っているか」で決まる。**
事後に「今日のこと書いて」と頼んでも、成功した最終形しか復元できない。
だから記録は作業中に取る。

### 1. wip コミットを潰さない

失敗中の状態も、**症状をメッセージに書いて**コミットする(例: `wip: SPIの応答が全部0x00`)。

- **squash して歴史を綺麗にしない。** ここが後で記事の骨になる
- まとめ直したくなったら、まとめるのは**メッセージではなく記事の方**

### 2. `scratch/<YYYY-MM-DD>.md` に転びを書く

整形不要・箇条書き・時刻付き。読ませるためではなく、後から漁るためのもの。

```markdown
## 2026-07-26
- 14:20 usage が全部 null。トップレベルを見ていた
- 14:55 *_details の中にネストしていた
```

- `scratch/` は**リポジトリに残す**(`.gitignore` しない)。消えたら価値がない
- **`scratch/` と STATE.md の暗黙知欄は役割が違う。** scratch は生の時系列(追記)、
  暗黙知欄は今も有効な結論だけ(上書き)。scratch から蒸留して暗黙知欄へ移す

### 3. 実録に起こすとき

`.claude/skills/tamorian7/references/devlog.md` の4セクション型に従う。
**3(実装で刺さった罠)と 4(未確定のまま残したこと)が埋まらないなら、
勝手に埋めずに問い返す。**

## 更新のタイミング

スキル `update-state` が入口。手順はそちらにある。

- **決定が確定した瞬間**に `DECISIONS.md` へ書く。会話の終わりまで溜めない
- **作業を止める前に必ず** `STATE.md` を更新する
- 言われなくても、**前提が変わったら書く**
- **「確定」とは人間が明示的に承認したものだけ。** 迷ったら `pending[]` へ

## 公開前

```sh
npm run check     # 機械判定。error があればマージしない
npm run build     # zod による frontmatter 検証 + Pagefind
```

- 機械で落とせるもの(リンク切れ・base パス・chats の残り)は `check` の担当
- 判断が要るもの(言いすぎ・未確認)は `honest-reviewer` サブエージェントの担当
- **機械は止める、AI は問う。** 混ぜない

## コンテンツを足すとき

Skill `tamorian7` が入口。どの層に入れるかは4層モデルで判断する。

| 層 | 主語 | 判定 |
|---|---|---|
| seeds | 他人の成果 | まだ見ていない。本筋から**逸れた**もの |
| log | 自分がやったこと | 作業が一区切りついた |
| garden | わかったこと | 同じことに**2回目**気づいた |
| works | 作っているもの | 作り始めた |

迷ったら軽い方(seeds < log < garden)。育てるのは後からできる。
