# AGENTS.md — 2x Handbook

This VitePress repository is the human-readable 2x handbook. This file is the canonical cross-agent contract; `index.md`, `chapters.md`, and the numbered chapter files own published content.

## Editorial contract

- Preserve the handbook's chapter ordering, navigation, internal links, and progressive learning path.
- Write for teammates, not the implementation harness: plain language, concrete examples, explicit boundaries, and no private runtime assumptions.
- Keep facts consistent across chapters. Update the authoritative section and link to it instead of duplicating long instructions.
- Keep changes within the owning issue. Record adjacent editorial or technical cleanup separately unless it blocks proof.
- Never include credentials, private conversations, customer data, internal-only URLs, raw exports, or live agent state.
- Distinguish durable principles from fast-changing tool details. Put volatile mechanics in maintained skills or technical docs and link when appropriate.
- Do not hand-edit generated VitePress output or dependency artifacts.

## Verification

- Run `npm run lint`, `npm test`, `npm run build`, and `git diff --check`.
- Check headings, navigation, code blocks, commands, and internal links in affected chapters.
- For layout or theme changes, inspect representative desktop and mobile pages.
- Treat passing prose checks as documentation proof only; any described operational procedure still needs proof in its owning system.

## Keep this file lean

Retain only stable repository guidance useful to almost every session. Put chapter-specific facts in the relevant chapter, conditional procedures in skills, and rewrite or prune stale rules instead of appending history here.
