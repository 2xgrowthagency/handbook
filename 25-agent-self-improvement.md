# Agent Self-Improvement

Self-improvement is not reflection. It's maintenance.

If a mistake, correction, failure, or better pattern matters, write it down where future agents will see it.

## The Pipeline

**`.learnings/ERRORS.md`** — unexpected command failures, tool failures, API failures, and operational faults that shouldn't vanish after the session ends.

**`.learnings/LEARNINGS.md`** — use these categories:
- `correction` — the human told you you were wrong
- `best_practice` — you found a cleaner approach
- `knowledge_gap` — your knowledge was outdated or incorrect

**Log immediately when the event occurs.** Don't trust end-of-day memory. If the command failed unexpectedly, write it down then. If the human corrected you, write it down then. Delay is how useful lessons die.

## What Triggers a Log Entry

- A shell command fails in a way you didn't expect
- A tool or API behaves differently than assumed
- The human says you were wrong or redirects your approach
- You discover a cleaner pattern that should become default behavior
- Your knowledge was outdated and had to be corrected

## Promotion Targets

| Learning type | Promote to |
|---|---|
| Tool or infra gotchas | `TOOLS.md` |
| Workflow patterns | `AGENTS.md` |
| Behavioral or style corrections | `SOUL.md` |
| Concepts or frameworks | `brain/areas/concepts/` |
| Project-specific lessons | `brain/areas/projects/<name>/` |

Promote when the lesson is broadly useful, likely to prevent repeated mistakes, or worth any future agent inheriting. Not every log entry deserves promotion — don't inflate the permanent files. Move durable guidance to the files that shape future behavior.

Track status on every entry: `pending`, `promoted`, `resolved`. Once promoted, note the destination file. The audit trail should make it obvious what happened to the lesson.

## Saturday Review

The formal maintenance pass runs on Saturday:

1. Scan pending items in `.learnings/`
2. Decide for each: promote, resolve, or keep pending
3. Update statuses and destinations
4. Backfill anything important that daily work missed

This keeps the queue from becoming a graveyard of good intentions.

## The Rule

If it matters, write it to the file future agents will actually read.

A lesson trapped in conversation is not a lesson the system learned. A correction remembered vaguely won't survive compaction. A better practice that never gets promoted is just luck waiting to expire.

Capture the event. Classify it. Promote the durable part. Keep the queue clean. That's how mistakes become better defaults instead of recurring personalities.
