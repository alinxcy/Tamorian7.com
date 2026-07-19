import { getCollection } from 'astro:content';

export function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type GardenEntry = Awaited<ReturnType<typeof getCollection<'garden'>>>[number];
export type LogEntry = Awaited<ReturnType<typeof getCollection<'log'>>>[number];

// publish: false(保存のみ)はサイトに出さない
const isPublished = (e: { data: { publish?: boolean } }) => e.data.publish !== false;

// 常緑ノートを更新日の新しい順で取得(公開分のみ)
export async function getGarden(): Promise<GardenEntry[]> {
  const notes = await getCollection('garden', isPublished);
  return notes.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
}

// ログを日付の新しい順で取得(公開分のみ)
export async function getLog(): Promise<LogEntry[]> {
  const logs = await getCollection('log', isPublished);
  return logs.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// garden と log 全体からタグ→件数を集計(公開分のみ)
export async function getTagCounts(): Promise<Map<string, number>> {
  const [garden, log] = [
    await getCollection('garden', isPublished),
    await getCollection('log', isPublished),
  ];
  const counts = new Map<string, number>();
  for (const e of [...garden, ...log]) {
    for (const t of e.data.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return counts;
}

export type RefItem = { kind: 'garden' | 'log'; id: string; title: string };

// バックリンク: 本文中で /garden/<targetId>/ を参照している他ノート/ログ(公開分のみ)
export async function getBacklinks(targetId: string): Promise<RefItem[]> {
  const [garden, log] = [
    await getCollection('garden', isPublished),
    await getCollection('log', isPublished),
  ];
  const needle = `/garden/${targetId}/`;
  const out: RefItem[] = [];
  for (const e of garden) {
    if (e.id === targetId) continue;
    if ((e.body ?? '').includes(needle)) out.push({ kind: 'garden', id: e.id, title: e.data.title });
  }
  for (const e of log) {
    if ((e.body ?? '').includes(needle)) out.push({ kind: 'log', id: e.id, title: e.data.title });
  }
  return out;
}

// 関連ノート: タグを共有する常緑ノート(共有数の多い順)。excludeIds は除外
export async function getRelated(
  targetId: string,
  tags: string[],
  excludeIds: string[] = [],
): Promise<RefItem[]> {
  const garden = await getCollection('garden', isPublished);
  const tagset = new Set(tags);
  return garden
    .filter((e) => e.id !== targetId && !excludeIds.includes(e.id))
    .map((e) => ({ e, shared: e.data.tags.filter((t) => tagset.has(t)).length }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.e.data.updated.getTime() - a.e.data.updated.getTime())
    .slice(0, 5)
    .map((x) => ({ kind: 'garden' as const, id: x.e.id, title: x.e.data.title }));
}
