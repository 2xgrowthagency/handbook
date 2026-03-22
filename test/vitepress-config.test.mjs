import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const config = readFileSync(new URL('../.vitepress/config.ts', import.meta.url), 'utf8');

test('vitepress config defines handbook metadata', () => {
  assert.match(config, /title:\s*'2x Agency Handbook'/);
  assert.match(config, /description:\s*'Documentation for the 2x Agency Handbook\.'/);
});

test('vitepress config includes a home nav item', () => {
  assert.match(config, /\{\s*text:\s*'Home',\s*link:\s*'\/'\s*\}/);
});

test('vitepress config includes all six handbook chapters in the sidebar', () => {
  const chapterLinks = [...config.matchAll(/link:\s*'\/chapter-(\d+)'/g)].map((match) => match[1]);

  assert.deepEqual(chapterLinks, ['1', '2', '3', '4', '5', '6']);
});
