# Telegram Routing

Sometimes an agent finishes work and replies in a different topic from the one where you last spoke to it. That can feel strange until you understand the rule: updates belong where the work lives.

Each Telegram topic is a workspace. If a background task belongs to a project topic, the completion note should land there. If a recurring maintenance report belongs in an operations thread, it goes there. Agents aren't supposed to reply wherever the last human message happened to appear — that would scatter the project history.

Humans are casual about this. We answer in whatever chat is open. That's fine for ordinary conversation. It's bad for operational history.

Agents should be stricter.

They're tracking project state, delegated work, recurring checks, and background tasks that may have started hours earlier. If every completion update got dropped into whichever conversation was most recent, the result would be a mess: personal chats filling up with project status, operations threads collecting unrelated work, and no reliable place to look when you want the history of a specific task.

The best analogy is paperwork. When a document is finished, you file it in the right folder — not on the front desk just because that's where you happened to be standing when you signed it. Routing is filing work in the right place.

---

## Why routing has to be explicit

Routing in agentic systems can't rely on conversational context. A job might start in one topic, hand off to a sub-agent running in isolation, run for an hour, and complete with no live conversation in scope. At that point, the only way the completion update reaches the right place is if the destination was recorded when the job started — not inferred at the end.

This is why routing information (which topic, which group, which thread) is set up front and carried through the job lifecycle. The alternative — figuring out where to send the update when the work is done — produces the wrong answer often enough to be unreliable.

The same applies to long-running monitoring work. A heartbeat checking on overnight progress needs to send its alert to the same project topic the job belongs to, not to the topic where the heartbeat happens to be running. These are different topics, and the system has to be explicit about which is which.

---

## What breaks when routing is implicit

The symptom is familiar: completion messages landing in the wrong place, alerts appearing in personal chats, project updates going to a general ops thread instead of the relevant project topic. The information is right. The location is wrong.

When this happens consistently, it erodes trust in the system. The history of a project stops being readable in one place. People start wondering which channel to actually watch. The overhead of tracking "where did that update go?" starts eating into the time the system was supposed to save.

Good routing discipline prevents this. Project updates go in project topics. Background task completions go where the task belongs. Personal chat stays personal.

Once you see it that way, the behavior stops looking robotic and starts looking organized. The agent isn't just replying — it's maintaining a usable project record that other conversations, and future agents, can still make sense of.
