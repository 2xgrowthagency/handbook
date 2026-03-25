# Coding Agents

Coding work is different from ordinary conversational work. It breaks more easily, takes longer, and is much easier to misreport as "done" when it's only half done.

That's why the system treats coding as a special case. It uses dedicated coding agents, structured briefs, QA loops, and explicit routing — instead of pretending a complex implementation task should behave like a quick chat request.

The reason is practical. Coding work touches files, dependencies, builds, routing, copy, environments, and behavior that often can't be judged from a neat status update. A task can sound finished while still failing in the browser, missing a route, breaking an existing page, or forgetting a deployment step.

---

## The orchestration/execution split

One of the more useful distinctions in coding workflows: the agent that decides what to build and the agent that builds it don't have to be the same agent.

Orchestration — breaking down a task, writing the brief, tracking progress, verifying output — benefits from strong reasoning and judgment. Execution — writing files, running checks, iterating on failures — benefits from a coding-specific environment designed for that kind of work.

Mixing these roles into one long conversation creates pressure on context limits and produces messier results than keeping them separate. The orchestrating agent stays responsible for the outcome. The executing agent does the implementation inside its own session.

This split matters for cost as well. Orchestration doesn't require the most expensive coding environment. Execution does. Using the right tool for each phase keeps both quality and cost in the right range.

---

## What "done" actually means for coding work

The definition of done for coding tasks is stricter than it sounds. A sub-agent can produce a confident, detailed completion message while the actual files are unchanged. Rate limits, context compression, and tool failures can result in an agent that believes it completed the work when it didn't.

The standard verification sequence:
- Expected files exist and contain the right content
- Build passes (if applicable)
- Changed URLs return expected responses
- Changes are committed and pushed (not just local)
- Sitemap and routing haven't broken existing pages

"Looks finished from here" isn't sufficient. "Local done" is not done. The completion is only real when the artifacts are real.

---

## For staff

You don't need to manage this directly. The point is to understand why coding work gets different treatment — why your agent writes a brief, launches a separate session, monitors it, and checks results before reporting completion. That behavior exists because coding tasks are unforgiving enough that casual handling produces unreliable results.

When the workflow is stricter, the outcomes are more trustworthy. That's the tradeoff, and it's worth it.
