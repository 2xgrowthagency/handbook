# Inter-Agent Communication

Once a team uses more than one agent, coordination becomes its own problem.

Without a pattern, multiple capable agents don't create clarity — they create noise.

The model that works: one coordinator, multiple workers.

The coordinator owns the mission. It decides what the task is, what should happen next, what counts as done, and how blockers get handled. Worker agents take scoped assignments, report status, and don't invent new missions for themselves mid-job.

That structure exists for the same reason a good producer exists in film or event production. Specialists are valuable, but somebody still has to own the whole. If every specialist starts directing everyone else, the project gets louder without getting better.

This is especially important for agents because they're good at responding. Leave the boundaries vague and they can start responding to each other's updates as if every status note were a new invitation to act. That's how loops start. One agent sends a status check, another treats it as a task, the first answers the answer — suddenly the system is generating activity without producing progress.

---

## The anti-loop rules

The most important discipline in multi-agent communication isn't the message format — it's what doesn't get sent.

A few rules that prevent loops from forming:

**Status is not a task.** When a worker agent reports progress or completion, that report goes up the chain. It doesn't trigger a new assignment from the coordinator unless the coordinator explicitly decides to create one.

**One agent opens the loop, one closes it.** The coordinator opens a task by assigning it. The coordinator closes the task by receiving the result and deciding what's next. Workers don't close their own loops by escalating back down.

**Workers report up, not sideways.** A worker agent sends results to the coordinator, not to other worker agents. Agents talking directly to each other without coordinator involvement is where task ownership gets confused.

**Blockers get escalated, not resolved unilaterally.** If a worker hits something it can't handle, it reports the blocker up. It doesn't improvise a workaround that might conflict with what the coordinator intended.

---

## For staff

For staff, the benefit is straightforward. Cleaner ownership means fewer crossed wires. If there's a blocker, the coordinator resolves it. If there's a result, the coordinator reports it. If there's parallel work happening, you still have one place to understand what's going on.

This also makes scaling possible. One agent can manage the mission while others take specialized chunks — research here, coding there, monitoring somewhere else. The human doesn't need to manually orchestrate every handoff because the coordination pattern already exists.

The key point: inter-agent communication isn't valuable because agents are chatting with each other. It's valuable because the conversation is structured enough to support real work without chaos. One coordinator. Several specialists. Clear handoffs. No improvising new missions just because a message arrived.

That's what keeps multi-agent work from becoming multi-agent confusion.
