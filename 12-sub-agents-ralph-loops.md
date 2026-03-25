# Sub-Agents and Ralph Loops

Some tasks are too big for one live conversation. That's not a failure — it's just the shape of the work.

If a task is long-running, technical, or requires careful verification, the system shouldn't try to muscle through it in an ad hoc chat. It should switch modes. That's where sub-agents and Ralph loops come in.

The simplest way to think about it: delegation.

Your agent is still responsible for the outcome. But instead of doing everything inline, it hands a well-scoped brief to a specialist working in a dedicated session. That specialist is the sub-agent. The structured pattern for bigger implementation work is the Ralph loop.

The sequence matters. First, your agent writes a brief that makes the job concrete: what's the task, what should be delivered, what counts as done, what source material matters, what needs to be checked before anyone calls it finished. Then it launches the work in its own session — isolation matters for the same reason separate project topics matter. Then it tracks the job while it runs. Then, when the work completes, the update routes back to the topic where that project lives.

That's why a long task can begin in one conversation and finish somewhere different. The update belongs with the work, not wherever the last human message happened to land.

---

## The four parts of a reliable loop

A Ralph loop isn't just a long prompt. It's a system with four components that have to work together:

**1. A concrete brief (the PRD).** The brief specifies the task, expected outputs, done criteria, and verification steps. Vague briefs produce drifted results. The brief is also the checkpoint — if the session is interrupted, a new session can pick up from the brief without starting over.

**2. A state registry.** When a job is launched, its status is recorded: what's running, where it lives, which topic to route updates to, when it started, how many restarts it's had. This is what allows monitoring to work and restarts to happen without losing track of what was supposed to happen.

**3. Explicit routing.** When the job finishes, the completion note goes to the correct project topic — not wherever the last conversation happened to be. This is enforced explicitly, not assumed.

**4. Artifact verification before declaring done.** A completion message from a sub-agent is not proof the work is done. The output files should exist on disk. The build should pass. The URL should return 200. The git diff should show real changes. The system checks these things before surfacing completion to the human.

---

## Why verification matters

This is the part that's easy to skip and expensive to skip. A sub-agent can produce a detailed, confident completion summary while the actual files are unchanged. Rate limits, context compression, and tool failures can all result in an agent that thinks it did the work when it didn't.

The rule: **local done is not done**. A task is done when:
- The expected files exist and contain the right content
- The build passes (if applicable)
- The changes are committed and pushed (not just local)
- The live URL returns the expected response

Monitoring long-running jobs also matters. A job that runs for an hour with no human awareness can fail silently. Adding a temporary check — look in on progress every 20 minutes, cancel the check once done — closes that gap without requiring anyone to watch actively.

---

## For staff

You don't need to manage any of this directly. The point is to understand why your agent behaves this way — writing briefs, launching separate sessions, checking in periodically, routing updates to specific topics — and why that's the right behavior for serious work.

When your agent says it's writing a brief and launching a dedicated session, that should feel reassuring. It means the system is treating the task as something that deserves real infrastructure, not just a long response.
