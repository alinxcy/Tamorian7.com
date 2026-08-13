#!/usr/bin/env node
// STATE.md 検証の単体テスト。
//
// check.test.mjs と同じ方針で「落ちるべきものが落ちること」を主に見る。
// staleness は now を注入して試す——実時刻に依存させると、放っておくだけで
// テストが赤くなる(自分で仕掛けた時限爆弾になる)。

import { validateState, parseYamlSubset } from './state.mjs';

const NOW = new Date('2026-08-13T12:00:00+09:00');
const has = (issues, level, re) =>
  issues.some((i) => i.level === level && re.test(i.msg));

const fm = (body) => `---\n${body}\n---\n\n# 本文\n\ngood-project のこと\n`;

const VALID = fm(`schema_version: 1
last_updated: 2026-08-13T10:11+09:00
current_focus: "テスト"
projects:
  - slug: good-project
    status: active
    progress: 0.5
    next_action: "何かする"
    next_action_at: "scripts/state.mjs"
pending: []`);

const cases = [
  ['正しい STATE.md は error を出さない',
    () => validateState(VALID, { now: NOW }).every((i) => i.level !== 'error')],

  ['フロントマターが無ければ error',
    () => has(validateState('# 本文だけ\n', { now: NOW }), 'error', /フロントマターが無い/)],

  ['未知のトップレベルキーを error',
    () => has(validateState(VALID.replace('schema_version: 1', 'schema_version: 1\nowner: alinxcy'),
      { now: NOW }), 'error', /未知のトップレベルキー: owner/)],

  ['必須キー欠落を error',
    () => has(validateState(VALID.replace(/current_focus: .*\n/, ''), { now: NOW }),
      'error', /必須キーが無い: current_focus/)],

  ['schema_version 違いを error',
    () => has(validateState(VALID.replace('schema_version: 1', 'schema_version: 2'), { now: NOW }),
      'error', /schema_version が 2/)],

  ['ISO 8601 でない last_updated を error',
    () => has(validateState(VALID.replace('2026-08-13T10:11+09:00', '2026/08/13'), { now: NOW }),
      'error', /last_updated が ISO 8601 でない/)],

  ['古い last_updated を warn',
    () => has(validateState(VALID.replace('2026-08-13T10:11+09:00', '2026-06-01T10:00+09:00'),
      { now: NOW }), 'warn', /日前/)],

  ['status の列挙外を error',
    () => has(validateState(VALID.replace('status: active', 'status: ongoing'), { now: NOW }),
      'error', /status が不正: ongoing/)],

  ['範囲外の progress を error',
    () => has(validateState(VALID.replace('progress: 0.5', 'progress: 1.5'), { now: NOW }),
      'error', /progress が 0.0-1.0/)],

  ['数値でない progress を error',
    () => has(validateState(VALID.replace('progress: 0.5', 'progress: half'), { now: NOW }),
      'error', /progress が 0.0-1.0/)],

  ['projects[] の未知のキーを error',
    () => has(validateState(VALID.replace('    status: active', '    status: active\n    owner: me'),
      { now: NOW }), 'error', /projects\[\] の未知のキー: owner/)],

  ['slug の重複を error',
    () => {
      const dup = VALID.replace('pending: []', `  - slug: good-project
    status: paused
    progress: 0.1
    next_action: "重複"
    next_action_at: "x"
pending: []`);
      return has(validateState(dup, { now: NOW }), 'error', /slug の重複/);
    }],

  ['本文に出てこない slug を warn',
    () => has(validateState(VALID.replace('slug: good-project', 'slug: ghost-project'), { now: NOW }),
      'warn', /本文に出てこない/)],

  ['本文の「未確定」見出しを warn',
    () => has(validateState(VALID.replace('# 本文', '## 未確定・確認待ち'), { now: NOW }),
      'warn', /未確定 \/ 確認待ち/)],

  ['本文の履歴見出しを warn',
    () => has(validateState(VALID.replace('# 本文', '## これまでの経緯'), { now: NOW }),
      'warn', /履歴らしき見出し/)],

  ['pending[] の raised 書式違反を error',
    () => has(validateState(VALID.replace('pending: []', `pending:
  - id: x
    question: "?"
    raised: 2026/08/13`), { now: NOW }), 'error', /raised が YYYY-MM-DD でない/)],

  // --- パーサ自体 ---
  ['対応していない記法(複数行文字列)を error',
    () => parseYamlSubset('note: |\n  行1\n').errors.length > 0],

  ['対応していない記法(フロー記法)を error',
    () => parseYamlSubset('tags: [a, b]\n').errors.length > 0],

  ['空配列 [] は通す',
    () => parseYamlSubset('tags: []\n').errors.length === 0],

  ['トップレベルのキー重複を error',
    () => parseYamlSubset('a: 1\na: 2\n').errors.length > 0],

  ['親キーの無いリスト項目を error',
    () => parseYamlSubset('  - a: 1\n').errors.length > 0],

  ['コメントと空行を読み飛ばす',
    () => parseYamlSubset('# コメント\n\na: 1\n').errors.length === 0],

  ['数値と真偽値を型変換する',
    () => {
      const { data } = parseYamlSubset('n: 0.5\ni: 3\nb: true\ns: "0.5"\n');
      return data.n === 0.5 && data.i === 3 && data.b === true && data.s === '0.5';
    }],

  ['リスト項目をオブジェクトとして読む',
    () => {
      const { data, errors } = parseYamlSubset('projects:\n  - slug: a\n    progress: 0.2\n');
      return errors.length === 0 && data.projects.length === 1
        && data.projects[0].slug === 'a' && data.projects[0].progress === 0.2;
    }],
];

let failed = 0;
for (const [name, fn] of cases) {
  let ok = false;
  try {
    ok = fn();
  } catch (e) {
    ok = false;
    console.log(`   例外: ${e.message}`);
  }
  if (!ok) failed++;
  console.log(`${ok ? '✓' : '✗'} ${name}`);
}
if (failed) {
  console.log(`\n${failed} 件失敗`);
  process.exit(1);
}
console.log(`\n${cases.length}/${cases.length} PASS`);
