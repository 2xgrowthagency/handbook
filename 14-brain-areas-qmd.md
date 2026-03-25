# Brain/Areas and QMD

When the agent refers to "the brain," it's not talking about a mysterious blob of saved notes. It's talking about a structured archive.

That distinction matters. A junk drawer can hold a lot, but it's a terrible way to find something later. The `brain/areas` system exists so long-term knowledge is organized by what it's about, not just by when it happened to be written down.

In practice, that means information is grouped by entity and topic: projects, people, companies, concepts, and other durable categories. Instead of one giant pile of historical scraps, the system builds a categorized memory where each entity has its own folder — a current summary and a list of durable facts underneath.

Why does that help staff? Because retrieval quality determines whether stored memory is actually useful.

If the agent has weeks of project history but can't surface the right part when you need it, the memory might as well be in a box in the basement. What makes the brain valuable isn't just that information goes in. It's that the right information can come back out.

---

## The search layer

This is where semantic search comes in. You don't need the technical details to understand the benefit. The point is that the agent can search by meaning, not just exact wording. If you ask about a website migration, the system can still surface the relevant material even if the original notes used different language — "site importing," "moving the platform," whatever was written at the time.

The search index (QMD) makes this work. Without it, the agent has to read through documents to find relevant content, which is slow and token-expensive. With it, the agent can retrieve the right material in a targeted way.

The best analogy is a library. `brain/areas` is the categorized archive — books on the right shelves because someone decided what kind of thing they are. QMD is what helps the librarian find the right shelf even when the request is fuzzy.

---

## Why re-indexing matters

One thing worth knowing: the search index doesn't update itself automatically when new documents are added. If your agent adds new files to the knowledge graph but doesn't re-index, those files exist but won't surface in semantic searches.

This was a real operational gap before the re-index step became a routine part of memory maintenance. New knowledge would be written correctly, stored in the right place, and still not be retrievable — because the index didn't know about it yet.

The agent handles this as part of normal memory operations. When new documents are added to `brain/areas`, a re-index follows. For staff, the practical implication: if your agent seems to have forgotten something it was told recently, it's worth asking it to check whether the knowledge was indexed.

---

## For staff

The main takeaway is simple: when the agent finds the right thing later, that's not luck. It's the result of an archive organized on purpose and an index that makes fuzzy retrieval possible.

This changes the practical experience. The agent can connect work across weeks. It can retrieve the current state of a project without rereading every old topic. It can surface relevant context even when the new request doesn't match the wording of the original notes.

The difference between "the bot stores everything" and "the bot has organized memory" is exactly this. Storing everything is cheap. Organizing it and making it retrievable is the hard part. The agent manages all of this — you just benefit from it.
