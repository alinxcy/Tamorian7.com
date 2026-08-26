#!/usr/bin/env node
// honest-gate (a) 機械判定。
//
// 方針: 機械は止める、AI は問う。
//   error = マージさせない(確実に壊れているもの)
//   warn  = 通すが目に入れる(判断が要るもの)
// 判断が要る指摘(言いすぎ / 未確認 / n=1 の一般化)は honest-reviewer サブ
// エージェントの担当であり、ここでは扱わない。混ぜると気分で結果が変わる。
//
// frontmatter のスキーマ検証は astro build (zod) が担当する。
// ここでは zod で表せないもの——横断参照と、状態と内容の食い違い——だけを見る。

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { checkStateFile } from './state.mjs';

const ROOT = process.argv[2] ?? process.cwd();
const cfgPath = join(ROOT, 'garden.config.json');
const cfg = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, 'utf8')) : {};
const banned = cfg.honestGate?.bannedPhrases ?? [];
// 「絶対パス」のような技術用語は誇張ではない。素朴な語マッチは偽陽性を出す
const exceptions = cfg.honestGate?.bannedPhraseExceptions ?? [];
const allowWithReason = cfg.honestGate?.allowWithReason !== false;
const BASE_SEGMENT = '/Tamorian7.com/';

const COLLECTIONS = ['garden', 'log', 'works', 'seeds'];
const dirOf = (c) => join(ROOT, cfg.paths?.[c] ?? `src/content/${c}`);

const issues = [];
const add = (level, file, line, msg, hint) =>
  issues.push({ level, file, line, msg, hint });

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

// frontmatter は「値の取り出し」だけ。検証は zod の担当なので深追いしない。
function splitFrontmatter(src) {
  if (!src.startsWith('---')) return { fm: '', body: src, fmLines: 0 };
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { fm: '', body: src, fmLines: 0 };
  const fm = src.slice(4, end);
  return { fm, body: src.slice(end + 4), fmLines: fm.split('\n').length + 2 };
}
const fmValue = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return m ? m[1].trim() : undefined;
};
// 配列キーが「中身を持っているか」。`chats: []` と `chats:` は空とみなす
const fmHasItems = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return false;
  if (m[1].trim() && m[1].trim() !== '[]') return true;
  const after = fm.slice(m.index + m[0].length);
  return /^\n\s+-\s/.test(after);
};

// 実在する id の集合(リンク切れ検査用)
const ids = {};
const unpublished = {};
for (const c of COLLECTIONS) {
  ids[c] = new Set(walk(dirOf(c)).map((f) => basename(f, '.md')));
  // **公開されていないものを別に持つ。** ファイルがあっても publish: false なら
  // ビルド後は404になる。存在だけ見ていた頃はこれを見逃していた(2026-08-26)
  unpublished[c] = new Set(
    walk(dirOf(c))
      .filter((f) => {
        const head = readFileSync(f, 'utf8').slice(0, 900);
        const m = head.match(/^publish:\s*(\w+)/m);
        // seeds は既定が false、それ以外は既定が true
        return m ? m[1] === 'false' : c === 'seeds';
      })
      .map((f) => basename(f, '.md')),
  );
}

const files = COLLECTIONS.flatMap((c) => walk(dirOf(c)).map((f) => ({ c, f })));

for (const { c, f } of files) {
  const rel = relative(ROOT, f);
  const src = readFileSync(f, 'utf8');
  const { fm, body, fmLines } = splitFrontmatter(src);
  const bodyLines = body.split('\n');
  const at = (i) => i + fmLines; // 本文行 → ファイル行

  // 1. base パスの直書き。rehype が base を前置するので二重になる
  bodyLines.forEach((l, i) => {
    if (l.includes(BASE_SEGMENT)) {
      add('error', rel, at(i), `base パスを直書きしている (${BASE_SEGMENT})`,
        'Markdown 内はルート絶対 (/garden/... ) で書く。base は rehype が前置する');
    }
  });

  // 2. 内部リンク切れ + 非公開ノートへのリンク
  // **自分が非公開なら、非公開を指しても問題ない**（どちらもビルドに出ない）
  const pubM = fm.match(/^publish:\s*(\w+)/m);
  const selfUnpublished = pubM ? pubM[1] === 'false' : c === 'seeds';
  const linkRe = /\]\((\/(garden|log|works|seeds)\/([^)/#]+)\/?[^)]*)\)/g;
  bodyLines.forEach((l, i) => {
    for (const m of l.matchAll(linkRe)) {
      const [, href, coll, slug] = m;
      if (!ids[coll]?.has(slug)) {
        add('error', rel, at(i), `内部リンク切れ: ${href}`,
          `${coll}/${slug}.md が存在しない`);
      } else if (unpublished[coll]?.has(slug) && !selfUnpublished) {
        add('error', rel, at(i), `非公開のノートへリンクしている: ${href}`,
          `${coll}/${slug}.md は publish: false。**ビルド後は404になる**`);
      }
    }
  });

  // 3. 生の数式記法。KaTeX 未導入なので $...$ はそのまま表示されてしまう
  bodyLines.forEach((l, i) => {
    if (l.includes('```')) return;
    if (/(^|[^$\\])\$[^$\n]{2,}\$/.test(l)) {
      add('warn', rel, at(i), '生の数式記法 ($...$) が残っている',
        'KaTeX は未導入。画像か文章に置き換えるか、導入を検討する');
    }
  });

  // 4. published なのに chats が残っている
  //    残った chats は「まだ log に吐き出していない会話」のマーカー。
  //    腐るリンクが公開状態で残るのを止める
  if (c === 'works' && fmValue(fm, 'status') === 'published' && fmHasItems(fm, 'chats')) {
    add('warn', rel, 1, 'published なのに chats が残っている',
      '経緯を log へ吐き出したか確認し、chats を削除する');
  }

  // 5. 禁止語。直後に理由コメントがあれば通す
  bodyLines.forEach((l, i) => {
    for (const w of banned) {
      if (!l.includes(w)) continue;
      // 技術用語としての出現だけなら見逃す
      let stripped = l;
      for (const ex of exceptions) stripped = stripped.split(ex).join('');
      if (!stripped.includes(w)) continue;
      const hasReason =
        allowWithReason &&
        (/<!--\s*reason:/.test(l) || /<!--\s*reason:/.test(bodyLines[i + 1] ?? ''));
      if (!hasReason) {
        add('warn', rel, at(i), `断定が強い語: 「${w}」`,
          '根拠に見合うか確認する。意図的なら <!-- reason: ... --> を添える');
      }
    }
  });
}

// STATE.md のスキーマ検証。content collection の外にあり zod が効かないので、
// 検証はここが唯一の場所になる(詳細は state.mjs)
issues.push(...checkStateFile(ROOT));

// --- 出力 ---
const errors = issues.filter((i) => i.level === 'error');
const warns = issues.filter((i) => i.level === 'warn');
const icon = { error: '✖', warn: '▲' };

for (const i of issues) {
  console.log(`${icon[i.level]} ${i.file}:${i.line}  ${i.msg}`);
  if (i.hint) console.log(`   → ${i.hint}`);
}

console.log(
  `\n${files.length} ファイル検査 · error ${errors.length} · warn ${warns.length}`,
);
if (errors.length === 0 && warns.length === 0) console.log('問題なし');
// warn ではブロックしない。止めるのは確実に壊れているものだけ
process.exit(errors.length > 0 ? 1 : 0);
