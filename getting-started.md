# Getting Started

Your agent runs on OpenClaw and lives in Telegram. Each agent has a name and personality configured for them — Donna, Clara, Akira, Orion, Dobby — but they all work the same way under the hood.

## How to talk to your agent

Open the Telegram group your agent lives in. Your agent reads every message in the group. You don't need a slash command to talk to it — just write naturally.

If the group uses forum topics (it probably does), your agent has a separate session per topic. The agent in the **Daily Ops** topic doesn't know what's happening in the **RecallRadar** topic. This is intentional — it keeps contexts from bleeding into each other.

## Your first 15 minutes

Try these to confirm everything is working:

1. Say hello and ask your agent to introduce itself
2. Ask `/status` — you'll get a summary of the current session, model, and usage
3. Ask it to do something simple: summarize a URL, answer a question, or look something up
4. Ask it what it remembers about you — it should reference your USER.md profile if it's been set up

If any of these fail, see [Troubleshooting](/troubleshooting).

## What your agent can and can't do

**Out of the box**, your agent can:
- Answer questions, summarize content, help you think through problems
- Search the web, fetch URLs, read files on the server
- Run shell commands (with your approval)
- Send and receive messages via Telegram

**With skills installed**, it can also:
- Access GitHub, email, Google Workspace, and other external services
- Run coding agents (Codex, Claude Code) for longer tasks
- Monitor inboxes and calendars and notify you proactively

**It won't do without your explicit approval:**
- Send emails or messages to anyone other than you
- Make financial transactions
- Modify your configuration files
- Install new skills

## Key commands

| Command | What it does |
|---|---|
| `/status` | Session info, model, token usage |
| `/new` | Start a fresh session (clears context) |
| `/help` | List available commands |
