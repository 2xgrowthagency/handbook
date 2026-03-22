import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const howWeWork = readFileSync(new URL('../how-we-work.md', import.meta.url), 'utf8');
const body = howWeWork
  .split('\n')
  .slice(2)
  .join(' ')
  .trim();
const wordCount = body.split(/\s+/).filter(Boolean).length;

test('how-we-work page covers the requested operating principles', () => {
  assert.match(howWeWork, /^# How We Work$/m);
  assert.match(howWeWork, /async-first/);
  assert.match(howWeWork, /bias for action/);
  assert.match(howWeWork, /unnecessary meetings/);
  assert.match(howWeWork, /How we communicate matters/);
  assert.match(howWeWork, /We make decisions/);
  assert.ok(wordCount >= 400, `Expected at least 400 words, got ${wordCount}.`);
  assert.ok(wordCount <= 600, `Expected at most 600 words, got ${wordCount}.`);
});
