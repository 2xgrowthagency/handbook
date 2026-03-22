import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const theWork = readFileSync(new URL('../the-work.md', import.meta.url), 'utf8');
const body = theWork
  .split('\n')
  .slice(2)
  .join(' ')
  .trim();
const wordCount = body.split(/\s+/).filter(Boolean).length;

test('the-work page explains the agency growth and testing philosophy', () => {
  assert.match(theWork, /^# The Work$/m);
  assert.match(theWork, /Performance marketing, to us,/);
  assert.match(theWork, /How we think about growth/);
  assert.match(theWork, /What good looks like/);
  assert.match(theWork, /Our philosophy on testing/);
  assert.match(theWork, /Iteration is where compounding happens/);
  assert.ok(wordCount >= 400, `Expected at least 400 words, got ${wordCount}.`);
  assert.ok(wordCount <= 600, `Expected at most 600 words, got ${wordCount}.`);
});
