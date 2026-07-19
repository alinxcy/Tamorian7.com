// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages(プロジェクトページ)はサブパス配信のため base を設定。
// 公開先を変える(独自ドメイン等)ときは site / base を見直す。
const BASE = '/Tamorian7.com';

// Markdown 本文内のルート絶対リンク(/garden/... 等)に base を前置する rehype プラグイン。
// 依存を足さないよう手書きで走査する。
function rehypeBaseLinks() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties && node.properties.href;
        if (
          typeof href === 'string' &&
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !href.startsWith(BASE + '/')
        ) {
          node.properties.href = BASE + href;
        }
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
    return tree;
  };
}

export default defineConfig({
  site: 'https://alinxcy.github.io',
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
});
