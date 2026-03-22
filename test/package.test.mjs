import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const gitignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

test('package name matches repository', () => {
  assert.equal(pkg.name, '2x-handbook');
});

test('vitepress is configured as a dev dependency', () => {
  assert.equal(pkg.devDependencies?.vitepress, '1.6.4');
});

test('standard vitepress scripts are present', () => {
  assert.deepEqual(
    {
      dev: pkg.scripts?.dev,
      build: pkg.scripts?.build,
      preview: pkg.scripts?.preview,
      'docs:dev': pkg.scripts?.['docs:dev'],
      'docs:build': pkg.scripts?.['docs:build'],
      'docs:preview': pkg.scripts?.['docs:preview'],
    },
    {
      dev: 'vitepress dev',
      build: 'vitepress build',
      preview: 'vitepress preview',
      'docs:dev': 'vitepress dev docs',
      'docs:build': 'vitepress build docs',
      'docs:preview': 'vitepress preview docs',
    },
  );
});

test('.gitignore includes generated output directories', () => {
  assert.deepEqual(gitignore, ['node_modules/', 'dist/', '.vitepress/cache/']);
});
