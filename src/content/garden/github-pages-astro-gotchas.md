---
title: Astro を GitHub Pages に出すときの落とし穴
tags: [astro, github-pages, ci]
updated: 2026-07-19
created: 2026-07-19
publish: false
summary: プロジェクトページの base サブパス、Pages の初回有効化、環境のブランチ保護で deploy が1秒で死ぬ罠。保存のみ。
project: knowledge-garden
---

> これは garden-muse の初キャプチャ。ユーザー判断で **保存のみ**(publish: false)。
> サイトには出ないが、同じ沼にハマったとき引ける。

Astro をユーザーの `github.io/<repo>/` に出したときに踏んだ罠のメモ。

## 1. base サブパスは自動では効かない

プロジェクトページは `/<repo>/` 配下配信になる。`astro.config` に
`base: '/<repo>'` を設定しても、**テンプレート内の `href="/foo"` は自動で base 前置
されない**。対策:
- コンポーネントのリンクは `import.meta.env.BASE_URL` を前置するヘルパー経由に
- **Markdown 本文内のルート絶対リンク**は rehype プラグインで前置する
- Astro 7 は Markdown プロセッサが変わり、`markdown.rehypePlugins` を使うには
  `@astrojs/markdown-remark` を明示インストールする必要がある

## 2. Pagefind も base を意識する

検索インデックスは dist ルート基準の URL(`/garden/...`)を持つ。サブパス配信だと
結果リンクが 404 になるので、PagefindUI の `bundlePath` と `processResult` で base を
前置する。UI アセットの `src/href` も base 前置。

## 3. Pages は初回だけ手動有効化が要る

`actions/configure-pages` の `enablement: true` は、GITHUB_TOKEN の権限では
`Resource not accessible by integration` で弾かれることが多い。**初回だけ**
Settings → Pages → Source: GitHub Actions を手動で選ぶ。

## 4. deploy が1秒で失敗する = 環境のブランチ保護

`github-pages` 環境は既定でデプロイ可能ブランチを **デフォルトブランチに制限**する。
非デフォルトブランチから deploy すると **ログも出ず1秒で failure**。
Settings → Environments → github-pages → Deployment branches を「No restriction」か
対象ブランチ許可に変える。

## 教訓

サブパス配信は「リンクの base 前置」を**テンプレート・Markdown・検索の3面**で
やらないと綺麗に動かない。独自ドメイン(ルート配信)にすれば base 問題は消える。
