# Coding Agents

Coding work is different from ordinary conversational work. It breaks more easily, takes longer, and is much easier to misreport as "done" when it's only half done.

That's why the system treats coding as a special case. It uses dedicated coding agents, structured briefs, QA loops, and explicit routing — instead of pretending a complex implementation task should behave like a quick chat request.

The reason is practical. Coding work touches files, dependencies, builds, routing, copy, environments, and behavior that often can't be judged from a neat status update. A task can sound finished while still failing in the browser, missing a route, breaking an existing page, or forgetting a deployment step.

So the workflow gets stricter. The job is scoped clearly. The expected output is written down. The coding work runs in a dedicated environment built for operating on files and verifying results. The task is monitored if it's long-running. And nobody declares victory until the output is verified.

This is where dedicated coding agents come in. Staff don't need the technical details. The useful thing to know is that coding work benefits from an environment designed for implementation, inspection, and self-correction — not just a smarter chat. It's a setup built to carry coding jobs through the messy middle.

Take a concrete example: a landing page change. It might sound simple — update the headline, adjust the layout, fix a route, confirm the live page still works. In practice that may involve reading the existing code, making file changes, checking that the route resolves, confirming the build passes, and verifying that existing pages didn't break in the process. That's exactly the kind of job that produces false confidence if you treat it casually.

So the system doesn't treat it casually. It writes a concrete brief, delegates the work to the right environment, monitors it if needed, and checks the result before surfacing completion back in the right topic.

That extra rigor isn't preciousness. It's risk management. Coding tasks are unforgiving enough that "looks good from here" isn't good enough. The structure exists to catch the kinds of failures that only show up after someone thinks the work is complete.

That's why coding agents behave differently — not because coding is magical, but because it's unforgiving. The workflow is stricter so the outcomes can be more trustworthy.
