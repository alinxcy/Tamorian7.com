import { getCollection } from 'astro:content';

export function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type GardenEntry = Awaited<ReturnType<typeof getCollection<'garden'>>>[number];
export type LogEntry = Awaited<ReturnType<typeof getCollection<'log'>>>[number];

// 常緑ノートを更新日の新しい順で取得
export async function getGarden(): Promise<GardenEntry[]> {
  const notes = await getCollection('garden');
  return notes.sort((a, b) => b.data.updated.getTime() - a.data.updated.getTime());
}

// ログを日付の新しい順で取得
export async function getLog(): Promise<LogEntry[]> {
  const logs = await getCollection('log');
  return logs.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// garden と log 全体からタグ→件数を集計
export async function getTagCounts(): Promise<Map<string, number>> {
  const [garden, log] = [await getCollection('garden'), await getCollection('log')];
  const counts = new Map<string, number>();
  for (const e of [...garden, ...log]) {
    for (const t of e.data.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return counts;
}
