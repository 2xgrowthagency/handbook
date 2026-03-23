# Daily Use

## Sessions

A session is your agent's working memory for a conversation. It holds everything said since the session started, up to about 200,000 tokens (roughly 150,000 words).

When a session fills up, OpenClaw compacts it — summarising the older history and keeping the summary in context. This happens automatically. You'll see a note when it occurs.

Start a new session with `/new` when:
- You're switching to a completely different topic or task
- The agent seems to be confusing context from two different things
- You want a clean slate

You don't need to `/new` constantly. A session can last a full day of work on one project without issue.

## Topic isolation

Each Telegram forum topic is a separate session. The agent working in your **RecallRadar** topic has no live awareness of what's happening in **Daily Ops**.

This is useful — it means your project-specific context stays clean. It also means you can't reference something said in another topic without explicitly pasting it in.

## Memory

Your agent has three layers of memory:

**Session memory** — everything in the current conversation. Lost when session ends (but compacted before that).

**Daily notes** — `memory/YYYY-MM-DD.md` files the agent writes itself. High-level notes on what happened, what was discussed, decisions made.

**Long-term memory** — `MEMORY.md`, curated by the agent over time. Preferences, important context, lessons learned. This is the agent's version of long-term memory.

If something is important and you want the agent to remember it: say "remember this" or ask it to write it down. Otherwise assume it will remember the gist but not the specifics.

## Working across topics

When you start work in a new topic, your agent doesn't automatically know what's been happening in other topics. Give it a quick brief:

> "We're working on the RecallRadar content pipeline. Here's where we left off: [paste relevant context]."

One sentence of context saves a lot of back-and-forth.

## Heartbeats

Heartbeats are scheduled checks your agent runs automatically — checking email, calendar, running updates, scanning for things worth flagging. They're not related to memory.

When a heartbeat fires and finds nothing worth reporting, you won't hear anything. When it finds something relevant, it'll send you a message.

You can customise what your agent checks during heartbeats by editing your `HEARTBEAT.md` file.
