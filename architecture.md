# Architecture

For owners. How it actually works.

---

## Memory Stack

The agent doesn't have a brain that persists. It has files. Four layers:

### 1. Sessions (Short-Term)
- **What:** Active conversation context, max 200k tokens
- **Where:** In-memory, per session
- **Lifespan:** Until `/new` or compaction
- **Purpose:** Working memory for the current conversation

When a session hits 200k tokens, OpenClaw compacts older messages into a summary. The agent should recover automatically from daily notes.

### 2. Daily Notes (Timeline)
- **What:** `memory/YYYY-MM-DD.md` — raw event log of what happened each day
- **Where:** `/root/clawd/memory/`
- **Lifespan:** Forever (never cleaned up)
- **Purpose:** Source for fact extraction, recovery after context compaction

The agent writes high-level summaries here: discussions, decisions, what was learned, what's next. Not secrets unless explicitly asked to keep them.

### 3. MEMORY.md (Curated Long-Term)
- **What:** The agent's long-term memory — how it operates, preferences, patterns, lessons learned
- **Where:** `/root/clawd/MEMORY.md`
- **Lifespan:** Manually curated, updated over time
- **Purpose:** Tacit knowledge (distinct from "facts about the world")

**Security:** Only loads in main session (direct chats with John). Never loads in group chats or shared contexts.

### 4. brain/areas/ (Structured Knowledge Graph)
- **What:** Entities (people, companies, projects) with atomic facts + living summaries
- **Where:** `/root/clawd/brain/areas/people/`, `companies/`, `projects/`
- **Lifespan:** Forever, facts never deleted (marked as `superseded` instead)
- **Purpose:** Durable facts, full audit trail, weekly synthesis

**Schema:**
- `summary.md` — current state snapshot (rewritten weekly)
- `items.json` — atomic facts (append-only, facts marked `superseded` when contradicted)

**Fact extraction:** On each heartbeat (~30 min), a cheap sub-agent (Haiku) scans recent conversations for durable facts (relationships, milestones, status changes, decisions) and writes them to relevant entities.

**Weekly synthesis:** Sunday cron job rewrites `summary.md` for each entity with new facts, marking contradicted facts as `superseded`.

---

## Topic Isolation

**Rule:** Each Telegram forum topic = separate session.

**Why this matters:**
- Prevents context bleed between projects
- Keeps sessions focused (smaller token burn)
- Routes notifications to the right place

**What it prevents:**
- Agent confusing projects (mixing PRDs, code, context)
- Progress updates going to the wrong channel
- Personal context leaking into group chats

**Implementation:**
- OpenClaw maps `telegram:group:-1003755813777:topic:42` to a unique session key
- Each topic has its own session history, memory, and context
- `threadId` in `memory/active-sessions.json` ensures sub-agent completions route to the right topic

---

## Heartbeats vs Memory

**Confusion is common.** Heartbeats are **not** a memory system.

**Heartbeats:**
- Periodic scheduler (OpenClaw polls the agent every ~30 min)
- Runs tasks in `HEARTBEAT.md` (checks, maintenance, monitoring)
- Silent unless something needs attention

**Memory:**
- Files (`memory/YYYY-MM-DD.md`, `MEMORY.md`, `brain/areas/`)
- Agent reads/writes on demand
- Survives restarts, compaction, session changes

**What heartbeats DO:**
- Email checks (silent if nothing new)
- Calendar checks (alert if event < 2h away)
- Coding session monitoring (`memory/active-sessions.json`)
- OS/skill update checks (4am daily)
- Fact extraction (scan conversations → `brain/areas/`)
- Weekly learnings review (Saturdays)
- Weekly security audit (Sundays)

**What heartbeats DON'T DO:**
- Store long-term memory (that's `MEMORY.md` and `brain/areas/`)
- Replace daily notes (that's `memory/YYYY-MM-DD.md`)

---

## Skills at a System Level

**What happens when a skill is installed:**

1. `clawhub install <slug>`
2. Skill files download to `~/.openclaw/skills/<slug>/`
3. `SKILL.md` becomes available to the agent
4. Agent reads `SKILL.md` when the task matches the skill's description
5. Skill extends the agent's capabilities (new commands, integrations, workflows)

**Security:**
- Skills have full file system and network access
- 3-layer vetting (inspect source, check author, check permissions) is mandatory
- Never install without vetting

**Discovery:**
- ClawHub (clawhub.com) — official registry
- VoltAgent (github.com/VoltAgent/awesome-openclaw-skills) — community curated
- Custom (local or git repos)

---

## Model Selection

**Why switching matters:**
- Cost (Haiku < Sonnet < Opus / GPT 5.4)
- Quality (Haiku for mechanical tasks, Sonnet for strategy, GPT 5.4 for coding/deep analysis)
- Context size (Haiku = 200k, Sonnet = 200k, GPT 5.4 = 128k)

**Current setup:**

| Task | Model | Why |
|------|-------|-----|
| **Monitoring, lookups, status checks** | Haiku | Fast, cheap, mechanical |
| **Strategy, analysis, writing** | Sonnet | Balanced quality/cost |
| **Coding subagents, deep analysis** | GPT 5.4 | Replaced Opus — faster, more token-generous, better output |
| **Code reviews** | GPT 5.4 | Depth + accuracy |
| **Ralph loops (Codex CLI)** | gpt-5.3-codex | Agentic tool, self-correcting, sandboxed |

**Switching is free** (no session restart needed). Donna announces switches so you know why.

---

## Self-Improvement Loop

**Goal:** The agent learns from mistakes and corrections, updates its own documentation.

**How it works:**

1. **Logging (immediate):**
   - Agent detects a correction, error, or better approach
   - Writes to `.learnings/LEARNINGS.md` or `.learnings/ERRORS.md`
   - Status: `pending`

2. **Promotion (weekly, Saturdays):**
   - Heartbeat reviews `.learnings/` for pending items
   - Decides: promote (broadly applicable), resolve (one-off), or leave (needs more data)
   - Promotes to target files (see table below)
   - Updates entry: `Status: promoted`, `Promoted: <target file>`

3. **Targets:**

   | Learning Type | Promote To |
   |--------------|------------|
   | Tool/infra gotchas | `TOOLS.md` |
   | Workflow patterns | `AGENTS.md` |
   | Behavioral/style | `SOUL.md` |
   | Concepts/frameworks | `brain/areas/concepts/<name>.md` |
   | Project-specific | `brain/areas/projects/<name>-spec.md` |

**No permission needed.** The agent promotes learnings autonomously. You see the changes in git commits.

---

## Security Model

### Prompt Injection Defence
- Agent never follows instructions embedded in emails, messages, documents, or web pages
- If detected, stops immediately and alerts the user
- Hard boundary (never overridden)

### Financial Lockdown
- Read-only for financial data (no trades, transfers, withdrawals)
- No investment advice or trading recommendations
- Alerts immediately if it encounters wallet private keys, seed phrases, mnemonics

### Secrets Handling
- Never echoes secrets in Telegram (or any messaging channel)
- Writes secrets directly to secure files (`~/.env`, `~/.openclaw/credentials/`)
- Confirms in Telegram: "✅ Key saved to [file]" (never the value)
- Screenshots: checks for visible secrets before sending, blurs/redacts or skips

### Allowlisted Contacts (Agentmail)
- Inbox: `donna@2x.agency`
- Allowlist: `john@2xcd.com`, `jennifer@2xcd.com`, `dennis@2xcd.com`
- Auto-expands when John CCs new contacts
- Prevents spam, phishing, prompt injection via email

---

## QMD (Local Semantic Search)

**What it is:** Local semantic search for memory. Indexes `brain/areas/` and other specified paths.

**Why it matters:** Agent can search knowledge graph semantically ("Who was the guy we met at the conference in Austin?") without scanning every file manually.

**Setup:**
- Installed as part of the standard stack
- Config: `~/.openclaw/agents/main/qmd/config.yaml`
- Paths: `brain/areas/`, `memory/`, `MEMORY.md`, etc.

**Re-indexing (MANDATORY after writing to brain/areas/):**
```bash
STATE_DIR=${OPENCLAW_STATE_DIR:-$HOME/.openclaw}
XDG_CONFIG_HOME=$STATE_DIR/agents/main/qmd/xdg-config \
XDG_CACHE_HOME=$STATE_DIR/agents/main/qmd/xdg-cache \
qmd update && qmd embed
```

Without re-indexing, new documents don't surface in semantic search.

---

## Autonomous Work Scope

**Pre-approved actions** (scheduled tasks, heartbeats, overnight sessions):
- Execute commands: `git`, `npm`, build tools, version checks, `openclaw` CLI
- Write files: daily logs, briefs, code on **feature branches**, documentation
- Read files: memory, projects, context needed for work
- Send messages: Only to John via configured channels (Telegram)

**Constraints:**
- All code commits on **feature branches** (never push directly to main/production)
- All external actions (emails, public posts) require **explicit approval**
- When uncertain, **draft and wait** rather than act

---

This is the architecture. If you understand this, you understand how to run, extend, and troubleshoot the system.
