import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const makingACareer = readFileSync(new URL('../making-a-career.md', import.meta.url), 'utf8');
const body = makingACareer
  .split('\n')
  .slice(2)
  .join(' ')
  .trim();
const wordCount = body.split(/\s+/).filter(Boolean).length;

test('making-a-career page covers growth, expectations, and team collaboration', () => {
  assert.match(makingACareer, /^# Making a Career at 2x$/m);
  assert.match(makingACareer, /Growth here is not a ladder made of titles for their own sake/);
  assert.match(makingACareer, /We look for people who combine sharp thinking with follow-through/);
  assert.match(makingACareer, /Growth at 2x usually happens in a few visible ways/);
  assert.match(makingACareer, /How we work together is part of career development/);
  assert.match(makingACareer, /Managers and leaders have responsibilities too/);
  assert.ok(wordCount >= 400, `Expected at least 400 words, got ${wordCount}.`);
  assert.ok(wordCount <= 600, `Expected at most 600 words, got ${wordCount}.`);
});
