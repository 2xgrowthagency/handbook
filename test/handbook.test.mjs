import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const config = readFileSync(new URL('.vitepress/config.ts', root), 'utf8');
const index = readFileSync(new URL('index.md', root), 'utf8');

test('package exposes the required validation and build commands', () => {
  assert.equal(pkg.devDependencies.vitepress, '1.6.4');
  assert.equal(pkg.scripts.lint, 'node scripts/lint.mjs');
  assert.equal(pkg.scripts.test, 'node --test');
  assert.equal(pkg.scripts['validate:donna'], 'node scripts/validate-donna.mjs');
  assert.equal(pkg.scripts.build, 'vitepress build');
});

test('current OpenClaw Handbook routes remain configured', () => {
  assert.match(config, /title:\s*'The OpenClaw Handbook'/);
  assert.match(config, /link:\s*'\/00-what-is-this'/);
  assert.match(config, /link:\s*'\/26-coding-strategy'/);
  assert.match(index, /The OpenClaw Handbook/);

  const chapterFiles = readdirSync(root)
    .filter((filename) => /^\d{2}-.+\.md$/.test(filename))
    .sort();

  assert.equal(chapterFiles.length, 27);
  assert.equal(chapterFiles[0], '00-what-is-this.md');
  assert.equal(chapterFiles.at(-1), '26-coding-strategy.md');
});

test('Donna navigation and canonical sitemap are configured', () => {
  assert.match(config, /srcExclude:\s*\['README\.md'\]/);
  assert.match(config, /hostname:\s*'https:\/\/handbook\.2x\.agency'/);
  assert.match(config, /text:\s*'How Donna Works',\s*link:\s*'\/donna\/'/);

  for (const route of [
    '/donna/',
    '/donna/working-with-donna',
    '/donna/workflows',
    '/donna/guardrails',
    '/donna/faq',
  ]) {
    assert.ok(config.includes(`link: '${route}'`), `Missing Donna route: ${route}`);
  }
});
