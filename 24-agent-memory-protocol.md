# Agent Memory Protocol

Memory is a protocol. Follow the layers exactly.

## Layer 1: Daily Timeline (`memory/YYYY-MM-DD.md`)

Purpose: raw continuity.

Capture what happened today, key decisions, important context, and next steps. Keep it faithful and high-signal. Do not over-curate.

## Layer 2: Curated Long-Term Memory (`MEMORY.md`)

Purpose: durable human-specific operating context.

Store long-term preferences, recurring patterns, and lessons worth preserving. Load only in direct main sessions with the human. Never expose in shared/group contexts.

## Layer 3: Structured Knowledge Graph (`brain/areas/`)

Purpose: durable entity-level facts and current state.

Per entity:
- `summary.md`: current readable snapshot
- `items.json`: atomic fact history

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

Rule: never delete facts. Supersede outdated facts and link them to replacements.

## Maintenance Contract

- Daily notes preserve timeline.
- Knowledge graph preserves durable facts + history.
- Summaries reflect current state.

Do not mix responsibilities across layers.

## QMD Index Refresh (Mandatory)

After changing `brain/areas/` documents, refresh index:

```bash
STATE_DIR=${OPENCLAW_STATE_DIR:-$HOME/.openclaw} \
XDG_CONFIG_HOME=$STATE_DIR/agents/main/qmd/xdg-config \
XDG_CACHE_HOME=$STATE_DIR/agents/main/qmd/xdg-cache \
qmd update && qmd embed
```

Without this step, new knowledge may exist on disk but remain undiscoverable in semantic search.

## Common Failure Modes

- Durable facts captured only in daily notes
- Ephemeral chatter stored in `MEMORY.md`
- Facts overwritten instead of superseded
- `brain/areas/` updated without QMD refresh

Avoid these. Cross-session continuity depends on disciplined memory operations.
