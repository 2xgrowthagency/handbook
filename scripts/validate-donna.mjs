import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pagePaths = [
  'donna/index.md',
  'donna/working-with-donna.md',
  'donna/workflows.md',
  'donna/guardrails.md',
  'donna/faq.md',
];
const canonicalPages = [
  'https://handbook.2x.agency/donna/',
  'https://handbook.2x.agency/donna/working-with-donna',
  'https://handbook.2x.agency/donna/workflows',
  'https://handbook.2x.agency/donna/guardrails',
  'https://handbook.2x.agency/donna/faq',
];
const requiredMetadata = {
  owner: 'Donna',
  lastVerified: '2026-07-24',
  reviewCadence: 'quarterly',
  sensitivity: 'public',
  pageClass: 'donna-page',
};

for (const pagePath of pagePaths) {
  const page = readFileSync(new URL(pagePath, root), 'utf8');
  const frontmatter = page.match(/^---\n([\s\S]*?)\n---/)?.[1];

  if (!frontmatter) {
    throw new Error(`${pagePath} is missing YAML frontmatter.`);
  }

  for (const [field, expected] of Object.entries(requiredMetadata)) {
    if (!frontmatter.includes(`${field}: ${expected}`)) {
      throw new Error(`${pagePath} must declare ${field}: ${expected}.`);
    }
  }

  if (!page.includes('Last verified: July 24, 2026')) {
    throw new Error(`${pagePath} must display the verified date.`);
  }

  if (!frontmatter.includes('rel: canonical') || !frontmatter.includes('https://handbook.2x.agency/donna/')) {
    throw new Error(`${pagePath} must declare its public canonical URL.`);
  }
}

const card = JSON.parse(readFileSync(new URL('public/donna/agent-card.json', root), 'utf8'));
const requiredCardFields = [
  'schemaVersion',
  'name',
  'role',
  'summary',
  'canonicalUrl',
  'lastVerified',
  'authority',
  'collaboration',
  'pages',
];

for (const field of requiredCardFields) {
  if (!(field in card)) {
    throw new Error(`agent-card.json is missing ${field}.`);
  }
}

if (card.schemaVersion !== '1.0' || card.name !== 'Donna' || card.lastVerified !== '2026-07-24') {
  throw new Error('agent-card.json has invalid identity, version, or verification metadata.');
}

if (JSON.stringify(card.pages) !== JSON.stringify(canonicalPages)) {
  throw new Error('agent-card.json pages must match the canonical Donna page index.');
}

for (const field of ['may', 'requiresExplicitApproval', 'never']) {
  if (!Array.isArray(card.authority[field]) || card.authority[field].length === 0) {
    throw new Error(`agent-card.json authority.${field} must be a non-empty array.`);
  }
}

const llms = readFileSync(new URL('public/donna/llms.txt', root), 'utf8');
const llmsUrls = [...llms.matchAll(/https:\/\/\S+/g)].map(([url]) => url);

if (JSON.stringify(llmsUrls) !== JSON.stringify(canonicalPages)) {
  throw new Error('llms.txt must link only the canonical Donna pages, in order.');
}

console.log(`Donna contract valid: ${pagePaths.length} pages, agent-card.json v${card.schemaVersion}, ${llmsUrls.length} canonical links.`);
