# Upgrade Checklist

Sync checklist for bringing any agent (Clara, Dobby, Orion, Akira) to current standard.

Three tiers: **Must have**, **Recommended**, **Optional/Advanced**.

---

## Tier 1 — Must Have

These are non-negotiable. Without them, the agent isn't fully functional.

### brain/areas/ Structure

**What it is:** Knowledge graph — structured entities (people, companies, projects) with atomic facts + living summaries.

**How to verify:**
```bash
ls -la /root/clawd/brain/areas/
# Should see: people/, companies/, projects/
```

**How to install/configure:**
```bash
mkdir -p /root/clawd/brain/areas/{people,companies,projects}

# Create a sample entity to test
cat > /root/clawd/brain/areas/people/john-chan.json <<'EOF'
{
  "facts": [
    {
      "id": "jc-001",
      "fact": "Co-founder of 2x Agency",
      "category": "role",
      "timestamp": "2025-01-01",
      "source": "conversation",
      "status": "active"
    }
  ]
}
EOF

cat > /root/clawd/brain/areas/people/john-chan-summary.md <<'EOF'
# John Chan

Co-founder of 2x Agency. Manages strategy, client discovery, positioning.
EOF
```

**Schema:** Each entity has:
- `<name>.json` — atomic facts (append-only)
- `<name>-summary.md` — living summary (rewritten weekly)

**Fact schema:**
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

---

### QMD (Local Semantic Search)

**What it is:** Local semantic search for memory. Indexes `brain/areas/` and other paths for fast retrieval.

**How to verify:**
```bash
qmd search "test query"
# Should return results (or "no results" if index is empty)
```

**How to install:**
```bash
# Install qmd
npm install -g @openclaw/qmd

# Configure paths
mkdir -p ~/.openclaw/agents/main/qmd/xdg-config
cat > ~/.openclaw/agents/main/qmd/xdg-config/config.yaml <<'EOF'
paths:
  - /root/clawd/brain/areas
  - /root/clawd/memory
  - /root/clawd/MEMORY.md
EOF

# Initial index
STATE_DIR=${OPENCLAW_STATE_DIR:-$HOME/.openclaw}
XDG_CONFIG_HOME=$STATE_DIR/agents/main/qmd/xdg-config \
XDG_CACHE_HOME=$STATE_DIR/agents/main/qmd/xdg-cache \
qmd update && qmd embed
```

**After adding new files to brain/areas/, always re-index:**
```bash
qmd update && qmd embed
```

---

### Self-Improvement Loop

**What it is:** Agent logs corrections/errors/learnings, reviews weekly, promotes to target files (TOOLS.md, AGENTS.md, SOUL.md, brain/areas/).

**How to verify:**
```bash
ls -la /root/clawd/.learnings/
# Should see: LEARNINGS.md, ERRORS.md
```

**How to install:**
```bash
mkdir -p /root/clawd/.learnings

cat > /root/clawd/.learnings/LEARNINGS.md <<'EOF'
# LEARNINGS.md

## Format
- **ID**: LEARN-YYYYMMDD-NNN
- **Date**: YYYY-MM-DD
- **Category**: correction | best_practice | knowledge_gap
- **Description**: What was learned
- **Context**: Why it matters
- **Status**: pending | promoted | resolved
- **Promoted**: <target file> (if promoted)

---

<!-- Log entries below -->
EOF

cat > /root/clawd/.learnings/ERRORS.md <<'EOF'
# ERRORS.md

## Format
- **ID**: ERR-YYYYMMDD-NNN
- **Date**: YYYY-MM-DD
- **Error**: What failed
- **Root Cause**: Why it failed
- **Fix**: How it was resolved
- **Prevention**: How to avoid next time
- **Status**: pending | promoted | resolved
- **Promoted**: <target file> (if promoted)

---

<!-- Log entries below -->
EOF
```

**Add to HEARTBEAT.md** (Saturday review):
```markdown
### Saturday Addition: Weekly Learnings Review

On **Saturdays only**, review `.learnings/` for pending items:
1. Read `.learnings/LEARNINGS.md` and `.learnings/ERRORS.md`
2. For each `Status: pending` entry, decide: promote, resolve, or leave
3. Promote applicable learnings to target files (see AGENTS.md promotion table)
4. Update promoted entries to `Status: promoted` with `Promoted: <target file>`
5. Backfill anything worth keeping from `memory/` into `.learnings/` if missed

Silent — no need to message John unless something critical surfaces.
```

**Promotion targets:**

| Learning Type | Promote To |
|--------------|------------|
| Tool/infra gotchas | `TOOLS.md` |
| Workflow patterns | `AGENTS.md` |
| Behavioral/style | `SOUL.md` |
| Concepts/frameworks | `brain/areas/concepts/<name>.md` |
| Project-specific | `brain/areas/projects/<name>-spec.md` |

---

### skill-vetter

**What it is:** Security-first skill vetting before installation. Checks for red flags, permission scope, suspicious patterns.

**How to verify:**
```bash
clawhub list | grep skill-vetter
```

**How to install:**
```bash
clawhub install skill-vetter
```

**Usage (documented in AGENTS.md):**

Before installing any skill:
1. Search ClawHub: `clawhub search "<skill topic>"`
2. Inspect: `clawhub inspect <slug>`
3. Vet using skill-vetter (already installed)
4. Produce vetting report (source, code review, permissions, risk classification)
5. Only install if risk = 🟢 LOW or 🟡 MEDIUM with clean code review

---

### Daily Compaction Cron

**What it is:** At 11:59 PM PST daily, compact session context if > 150k tokens.

**How to verify:**
```bash
openclaw cron list | grep -i compaction
```

**How to install:**
```bash
openclaw cron add "Daily context compaction" \
  --interval daily \
  --time "23:59" \
  --timezone "America/Los_Angeles" \
  --model haiku \
  --task "If current session token count > 150k, compact context by summarizing older messages and writing summary to memory/YYYY-MM-DD.md. Keep last 20 messages full. Silent unless issues."
```

---

## Tier 2 — Recommended

Standard operations. Makes the agent proactive and self-maintaining.

### 4am Update Check Heartbeat

**What it is:** Daily check for OpenClaw version updates + skill updates.

**How to verify:**
```bash
grep -A 10 "4 AM PST Daily Check" /root/clawd/HEARTBEAT.md
```

**How to install:** Already documented in `HEARTBEAT.md`. Verify it's there and uncommented.

---

### Daily Brief (9am PT)

**What it is:** Morning summary sent to Telegram topic 1 (Daily Ops).

**How to verify:**
```bash
openclaw cron list | grep -i "daily brief"
```

**How to install:**
```bash
openclaw cron add "Daily brief" \
  --interval daily \
  --time "09:00" \
  --timezone "America/Los_Angeles" \
  --model sonnet \
  --task "Generate daily brief: read memory/YYYY-MM-DD.md (yesterday + today), check calendar (next 24h), check email (unread urgent), write brief to memory/daily-prep.md, send to Telegram topic 1."
```

---

### Email Monitoring (3x/day, Silent if Nothing)

**What it is:** Periodic inbox checks. Only alert if urgent/important.

**How to verify:**
```bash
grep -A 5 "Email" /root/clawd/HEARTBEAT.md
```

**How to install:** Add to `HEARTBEAT.md` inbox check logic (silent unless signal).

---

### Saturday Learnings Review

**What it is:** Weekly review of `.learnings/` → promote to target files.

**How to verify:**
```bash
grep -A 10 "Saturday Addition: Weekly Learnings Review" /root/clawd/HEARTBEAT.md
```

**How to install:** See Tier 1 — Self-Improvement Loop section above.

---

### Sunday Security Audit

**What it is:** Weekly `openclaw security audit` run + alert if critical issues found.

**How to verify:**
```bash
grep -A 15 "Sunday Addition: Weekly Security Audit" /root/clawd/HEARTBEAT.md
```

**How to install:** Add to `HEARTBEAT.md`:

```markdown
### Sunday Addition: Weekly Security Audit

On **Sundays only**, after OS updates complete:
1. Run `openclaw security audit`
2. If 0 critical / 0 warn → note in brief, no action needed
3. If warnings found → fix automatically if safe (permissions, etc.)
4. If critical found → alert John immediately, do not wait for brief

Include in Sunday brief:
```
🔒 Weekly Security Audit:
• [STATUS] 0 critical · 0 warn · X info
• [FIXED] (any auto-remediated items)
• [ACTION NEEDED] (any items requiring John's input)
```
```

---

## Tier 3 — Optional/Advanced

For specialized workflows. Not required, but unlocks advanced capabilities.

### Ralph Loops (Codex CLI + ralphy-cli)

**What it is:** Long-running multi-step coding tasks with self-correcting loops.

**How to verify:**
```bash
codex --version
ralphy --version
```

**How to install:**
```bash
# Install Codex CLI
npm install -g @openai/codex

# Authenticate (on Mac, copy to VPS)
codex login
scp ~/.codex/auth.json root@46.225.19.11:~/.codex/auth.json

# Install ralphy-cli
npm install -g ralphy-cli
```

**Usage:** See `skills/coding-agent-loops/SKILL.md`.

---

### Multi-Agent Coordination

**What it is:** Protocol for running multiple AI agents in one Telegram group without loops or chaos.

**How to verify:**
```bash
clawhub list | grep telegram-agent-coordination
```

**How to install:**
```bash
clawhub install telegram-agent-coordination
```

**Usage:** See `skills/telegram-agent-coordination/SKILL.md`.

---

### Node-Hosted Browser (Mac Paired)

**What it is:** John's Mac paired as an OpenClaw node, browser access via CDP.

**How to verify:**
```bash
openclaw nodes list
# Should show: node-name (status: connected)
```

**How to install/pair:** See `skills/node-connect/SKILL.md` and `brain/areas/projects/agent-system/node-host-browser-sop.md`.

**Usage:**
```bash
# Use John's live Chrome session
browser(action="snapshot", profile="user", target="node")

# Use VPS-hosted isolated browser
browser(action="snapshot", profile="openclaw")
```

---

### CONTEXT.md per Project

**What it is:** Canonical context doc in `brain/areas/projects/<name>/CONTEXT.md`.

**How to verify:**
```bash
ls -la /root/clawd/brain/areas/projects/*/CONTEXT.md
```

**How to create:**
```bash
mkdir -p /root/clawd/brain/areas/projects/<project-name>

cat > /root/clawd/brain/areas/projects/<project-name>/CONTEXT.md <<'EOF'
# <Project Name> — Context

## What This Is
[One sentence]

## Current State
[Where we are now]

## Goals
[What we're building toward]

## Architecture
[Key pieces, how they fit together]

## Open Questions
[What's still TBD]

## References
- PRD: [path]
- Repo: [url]
- Live: [url]
EOF
```

**Usage:** ACP sessions read `CONTEXT.md` once at start. Ralph loop PRDs reference it but don't duplicate it. Update `CONTEXT.md` when key decisions change.

---

## Done

Once you've completed Tier 1 + Tier 2, the agent is production-ready. Tier 3 is for specialized workflows.

**Verification checklist:**
- [ ] `brain/areas/` structure exists (people/, companies/, projects/)
- [ ] QMD installed + indexed
- [ ] Self-improvement loop active (`.learnings/` + Saturday review in `HEARTBEAT.md`)
- [ ] `skill-vetter` installed
- [ ] Daily compaction cron set
- [ ] 4am update check in `HEARTBEAT.md`
- [ ] Daily brief cron at 9am PT
- [ ] Email monitoring in `HEARTBEAT.md` (silent unless signal)
- [ ] Saturday learnings review in `HEARTBEAT.md`
- [ ] Sunday security audit in `HEARTBEAT.md`

**After upgrading, restart the gateway:**
```bash
openclaw gateway restart
```

**Test:**
```bash
# Send a message to the agent
/status

# Should respond with session info + model + capabilities
```

You're done.
