# Skills

Skills are add-ons that give your agent new capabilities. A skill is a set of instructions and tools — once installed, the agent knows how to use them.

Think of them like apps. Your base agent can do a lot without skills, but skills unlock specific integrations and workflows.

## Where skills come from

**ClawHub** (`clawhub.com`) — the main marketplace. Like an app store, but with variable quality. Anyone can publish a skill here.

**VoltAgent's curated list** — a vetted subset of ClawHub skills that have been reviewed for quality and safety. Better starting point than raw ClawHub.

**Custom skills** — skills John has written specifically for 2x workflows. These live in `~/clawd/skills/`.

## Installing a skill

Before installing anything, check with John. Don't install skills autonomously.

The install command is:
```
clawhub install <skill-name>
```

But the important step is *before* that — vetting the skill. A skill has full access to your file system and can run shell commands. Installing a malicious or broken skill can cause real problems.

**Vetting checklist before install:**
1. Search ClawHub: `clawhub search "<topic>"`
2. Inspect: `clawhub inspect <slug>` — read the source code
3. Check the author — is it someone known? Does the repo look maintained?
4. Check for red flags: does it send data externally? Does it ask for permissions it doesn't need?

## Common skills at 2x

| Skill | What it does |
|---|---|
| `gog` | Google Workspace — Gmail, Calendar, Drive, Sheets |
| `github` | GitHub via `gh` CLI — issues, PRs, repos |
| `coding-agent` | Run Codex or Claude Code for longer coding tasks |
| `coding-agent-loops` | Ralph loops — self-healing multi-step coding sessions |
| `agentmail` | Agent-native email (donna@2x.agency inbox) |
| `skill-vetter` | Audits other skills for security risks before install |
| `self-improvement` | Captures errors and corrections to `.learnings/` |

## The wrong skill trap

Clara installed the wrong self-improving agent skill — same name, different author. Always check the author and inspect the source before installing. `clawhub inspect <slug>` shows you the code.

## Uninstalling

```
clawhub uninstall <skill-name>
```

If a skill is causing issues (unexpected behaviour, errors, conflicts with another skill), uninstall it and check with John before reinstalling.
