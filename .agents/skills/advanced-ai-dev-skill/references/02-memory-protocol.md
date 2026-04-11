# Memory Protocol

**Purpose:** Explicit protocol for when to save, retrieve, and summarize
memory. Prevents context loss between sessions and post-compaction amnesia.

**Design:** Defense-in-depth — multiple layers (Engram, native memory,
HANDOVER.md, CLAUDE.md) so no single failure loses all context.

---

## Section A: Installation by Agent

### Claude Code (recommended — full support)

```bash
brew install gentleman-programming/tap/engram
claude plugin marketplace add Gentleman-Programming/engram
claude plugin install engram

# Validate:
engram version    # should show installed version
engram tui        # should open interactive TUI
```

### Cursor / Codex / Windsurf (MCP stdio)

Add to project MCP config (`.cursor/mcp.json`, `.codex/config.toml`, or
Windsurf's equivalent):

```json
{
  "mcpServers": {
    "engram": {
      "command": "engram",
      "args": ["mcp"]
    }
  }
}
```

**Windows:** Engram hooks depend on bash. Requires Git Bash or WSL.

---

## Section B: Memory Protocol — When the Agent Acts

| Event | Mandatory action | Tool |
|-------|-----------------|------|
| Architectural decision made | Save immediately | `mem_save` |
| Technology or stack change | Save with date tag | `mem_save` |
| New constraint discovered | Save immediately | `mem_save` |
| Session start | Retrieve project context before any task | `mem_context` |
| Post-compaction (automatic or manual) | Retrieve context before any code | `mem_context` |
| Session close | Generate session summary | `mem_session_summary` |
| Context rotation (65% threshold) | Save state + summary | `mem_save` + `mem_session_summary` |

**Post-compaction rule:** Before writing a single line of code after compaction,
run `mem_context`. The compaction is lossy — what felt like established context
may be gone. Verify by retrieval, not by assumption.

---

## Section C: Known Engram Bug (Active Issue)

Engram silently truncates long artifacts with `... [truncated]` without
raising an error or warning. There is no indication that truncation occurred
unless you compare the saved content with what you intended to save.

**Affected operations:** `mem_save` for artifacts > ~2000 tokens

**Mitigation:**
1. Split long artifacts into chunks before saving:
   ```
   mem_save: "auth-design-part-1: [first ~1800 tokens of content]"
   mem_save: "auth-design-part-2: [next ~1800 tokens of content]"
   ```
2. After saving a critical artifact, verify retrieval:
   ```
   mem_search: "auth-design"
   # Confirm the retrieved content matches what was saved
   ```
3. For specs and designs > 5000 tokens: save a summary to Engram and the
   full text to a file in the project (e.g., `docs/decisions/auth-design.md`)

---

## Section D: Native Claude Code Fallback

When Engram is not installed, Claude Code's native auto-memory system serves
as fallback.

**Location:** `~/.claude/projects/<project-hash>/memory/`

**Limits:**
- First 200 lines of `MEMORY.md` are loaded automatically at session start
- Maximum 25KB loaded per session

**Strategy for projects that exceed the limit:**
1. Create topic-split memory files: `memory/auth.md`, `memory/schema.md`,
   `memory/decisions.md`
2. Keep an index in `MEMORY.md` with one-line summaries and pointers:
   ```markdown
   # Memory Index
   - Auth: see memory/auth.md — JWT, Redis sessions, refresh token policy
   - Schema: see memory/schema.md — PostgreSQL 16, Prisma 5.x, migration log
   ```
3. The index is what gets loaded automatically. Keep it under 200 lines.

**Validate what's loaded:** Run `/memory` in Claude Code to see exactly
what is loaded in the current session.

---

## Section E: Minimal Fallback (No Engram, No Native Memory)

When neither Engram nor Claude Code native memory is available:

1. **CLAUDE.md Notes section:** Record key decisions as date-stamped entries
   ```
   ## Notes and Decisions
   [2026-04-07] Auth: JWT with 24h expiry. Refresh tokens in Redis.
   [2026-04-07] DB: PostgreSQL 16. ORM: Prisma 5.x. No raw SQL.
   ```

2. **HANDOVER.md:** Generate at the end of every significant session.
   Read at the start of every session as the first action.

3. **`.ai-context/session-context.md`:** Rolling last-10-commits context
   from pre-commit hook. Agent reads this to understand recent work.

**Minimal fallback session protocol:**
```
Session start:
  1. Read CLAUDE.md (project contract)
  2. Read HANDOVER.md (if it exists)
  3. Read .ai-context/session-context.md (recent commits)
  → Continue from where the project left off

Session end:
  1. Update CLAUDE.md Notes if architectural decisions were made
  2. Generate/update HANDOVER.md
  → Next session starts with correct context
```

---

## Section F: Validation

After setup, confirm memory persistence works:

1. Save a test fact: `mem_save: "Test: we use PostgreSQL v16, not MySQL. Test date: [today]."`
2. Close the session completely (not just /clear — fully close)
3. Open a new session in the same project
4. Ask: "What database are we using?"
5. Agent must call `mem_search` or `mem_context` and return "PostgreSQL v16"
   — not "I don't know" and not "MySQL"

If the test fails: check Engram installation, verify the project path hash
matches between sessions, confirm the artifact was not truncated (Section C).
