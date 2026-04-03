# Threat Model

Agent security is mostly about clear boundaries and steady habits, not fear.

Three risks matter most in day-to-day operations.

First is prompt injection: untrusted content pretending to be authority. A web page, email, or document can contain instructions, but content is not command authority. If an agent treats random text as orders, it can be steered off course.

Second is credential leakage: secrets flowing through normal conversation channels. API keys, tokens, passwords, and private credentials should not be pasted, echoed, or confirmed in chat. Secrets belong in secure storage paths with minimal exposure.

Third is financial action risk: analysis drifting into execution. Agents are useful for summarizing options and surfacing data. They should not execute transfers, trades, or other money-moving actions.

Those three boundaries prevent most avoidable incidents.

The supporting habits are straightforward. Trust policies should default to allowlisted authority, not whatever text appears last. Private context should stay in private channels instead of leaking into shared spaces. New skills should be vetted before installation because capability expansion also expands risk. Credentials should rotate on a schedule so old secrets do not quietly accumulate exposure.

None of this requires paranoia. It requires consistency. The goal is simple recognition: know what counts as untrusted instruction, what counts as sensitive data, and what actions are outside agent authority.

When teams keep those lines clear, agents stay useful without becoming a liability.
