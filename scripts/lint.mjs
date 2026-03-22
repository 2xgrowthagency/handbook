import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const gitignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
const vitepressConfig = readFileSync(new URL('../.vitepress/config.ts', import.meta.url), 'utf8');

const expectedScripts = {
  dev: 'vitepress dev',
  build: 'vitepress build',
  preview: 'vitepress preview',
  'docs:dev': 'vitepress dev docs',
  'docs:build': 'vitepress build docs',
  'docs:preview': 'vitepress preview docs',
  lint: 'node scripts/lint.mjs',
  test: 'node --test',
};

if (pkg.devDependencies?.vitepress !== '1.6.4') {
  throw new Error('package.json must pin vitepress 1.6.4.');
}

for (const [name, command] of Object.entries(expectedScripts)) {
  if (pkg.scripts?.[name] !== command) {
    throw new Error(`Missing or incorrect script: ${name}.`);
  }
}

const expectedGitignoreEntries = ['node_modules/', 'dist/', '.vitepress/cache/'];

for (const entry of expectedGitignoreEntries) {
  if (!gitignore.includes(`${entry}\n`) && gitignore.trimEnd() !== entry) {
    throw new Error(`Missing .gitignore entry: ${entry}.`);
  }
}

if (!vitepressConfig.includes("title: '2x Agency Handbook'")) {
  throw new Error('Missing VitePress title.');
}

if (!vitepressConfig.includes("description: 'Documentation for the 2x Agency Handbook.'")) {
  throw new Error('Missing VitePress description.');
}

if (!vitepressConfig.includes("{ text: 'Home', link: '/' }")) {
  throw new Error('Missing Home nav link.');
}

const chapterLinks = [...vitepressConfig.matchAll(/link:\s*'\/chapter-(\d+)'/g)].map((match) => match[1]);

if (JSON.stringify(chapterLinks) !== JSON.stringify(['1', '2', '3', '4', '5', '6'])) {
  throw new Error('Sidebar must include chapter-1 through chapter-6.');
}
