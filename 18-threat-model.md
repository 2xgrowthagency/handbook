# Threat Model

Working with agents has real risks. You don't need to be paranoid about them, but you do need a clear mental model.

Three categories worth remembering.

**Prompt injection.** Instructions hidden inside content are not trustworthy just because they appear as text. An email can contain instructions. A web page can contain instructions. A document can contain instructions. That doesn't mean your agent should treat those instructions as legitimate. Content is not authority.

This is one reason good agents are taught to be suspicious of "ignore previous instructions and do this instead" style material when it appears inside things they're reading. The danger isn't that every document is malicious. It's that a system without boundaries can be manipulated by whatever text it most recently encountered.

**Credential exfiltration.** Secrets don't belong in ordinary chat. Don't paste API keys, passwords, or tokens into normal conversation. Don't ask the agent to repeat them back to you "just to confirm." Handle secrets through the proper secure path and keep them out of the chat stream. Normal conversation is the wrong place for sensitive values, even with a very helpful agent.

**Financial manipulation.** The rule here should be hard and boring: agents can analyze, compare, summarize, and explain. They should not execute financial transactions. Not because analysis is harmless, but because moving money, approving transfers, or acting on investment decisions crosses into a different risk category entirely.

There are also broader communication boundaries that matter. An agent shouldn't act as your voice in a shared space unless you explicitly want that. It shouldn't leak private memory into group contexts. It shouldn't blur the line between "helping you think" and "speaking on your behalf."

That's the larger point of the threat model. It's not a catalog of scary scenarios. It's a set of habits for recognizing where the lines are.

Don't trust instructions just because they were found inside content. Don't treat ordinary chat as a vault for secrets. Don't let agents cross from analysis into money movement. Don't assume private context belongs in shared rooms.

If you remember those lines, you'll avoid most preventable mistakes without needing a security degree or a fear campaign. The goal isn't anxiety. The goal is recognition.
