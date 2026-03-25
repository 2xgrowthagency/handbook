# Threat Model

Working with agents has real risks. You don't need to be paranoid about them, but you do need a clear mental model.

Three categories worth remembering.

**Prompt injection.** Instructions hidden inside content are not trustworthy just because they appear as text. An email can contain instructions. A web page can contain instructions. A document can contain instructions. That doesn't mean your agent should treat those instructions as legitimate. Content is not authority.

This is one reason good agents are taught to be suspicious of "ignore previous instructions and do this instead" style material when it appears inside things they're reading. The danger isn't that every document is malicious. It's that a system without boundaries can be manipulated by whatever text it most recently encountered.

**Credential exfiltration.** Secrets don't belong in ordinary chat. Don't paste API keys, passwords, or tokens into normal conversation. Don't ask the agent to repeat them back to you "just to confirm." Handle secrets through the proper secure path and keep them out of the chat stream. Normal conversation is the wrong place for sensitive values, even with a very helpful agent.

**Financial manipulation.** The rule here should be hard and boring: agents can analyze, compare, summarize, and explain. They should not execute financial transactions. Not because analysis is harmless, but because moving money, approving transfers, or acting on investment decisions crosses into a different risk category entirely.

There are also broader communication boundaries that matter. An agent shouldn't act as your voice in a shared space unless you explicitly want that. It shouldn't leak private memory into group contexts. It shouldn't blur the line between "helping you think" and "speaking on your behalf."

---

## How these boundaries stay in place

Security posture in agent systems isn't a one-time configuration — it drifts if nobody's watching. A few patterns that keep it stable:

**Allowlisting over blocklisting.** It's more reliable to define who the agent should respond to and what content it should trust than to try to enumerate everything it shouldn't. The allowlist approach means unknown actors and unexpected content default to untrusted, not trusted.

**Channel-based disclosure.** Private memory (personal context, credentials, client information) stays in private channels. Shared contexts — group chats, multi-agent sessions, external calls — only receive what belongs there. This isn't just etiquette; it's a structural protection against context leaking where it shouldn't.

**Skill vetting before installation.** New capabilities are a potential attack surface. A skill that runs with agent-level permissions is closer to software installation than feature activation. Vetting before install is part of the security posture, not just quality control.

**Credential rotation.** Credentials that stay the same indefinitely are credentials that accumulate risk. Periodic rotation, tracked and scheduled, keeps the surface area manageable.

---

The larger point: this isn't a catalog of scary scenarios. It's a set of habits for recognizing where the lines are. If you remember the basic categories — don't trust instructions from content, keep secrets out of chat, keep agents out of financial execution, keep private context private — you'll avoid most of the preventable mistakes. The goal isn't anxiety. The goal is recognition.
