# Evals and Tracing

**Purpose:** Define minimum observability, traceability, and continuous
evaluation. Without this, the stack can be used but cannot be audited or
improved with rigor. The goal is that the team can audit what the agent did,
why, under which mode, with what evidence, and where it failed.

---

## Section A: Minimum Events to Log

Log to `AI-WORKFLOW.md` at the project root. Use
`references/templates/AI-WORKFLOW.md.template` for structure.

**Format:**
```
[YYYY-MM-DDThh:mmZ] [event_type] [mode] [detail]
```

**8 minimum event types:**

1. **session_start** — agent, project, contract version loaded
   ```
   [2026-04-07T14:00Z] session_start standard agent=claude-code contract_version=2 memory=engram
   ```

2. **contract_load** — CLAUDE.md loaded, which version
   ```
   [2026-04-07T14:00Z] contract_load standard CLAUDE.md contract_version=2 baseline_warnings=12
   ```

3. **memory_retrieval** — what was retrieved, from which source
   ```
   [2026-04-07T14:01Z] memory_retrieval standard source=engram retrieved=auth-decisions,schema-v2
   ```

4. **mode_activation** — which mode and why
   ```
   [2026-04-07T14:05Z] mode_activation strict trigger=file:src/auth/tokens.ts contains "auth"
   ```

5. **mcp_action** — MCP server installation or significant invocation
   ```
   [2026-04-07T15:00Z] mcp_action strict action=install server=context7 checklist=passed
   ```

6. **gate_result** — which gate, pass/fail, detail
   ```
   [2026-04-07T14:10Z] gate_result standard gate=1 result=PASS tests_exist=yes tests_fail=yes
   [2026-04-07T14:30Z] gate_result standard gate=2 result=FAIL reason=2_new_warnings action=blocked
   ```

7. **context_rotation** — when rotation was triggered and what was saved
   ```
   [2026-04-07T16:00Z] context_rotation standard trigger=65pct saved=3_decisions handover=created
   ```

8. **session_close** — what was persisted
   ```
   [2026-04-07T17:00Z] session_close standard mem_summary=saved handover=updated decisions_saved=2
   ```

---

## Section B: Minimum Health Metrics

Measure weekly (or before architectural decisions):

**Code quality metrics:**
- `new_warnings_delta`: (current lint count) − (baseline_warnings in CLAUDE.md)
  - Target: ≤ 0
  - Alert: > 5 new warnings in one week
- `complexity_delta`: cyclomatic complexity this week vs last week
  - Target: ≤ 0 sustained over 4 weeks
  - Tool: `lizard` (Python) or `complexity-report` (JS/TS) or `gocyclo` (Go)

**Session quality metrics:**
- `unnecessary_rereads`: count of files read more than once in a single session
  - Target: 0 for files read in the last 30 minutes
  - High count indicates context rot — trigger rotation earlier
- `task_completion_without_major_rework`: % of tasks completed without
  human having to revert or significantly rewrite agent output
  - Target: > 80%

**Memory effectiveness:**
- `context_recovery_success_rate`: % of sessions where mem_context returned
  the expected project context after session close or compaction
  - Target: > 90% (with Engram), > 70% (native fallback)

---

## Section C: Skill Cost Metrics

These metrics detect when the skill is causing more friction than benefit.

| Metric | Description | Alert threshold |
|--------|-------------|-----------------|
| `override_rate` | % of gate/policy invocations that the user overrode | > 30% for any single gate |
| `false_positive_rate` | % of gate blocks where no real problem was found | > 20% for any gate |
| `light_mode_usage` | % of tasks where light mode was used | < 10% may indicate over-use of strict |
| `abandonment_events` | Times user disabled or bypassed skill entirely | > 2 in one week |

**If `override_rate > 30%` for a specific gate:** The gate may be miscalibrated
for this project. Collect data from 5+ instances and propose a threshold
adjustment via CONTRIBUTING.md process.

**If `false_positive_rate > 20%`:** The mode decision table may be triggering
strict where standard is appropriate. Adjust signal rules for this project
by documenting exceptions in CLAUDE.md.

---

## Section D: Qualitative Evaluation Questions

Run these at the end of a significant project phase (first sprint, first
major feature, first production deploy):

1. **Invented facts prevention:** Did the skill prevent the agent from
   inventing file contents, field names, or library versions that didn't exist?
   - Prevented / Partial / Did Not / N/A

2. **Context continuity:** Did the skill reduce context loss between sessions?
   Was architectural context recoverable after sessions closed?
   - Prevented / Partial / Did Not / N/A

3. **Friction calibration:** Did the skill add friction to trivial tasks without
   benefit? Was light mode available and used appropriately?
   - Prevented / Partial / Did Not / N/A (N/A = no trivial tasks in this period)

4. **Graceful degradation:** Did the skill activate the correct fallback when
   a capability was unavailable (no Engram, no hooks)?
   - Prevented / Partial / Did Not / N/A

5. **Risk detection:** Did the skill detect risk before a destructive action
   (MCP install, schema migration, production deploy)?
   - Prevented / Partial / Did Not / N/A

Use `references/templates/ai-eval-rubric.md.template` to record answers.

---

## Section E: Traceability Rule

Every important agent decision must be traceable to at least one of:

1. A file that was read (path + line range)
2. The project contract (CLAUDE.md version + section)
3. Memory retrieved (mem_context result or HANDOVER.md section)
4. A policy from this skill (which rule, why it applies here)
5. A test or lint result (command run + output)

**If a decision cannot be traced to any of these five: it was invented.**
The skill treats invented facts as a protocol violation requiring a stop
and re-verification before continuing.

Evidence chains in the session log make traceability auditable. A session
where everything worked but nothing was logged is not auditable. An auditable
session is one where a new team member could read AI-WORKFLOW.md and reconstruct
every significant agent decision.

---

## Section F: Minimum Logging When Using Minimal Fallback

If AI-WORKFLOW.md is not being maintained (minimal fallback tier):

At minimum, record in CLAUDE.md Notes section:
- Each architectural decision with date
- Each gate that was bypassed and why
- Each MCP server installed with verification date

This is the floor. AI-WORKFLOW.md provides the full audit trail.
