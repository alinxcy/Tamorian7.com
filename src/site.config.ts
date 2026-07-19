// サイト設定の単一の情報源(名前・著者・説明)。
// カノニカルURLは astro.config.mjs の `site`。
export const SITE = {
  name: 'Knowledge Garden',
  tagline: 'AIと何かを作りながら得た知見を、育てて・繋げて・探せるようにする場所。',
  author: 'Tamorian',
} as const;
