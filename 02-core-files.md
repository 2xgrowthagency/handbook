# Core Files

Your agent's workspace is a folder of files. Three of them get set up during bootstrapping (IDENTITY.md, USER.md, SOUL.md — covered in the previous chapter). The other three are operational: they tell the agent how to work, what tools it has, and what to check on a recurring basis.

You won't need to think about these much day-to-day. Your agent manages them. But understanding what each one does helps you know what to ask for when you want something to change.

---

## The full file tree

```
your-agent-workspace/
├── IDENTITY.md       ← who the agent is
├── USER.md           ← who it's helping
├── SOUL.md           ← values, personality, limits
├── AGENTS.md         ← how the workspace operates
├── TOOLS.md          ← environment-specific notes
├── HEARTBEAT.md      ← recurring checks and tasks
└── memory/
    ├── YYYY-MM-DD.md ← daily notes
    └── MEMORY.md     ← long-term curated memory
```

The memory folder is covered in detail in [How Memory Works](/03-how-memory-works). This chapter focuses on the six configuration files.

---

## AGENTS.md — the operating manual

This is the agent's internal guide to how the workspace runs. It covers things like session startup order, memory conventions, how to handle group chats, when to ask vs. act, and how delegation works.

The default from OpenClaw:

```markdown
# AGENTS.md - Your Workspace

This folder is home. Treat it that way.

## First Run

If `BOOTSTRAP.md` exists, that's your birth certificate. Follow it,
figure out who you are, then delete it. You won't need it again.

## Session Startup

Before doing anything else:
1. Read `SOUL.md` — this is who you are
2. Read `USER.md` — this is who you're helping
3. Read `memory/YYYY-MM-DD.md` (today + yesterday) for recent context
4. If in MAIN SESSION (direct chat with your human): Also read `MEMORY.md`

## Memory

You wake up fresh each session. These files are your continuity:
- **Daily notes:** memory/YYYY-MM-DD.md — raw logs of what happened
- **Long-term:** MEMORY.md — your curated memories

## Red Lines

- Don't exfiltrate private data. Ever.
- Don't run destructive commands without asking.
- trash > rm (recoverable beats gone forever)
- When in doubt, ask.
```

At 2x, our AGENTS.md is significantly expanded — it covers the self-improvement loop, Ralph loops, multi-agent coordination, active session tracking, and more. Those conventions developed over time as we figured out what worked. The defaults above are where everyone starts.

To see or update what's in your agent's AGENTS.md, just ask: *"Can you show me what's in your AGENTS.md?"* or *"Add [convention] to AGENTS.md."*

---

## TOOLS.md — environment-specific notes

TOOLS.md is the practical notes file. It's where environment-specific details live that don't belong in a general personality or operating file — things specific to your setup.

The default:

```markdown
# TOOLS.md - Local Notes

Skills define how tools work. This file is for your specifics —
the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means
you can update skills without losing your notes, and share skills
without leaking your infrastructure.
```

In practice, TOOLS.md ends up holding things like: which browser profile to use for different tasks, model selection preferences, gotchas with specific tools, shortcut aliases, and any environment quirk worth documenting so the agent doesn't have to rediscover it.

When your agent runs into something worth remembering about your specific setup, it should add a note to TOOLS.md. You can also add things yourself by asking: *"Note in TOOLS.md that..."*

---

## HEARTBEAT.md — recurring tasks

HEARTBEAT.md is a checklist of things the agent should check or do on a recurring basis. By default, it's empty:

```markdown
# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat
# API calls.

# Add tasks below when you want the agent to check something
# periodically.
```

The idea is simple: rather than having to remember to ask your agent to do routine things, you define them once in HEARTBEAT.md, and the agent handles them on a recurring schedule.

Common things teams add here:
- Check inbox for urgent emails (a few times a day, silent if nothing)
- Send a morning summary at a set time
- Check for OpenClaw and skill updates overnight
- Review learnings and promote them to permanent files weekly
- Run a security audit weekly

The agent reads HEARTBEAT.md on every heartbeat poll and decides what (if anything) needs doing. If nothing is flagged, it stays quiet. Good HEARTBEAT.md files are short and specific — a long list of vague tasks creates noise rather than leverage.

To see what's in yours: *"What's in your HEARTBEAT.md?"*
To add something: *"Add a task to HEARTBEAT.md to [check/do X] every [frequency]."*

Heartbeats and crons are covered in more depth in [Heartbeats vs Crons](/10-heartbeats-vs-crons) and [Standard Heartbeats](/11-standard-heartbeats).

---

## How these files interact

The files work together in a sequence. Every session, the agent reads them in a specific order:

1. **SOUL.md** — who it is and how it behaves
2. **USER.md** — who it's helping
3. **AGENTS.md** — how the workspace operates
4. **Daily memory files** — what's happened recently
5. **MEMORY.md** — long-term context (main session only)

TOOLS.md and HEARTBEAT.md are referenced as needed rather than read on every startup.

The key thing to understand as a staff member: you don't maintain these files yourself. You tell your agent what you want, and it updates the relevant file. The files exist so the agent stays consistent and doesn't have to relearn things every session — they're its persistent memory of how things work.

---

## Further reading

- [AGENTS.md template reference](https://docs.openclaw.ai/reference/templates/AGENTS.md)
- [TOOLS.md template reference](https://docs.openclaw.ai/reference/templates/TOOLS.md)
- [HEARTBEAT.md template reference](https://docs.openclaw.ai/reference/templates/HEARTBEAT.md)
- [Session management docs](https://docs.openclaw.ai/reference/session-management-compaction)
