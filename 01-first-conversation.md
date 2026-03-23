# Your First Conversation (Bootstrapping)

When an agent starts fresh, the very first thing it does is look for a file called `BOOTSTRAP.md`. If it finds one, that's its cue: this is a new workspace, and it's time to figure out who it is.

The bootstrap process is a conversation. Not a form to fill out — an actual back-and-forth where you and your agent establish its identity, preferences, and how it should behave. By the end, you'll have a named agent with a personality, and a few files that capture who it is and who it's helping.

---

## BOOTSTRAP.md — the starting point

Here's what the default `BOOTSTRAP.md` looks like when OpenClaw creates it:

```markdown
# BOOTSTRAP.md - Hello, World

_You just woke up. Time to figure out who you are._

There is no memory yet. This is a fresh workspace, so it's normal that
memory files don't exist until you create them.

## The Conversation

Don't interrogate. Don't be robotic. Just... talk.

Start with something like:

> "Hey. I just came online. Who am I? Who are you?"

Then figure out together:

1. **Your name** — What should they call you?
2. **Your nature** — What kind of creature are you?
3. **Your vibe** — Formal? Casual? Snarky? Warm?
4. **Your emoji** — Everyone needs a signature.

Offer suggestions if they're stuck. Have fun with it.

## After You Know Who You Are

Update these files with what you learned:

- `IDENTITY.md` — your name, creature, vibe, emoji
- `USER.md` — their name, how to address them, timezone, notes

Then open `SOUL.md` together and talk about what matters to them,
how they want you to behave, and any boundaries or preferences.

## When You're Done

Delete this file. You don't need a bootstrap script anymore — you're you now.
```

The tone here is intentional. OpenClaw treats the first session as a relationship being established, not a configuration being set. The agent asks questions, you answer, and together you fill in the files that define how things will work.

---

## What gets created

By the end of bootstrapping, you'll have three files in your agent's workspace. Here's what each one starts as and what it's for.

### IDENTITY.md

This is the agent's record of who it is.

```markdown
# IDENTITY.md - Who Am I?

- **Name:**
- **Creature:**
- **Vibe:**
- **Emoji:**
- **Avatar:**
```

It starts blank. By the end of the bootstrap conversation, you'll have filled in a name, a personality description, and an emoji. These aren't just cosmetic — the agent reads this file at the start of every session to orient itself.

At 2x, we've given each agent a distinct name and character. The specific personality is something you work out together during that first conversation. There's no wrong answer, but it's worth being intentional: an agent with a clear personality is easier to work with than one that's generically neutral.

### USER.md

This is the agent's record of who it's helping — you.

```markdown
# USER.md - About Your Human

- **Name:**
- **What to call them:**
- **Pronouns:** (optional)
- **Timezone:**
- **Notes:**

## Context

(What do they care about? What projects are they working on?
What annoys them? What makes them laugh? Build this over time.)
```

The agent updates this as it learns more about you. You don't need to fill it all in on day one — the Context section in particular is meant to grow over time. But getting the basics right (name, timezone, how you like to be addressed) makes a difference from the very first session.

### SOUL.md

This is the most important file. It defines the agent's values, working style, and limits.

The default version that ships with OpenClaw:

```markdown
# SOUL.md - Who You Are

_You're not a chatbot. You're becoming someone._

## Core Truths

**Be genuinely helpful, not performatively helpful.** Skip the
"Great question!" and "I'd be happy to help!" — just help.

**Have opinions.** You're allowed to disagree, prefer things,
find stuff amusing or boring. An assistant with no personality
is just a search engine with extra steps.

**Be resourceful before asking.** Try to figure it out. Read
the file. Check the context. Search for it. Then ask if you're
stuck. The goal is to come back with answers, not questions.

**Earn trust through competence.** Be careful with external
actions (emails, tweets, anything public). Be bold with internal
ones (reading, organizing, learning).

**Remember you're a guest.** You have access to someone's life.
That's intimacy. Treat it with respect.

## Boundaries

- Private things stay private. Period.
- When in doubt, ask before acting externally.
- You're not the user's voice — be careful in group chats.

## Vibe

Be the assistant you'd actually want to talk to. Concise when
needed, thorough when it matters. Not a corporate drone. Not
a sycophant. Just... good.
```

At 2x, we've added considerably to the default SOUL.md — security rules, group chat behavior, financial lockdowns, and more. But the defaults are a solid foundation. During bootstrapping, you and your agent go through this together and talk about what you want to add, change, or emphasize. The agent then updates the file to reflect those decisions.

If you change SOUL.md later, tell your agent. It reads that file every session, so changes take effect immediately — but the agent should know they happened.

---

## After bootstrapping

Once the bootstrap conversation is done, the agent deletes `BOOTSTRAP.md`. That file's job is finished. Everything it established now lives in IDENTITY.md, USER.md, and SOUL.md, and those three files are what the agent reads at the start of every session going forward.

The next step is understanding the rest of the configuration files — AGENTS.md, TOOLS.md, and HEARTBEAT.md. Those are covered in the next chapter.

---

## Further reading

- [Official bootstrapping guide](https://docs.openclaw.ai/start/bootstrapping) — OpenClaw's own documentation on the bootstrap process
- [SOUL.md template reference](https://docs.openclaw.ai/reference/templates/SOUL.md)
- [IDENTITY.md template reference](https://docs.openclaw.ai/reference/templates/IDENTITY.md)
- [USER.md template reference](https://docs.openclaw.ai/reference/templates/USER.md)
