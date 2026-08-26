# 道具の棚卸し  2026-08-27 01:17

## Skill  (3)

- **offload**（全体・08-26 (今日)）— 重い読み込みを外に出して Claude のトークン消費を抑える。「これ全部読んで」「棚卸しして」「ログを索引化して」「調べておいて」のように大きな入力を扱う作業の前に必ず参照する。委託の判断と、受け取りを小さくする作法。
- **tamorian7**（この repo・08-18 (8日前)）— Tamorian7 の Knowledge Garden(alinxcy/Tamorian7.com)にコンテンツを足す・整える ときの単一の入口。
- **update-state**（この repo・08-20 (6日前)）— Tamorian7 の STATE.md（現在の状態のスナップショット）を規定スキーマどおりに 更新し、検証してから書く。作業を止める前、区切りがついたとき、前提が変わった とき、次の一手が変わったとき、試してダメだった方法が分かったときに使う。

## サブエージェント  (5)

- **nudge-scout**（全体・08-17 (9日前)）— 常時起動セッションのアイドル監視で、起きたときに「いま話しかけてよいか、 話しかけるなら何を」を調べて短く返す偵察役。/loop のアイドル監視から毎時 呼ばれる。判定・キュー確認・inbox 確認のツール出力を親の文脈に入れないための 分離であって、親の代わりに喋る役ではない。
- **blog-curator**（この repo・08-17 (10日前)）— Tamorian7 の興味に合う外部の記事・論文・道具を探し、種の候補としてまとめて返す。 「面白いの探して」「今週の拾いもの」「◯◯まわりで何かない?」と言われたとき、 および seeds の在庫が尽きたときに使う。
- **garden-hand**（この repo・08-18 (8日前)）— Tamorian7.com のリポジトリを実際に触って、検証まで通して、コミットして返す手。 「STATE.md 直しといて」「/state/ にこれ足して」「check 通して」「あのページ直して」 のように、対象がこのリポジトリの中で完結する編集作業に使う。
- **honest-reviewer**（この repo・08-17 (10日前)）— 公開前の記事・ノートをレビューし、「言いすぎ」と「未確認」を指摘する。公開前や 「これ出して大丈夫?」と聞かれたときに使う。指摘は多くなりがちで会話を埋めるため、 別コンテキストで走らせて指摘リストだけ返す。
- **promotion-reviewer**（この repo・08-17 (10日前)）— seeds / log / garden の在庫を棚卸しし、昇格と破棄を提案する。「種たまってない?」 「棚卸しして」と言われたとき、および seeds が増えてきたときに使う。全ファイルを 読む重い作業なので会話でやらず、別コンテキストで走らせて結果だけ返す。

## フック  (3)

- **UserPromptSubmit**（全体・matcher=—）— `python3 ~/.claude/nudge/idle.py --stamp >/dev/null 2>&1 || true`
- **PreCompact**（全体・matcher=—）— `python3 ~/.claude/handoffs/tools/precompact_snapshot.py >/dev/null 2>&1 || true`
- **PostCompact**（全体・matcher=—）— `python3 ~/.claude/handoffs/tools/postcompact_inject.py 2>/dev/null || true`

## 道具  (32)

- **adapters.py**（08-26 (今日)）— サービスごとの読み取り。**ここだけがサービスに依存する。**
- **analyze_export.py**（08-25 (1日前)）— 書き出しの**形式**を Fugu に分析させる。中身は送らない。
- **batch_index.py**（08-26 (今日)）— 選んだ会話にだけ議事録を作る。**全部はやらない。**
- **catalog.py**（08-26 (今日)）— 会話の**目次**を作る。3段の一番上。
- **claude_usage.py**（08-22 (4日前)）— Claude Code の消費トークンを、トランスクリプトから集計する。
- **context_cost.py**（08-26 (今日)）— **文脈に入れたものが、その後いくらかかり続けるか**を実測する。
- **convo.py**（08-26 (今日)）— 会話ログの中間形式。仕様は ../FORMAT.md。
- **daily.sh**（08-26 (今日)）— 定期タスクを走らせ、**成功したら印を置く。**
- **describe_artifacts.py**（08-22 (4日前)）— Drive の成果物に一行説明を付ける。中身を少しだけ見て、Fugu に書かせる。
- **digest.py**（08-27 (今日)）— 今夜のコミットを、リポジトリごとにまとめる。
- **drive_manifest.py**（08-22 (4日前)）— Drive にある成果物の目録を作る。実体は動かさない。
- **extract_convo.py**（08-17 (9日前)）— Codex の rollout jsonl から会話だけを抜く。要約しない。落とすのはノイズだけ。
- **fill_index.py**（08-27 (今日)）— 索引の**穴を埋める**。取り込みのときに落ちたものを後から拾い直す。
- **fugu_perf.py**（08-27 (今日)）— Fugu の応答特性を、手元の UsageRecord だけから測る。外注はしない。
- **inbox_watch.py**（08-26 (今日)）— inbox/ に置かれた会話ログを、索引まで自動で仕上げる。
- **inspect_export.py**（08-25 (1日前)）— 書き出し(claude.ai / ChatGPT)の中身を、形式を仮定せずに報告する。
- **inventory.py**（08-26 (今日)）— **Skill / サブエージェント / フック / 常駐サービスの棚卸し。**
- **make_index.py**（08-26 (今日)）— 会話ログを塊に割り、各塊の索引を Fugu(base) に作らせる。
- **postcompact_inject.py**（08-26 (今日)）— compact の直後に、`precompact_snapshot.py` が残した1枚を読み戻す。
- **precompact_snapshot.py**（08-26 (今日)）— compact の直前に、**機械で分かる状態だけ**を1枚に落とす。
- **read_gate.py**（08-22 (4日前)）— 重い読み込み(inbox の索引など)をやってよいタイミングかを判定する。
- **recall.py**（08-26 (今日)）— **作る前に探す。** 過去の会話・記録・決定を横断して引く。
- **rederive.py**（08-26 (今日)）— compact で失った文脈の「見える影」を測る。
- **safe_write.py**（08-26 (今日)）— 導出ファイルを**黙って縮ませない**書き出し。
- **seed_candidates.py**（08-26 (今日)）— **seeds の候補を会話ログから拾う。**
- **seed_filter.py**（08-27 (今日)）— 候補199件を Fugu に判定させる。**「他人の成果か、ただの語か」だけ。**
- **seed_rank.py**（08-26 (今日)）— 種の候補を**鮮度の3軸**で並べる。
- **start-chat.sh**（08-17 (9日前)）— fugu-lab の chat アプリを起動する。外注を JSONL に記録させるために要る。 ポートは fugu_offload.py の既定 (8150) に合わせる。README の 8137 とは食い違っている。
- **sync_drive.sh**（08-26 (今日)）— Google Drive の受け渡しフォルダを inbox へ落とす。
- **today.py**（08-26 (今日)）— **「今日やったこと」を、思い出さずに機械から作る。**
- **weekly_inventory.sh**（08-27 (今日)）— 週次の棚卸し。**毎週木曜 01:15**（週リミットのリセット直後で枠が一番ある時間）。
- **write_stock.py**（08-27 (今日)）— 種の在庫の**数だけ**をサイトへ渡す。中身は渡さない。

## 常駐（systemd --user）  (17)

- **daily-index.service**（手動・timer駆動）— 取り込み時に落ちた会話の索引を後から拾い直す
- **daily-index.timer**（手動・active）— 索引の穴を埋める（04:00 / 失敗したら 08:00）
- **daily-jepx.service**（手動・timer駆動）— JEPX の価格取得。古いと shift_queue が「待たない」に倒れる
- **daily-jepx.timer**（手動・active）— JEPX の価格を毎日取り直す（03:00 / 失敗したら 07:00）
- **daily-seeds.service**（手動・timer駆動）— 議事録から抜いた語を Fugu に「種か / ただの語か」判定させる
- **daily-seeds.timer**（手動・active）— 種の候補を Fugu に判定させる（04:30 / 失敗したら 08:30）
- **drive-sync.service**（手動・timer駆動）— Google Drive の受け渡しフォルダを inbox へ同期する
- **drive-sync.timer**（手動・active）— Drive の受け渡しフォルダを10分ごとに同期する
- **fridge-dashboard.service**（手動・timer駆動）— 冷蔵庫ダッシュボードを作り直す
- **fridge-dashboard.timer**（手動・active）— 冷蔵庫ダッシュボードを1分ごとに作り直す
- **fugu-chat.service**（自動起動・active）— fugu-lab chat アプリ（外注を JSONL に記録する計測環境）
- **inbox-index.service**（自動起動・active）— inbox に置かれた会話ログの索引を Fugu に作らせる
- **outdoor-temp.service**（自動起動・active）— 外気温を記録する(冷蔵庫の消費と突き合わせる用)
- **plug-monitor.service**（自動起動・active）— スマートプラグの電力を記録する(制御はしない)
- **shifter-web.service**（自動起動・active）— shifter のダッシュボードを配信する(このマシンからのみ)
- **weekly-inventory.service**（手動・timer駆動）— 道具の棚卸しを書き出して push する
- **weekly-inventory.timer**（手動・active）— 道具の棚卸し（週次）
