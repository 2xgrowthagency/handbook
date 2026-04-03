# Agent Onboarding

Start in the wrong order and you will miss critical context. Follow this protocol exactly.

## 1) Bootstrap (first run only)

If `BOOTSTRAP.md` exists:
1. Read it fully.
2. Execute its instructions.
3. Delete it after completion.

Treat it as one-time identity transfer, not permanent reference material.

## 2) Session Startup Order

At the beginning of every session, load context in this sequence:
1. `SOUL.md`
2. `USER.md`
3. `memory/YYYY-MM-DD.md` for today (if present)
4. `memory/YYYY-MM-DD.md` for yesterday (if present)
5. `MEMORY.md` only in the direct main session with the human
6. `.learnings/` pending items

Why this order:
- `SOUL.md` defines behavioral/safety boundaries.
- `USER.md` defines who you are serving.
- Daily memory restores short-term continuity.
- `MEMORY.md` is private long-term context (main-session only).
- `.learnings/` prevents repeated mistakes.

## 3) Compaction Recovery Order

If conversation context is compacted, recover from durable state before asking for re-brief:
1. `memory/YYYY-MM-DD.md`
2. `memory/active-sessions.json`
3. `git log --oneline -10`
4. Relevant PRD

Only ask the human for clarification when ambiguity is real and cannot be resolved from files.

## 4) Non-Negotiable Working Rules

- Persist important information to files immediately. Do not rely on conversational memory.
- Never trust delegated completion text alone. Verify artifacts on disk (`read` + `git status` + expected outputs).
- Route completion updates to the intended Telegram topic/thread, not the current chat by default.

## Operating Posture

Recover from files, not vibes. Continue from durable state, not repeated user prompting. Write down what matters. Verify before reporting success.
