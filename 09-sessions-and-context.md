# Sessions and Context

A session is the working memory of a conversation.

In this system, each Telegram topic is its own workspace. That's not a cosmetic choice — it's one of the main reasons agents stay organized instead of becoming confused generalists.

Picture an office with separate project rooms. One room for the website redesign. Another for hiring. Another for a product launch. If you walk into the hiring room and start talking as if everyone has been discussing the website redesign all day, the room won't make sense. The same principle applies here. A topic holds the active context for the work happening there. Keeping projects in separate topics gives the agent cleaner working memory and prevents context from bleeding across unrelated jobs.

Context is also finite. Long conversations don't grow forever in perfect detail. Over time, they compress — important points are summarized so work can continue without carrying every line forever. That's not failure. It's how the system stays usable.

The right metaphor: a whiteboard in a project room. At first, everything is written out in full. As work goes on, somebody cleans it up, keeps the important points, and erases what no longer needs to stay visible. The room still works. It just can't keep every past scribble on the wall at once.

This is why disciplined topic boundaries matter. One huge all-purpose chat feels convenient until it becomes a junk drawer. Separate topics make it easier for the agent to stay sharp, easier for background work to route back to the right place, and easier for the system to recover when a conversation gets compacted.

It's also why you may occasionally see the agent refer back to notes, memory, or prior project context when regaining its footing. That's normal. A well-run system doesn't pretend the current chat should hold everything forever. It uses written memory to preserve continuity beyond what any one live conversation can safely carry.

The practical takeaway: organized topics make smarter agents.

If a project has its own topic, use it. If a conversation starts drifting into a different project, move it. Give the agent clean rooms to work in rather than one crowded hallway where every conversation echoes into every other one.

You don't need to think about token limits or compaction mechanics. Just remember: topic = project room, session = that room's working memory. When the whiteboard fills up, a good summary plus good written memory beats pretending infinite wall space exists.
