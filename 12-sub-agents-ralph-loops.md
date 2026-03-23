# Sub-Agents and Ralph Loops

Some tasks are too big for one live conversation. That's not a failure — it's just the shape of the work.

If a task is long-running, technical, or requires careful verification, the system shouldn't try to muscle through it in an ad hoc chat. It should switch modes. That's where sub-agents and Ralph loops come in.

The simplest way to think about it: delegation.

Your agent is still responsible for the outcome. But instead of doing everything inline, it hands a well-scoped brief to a specialist working in a dedicated session. That specialist is the sub-agent. The structured pattern for bigger implementation work is the Ralph loop.

The sequence matters. First, your agent writes a brief that makes the job concrete: what's the task, what should be delivered, what counts as done, what source material matters, what needs to be checked before anyone calls it finished. Then it launches the work in its own session — that isolation matters for the same reason separate project topics matter. Then it tracks the job while it runs. Then, when the work completes, the update routes back to the topic where that project lives.

That's why a long task can begin in one conversation and finish somewhere different. The update belongs with the work, not wherever the last human message happened to land.

The best analogy is handing a brief to a trusted specialist. If the brief is vague, the result will drift. If it's concrete, the result gets better. If nobody checks the output, mistakes survive longer than they should.

This is why the Ralph-loop pattern matters. It puts structure around the kinds of tasks that are easiest to mismanage when treated casually. A good loop uses clear instructions, clear expected outputs, clear monitoring, and verification before success is declared.

The key lessons that make Ralph loops work:

**Concrete instructions over abstract ones.** "Update the headline and verify the live page still loads correctly" beats "make it better."

**Verify before declaring success.** An agent that reports completion without checking whether the actual files changed, the URL works, or the build passed is not done. The system is designed to verify outputs rather than trust completion messages at face value.

**Monitor long-running jobs.** A job that runs for an hour without any human awareness is a job that can fail silently. Active monitoring is part of the pattern.

For staff, the internal mechanics don't matter much. What matters is the operating principle: large tasks are not the same thing as short tasks, just longer. They need a different workflow. When your agent is writing a brief and launching a dedicated work session, that should feel reassuring — it means the system is treating serious work seriously.
