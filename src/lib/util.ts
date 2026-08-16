import { getCollection } from 'astro:content';

export function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type GardenEntry = Awaited<ReturnType<typeof getCollection<'garden'>>>[number];
export type LogEntry = Awaited<ReturnType<typeof getCollection<'log'>>>[number];
export type SeedEntry = Awaited<ReturnType<typeof getCollection<'seeds'>>>[number];
export type WorkEntry = Awaited<ReturnType<typeof getCollection<'works'>>>[number];

// publish: false(保存のみ)はサイトに出さない
const isPublished = (e: { data: { publish?: boolean } }) => e.data.publish !== false;

// セクション表示名(日本語ラベルはここに集約)
export const KIND_LABEL = { garden: 'Garden', log: 'Log', seeds: 'Seeds', works: 'Works' } as const;
export const STATUS_LABEL: Record<string, string> = {
  published: '公開中',
  wip: '制作中',
  planned: '構想中',
};

// Garden ノートを更新日の新しい順で取得(公開分のみ)
export async function getGarden(): Promise<GardenEntry[]> {
  const notes = await getCollection('garden', isPublished);
  return notes.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
}

// ログを日付の新しい順で取得(公開分のみ)
export async function getLog(): Promise<LogEntry[]> {
  const logs = await getCollection('log', isPublished);
  return logs.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Seeds を拾った日の新しい順で取得(公開分のみ)
export async function getSeeds(): Promise<SeedEntry[]> {
  const seeds = await getCollection('seeds', isPublished);
  return seeds.sort((a, b) => b.data.found.getTime() - a.data.found.getTime());
}

// Works を 制作中 → 構想中 → 公開中 の順で取得(公開分のみ)。
// 作業中のものを上に出す。ここが今いちばん動いている場所だから。
const STATUS_ORDER: Record<string, number> = { wip: 0, planned: 1, published: 2 };
export async function getWorks(): Promise<WorkEntry[]> {
  const works = await getCollection('works', isPublished);
  return works.sort(
    (a, b) =>
      (STATUS_ORDER[a.data.status] ?? 9) - (STATUS_ORDER[b.data.status] ?? 9) ||
      b.data.updated.getTime() - a.data.updated.getTime(),
  );
}

export type RefItem = { kind: 'garden' | 'log' | 'seeds' | 'works'; id: string; title: string };

// プロジェクト集約: project: <slug> を持つ Garden ノート、ログ、Seeds を集める。
// Works ページはこれで手作業ゼロのハブになる。
export async function getProjectItems(
  slug: string,
): Promise<{ notes: RefItem[]; logs: RefItem[]; seeds: RefItem[] }> {
  const [garden, log, seeds] = [await getGarden(), await getLog(), await getSeeds()];
  return {
    notes: garden
      .filter((e) => e.data.project === slug)
      .map((e) => ({ kind: 'garden' as const, id: e.id, title: e.data.title })),
    logs: log
      .filter((e) => e.data.project === slug)
      .map((e) => ({ kind: 'log' as const, id: e.id, title: e.data.title })),
    seeds: seeds
      .filter((e) => e.data.project === slug)
      .map((e) => ({ kind: 'seeds' as const, id: e.id, title: e.data.title })),
  };
}

// garden / log / seeds / works 全体からタグ→件数を集計(公開分のみ)
export async function getTagCounts(): Promise<Map<string, number>> {
  const all = [
    ...(await getGarden()),
    ...(await getLog()),
    ...(await getSeeds()),
    ...(await getWorks()),
  ];
  const counts = new Map<string, number>();
  for (const e of all) {
    for (const t of e.data.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return counts;
}

// バックリンク: 本文中で /garden/<targetId>/ を参照している他ノート/ログ/Works
export async function getBacklinks(targetId: string): Promise<RefItem[]> {
  const [garden, log, works] = [await getGarden(), await getLog(), await getWorks()];
  const needle = `/garden/${targetId}/`;
  const out: RefItem[] = [];
  for (const e of garden) {
    if (e.id === targetId) continue;
    if ((e.body ?? '').includes(needle)) out.push({ kind: 'garden', id: e.id, title: e.data.title });
  }
  for (const e of log) {
    if ((e.body ?? '').includes(needle)) out.push({ kind: 'log', id: e.id, title: e.data.title });
  }
  for (const e of works) {
    if ((e.body ?? '').includes(needle)) out.push({ kind: 'works', id: e.id, title: e.data.title });
  }
  return out;
}

// 関連ノート: タグを共有する Garden ノート(共有数の多い順)。excludeIds は除外
export async function getRelated(
  targetId: string,
  tags: string[],
  excludeIds: string[] = [],
): Promise<RefItem[]> {
  const garden = await getGarden();
  const tagset = new Set(tags);
  return garden
    .filter((e) => e.id !== targetId && !excludeIds.includes(e.id))
    .map((e) => ({ e, shared: e.data.tags.filter((t) => tagset.has(t)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.e.data.updated.getTime() - a.e.data.updated.getTime())
    .slice(0, 5)
    .map((x) => ({ kind: 'garden' as const, id: x.e.id, title: x.e.data.title }));
}
