// STATE.md をビルド時に読む。**トップと /state/ で解釈をズレさせないために1箇所へ集める。**
//
// パーサは scripts/state.mjs のものを再利用する。ここで書き直すと、
// 検証(check)と描画で解釈がズレたときに気づけなくなる。
// ?raw で読む理由は state.astro の注記のとおり(astro build がチャンクへ
// バンドルするので import.meta.url が dist を向く)。
import { parseYamlSubset, splitFrontmatter } from '../../scripts/state.mjs';
import src from '../../STATE.md?raw';

export type Project = {
  slug: string;
  status: 'active' | 'paused' | 'blocked' | 'done' | string;
  summary?: string;
  next_action?: string;
  next_action_at?: string;
  link?: string;
};
export type Pending = { id: string; question: string; raised: string };

const split = splitFrontmatter(src);
// フロントマターが壊れていればビルドを止める。黙って空を描くと、
// 「更新されていない」のか「読めていない」のか人間が区別できない
if (!split) throw new Error('STATE.md にフロントマターが無い（npm run check を先に通す）');
const { data } = parseYamlSubset(split.fm) as { data: Record<string, unknown> };

export const state = {
  current_focus: String(data.current_focus ?? ''),
  last_updated: String(data.last_updated ?? ''),
  projects: (Array.isArray(data.projects) ? data.projects : []) as Project[],
  pending: (Array.isArray(data.pending) ? data.pending : []) as Pending[],
};

/** last_updated からの日数。更新漏れに人間が気づけるように出す */
export function staleness(): { days: number; stale: boolean } {
  const t = new Date(state.last_updated).getTime();
  const days = Math.floor((Date.now() - t) / 86400000);
  return { days, stale: days > 14 };
}

const ORDER = ['blocked', 'active', 'paused', 'done'];
/** **詰まりを先に出す。** 見るべき順に並べる */
export function byUrgency(): Project[] {
  return [...state.projects].sort(
    (a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status),
  );
}
