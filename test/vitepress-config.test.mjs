import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const config = readFileSync(new URL('../.vitepress/config.ts', import.meta.url), 'utf8');
const themeIndexPath = new URL('../.vitepress/theme/index.ts', import.meta.url);
const themeStylePath = new URL('../.vitepress/theme/style.css', import.meta.url);
const themeIndex = readFileSync(themeIndexPath, 'utf8');
const themeStyle = readFileSync(themeStylePath, 'utf8');

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

test('custom vitepress theme entry imports the default theme and custom stylesheet', () => {
  assert.equal(existsSync(themeIndexPath), true);
  assert.match(themeIndex, /import DefaultTheme from 'vitepress\/theme';/);
  assert.match(themeIndex, /import '\.\/style\.css';/);
  assert.match(themeIndex, /export default DefaultTheme;/);
});

test('custom vitepress stylesheet defines the requested handbook typography and colors', () => {
  assert.equal(existsSync(themeStylePath), true);
  assert.match(themeStyle, /--vp-font-family-base:\s*Georgia,\s*serif;/);
  assert.match(themeStyle, /--vp-c-text-1:\s*#1a1a1a;/);
  assert.match(themeStyle, /--vp-c-bg:\s*#fafaf8;/);
  assert.match(themeStyle, /--vp-c-bg-soft:\s*#f3f4f6;/);
  assert.match(themeStyle, /--vp-c-brand-1:\s*#2563eb;/);
  assert.match(themeStyle, /body\s*\{[\s\S]*font-size:\s*18px;[\s\S]*line-height:\s*1\.75;/);
  assert.match(themeStyle, /h1,[\s\S]*h6,[\s\S]*font-family:\s*Inter,\s*sans-serif;/);
  assert.match(themeStyle, /\.content-container\s*\{[\s\S]*max-width:\s*740px;/);
});
