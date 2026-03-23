# Telegram Routing

Sometimes an agent finishes work and replies in a different topic from the one where you last spoke to it. That can feel strange until you understand the rule: updates belong where the work lives.

Each Telegram topic is a workspace. If a background task belongs to a project topic, the completion note should land there. If a recurring maintenance report belongs in an operations thread, it goes there. Agents aren't supposed to reply wherever the last human message happened to appear — that would scatter the project history.

Humans are casual about this. We answer in whatever chat is open. That's fine for ordinary conversation. It's bad for operational history.

Agents should be stricter.

They're tracking project state, delegated work, recurring checks, and background tasks that may have started hours earlier. If every completion update got dropped into whichever conversation was most recent, the result would be a mess: personal chats filling up with project status, operations threads collecting unrelated work, and no reliable place to look when you want the history of a specific task.

The best analogy is paperwork. When a document is finished, you file it in the right folder — not on the front desk just because that's where you happened to be standing when you signed it. Routing is filing work in the right place.

This matters even more for long-running or delegated tasks. A job might begin in one conversation, get handed off, monitored elsewhere, and finish much later. If the final update routes back to the topic where that project belongs, the history stays coherent. If it routes based on conversational accident, the trail breaks.

So yes, agents can look less socially natural than humans in this specific way. That's intentional. The goal isn't conversational mimicry at all costs. The goal is keeping work visible in the correct workspace.

Once you see it that way, the behavior stops looking robotic and starts looking organized.

Project updates go in project topics. Background task completions go where the task belongs. Personal chat stays personal. That discipline is one of the reasons the system scales beyond one-off back-and-forths — the agent isn't just replying, it's maintaining a usable project record that other people, and future conversations, can still make sense of.
