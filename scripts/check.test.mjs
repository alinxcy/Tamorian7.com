#!/usr/bin/env node
// fixture テスト: 意図的に壊したものが確実に落ちることを確認する。
// 「通ること」より「落ちるべきものが落ちること」を検査する——
// 検査スクリプトの怖い壊れ方は、何も検出しなくなって静かに全部通すことだから。

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, 'fixtures');

let out = '', code = 0;
try {
  out = execFileSync('node', [join(here, 'check.mjs'), fixtures], { encoding: 'utf8' });
} catch (e) {
  out = (e.stdout ?? '') + (e.stderr ?? '');
  code = e.status;
}

const expected = [
  ['error を検出して exit 1', () => code === 1],
  ['リンク切れを検出', () => /broken\.md.*内部リンク切れ: \/garden\/nope\//s.test(out)],
  ['base 直書きを検出', () => /broken\.md.*base パスを直書き/s.test(out)],
  ['生の数式を検出', () => /broken\.md.*生の数式記法/s.test(out)],
  ['理由なしの禁止語を検出', () => /broken\.md.*断定が強い語/s.test(out)],
  ['published + chats を検出', () => /live\.md.*published なのに chats/s.test(out)],
  ['生きたリンクを誤検出しない', () => !/ok\.md.*内部リンク切れ/s.test(out)],
  ['技術用語(絶対パス)を誤検出しない', () => !/ok\.md:6/.test(out)],
  ['理由コメント付きの断定を通す', () => !/ok\.md:8/.test(out)],
];

let failed = 0;
for (const [name, fn] of expected) {
  const ok = fn();
  if (!ok) failed++;
  console.log(`${ok ? '✓' : '✗'} ${name}`);
}
if (failed) {
  console.log(`\n${failed} 件失敗。check.mjs の出力:\n${out}`);
  process.exit(1);
}
console.log(`\n${expected.length}/${expected.length} PASS`);
