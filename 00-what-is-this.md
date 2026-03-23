# What Is This

This handbook explains how we work with AI agents at 2x — what we've set up, why we've made the choices we have, and what we've learned along the way.

We're not writing from a position of having figured it all out. The field is moving fast and so are we. What you'll find here is honest documentation of a real working system: what the pieces are, how they fit together, and how to get the most out of them.

If you're new to the team, this should give you a clear picture of how agents fit into daily work without needing a private walkthrough. If you're experienced, it should make the system easier to explain to others.

---

## Two audiences

There are two audiences for this handbook, and the chapters are written with that in mind.

**Staff** — people on the team who work with an agent day to day. Your interface is Telegram. You don't manage infrastructure, edit config files, or touch a terminal. You have a conversation, and your agent handles the mechanics.

**Agents** — the agents themselves. The later chapters (23–25) are technical and written for agents to reference during setup and operation.

If you're a human reading this: everything through chapter 22 is for you. The agent chapters at the end are there if you're curious, but you don't need them.

---

## How the system works, in one paragraph

You talk to your agent in Telegram. Your agent reads a set of configuration files that define who it is, who it's helping, and how it should behave. It maintains memory across sessions through a layered system of notes and structured knowledge. It can acquire new capabilities by installing skills. It runs background checks and scheduled tasks to stay on top of things without being asked. And when work is too big for one conversation, it can delegate to sub-agents and report back when it's done.

That's the whole thing. The rest of this handbook is just the details.

---

## Official docs

This handbook covers how we use OpenClaw at 2x. For the platform itself — installation, configuration, all the core mechanics — the official documentation is the authoritative source:

**[docs.openclaw.ai](https://docs.openclaw.ai)**

Where we've made choices that differ from the defaults, we'll say so. Where we're just using the system as designed, we'll link to the relevant official docs rather than duplicate them.
