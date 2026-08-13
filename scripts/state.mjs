#!/usr/bin/env node
// STATE.md のスキーマ検証。
//
// STATE.md はリポジトリ直下にあり、Astro の content collection の *外* にある。
// zod スキーマは glob({ base: './src/content/...' }) の対象にしか効かないので、
// astro build では検証されない。つまりここが STATE.md の唯一の検証場所になる。
//
// YAML ライブラリを使わない理由: npm 依存を足すと package-lock.json の再生成が
// 要り、CI の `npm ci` がロック不一致で落ちる。代わりに受け付ける記法を下記の
// サブセットに絞り、外れた書き方は「解釈できない」として error にする。
// 黙って読み飛ばすと、描画側が気づかないまま古い値を出し続けるため。
//
//   受け付ける記法:
//     key: scalar
//     key: []
//     key:
//       - k: v
//         k2: v2
//
//   受け付けない記法: ネストしたリスト / 複数行文字列(| >) / アンカー(& *) /
//                     フロー記法({a: 1}, [1, 2])

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const STATUSES = ['active', 'paused', 'blocked', 'done'];
export const SCHEMA_VERSION = 1;
const TOP_KEYS = ['schema_version', 'last_updated', 'current_focus', 'projects', 'pending'];
const PROJECT_KEYS = ['slug', 'status', 'progress', 'next_action', 'next_action_at'];
const PENDING_KEYS = ['id', 'question', 'raised'];
// last_updated がこれ以上古ければ warn。更新漏れに人間が気づけるように
const STALE_DAYS = 14;

const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const KEY = /^([A-Za-z_][\w-]*):\s*(.*)$/;

// --- YAML サブセットのパース ---------------------------------------------

export function parseYamlSubset(text) {
  const errors = [];
  const out = {};
  let listKey = null; // 今開いているリストのキー
  let item = null; // 今開いているリスト項目

  const fail = (line, msg) => errors.push({ line, msg });

  const scalar = (raw, line) => {
    const s = raw.trim();
    if (s === '[]') return [];
    if (s === '') return '';
    if (s.length > 1 && ((s[0] === '"' && s.at(-1) === '"') || (s[0] === "'" && s.at(-1) === "'"))) {
      return s.slice(1, -1);
    }
    if (/^[[{|>&*]/.test(s)) {
      fail(line, `対応していない YAML 記法: ${s}`);
      return s;
    }
    if (/^-?\d+$/.test(s)) return Number(s);
    if (/^-?\d*\.\d+$/.test(s)) return Number(s);
    if (s === 'true') return true;
    if (s === 'false') return false;
    return s;
  };

  text.split('\n').forEach((raw, i) => {
    const line = i + 1;
    if (!raw.trim() || raw.trimStart().startsWith('#')) return;
    const indent = raw.length - raw.trimStart().length;
    const t = raw.trim();

    // トップレベル
    if (indent === 0) {
      listKey = null;
      item = null;
      const m = t.match(KEY);
      if (!m) return fail(line, `解釈できない行: ${t}`);
      const [, k, v] = m;
      if (k in out) return fail(line, `キーの重複: ${k}`);
      // 値が空のトップレベルキーはリストの開始とみなす(このサブセットの決め)
      if (v === '') {
        out[k] = [];
        listKey = k;
      } else {
        out[k] = scalar(v, line);
      }
      return;
    }

    // リスト項目の開始
    if (t.startsWith('- ')) {
      if (!listKey) return fail(line, `親キーの無いリスト項目: ${t}`);
      const m = t.slice(2).match(KEY);
      if (!m) return fail(line, `リスト項目は "key: value" で書く: ${t}`);
      item = { __line: line, [m[1]]: scalar(m[2], line) };
      out[listKey].push(item);
      return;
    }

    // リスト項目の2行目以降
    if (!item) return fail(line, `所属先の無いインデント行: ${t}`);
    const m = t.match(KEY);
    if (!m) return fail(line, `解釈できない行: ${t}`);
    if (m[1] in item) return fail(line, `キーの重複: ${m[1]}`);
    item[m[1]] = scalar(m[2], line);
  });

  return { data: out, errors };
}

// --- フロントマターの切り出し --------------------------------------------

export function splitFrontmatter(src) {
  if (!src.startsWith('---\n')) return null;
  const end = src.indexOf('\n---', 3);
  if (end === -1) return null;
  return { fm: src.slice(4, end), body: src.slice(end + 4) };
}

// --- スキーマ検証 ----------------------------------------------------------

// 返り値は check.mjs の issue 形式に合わせる: { level, file, line, msg, hint }
export function validateState(src, { file = 'STATE.md', now = new Date() } = {}) {
  const issues = [];
  const add = (level, line, msg, hint) => issues.push({ level, file, line, msg, hint });

  const split = splitFrontmatter(src);
  if (!split) {
    add('error', 1, 'YAML フロントマターが無い', 'ファイル先頭を --- で開き、--- で閉じる');
    return issues;
  }
  // フロントマター1行目はファイルの2行目
  const at = (n) => (n ?? 0) + 1;

  const { data, errors } = parseYamlSubset(split.fm);
  for (const e of errors) {
    add('error', at(e.line), `フロントマターを解釈できない: ${e.msg}`,
      'state.mjs 冒頭の「受け付ける記法」を参照');
  }

  // 未知のトップレベルキー。スキーマを勝手に増やさせないための番人
  for (const k of Object.keys(data)) {
    if (!TOP_KEYS.includes(k)) {
      add('error', 1, `未知のトップレベルキー: ${k}`,
        '描画側とセットで直す必要がある。足すなら CLAUDE.md のスキーマ表と state.mjs も更新する');
    }
  }
  for (const k of ['schema_version', 'last_updated', 'current_focus', 'projects']) {
    if (!(k in data)) add('error', 1, `必須キーが無い: ${k}`);
  }

  if ('schema_version' in data && data.schema_version !== SCHEMA_VERSION) {
    add('error', 1, `schema_version が ${data.schema_version}(想定 ${SCHEMA_VERSION})`,
      '描画側が解釈できない。破壊的変更をしたなら描画側も直す');
  }

  if ('last_updated' in data) {
    const v = String(data.last_updated);
    if (!ISO_DATETIME.test(v)) {
      add('error', 1, `last_updated が ISO 8601 でない: ${v}`, '例: 2026-08-13T10:11+09:00');
    } else {
      const days = (now - new Date(v)) / 86400000;
      if (days > STALE_DAYS) {
        add('warn', 1, `last_updated が ${Math.floor(days)} 日前`,
          '更新を止めたのか、更新漏れなのかを確かめる');
      }
    }
  }

  if ('current_focus' in data && (typeof data.current_focus !== 'string' || !data.current_focus.trim())) {
    add('error', 1, 'current_focus が空', '今いちばん手をつけている対象を一言で');
  }

  const seen = new Set();
  const projects = Array.isArray(data.projects) ? data.projects : [];
  if ('projects' in data && !projects.length) {
    add('error', 1, 'projects が空', '最低1件は要る');
  }
  for (const p of projects) {
    const line = at(p.__line);
    for (const k of PROJECT_KEYS) {
      if (!(k in p)) add('error', line, `projects[] に ${k} が無い`);
    }
    for (const k of Object.keys(p)) {
      if (!k.startsWith('__') && !PROJECT_KEYS.includes(k)) {
        add('error', line, `projects[] の未知のキー: ${k}`);
      }
    }
    if ('slug' in p) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(p.slug))) {
        add('error', line, `slug が kebab-case でない: ${p.slug}`);
      }
      if (seen.has(p.slug)) add('error', line, `slug の重複: ${p.slug}`);
      seen.add(p.slug);
      // YAML と本文の食い違い。本文に出てこない slug は描画とページが噛み合わない
      if (!split.body.includes(String(p.slug))) {
        add('warn', line, `slug "${p.slug}" が本文に出てこない`,
          '本文の見出しと 1:1 で対応させる');
      }
    }
    if ('status' in p && !STATUSES.includes(p.status)) {
      add('error', line, `status が不正: ${p.status}`, `使えるのは ${STATUSES.join(' | ')}`);
    }
    if ('progress' in p) {
      const n = p.progress;
      if (typeof n !== 'number' || Number.isNaN(n) || n < 0 || n > 1) {
        add('error', line, `progress が 0.0-1.0 の数値でない: ${p.progress}`);
      } else if (p.status === 'done' && n !== 1) {
        add('warn', line, `status が done なのに progress が ${n}`);
      }
    }
  }

  const pending = Array.isArray(data.pending) ? data.pending : [];
  for (const q of pending) {
    const line = at(q.__line);
    for (const k of PENDING_KEYS) {
      if (!(k in q)) add('error', line, `pending[] に ${k} が無い`);
    }
    for (const k of Object.keys(q)) {
      if (!k.startsWith('__') && !PENDING_KEYS.includes(k)) {
        add('error', line, `pending[] の未知のキー: ${k}`);
      }
    }
    if ('raised' in q && !ISO_DATE.test(String(q.raised))) {
      add('error', line, `raised が YYYY-MM-DD でない: ${q.raised}`);
    }
  }

  // 未確定は pending[] にだけ置く。本文にも書くと二重管理になり必ずズレる
  const dupHeading = split.body.split('\n').findIndex((l) => /^#{1,4}\s.*(未確定|確認待ち)/.test(l));
  if (dupHeading !== -1) {
    add('warn', 1, '本文に「未確定 / 確認待ち」の見出しがある',
      'pending[] と二重になる。本文からは外し、フロントマターに寄せる');
  }

  // 履歴の混入。STATE.md はスナップショットで、下半分が墓場になると
  // 読み手(人間も AI も)が古い方針に引きずられる
  const graveyard = split.body.split('\n').findIndex((l) =>
    /^#{1,4}\s.*(経緯|撤回|履歴|過去|やめたこと|没)/.test(l));
  if (graveyard !== -1) {
    add('warn', 1, '本文に履歴らしき見出しがある',
      'STATE.md は上書きのみ。経緯と撤回は DECISIONS.md へ');
  }

  return issues;
}

export function checkStateFile(root, now = new Date()) {
  const path = join(root, 'STATE.md');
  if (!existsSync(path)) {
    return [{ level: 'error', file: 'STATE.md', line: 1, msg: 'STATE.md が無い',
      hint: 'リポジトリ直下に置く。無いと再開時に何をすべきか分からなくなる' }];
  }
  return validateState(readFileSync(path, 'utf8'), { now });
}

// 単体でも走らせられるようにしておく: node scripts/state.mjs [root]
if (import.meta.url === `file://${process.argv[1]}`) {
  const issues = checkStateFile(process.argv[2] ?? process.cwd());
  const icon = { error: '✖', warn: '▲' };
  for (const i of issues) {
    console.log(`${icon[i.level]} ${i.file}:${i.line}  ${i.msg}`);
    if (i.hint) console.log(`   → ${i.hint}`);
  }
  const errors = issues.filter((i) => i.level === 'error').length;
  if (!issues.length) console.log('STATE.md 問題なし');
  process.exit(errors > 0 ? 1 : 0);
}
