import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

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
