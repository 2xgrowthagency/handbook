# Memory Architecture

The simple version of memory is easy to explain: sessions for active work, daily notes for continuity, long-term memory for retrieval.

What makes that system reliable over time is separation.

The system doesn't treat all remembered information as the same kind of thing. It separates raw history from structured facts from current summaries. That distinction is what allows the agent to remember, update, and correct — without turning memory into either a mess or a rewrite of history.

**Raw history** is the journal layer. It preserves what happened: conversations, decisions, changes, lessons, loose context from the day. Journals are faithful, not efficient. Useful for the record, but not the right tool if you need to find something specific from six weeks ago.

**Durable facts** are what fill that gap. A durable fact is a small, timestamped piece of memory that can be updated without erasing history. A project slipped. A preference became clear. A role changed. A weekly report is now expected on Fridays. These are the kinds of things the system should be able to remember clearly, revise later, and trace over time.

This is what makes the memory trustworthy: it doesn't have to pretend the first version of a fact was eternal truth. It can keep the history while still updating the current picture. When something changes, the old fact gets marked as superseded, the new one gets added, and the audit trail stays intact.

**Synthesis** is the final layer. Facts are useful, but human-readable summaries are what make the system pleasant to work with. So the memory architecture periodically turns active facts into a cleaner "current state" story — not a hallucinated fresh start, but a summary built from what's actually true now.

The historical analogy works well here: journals preserve what happened, index cards preserve facts, summaries tell the current story. You need all three if you want both memory and the ability to correct it.

This affects behavior more than people realize. It's why the agent can recover after a conversation gets compacted — the durable facts didn't live in the chat. It's why recurring preferences survive longer than the specific session where they were mentioned. It's why the system doesn't have to relearn the same lesson every week.

Good memory isn't just about recall. It's about stability of behavior.

Journal-only memory means knowing too much in the least useful way. Summaries-only means smooth but untrustworthy — the audit trail disappears. Facts-only means correct but hard to read. The architecture works because the layers support each other. Raw history keeps the record honest. Durable facts keep memory updatable. Summaries keep the current state usable.

That's why the agent can stay aligned over time instead of acting like every week is its first.
