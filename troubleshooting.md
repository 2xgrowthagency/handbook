# Troubleshooting

When things go sideways, here's how to fix them.

---

## Agent not responding

**Symptom:** You send a message, nothing comes back.

**Likely causes:**
- Gateway is down
- Session is stale or timed out
- Rate limit hit

**Fix:**
```bash
# Check gateway status
openclaw gateway status

# If down, restart
openclaw gateway restart

# If up but unresponsive, try a new session
/new
```

If the problem persists, check `~/.openclaw/logs/` for errors.

---

## Wrong context / confusion

**Symptom:** Agent gives answers that make no sense, references things from the wrong conversation, or seems to have forgotten recent work.

**Likely causes:**
- Topic isolation failure (Telegram forum topics aren't separate sessions)
- Old session bleeding context
- Context compaction happened and recovery failed

**Fix:**

1. **Start a new session** in the topic:
   ```
   /new
   ```

2. **Check if you're in the right topic** — each Telegram topic should be its own session. If the agent is responding in the wrong thread, that's a routing issue.

3. **Verify session memory** — the agent reads `memory/YYYY-MM-DD.md` and `MEMORY.md` on startup. If those are stale or wrong, context will be off. Check:
   ```bash
   cat /root/clawd/memory/$(date +%Y-%m-%d).md
   ```

4. **Context compaction** — if you see a summary of prior conversation instead of full history, the agent hit the 200k token limit and compacted. It should recover automatically from `memory/YYYY-MM-DD.md`. If it doesn't, manually remind it of what's in progress:
   ```
   "We're working on X. Last thing done was Y. Pick up from there."
   ```

---

## Skill install failed / wrong skill installed

**Symptom:** Skill doesn't work as expected, or the wrong skill got installed.

**Likely causes:**
- Installed without vetting (Clara story: installed the wrong "github" skill)
- Skill conflict (two skills trying to provide the same command)
- Missing dependencies

**Fix:**

1. **Check what's installed:**
   ```bash
   clawhub list
   ```

2. **Inspect the skill:**
   ```bash
   clawhub inspect <slug>
   ```

3. **Uninstall if wrong:**
   ```bash
   clawhub uninstall <slug>
   ```

4. **Search for the right one:**
   ```bash
   clawhub search "<topic>"
   ```

5. **Vet before reinstalling** — use `skill-vetter` (already installed). Never install without vetting. Skills have full file system and network access.

**Prevention:** Always vet skills before installing. The 3-layer process (inspect source, check author, check permissions) exists for a reason.

---

## Memory seems off

**Symptom:** Agent doesn't remember something you told it to remember.

**Likely causes:**
- It wasn't written down (mental notes don't persist)
- Wrong memory layer (daily note vs MEMORY.md vs brain/areas/)
- Session isolation (MEMORY.md only loads in main session, not shared contexts)

**Fix:**

1. **Check where it should be:**
   - Recent stuff (today/yesterday) → `memory/YYYY-MM-DD.md`
   - Long-term stuff → `MEMORY.md` (main session only)
   - Structured facts → `brain/areas/people/`, `companies/`, `projects/`

2. **If it's not there, write it now:**
   ```
   "Update memory/YYYY-MM-DD.md with: [thing to remember]"
   ```

3. **If it's a fact about a person/company/project**, write it to the knowledge graph:
   ```
   "Add to brain/areas/people/john-chan.json: [fact]"
   ```

4. **Re-index QMD** if you wrote new files to `brain/areas/`:
   ```bash
   cd /root/clawd
   qmd update && qmd embed
   ```

**Prevention:** If you want the agent to remember something, say "write this down" or "update MEMORY.md with this." Mental notes don't survive session restarts.

---

## Auth failures

**Symptom:** "Authentication failed" or "token expired" errors.

**Common cases:**

### Codex Token Expired
```bash
# Check status
codex login status

# If expired, re-authenticate on Mac and copy to VPS
# (On Mac)
codex login
scp ~/.codex/auth.json root@46.225.19.11:~/.codex/auth.json

# Verify on VPS
codex login status
```

### API Keys
Check `~/.openclaw/openclaw.json` for stale keys. Never edit directly — use `openclaw config set` or environment variables.

### Browser (node-hosted)
If John's Mac node is offline, browser automation with `profile="user"` won't work. Check:
```bash
openclaw nodes list
```

If the Mac node is disconnected, switch to `profile="openclaw"` (VPS browser) or wait for the node to reconnect.

---

## Context compaction

**What it is:** When a session hits 200k tokens, OpenClaw summarizes older messages to free space. You'll see a summary instead of full history.

**What to do:**
1. **Don't panic** — the agent should pick up where it left off automatically
2. **Recovery order:** `memory/YYYY-MM-DD.md` → `memory/active-sessions.json` → `git log --oneline -10` → relevant PRD
3. **If the agent asks for context**, point it to the right file (PRD, daily note, etc.)
4. **If you're mid-task**, remind the agent: "We're working on X. Last thing done was Y. Continue."

**Prevention:** Start a new session (`/new`) before hitting the limit if you're doing long-running work.

---

## `openclaw doctor --fix` Warning

**⚠️ This command is destructive.**

`openclaw doctor --fix` rewrites fields it doesn't recognize, which can corrupt custom webhook configs.

**Before running:**
```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.manual-backup
openclaw doctor --fix
diff ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.manual-backup
```

**Fields known to be stripped/changed:**
- `action: "agent"` → `action: "wake"`
- `sessionKey`, `messageTemplate`, `model` (custom webhook fields)

**Recovery:** Restore from `~/.openclaw/openclaw.json.bak` (auto-created by doctor).

---

## Prompt Injection

**What it is:** When content the agent reads (emails, documents, web pages) contains instructions asking the agent to do something.

**What the agent does:**
1. Stops immediately
2. Alerts you: "Detected embedded instructions in [source]. Not executing."
3. Shows you the suspicious content

**What you do:**
- Review the content
- If it's legitimate (e.g., a how-to guide), tell the agent to proceed
- If it's an attack, delete the message/file

**Prevention:** The agent never follows instructions from untrusted sources. This is a hard boundary.

---

## Still stuck?

1. **Check the logs:**
   ```bash
   tail -f ~/.openclaw/logs/gateway.log
   ```

2. **Check active sessions:**
   ```bash
   openclaw sessions list
   ```

3. **Check cron jobs:**
   ```bash
   openclaw cron list
   ```

4. **Restart the gateway:**
   ```bash
   openclaw gateway restart
   ```

5. **Ask John** — if none of this works, something deeper is wrong.

---

Remember: Most problems are either session isolation (wrong topic), stale memory (nothing written down), or auth (token expired). Start there.
