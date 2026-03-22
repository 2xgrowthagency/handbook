import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('readme includes a one-line handbook description and live site link', () => {
  assert.match(readme, /^# 2x Agency Handbook$/m);
  assert.match(
    readme,
    /Internal handbook for how 2x Agency works and ships; the live site is at \[handbook\.2x\.agency\]\(https:\/\/handbook\.2x\.agency\)\./,
  );
});
