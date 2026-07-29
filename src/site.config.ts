// サイト設定の単一の情報源(名前・著者・説明)。
// カノニカルURLは astro.config.mjs の `site`。
//
// サイト名はセクション名 "Garden" と衝突させないこと。
// ヘッダのロゴ = サイト名、その下のナビ = Garden / Log / Works という関係にする。
export const SITE = {
  name: 'Tamorian7',
  tagline: 'AIと何かを作りながら得た知見を、育てて・繋げて・探せるようにする場所。',
  author: 'Tamorian',
} as const;
