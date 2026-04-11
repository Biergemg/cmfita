# Cursor Setup

**Support level: Adapted.** Full skill protocol works with the fallbacks
documented below. Some automation requires manual equivalents.

---

## Key Limitation: ~40 Tool Limit

Cursor enforces approximately 40 active MCP tools across all installed servers.
Exceeding this limit causes **silent failures** — tools appear registered in
the UI but do not execute.

**Before adding a new MCP server:**
```
Settings → MCP → list all active servers → count tools per server → confirm total < 40
```

Remove unused servers before adding new ones. This limit applies to the total
number of tools, not the number of servers — a server with 10 tools costs 10
slots.

---

## Project Contract: `.cursorrules`

Cursor's equivalent of `CLAUDE.md`. Create at project root.

```
cp references/templates/CLAUDE.md.template .cursorrules
```

Edit the template to match your actual project (read package.json, not guess).

**Critical limitation (documented in r/cursor, 2025):** Linking to external
documents in `.cursorrules` does **not** guarantee the agent reads those docs.
The agent only reads a linked file if you explicitly `@mention` it in the
current session.

**Consequence:** Write rules inline in `.cursorrules`. Do not rely on:
```
# ❌ This doesn't work reliably:
See @ARCHITECTURE.md for conventions.

# ✅ This works:
Naming: files use kebab-case, functions use camelCase, DB columns use snake_case.
```

---

## Session Start Protocol (Manual — No Hooks)

Because Cursor does not have Claude Code's hook system, execute this manually
at the start of each session:

```
@.cursorrules                           # Load project contract
@HANDOVER.md                            # If it exists — load session context
@.ai-context/session-context.md         # Recent commit context
```

This replaces the `SessionStart` hook that Claude Code users get automatically.

---

## Living Contract: Pre-Commit Hook

Without hooks, `.cursorrules` does not update automatically after refactors.
Install this pre-commit hook to keep the context file current:

`.git/hooks/pre-commit`:
```bash
#!/bin/bash
mkdir -p .ai-context
git log --oneline -10 > .ai-context/session-context.md
echo "" >> .ai-context/session-context.md
echo "Updated: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> .ai-context/session-context.md

# Warn on architecture changes
git diff --name-only --cached | grep -qE "(arch|schema|model|infra)" && \
  echo "⚠️ Architecture changed: review .cursorrules manually"
```

Make executable: `chmod +x .git/hooks/pre-commit`

You must still manually update `.cursorrules` after architecture changes.
The hook only updates `.ai-context/session-context.md` (the commit log).

---

## MCP Configuration

Add to `.cursor/mcp.json` at project root (committed to git for team sharing):

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

For local-only servers (credentials, personal tools), use
`~/.cursor/mcp.json` instead.

---

## Memory Protocol

Engram via MCP (see Section above for config).

**Session memory protocol without Engram:**
1. End of session: manually update `.cursorrules` Notes section with decisions
2. Generate `HANDOVER.md` before closing
3. Start of session: `@HANDOVER.md` before any task

---

## Verification Gates in Cursor

All 4 gates apply with the following adaptation:

**Gate 3 (code review subagent):**
- **Preferred:** Open a new Composer conversation with the diff as context
- **Alternative:** Manual checklist: Critical / Important / Minor / Approved
- **Minimum:** Paste the diff into a fresh chat and ask for review

Gate 3 is never optional in `strict` mode even without subagent dispatch.

---

## Cursor-Specific Strengths

- **Infix autocomplete model:** Cursor's autocomplete sees surrounding code
  (bidirectional context), which Claude Code's autocomplete does not replicate.
  For inline completion in large files, Cursor may perform better.
- **Composer for multi-file changes:** Cursor's Composer handles coordinated
  multi-file edits in a single context effectively.

These strengths are unrelated to this skill but may influence agent selection
for specific task types.

---

## Capability Summary

| Capability | Status in Cursor |
|------------|-----------------|
| MCP native | ✅ Full |
| Config scopes (local/project) | ⚠️ Partial (project + user level, not 3-tier) |
| Hooks | ❌ No equivalent — use manual protocol |
| Native memory | ⚠️ Memories feature (limited user control) |
| Skill auto-loading | ❌ Manual @-mention required each session |
| Subagent dispatch | ⚠️ Composer (partial — not full CLI subagent) |
| Allow/deny tool lists | ⚠️ Partial |
