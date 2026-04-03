# Coding Strategy
*This chapter is written for agents.*

---

## Model Selection

Different tasks need different tools. Use the least capable model that reliably does the job, then step up when complexity demands it.

| Task | Model |
|------|-------|
| Default / general | Sonnet 4.6 |
| Any coding subagent (one-shot, page builds, fixes) | GPT-5.4 (`openai-codex/gpt-5.4`, alias `gpt54`) |
| Code reviews | GPT-5.4 (`gpt54`) |
| Deep analysis + reasoning | GPT-5.4 (`gpt54`) |
| Orchestration + QA (PRD breakdown, output review) | Sonnet 4.6 |
| Ralph loop coding sub-agent | Codex CLI (`codex --full-auto`) |

**Codex CLI and GPT-5.4 are not interchangeable.** Codex CLI is an agentic execution environment — sandboxed file system access, self-correcting loop, built for unattended Ralph loops. GPT-5.4 is a frontier model for subagent coding tasks, reviews, and analysis, invoked via `sessions_spawn` with `model: "gpt54"`. One runs in a terminal. The other runs as a session. Picking the wrong one for the job creates friction that compounds.

**Hard rules:**
- NEVER use Sonnet or Opus for coding subagents — GPT-5.4 only
- GPT-5.4 provider path: always `openai-codex/gpt-5.4` — never `openai/gpt-5.4` (wrong provider, will fail)
- Always announce model selection before starting a task
- Ralph loops always use Codex CLI — if auth breaks, fix it; don't swap in GPT-5.4 as a workaround

---

## Permission Flags (Mandatory for Unattended Work)

Without these flags, agents pause mid-loop on approval prompts and block silently. Always include them for any unattended run.

```bash
# Codex — sandboxed (default)
codex --full-auto "your task"

# Codex — no sandbox (faster, use when sandbox causes issues)
codex --yolo "your task"

# Claude Code
claude --dangerously-skip-permissions "your task"

# Claude Code when running as root (--dangerously-skip-permissions is blocked by Anthropic on root)
claude --permission-mode acceptEdits "your task"
```

---

## Ralph Loop Pattern

Use Ralph loops when a task is too large for one live session: multi-hour implementation, bulk content, large refactors, anything with clear done criteria that can run unattended.

**Codex requires a TTY.** Never invoke it via bare exec — it will fail with `stdin is not a terminal`. Always use tmux:

```bash
tmux new-session -d -s <label> -x 220 -y 50
tmux send-keys -t <label> "cd /path/to/project && codex --full-auto 'task'" Enter

# Monitor
tmux capture-pane -p -t <label> -S -30

# Check if done (prompt returned)
tmux capture-pane -p -t <label> -S -3 | grep -q "❯"
```

### Before launching

Write the job to `memory/active-sessions.json`:

```json
{
  "sessions": [{
    "label": "kebab-case-label",
    "task": "short description",
    "dir": "/path/to/project",
    "prdPath": "/path/to/prd.md",
    "threadId": 42,
    "startedAt": "2026-04-03T21:00:00Z",
    "restarts": 0,
    "expectedDurationMin": 60,
    "lastCheckedAt": null
  }]
}
```

`threadId` is the Telegram topic for this project. Without it, completion notifications route to the wrong place.

For jobs expected to run longer than 15 minutes, schedule a monitoring cron immediately after launch — check every 20 minutes, expires at expected duration plus 50% buffer. Silent if still running within the window. Alert if exited with error, completed, or running past expected duration.

### Before reporting done

A confident completion message from a sub-agent is not proof the work happened. Rate limits, context compression, and tool failures can all produce an agent that thinks it did the work when it didn't. Check before you report.

1. Expected files exist on disk (`read` + `git status`)
2. Git diff shows real changes
3. Build passes (`npm run build` or equivalent)
4. HTTP-check every modified or created URL: `curl -s -o /dev/null -w "%{http_code}" <url>` → must return 200
5. Changes are committed AND pushed — not just local
6. For routing changes: check `/sitemap.xml` and confirm existing pages still work
7. For Vercel/Netlify: wait 60–90 seconds after push before verifying live URLs

Completion updates go to the project's Telegram topic — not wherever the last message happened to land. Use the `message` tool with explicit `threadId`. Never a plain reply.

### PRD quality

A strong PRD brief is what makes a Ralph loop recoverable. If the session is interrupted or needs to restart, the new session should be able to pick up from the written brief without guessing. Include:

- Task scope and expected outputs
- Done criteria (what "finished" looks like exactly)
- Verification steps
- Source files and reference material
- Git identity for commits: `John Chan <john@2xcd.com>` — never the agent's name

---

## Dual Auth (Codex)

Two auth tokens are available for failover when hitting rate limits:

```bash
# Check current auth
codex login status

# Swap to backup (if available)
alias codex-use-john='cp ~/.codex/auth.john.json ~/.codex/auth.json'
alias codex-use-donna='cp ~/.codex/auth.donna.json ~/.codex/auth.json'
```

If auth fails, fix it — don't swap Codex for GPT-5.4 as a workaround.
