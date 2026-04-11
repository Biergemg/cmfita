# Context Rotation Protocol

**Purpose:** Prevent lossy compaction by rotating at 65% context usage —
before Claude's automatic compaction at 80%.

**Source:** DoltHub Engineering Blog (Jun 2025): *"Claude Code is definitely
dumber after the compaction."* The 80% threshold triggers automatic,
lossy compaction with no user control over what gets preserved.

---

## When to Activate

Activate this protocol when ANY of these conditions is true:

1. Context usage exceeds **65%**
2. The agent re-reads a file it already read earlier in this session
3. The agent asks about a decision that was made earlier in this session
4. The session has been running > 2 hours on a complex task (migration,
   architectural refactor, multi-file feature)

**Do NOT wait for 80%.** At 80%, compaction happens automatically and is
lossy by design. The 15% gap between 65% and 80% is the handover window.

---

## Rotation Sequence (Exact Order)

### Step 1 — Save state to memory

```
mem_save: "State at [ISO timestamp]:
  Task: [what we were doing — be specific]
  Decisions made: [list key decisions from this session]
  Next step: [exact instruction for resuming]
  Files modified: [from git diff --name-only]"

mem_session_summary
```

If Engram is not available, update the `Notes and Decisions` section of
`CLAUDE.md` instead.

### Step 2 — Create or update HANDOVER.md at project root

Path: `[project root]/HANDOVER.md` (same level as `.git/`)

For monorepos: `[project root]/HANDOVER-[subproject].md`

```markdown
# HANDOVER — [ISO timestamp]

## What We Were Doing
[Concrete description — not "working on auth" but "implementing the
validateToken function in src/auth/tokens.ts to check JWT expiry against
the database session record at src/db/sessions.ts:42"]

## Decisions Made This Session
- **[Decision]:** [what] — **Reason:** [why, alternatives rejected]
- **[Decision]:** [what] — **Reason:** [why]

## Exact Next Step When Resuming
[Precise instruction with file path, function name, line if relevant.
Example: "Implement createSession in src/auth/session.ts. Interface is at
line 23. Test at src/auth/session.test.ts:45 currently fails and should pass."]

## Files Modified This Session
[Output of: git diff --name-only]

## Files Read but Not Modified
[List — so they don't need re-reading unless content changed]

## Open Questions
- [ ] [items needing human input or deferred]

## Context at Rotation
- Context usage: ~[N]%
- Mode active: [light / standard / strict]
- Tests passing: [yes / no / partial]
- Warnings delta from baseline: [+N / 0 / -N]
```

### Step 3 — Rotate

- **Claude Code:** `/clear`
- **Other agents:** Close and reopen the session

### Step 4 — Resume in new session

1. Read `HANDOVER.md` — **first action, before anything else**
2. Run `mem_context` to retrieve stored decisions from Engram
3. Read `.ai-context/session-context.md` for recent commit context
4. Continue from "Exact Next Step When Resuming"
5. Emit evidence chain confirming context was restored:
   ```markdown
   <evidence_chain>
     file_read: HANDOVER.md, .ai-context/session-context.md
     context: Restored from handover. Task: [what]. Next step: [what].
     decision: Continuing from HANDOVER.md instruction
     mode: [mode from HANDOVER.md]
     contract_version: [from CLAUDE.md]
   </evidence_chain>
   ```

---

## Why 65% and Not 80%

At **65%** there is sufficient context remaining (~35%) to:
- Run `mem_save` and `mem_session_summary` (reading + writing)
- Read and write `HANDOVER.md` (several file operations)
- Complete the rotation sequence cleanly

At **80%**, Claude compacts automatically without your control. The compaction
is lossy — the agent does not report what was discarded. You cannot rely on
any context from before the compaction unless it was explicitly saved.

---

## Optional: Automatic Monitoring Hooks (Claude Code, Advanced Users)

Based on Anti-Context-Rot stack (VNX, Feb 2026):

```json
// In ~/.claude/settings.json:
{
  "hooks": {
    "SessionStart": [{
      "command": "test -f HANDOVER.md && echo '⚠️  HANDOVER.md found — read it before continuing' || true"
    }],
    "PreCompact": [{
      "command": "engram session-summary 2>/dev/null || echo 'Engram unavailable — update HANDOVER.md manually'"
    }]
  }
}
```

**Note:** Detecting the 65% threshold automatically requires reading the
context usage from Claude Code's internal state. This is not exposed as a
stable API in Claude Code 1.x. The hooks above handle the pre-compaction
event (at 80%) as a safety net, not as the primary trigger. Manual monitoring
at 65% is the reliable approach until a 65%-threshold API is available.

---

## Degraded Mode (Hooks Unavailable)

If hooks are not available (Cursor, Codex, Windsurf):

1. Monitor context manually — note when sessions feel "long"
2. Before starting any complex task, check: "Is this session > 1.5 hours?"
3. If yes: rotate before starting the complex task, not during it
4. At session end: always generate or update HANDOVER.md

**Rule:** When in doubt about context health, rotate. The cost of an
unnecessary rotation is a few minutes. The cost of compaction mid-task
is unpredictable and potentially hours of re-derivation.
