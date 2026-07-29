import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 公開レベル: false = 保存のみ(ビルド/一覧/タグ/検索から除外)。省略時は公開
const publish = z.boolean().default(true);
// 所属プロジェクト(works の slug)。無いノート/ログがあってよい
const project = z.string().optional();

// Garden — 主題で切る。育てる・相互リンクする
const garden = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/garden' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    created: z.coerce.date().optional(),
    summary: z.string().optional(),
    publish,
    project,
  }),
});

// Log — 実録。日付順に流す。書いたら基本いじらない
const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    publish,
    project,
  }),
});

// Works — プロジェクトで切る。三態(planned → wip → published)で本文の役割が入れ替わる
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['planned', 'wip', 'published']).default('planned'),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    created: z.coerce.date().optional(),
    summary: z.string().optional(),
    emoji: z.string().optional(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    publish,
    // 作業中だけ持つリンク。published にするときに削除する。
    // リンクの寿命と表示期間を一致させ、腐ったURLが公開状態で残るのを防ぐ。
    // 残ったまま published にすると npm run check が warn を出す。
    chats: z
      .array(
        z.object({
          label: z.string(),
          kind: z.enum(['claude', 'code']),
          url: z.string().url().optional(),   // kind: claude
          session: z.string().optional(),     // kind: code (claude --resume <session>)
        }),
      )
      .default([]),
  }),
});

export const collections = { garden, log, works };
