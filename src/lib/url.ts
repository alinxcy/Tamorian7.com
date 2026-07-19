// base(サブパス配信)対応のリンクヘルパー。
// import.meta.env.BASE_URL は astro.config の base(末尾スラッシュ付き)。
const BASE = import.meta.env.BASE_URL;

export function u(path = '/'): string {
  // 外部URL・アンカー・mailto はそのまま
  if (/^(https?:)?\/\//.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const joined = BASE.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
  return joined.replace(/\/{2,}/g, '/');
}
