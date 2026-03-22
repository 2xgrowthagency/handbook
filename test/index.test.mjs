import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const index = readFileSync(new URL('../index.md', import.meta.url), 'utf8');

test('homepage includes the requested title, subtitle, intro, and chapter links', () => {
  assert.match(index, /^# The 2x Agency Handbook$/m);
  assert.match(index, /^_How we work, decide, and deliver as a high-performing agency\._$/m);
  assert.match(
    index,
    /This handbook is a concise reference for how the 2x Agency operates, from principles and process to execution details across the business\./,
  );

  const chapterLinks = [...index.matchAll(/\[Chapter (\d+)\]\(\/chapter-\d+\)/g)].map((match) => match[1]);

  assert.deepEqual(chapterLinks, ['1', '2', '3', '4', '5', '6']);
});
