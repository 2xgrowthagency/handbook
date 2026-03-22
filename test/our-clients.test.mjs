import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ourClients = readFileSync(new URL('../our-clients.md', import.meta.url), 'utf8');
const body = ourClients
  .split('\n')
  .slice(2)
  .join(' ')
  .trim();
const wordCount = body.split(/\s+/).filter(Boolean).length;

test('our-clients page defines fit, non-fit, relationship norms, and mutual expectations', () => {
  assert.match(ourClients, /^# Our Clients$/m);
  assert.match(ourClients, /ideal 2x client/i);
  assert.match(ourClients, /We are not a fit/i);
  assert.match(ourClients, /A great client relationship/i);
  assert.match(ourClients, /What we expect from each other/i);
  assert.ok(wordCount >= 400, `Expected at least 400 words, got ${wordCount}.`);
  assert.ok(wordCount <= 600, `Expected at most 600 words, got ${wordCount}.`);
});
