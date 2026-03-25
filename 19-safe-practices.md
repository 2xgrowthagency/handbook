# Safe Practices

The threat model matters, but daily habits matter more. Most safety problems don't begin with a dramatic breach. They begin with ordinary sloppiness.

So the practical rules should be short enough to remember.

**Keep secrets out of chat.** If something is sensitive, don't paste the value into ordinary conversation. Share the secure location or file path instead. "Use the credential saved here" is better than copying the credential into the chat stream. If your agent needs to confirm it has the right credential, the confirmation should be "I have it" — not a repeat of the value.

**Use the right project topics.** Context belongs where it belongs. The right topic keeps the right history attached to the right work, and reduces the chance of mixing private, operational, and project-specific material in unhelpful ways.

**Ask the agent to verify before acting.** Verify the target. Verify the audience. Verify the facts. Verify that the file really changed, the link really works, the summary matches the source. Verification isn't distrust — it's professional discipline.

**Treat external communication as an approval boundary.** A draft is fine. A suggested reply is fine. A prepared post is fine. But sending something outward is a different category of action. If the message leaves the machine, it deserves human approval.

The same principle applies when something feels sensitive, ambiguous, or unusually consequential. Slow down. Ask. Escalation isn't friction — it's good judgment.

---

## The secret lifecycle

Credentials and API keys deserve their own handling pattern:

1. **Capture securely.** Credentials go directly into a secure config file or environment variable — not into a chat message or a plain text note.
2. **Reference, don't repeat.** When an agent needs to use a credential, it reads it from where it's stored. It doesn't echo the value into any message or log.
3. **Confirm without exposing.** If you need to know an agent has the right credential, ask it to confirm it can connect — not to repeat the key. A successful test proves possession without disclosure.
4. **Rotate on a schedule.** Credentials that never change accumulate risk. Rotation should be tracked and scheduled, not left as something to remember later.

If a credential does end up in chat by accident, treat it as compromised and rotate it immediately. The cost of rotating is low. The cost of leaving an exposed credential in place is not.

---

This looks very ordinary in practice.

Share a file path, not a password. Ask for a draft email, not a sent email. Ask the agent to confirm which audience a note is for before it becomes a public post. Request a verification pass before assuming a task is complete.

These aren't dramatic security rituals. They're sane defaults — the normal habits of a team that knows useful systems deserve clear boundaries and steady hands. If you do those things consistently, a lot of risk stays small without anyone needing to make a speech about it every week.
