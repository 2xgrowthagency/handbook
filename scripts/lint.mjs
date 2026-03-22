import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const gitignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
const vitepressConfig = readFileSync(new URL('../.vitepress/config.ts', import.meta.url), 'utf8');
const index = readFileSync(new URL('../index.md', import.meta.url), 'utf8');
const whoWeAre = readFileSync(new URL('../who-we-are.md', import.meta.url), 'utf8');
const howWeWork = readFileSync(new URL('../how-we-work.md', import.meta.url), 'utf8');

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

if (!index.includes('# The 2x Agency Handbook')) {
  throw new Error('Homepage must include the requested title.');
}

if (!index.includes('_How we work, decide, and deliver as a high-performing agency._')) {
  throw new Error('Homepage must include a subtitle.');
}

if (!index.includes('This handbook is a concise reference for how the 2x Agency operates')) {
  throw new Error('Homepage must include an intro paragraph.');
}

const homepageChapterLinks = [...index.matchAll(/\[Chapter (\d+)\]\(\/chapter-\d+\)/g)].map((match) => match[1]);

if (JSON.stringify(homepageChapterLinks) !== JSON.stringify(['1', '2', '3', '4', '5', '6'])) {
  throw new Error('Homepage must link to chapter-1 through chapter-6.');
}

if (!whoWeAre.includes('# Who We Are')) {
  throw new Error('who-we-are.md must include the requested title.');
}

if (!whoWeAre.includes('Our mission is simple:')) {
  throw new Error('who-we-are.md must include a mission statement.');
}

if (!whoWeAre.includes('Our origin story')) {
  throw new Error('who-we-are.md must include an origin story section.');
}

if (!whoWeAre.includes('What we believe about marketing')) {
  throw new Error('who-we-are.md must describe the company marketing philosophy.');
}

if (!whoWeAre.includes('John leads client strategy, positioning, discovery, and new business development.')) {
  throw new Error('who-we-are.md must include John\'s introduction.');
}

if (!whoWeAre.includes('Jenn is Co-Founder and COO, leading internal systems and people while also driving performance marketing strategy, creative direction, and retention.')) {
  throw new Error('who-we-are.md must include Jenn\'s introduction.');
}

const whoWeAreWordCount = whoWeAre
  .split('\n')
  .slice(2)
  .join(' ')
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

if (whoWeAreWordCount < 400 || whoWeAreWordCount > 600) {
  throw new Error(`who-we-are.md must be between 400 and 600 words. Got ${whoWeAreWordCount}.`);
}

if (!howWeWork.includes('# How We Work')) {
  throw new Error('how-we-work.md must include the requested title.');
}

if (!howWeWork.includes('async-first')) {
  throw new Error('how-we-work.md must describe async-first work.');
}

if (!howWeWork.includes('bias for action')) {
  throw new Error('how-we-work.md must include bias for action.');
}

if (!howWeWork.includes('unnecessary meetings')) {
  throw new Error('how-we-work.md must explain the no unnecessary meetings principle.');
}

if (!howWeWork.includes('How we communicate matters')) {
  throw new Error('how-we-work.md must describe communication norms.');
}

if (!howWeWork.includes('We make decisions')) {
  throw new Error('how-we-work.md must describe decision making.');
}

const howWeWorkWordCount = howWeWork
  .split('\n')
  .slice(2)
  .join(' ')
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

if (howWeWorkWordCount < 400 || howWeWorkWordCount > 600) {
  throw new Error(`how-we-work.md must be between 400 and 600 words. Got ${howWeWorkWordCount}.`);
}
