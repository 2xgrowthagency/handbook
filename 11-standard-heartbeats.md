# Standard Heartbeats

A well-run agent doesn't wait passively for the next instruction. It keeps the house in order.

That's what the standard heartbeats are for — the recurring background checks that keep the system prepared instead of surprised. The point isn't to automate everything. It's to automate the maintenance that humans are genuinely bad at doing consistently, especially when work is scattered across days, topics, and projects.

**The early-morning update pass.** Software and capability feeds change whether anyone is watching or not. If the system quietly checks for OpenClaw updates and new skills from curated sources like the [VoltAgent Awesome OpenClaw Skills list](https://github.com/VoltAgent/awesome-openclaw-skills), it can catch useful improvements and security-relevant changes before they become stale tooling or unnecessary drift. You don't have to think about this — it happens overnight.

**The daily brief.** This one has a specific architecture worth understanding. An early-morning prep run gathers information from various sources and writes it to a staging file. A later cron reads that file and sends one consolidated message. The reason for the split: if prep fails, the brief doesn't send half-formed. If the brief cron fails, the prep data is still there for next time. The output is one message, not a stream — because a daily brief that sends 12 updates isn't a brief.

**The daily scan for useful external material.** Good ideas and relevant findings have a way of disappearing into saved links and half-remembered notes unless something regularly sifts them for signal. This is intake, not busywork.

**The learnings review.** This one prevents a specific kind of organizational stupidity: making the same avoidable mistake repeatedly because nobody captured the lesson. A good system doesn't just fix errors in the moment — it promotes the lesson so the error becomes less likely next time.

**The weekly security audit.** Humans are famously bad at remembering low-frequency, high-importance checks. The audit exists to catch drift, outdated assumptions, and issues that don't announce themselves until they're painful.

**The active coding-session monitor.** Long-running delegated work is where false confidence loves to hide. Jobs can stall, fail quietly, or appear finished before the output is actually verified. Monitoring those sessions is how the system avoids treating "seems done" as "is done." When a long job is running, a temporary monitor cron is often added — checking every 20 minutes for completion or failure, then cancelling itself once the job is confirmed done.

**Memory maintenance.** Heartbeats also handle extracting durable facts from recent conversations, keeping continuity intact, and making sure important knowledge doesn't stay trapped in temporary chat context.

---

## What each heartbeat is actually preventing

The checks above aren't arbitrary — each one exists because the system ran without it and something broke:

- Without the update pass, tooling drifts silently and security patches go unnoticed.
- Without the daily brief architecture (prep + send), failures in one stage contaminate the other.
- Without the learnings review, the same mistakes recur because lessons never leave the error log.
- Without the security audit, credential and permission drift accumulates until someone notices something worse.
- Without the coding-session monitor, long jobs fail quietly with no one watching.

What makes these heartbeats worth running is that each one prevents a recognizable failure mode. The stack is opinionated about these because they create real leverage — they reduce risk and increase preparedness without demanding constant human attention.

Most of this rhythm is quiet. The goal isn't a stream of "still checking" messages. The goal is to surface useful signal when there's something worth knowing, and otherwise keep the machinery healthy in the background. That's what makes the agent feel prepared — because it actually is.
