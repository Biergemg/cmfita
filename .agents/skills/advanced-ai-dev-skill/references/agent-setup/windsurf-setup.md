# Windsurf Setup

**Support level: Adapted.** Works best as a solo-agent with deliberate
Plan Mode / Code Mode switching and manual checkpoints. No full hooks
equivalent.

---

## Plan Mode vs Code Mode

Windsurf has two distinct operational modes. Use them intentionally — do not
let the agent choose automatically for non-trivial tasks.

| Mode | When to use | What it does |
|------|-------------|--------------|
| **Plan Mode** | Design, architecture, spec, task breakdown | Agent thinks and plans without executing any tools |
| **Code Mode** | Implementation, file editing, running commands | Agent executes against the codebase |

**Mapping to SDD phases (from AGENTS.md):**

| SDD Phase | Windsurf Mode |
|-----------|--------------|
| init, explore | Plan Mode (reading only) |
| propose, spec, design | Plan Mode |
| tasks | Plan Mode → review → Code Mode for implementation |
| apply | Code Mode |
| verify | Plan Mode (reviewing diff) → Code Mode (if fixes needed) |
| archive | Code Mode (writing HANDOVER.md) |

**Rule:** Never jump to Code Mode for non-trivial changes without a Plan Mode
review first. "Non-trivial" means: anything that modifies existing behavior,
touches security/auth/schema, or will require Gate 3 review before merge.

---

## Memories Feature

Windsurf learns about your codebase automatically through its Memories feature.
It stores observations without requiring explicit `mem_save` calls.

**What it does:**
- Remembers file structure, common patterns, and project conventions
- Improves over time as you work in the project

**Important caveats:**
- You have limited control over exactly what gets stored
- Memories can become stale after refactors
- Stale memories can cause Windsurf to reference old architecture confidently

**Post-refactor protocol:**
1. After any significant structural refactor, ask Windsurf: "What do you
   know about our project structure?" — verify the answer is current
2. If Windsurf references outdated structure: explicitly correct it in the
   session ("We no longer use X, we now use Y") and update CLAUDE.md
3. Do not rely on Memories alone for critical architectural facts —
   always verify against CLAUDE.md

---

## Session Start Protocol (Manual — No Hooks)

Windsurf does not support hooks equivalent to Claude Code's 16-hook system.
Execute this manually at the start of each session:

1. Open in Plan Mode first
2. Reference the project contract:
   "Read CLAUDE.md and tell me the active tech stack, critical commands,
   and any recent decisions in the Notes section."
3. If HANDOVER.md exists at project root:
   "Read HANDOVER.md and tell me the exact next step."
4. Read `.ai-context/session-context.md` for recent commit context
5. Switch to Code Mode only when ready to implement

---

## Context Rotation (Manual — No Hook Support)

Since Windsurf does not have a PreCompact hook, context rotation at 65% is
entirely manual:

**Signs that context rotation is needed:**
- Session has been running > 1.5 hours on a complex task
- Windsurf asks about something that was decided earlier in the session
- Windsurf re-reads files it has already read

**Rotation procedure:**
1. Stay in Plan Mode during the handover
2. Ask Windsurf: "Summarize the decisions made in this session and the exact
   next step. Write it to HANDOVER.md."
3. Once HANDOVER.md is written, close the session
4. Open new session → read HANDOVER.md → read CLAUDE.md → continue

---

## MCP Configuration

Follow Windsurf's current documentation for MCP server configuration.
(Configuration format may change across Windsurf versions — check official docs.)

For Engram, the bare MCP pattern:
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

---

## Verification Gates in Windsurf

All 4 gates apply. Adaptations:

**Gate 1 (before code):** Run in Plan Mode — confirm tests exist and fail
before switching to Code Mode.

**Gate 2 (after code):** Run in Code Mode — execute tests and lint.
If failures: stay in Code Mode to fix before advancing.

**Gate 3 (code review):** Switch to Plan Mode with the diff as context.
Or open a separate Code Mode session with just the diff for review.
Use Critical/Important/Minor/Approved labels regardless of method.

**Gate 4 (weekly):** Plan Mode — review metrics manually.

---

## Capability Summary

| Capability | Status in Windsurf |
|------------|-------------------|
| MCP native | ✅ Full |
| Config scopes | ⚠️ Partial |
| Hooks | ❌ No equivalent — manual session-start protocol |
| Native memory (Memories feature) | ✅ Automatic (limited user control) |
| Engram | ✅ Via MCP |
| Subagent dispatch | ❌ Limited — separate session pattern |
| Plan Mode / Code Mode | ✅ Use deliberately for phase separation |
| Skill auto-loading | ❌ Manual reference required |

---

## Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Windsurf references old architecture | Stale Memories | Correct explicitly in session + update CLAUDE.md |
| Code Mode executes without a plan | Jumping modes too quickly | Always start in Plan Mode for non-trivial tasks |
| Context lost mid-session | No automated rotation | Monitor session length; rotate manually at 1.5h |
| Gate 3 skipped | No subagent | Use Plan Mode for review or separate session with diff |
