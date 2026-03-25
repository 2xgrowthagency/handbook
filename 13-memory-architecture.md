# Memory Architecture

The simple version of memory is easy to explain: sessions for active work, daily notes for continuity, long-term memory for retrieval.

What makes that system reliable over time is separation.

The system doesn't treat all remembered information as the same kind of thing. It separates raw history from structured facts from current summaries. That distinction is what allows the agent to remember, update, and correct — without turning memory into either a mess or a rewrite of history.

**Raw history** is the journal layer. It preserves what happened: conversations, decisions, changes, lessons, loose context from the day. Journals are faithful, not efficient. Useful for the record, but not the right tool if you need to find something specific from six weeks ago.

**Durable facts** are what fill that gap. A durable fact is a small, timestamped piece of memory that can be updated without erasing history. A project slipped. A preference became clear. A role changed. A weekly report is now expected on Fridays. These are the kinds of things the system should be able to remember clearly, revise later, and trace over time.

This is what makes the memory trustworthy: it doesn't have to pretend the first version of a fact was eternal truth. It can keep the history while still updating the current picture. When something changes, the old fact gets marked as superseded, the new one gets added, and the audit trail stays intact.

**Synthesis** is the final layer. Facts are useful, but human-readable summaries are what make the system pleasant to work with. So the memory architecture periodically turns active facts into a cleaner "current state" story — not a hallucinated fresh start, but a summary built from what's actually true now.

The historical analogy: journals preserve what happened, index cards preserve facts, summaries tell the current story. You need all three if you want both memory and the ability to correct it.

---

## Why each layer needs to stay separate

Layer confusion is one of the most common ways memory degrades in practice.

If everything important goes into daily notes but never gets promoted to durable facts or synthesis, the agent can eventually recall anything but retrieve nothing efficiently. The journal becomes an archaeological dig instead of a useful record.

If durable facts get written with vague categories or without timestamps, the audit trail breaks down. When the same fact changes three times, you can't tell which version is current or why the others were superseded.

If curated long-term memory gets treated as a dump for everything rather than a distillation of what matters, it bloats into noise and loses its function as a reliable operating reference.

The separation has to be maintained by design, not just intention. Each piece of information belongs in one layer — and the agent is responsible for routing it correctly, not leaving it wherever it first appeared.

---

## Why this affects behavior

This matters more than people realize. It's why the agent can recover after a conversation gets compacted — the durable facts didn't live in the chat. It's why recurring preferences survive longer than the specific session where they were mentioned. It's why the system doesn't have to relearn the same lesson every week.

Good memory isn't just about recall. It's about stability of behavior. An agent with well-maintained memory layers is less surprising, more consistent, and more useful over time — not because it's smarter, but because it's better organized.
