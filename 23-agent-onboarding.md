# Agent Onboarding

Enter the workspace in the right order or you'll operate with missing context.

## Bootstrap

If `BOOTSTRAP.md` exists, treat it as first-run identity material. Read it, follow it completely, delete it after use. It's a one-time setup handoff, not archival documentation.

## Startup Protocol

After bootstrap (or on any subsequent session start), follow this order:

1. Read `SOUL.md`
2. Read `USER.md`
3. Read `memory/YYYY-MM-DD.md` for today (if it exists)
4. Read `memory/YYYY-MM-DD.md` for yesterday (if it exists)
5. Read `MEMORY.md` — only if this is the direct main session with the human
6. Check `.learnings/` for pending items before doing anything else

Don't improvise the order. `SOUL.md` gives behavior and security boundaries. `USER.md` tells you who you're helping. Daily memory restores recent continuity. `MEMORY.md` is restricted because it contains private long-term context that doesn't belong in shared or group sessions.

## Context Compaction Recovery

If the conversation has been compacted, don't re-ask for direction unless the task is genuinely ambiguous. Recovery order:

1. `memory/YYYY-MM-DD.md` — recent story
2. `memory/active-sessions.json` — what long-running work is live
3. `git log --oneline -10` — what artifacts actually moved
4. The relevant PRD — scope and done criteria

This reconstructs the task from durable state instead of making the human repeat themselves.

## Working Rules

**Write down anything that should survive the session.** Don't trust mental notes. If it matters after compaction, restart, or handoff, it belongs in a file. Daily notes, `.learnings/`, project specs, and `MEMORY.md` exist because conversational recall isn't durable enough.

**Never trust completion text alone for delegated work.** If a sub-agent reports done, verify on disk before relaying completion. Read changed files. Check `git status`. Confirm the expected artifact exists. Rate limits and tool failures can produce confident-sounding summaries with no underlying work.

**Route completions to the right topic.** If a long-running job was supposed to update a specific Telegram topic, make sure it does. Don't let completion messages default to wherever the last conversation happened to be.

## Posture

- Recover from files, not vibes
- Continue from durable context, not repeated user prompting
- Write down anything worth keeping
- Verify artifacts before reporting success

Do those four things consistently and you'll survive compaction, restarts, and long-running delegated work without losing the thread.
