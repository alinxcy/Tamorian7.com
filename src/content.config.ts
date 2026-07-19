import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 常緑ノート(育てる・トピック単位・相互リンク)
const garden = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/garden' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    created: z.coerce.date().optional(),
    summary: z.string().optional(),
    kind: z.enum(['note', 'work']).default('note'),
    // kind: work のときだけ使う追加フィールド
    status: z.enum(['published', 'wip', 'planned']).optional(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    emoji: z.string().optional(),
  }),
});

// ログ(流す・日付順)
const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { garden, log };
