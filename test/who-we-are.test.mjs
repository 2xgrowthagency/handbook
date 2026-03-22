import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const whoWeAre = readFileSync(new URL('../who-we-are.md', import.meta.url), 'utf8');
const body = whoWeAre
  .split('\n')
  .slice(2)
  .join(' ')
  .trim();
const wordCount = body.split(/\s+/).filter(Boolean).length;

test('who-we-are page includes the requested company profile content', () => {
  assert.match(whoWeAre, /^# Who We Are$/m);
  assert.match(whoWeAre, /Our mission is simple:/);
  assert.match(whoWeAre, /Our origin story/);
  assert.match(whoWeAre, /What we believe about marketing/);
  assert.match(whoWeAre, /John leads client strategy, positioning, discovery, and new business development\./);
  assert.match(whoWeAre, /Jenn is Co-Founder and COO, leading internal systems and people while also driving performance marketing strategy, creative direction, and retention\./);
  assert.ok(wordCount >= 400, `Expected at least 400 words, got ${wordCount}.`);
  assert.ok(wordCount <= 600, `Expected at most 600 words, got ${wordCount}.`);
});
