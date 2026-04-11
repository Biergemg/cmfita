---
name: advanced-ai-dev-stack
description: >
  Use when starting a new project, configuring an AI agent (Claude Code, Cursor,
  Codex, Windsurf), asking about MCP servers, persistent memory, skills, or
  verification gates. Also use when generated code needs structured verification,
  when context loss between sessions is detected, when static analysis warnings
  are growing, or when accumulated technical debt is discovered. Activate on
  mentions of project-contract, CLAUDE.md, evidence chain, or context rotation.
---

# Advanced AI Dev Stack

## Overview

Protocol layer for AI-assisted development that prevents four documented failure
modes: silent technical debt (+30% warnings, +41% complexity — DiD study, 807
repos, 2025), context loss between sessions (compaction at 80% is lossy by
design — DoltHub, Jun 2025), MCP security gaps (6 CVEs 2025-2026), and code
written from invented facts (16.2% of Claude Code PRs required human modification
— 567 PRs study, 2025).

**Iron rule: If you didn't read the file, you don't know what's in it.
Never invent field names, function signatures, schema shapes, or library versions.**

---

## Main Decision Flow

```
1. DETECT AGENT
   → Read references/agent-setup/<agent>-setup.md
   → If agent unknown: apply claude-code-setup.md as default, note degradation

2. VERIFY CONTRACT
   → Does CLAUDE.md / AGENTS.md / .cursorrules exist at project root?
   → NO: execute references/01-project-contract.md before any other step

3. VERIFY MEMORY
   → Is a memory protocol active (Engram or native fallback)?
   → NO: execute references/02-memory-protocol.md and note active fallback

4. BEFORE ANY CODE
   → Execute references/03-verification-gates.md
   → Determine mode: light / standard / strict (see table below)
   → Complete Gate 1 before writing a single line

5. BEFORE INSTALLING ANY MCP SERVER
   → Execute references/04-security-checklist.md
   → All 6 checklist items must be verified — no exceptions

6. MONITOR CONTEXT
   → If context usage > 65%: execute references/05-context-rotation.md
   → Do NOT wait for 80% — compaction at 80% is lossy and uncontrolled
```

---

## Intensity Modes

Determined automatically from signals. User override always wins (log it once).

| Signal | Mode |
|--------|------|
| Only `.md`, `.txt`, renames, documentation | `light` |
| Code files, new features, refactors, tests | `standard` |
| `schema`, `migration`, `auth`, `security`, `deploy`, `infra`, `docker`, `ci` | `strict` |
| Command contains `rm`, `drop`, `delete`, `push origin main`, deploy | `strict` (mandatory) |
| User specifies mode explicitly | Override — respect it, log once |

**`light`:** Minimal verification. Read relevant files. Basic check. No heavy protocol overhead.
**`standard`:** Full gates. Memory and contract active. Evidence chain for non-obvious decisions.
**`strict`:** Full gates + subagent review + explicit human approval for destructive actions.
Evidence chain mandatory for every decision.

---

## Rules Always Active (Never Skip, No Exceptions)

### 1. No invented facts

Before writing any code, explicitly state which files you will read. Then read them.
If you don't have evidence of a field name, function signature, schema shape, or
library version: **stop and read the file or ask**.

**Red flags — stop and read before continuing:**
- "I'll assume the model is named X"
- "The standard approach uses Y"
- "Reasonable default for this stack is Z"
- "The user already explained the context"

All of these mean you have not read the actual file. Read it.

### 2. Evidence chain (standard and strict)

Before any non-trivial decision, emit:

```markdown
<evidence_chain>
  file_read: [exact file paths and line ranges read]
  context: [what the agent understood from reading]
  decision: [what action will be taken and why]
  mode: [light / standard / strict]
  contract_version: [value from CLAUDE.md contract_version field, or "none"]
</evidence_chain>
```

In `light`: only for decisions that modify files or observable behavior.
In `strict`: for every relevant decision without exception.

### 3. No advancing without completing the current gate

Do not move to the next phase without completing the gate for the current phase.
See references/03-verification-gates.md for exact gate content.

### 4. Context at 65%: rotate before continuing

At 65% context usage, activate references/05-context-rotation.md BEFORE any new
code. At 80%, Claude compacts automatically — the result is lossy and you lose
control over what gets preserved.

---

## Artifact Preservation Rule

When CLAUDE.md, AGENTS.md, .cursorrules, AI-WORKFLOW.md, or any equivalent
project artifact already exists:
1. Read the existing file
2. Compare with the template from references/templates/
3. Produce a diff (what would change)
4. Update without destroying existing useful content
5. Never regenerate from scratch without explicit user approval

---

## User Override Protocol

1. **The user's override always wins.** Never block indefinitely.
2. Warn **exactly once** with the justification for the policy.
3. If the user insists: proceed and emit `Policy bypassed by user override` in the evidence chain.
4. Never repeat the warning after the user has overridden.

---

## Graceful Degradation

Declare the active degraded mode explicitly. Never pretend a capability exists.

| Situation | Mandatory fallback |
|-----------|-------------------|
| No persistent memory (Engram unavailable) | CLAUDE.md + HANDOVER.md + .ai-context/session-context.md manual |
| No hooks available | Manual checkpoints: session start, before close, before large changes |
| No subagents | Manual review checklist: Critical / Important / Minor / Approved |
| MCP unavailable or unstable | Local project contract + file/test-based verification only |
| Context already degraded | Save state → generate HANDOVER.md → restart → resume from handover |
| Agent not in supported list | Apply claude-code-setup defaults, document unsupported capabilities |

---

## Expected Output Artifacts

After correctly executing this skill, these files should exist in the target project:

| Artifact | Purpose | Template |
|----------|---------|----------|
| `CLAUDE.md` | Project constitution for the agent | references/templates/CLAUDE.md.template |
| `AGENTS.md` | Multi-agent phase coordination | references/templates/AGENTS.md.template |
| `.ai-context/session-context.md` | Rolling last-10-commits context | references/templates/session-context.md.template |
| `HANDOVER.md` | Session state for context rotation | references/templates/HANDOVER.md.template |
| `AI-WORKFLOW.md` | Documented workflow decisions | references/templates/AI-WORKFLOW.md.template |
| `tooling-compatibility.md` | Agent capability map for the project | references/templates/tooling-compatibility.md.template |
| `ai-risk-register.md` | Active AI-related risks | references/templates/ai-risk-register.md.template |
| `ai-eval-rubric.md` | Evaluation rubric for the skill | references/templates/ai-eval-rubric.md.template |

---

## References (Load on Demand)

| File | Load when |
|------|-----------|
| `references/01-project-contract.md` | No CLAUDE.md / AGENTS.md exists, or onboarding existing project |
| `references/02-memory-protocol.md` | No memory protocol active, or post-compaction recovery |
| `references/03-verification-gates.md` | Before writing any code, before merge |
| `references/04-security-checklist.md` | Before installing or updating any MCP server |
| `references/05-context-rotation.md` | Context > 65%, or session > 2h on complex task |
| `references/06-evals-and-tracing.md` | Weekly review, or evaluating skill effectiveness |
| `references/agent-setup/<agent>-setup.md` | At session start, agent-specific configuration |

---

## Limitations (By Design — Not Bugs)

1. Lossy compaction at 80% is inevitable — this skill mitigates but cannot eliminate it
2. CLAUDE.md is not enforced as a system prompt in all agents — can be ignored without @-mention
3. This skill adds overhead for trivial tasks — use `light` mode to reduce friction
4. Third-party MCP servers are not guaranteed secure — checklist reduces, not eliminates, risk
5. No universal productivity guarantee — evidence shows risk reduction, not universal speedup
6. No guarantee of perfect instruction compliance — gates reduce violations, do not eliminate them
7. Historical technical debt is not auto-fixed — gates prevent new debt only
8. No automatic correction of stale documentation — pre-commit hook updates context; humans must update content
9. Skill effectiveness varies by task complexity — highest value on architectural and security tasks
10. Different intensity thresholds may be needed per team — the default table is a calibrated starting point
