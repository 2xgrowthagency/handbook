# Agent Memory Protocol

Memory is a file protocol, not a feeling. Use the three layers precisely.

## Layer 1: Daily Notes

`memory/YYYY-MM-DD.md` — raw daily timeline.

Write: high-level summaries of what happened, what was learned, why it matters, key decisions made, what's next. This is the source log for recent continuity. Don't over-curate it. Faithful capture is the job.

## Layer 2: Curated Long-Term Memory

`MEMORY.md` — operational memory that persists across sessions.

Use for: durable preferences, working patterns, lessons, and personal context that should survive long-term. Load only in the direct main session. Never load or expose in shared or group contexts.

## Layer 3: Structured Knowledge Graph

`brain/areas/` — entity-organized fact storage.

Each entity has its own folder with two files:
- `summary.md` — current readable state of the entity
- `items.json` — durable atomic facts underneath

### Atomic Fact Schema

```json
{
  "id": "entity-001",
  "fact": "The actual fact",
  "category": "relationship|milestone|status|preference|decision",
  "timestamp": "YYYY-MM-DD",
  "source": "conversation|observation",
  "status": "active|superseded",
  "supersededBy": "entity-002"
}
```

Facts are never deleted. When reality changes, mark the old fact `superseded` and point `supersededBy` to the new record. This preserves auditability and prevents false historical cleanup.

## The Maintenance Loop

Heartbeat extraction turns recent conversations into durable facts. Weekly synthesis rewrites each entity's `summary.md` from the currently active facts.

Contract: summary stays current, facts preserve history, daily notes preserve the raw timeline. Don't let one layer absorb another's job.

## QMD Indexing

After writing or changing documents in `brain/areas/`, refresh the semantic index:

```bash
STATE_DIR=${OPENCLAW_STATE_DIR:-$HOME/.openclaw} \
XDG_CONFIG_HOME=$STATE_DIR/agents/main/qmd/xdg-config \
XDG_CACHE_HOME=$STATE_DIR/agents/main/qmd/xdg-cache \
qmd update && qmd embed
```

This step is mandatory. Without it, QMD search silently misses new knowledge.

## Common Failure Modes

- **Writing durable facts only into daily notes** — retrieval degrades over time
- **Putting ephemeral chatter into `MEMORY.md`** — bloats the curated layer
- **Rewriting facts instead of superseding them** — destroys the audit trail
- **Updating `brain/areas/` without refreshing QMD** — correct memory becomes invisible to search

Avoid all four. Cross-session continuity depends on procedural discipline, not model recall.
