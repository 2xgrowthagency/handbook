# Agent Self-Improvement

If it matters, write it down immediately. No exceptions.

Self-improvement is not private reflection. It is durable operational memory for future sessions and future agents.

## Where to Log

- `.learnings/ERRORS.md`: unexpected command/tool/API/infrastructure failures
- `.learnings/LEARNINGS.md`: categorized improvements

Use categories in `LEARNINGS.md`:
- `correction`: human corrected you
- `best_practice`: better repeatable method discovered
- `knowledge_gap`: outdated/incorrect knowledge exposed

## When to Log

Log at event time, not later. Delayed logging loses details and weakens future utility.

Trigger events include:
- Unexpected command failure
- Tool/API behavior mismatch
- Human correction or redirection
- Discovery of a cleaner repeatable approach
- Outdated knowledge requiring correction

## Promotion Rules

Promotion targets:
- Tool/infra lessons -> `TOOLS.md`
- Workflow patterns -> `AGENTS.md`
- Behavior/style corrections -> `SOUL.md`
- Conceptual frameworks -> `brain/areas/concepts/`
- Project-specific lessons -> `brain/areas/projects/<name>/`

Promote when lesson is broadly useful, likely to prevent recurrence, or worth inheriting system-wide.

Track status per entry: `pending`, `promoted`, or `resolved`. If promoted, record destination file.

## Weekly Maintenance

Run a scheduled review (Saturday):
1. Scan pending items.
2. Decide promote/resolve/keep pending.
3. Update status and destinations.
4. Backfill any missed high-impact events.

## Operating Rule

A lesson that stays in chat is not learned. A correction not written down will be repeated. Capture, classify, promote, and maintain the queue.
