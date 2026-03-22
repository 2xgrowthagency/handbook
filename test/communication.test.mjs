import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const communication = readFileSync(new URL('../communication.md', import.meta.url), 'utf8');
const body = communication
  .split('\n')
  .slice(2)
  .join(' ')
  .trim();
const wordCount = body.split(/\s+/).filter(Boolean).length;

test('communication page explains channels, response times, feedback, and concerns', () => {
  assert.match(communication, /^# Communication$/m);
  assert.match(communication, /How we communicate starts with choosing the right channel/);
  assert.match(communication, /Slack/);
  assert.match(communication, /email/i);
  assert.match(communication, /response times/i);
  assert.match(communication, /Feedback works best/);
  assert.match(communication, /Concerns should be raised early/);
  assert.ok(wordCount >= 400, `Expected at least 400 words, got ${wordCount}.`);
  assert.ok(wordCount <= 600, `Expected at most 600 words, got ${wordCount}.`);
});
