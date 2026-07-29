import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pagePaths = [
  'donna/index.md',
  'donna/working-with-donna.md',
  'donna/workflows.md',
  'donna/guardrails.md',
  'donna/faq.md',
];

test('every Donna page has public metadata and a visible verification date', () => {
  for (const path of pagePaths) {
    const page = readFileSync(new URL(path, root), 'utf8');
    assert.match(page, /owner: Donna/);
    assert.match(page, /lastVerified: 2026-07-29/);
    assert.match(page, /reviewCadence: quarterly/);
    assert.match(page, /sensitivity: public/);
    assert.match(page, /Last verified: July 29, 2026/);
    assert.match(page, /rel: canonical/);
  }
});

test('agent card exposes the documented public fields', () => {
  const card = JSON.parse(readFileSync(new URL('public/donna/agent-card.json', root), 'utf8'));
  assert.equal(card.schemaVersion, '1.0');
  assert.equal(card.name, 'Donna');
  assert.equal(card.lastVerified, '2026-07-29');
  assert.equal(card.pages.length, 5);
  assert.deepEqual(Object.keys(card.authority), ['may', 'requiresExplicitApproval', 'never']);
  assert.deepEqual(Object.keys(card.collaboration), ['input', 'output']);
});

test('llms index contains only the five canonical public page links', () => {
  const llms = readFileSync(new URL('public/donna/llms.txt', root), 'utf8');
  const urls = [...llms.matchAll(/https:\/\/\S+/g)].map(([url]) => url);
  assert.equal(urls.length, 5);
  assert.ok(urls.every((url) => url.startsWith('https://handbook.2x.agency/donna/')));
});
