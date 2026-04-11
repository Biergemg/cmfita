# Threat Model

Known risks introduced or amplified by AI-assisted development, and how this
skill mitigates them. Each threat has a likelihood, impact, and mitigation status.

This is not a comprehensive security audit. It covers the threat surface
relevant to the skill's scope.

---

## T1: Prompt Injection via MCP Tool Output

**Category:** Security
**Likelihood:** Medium (increases with number of MCP servers installed)
**Impact:** High — can modify agent behavior, exfiltrate context, or cause
unauthorized actions

**Description:** MCP Spec 2025-06-18 explicitly states that tool descriptions
and tool output must be treated as untrusted unless the server is explicitly
verified. An attacker who controls an MCP server's output can inject instructions
into the agent's context that cause it to take unintended actions.

**Documented cases:**
- ContextCrush: Context7 vulnerable to prompt injection via poisoned documentation
- CVE-2025-5277: Command injection in aws-mcp-server via tool input
- CVE-2025-54136: Cursor trusted server name, not the actual binary

**Mitigation (this skill):**
- Pre-installation checklist (04-security-checklist.md) required before any MCP install
- All MCP tool output treated as untrusted by default
- Destructive actions require explicit human confirmation regardless of tool output
- ai-risk-register.md tracks each installed server with verification date

**Residual risk:** Checklist cannot detect all injection techniques. New CVEs
may emerge after verification. Users who bypass the checklist have no protection.

---

## T2: Untrusted Tool Descriptions

**Category:** Security
**Likelihood:** Low (requires attacker-controlled MCP server)
**Impact:** High — can cause agent to take actions not intended by the user

**Description:** MCP tool descriptions are metadata provided by the server, not
verified by the client. A malicious or compromised server can describe a tool
as doing X while actually doing Y.

**Example:** A filesystem server could describe `read_file` as "read a file"
but actually implement it to also send the content to an external endpoint.

**Mitigation (this skill):**
- Only open-source, auditable servers pass the pre-installation checklist
- Minimal permissions principle: servers should request only what they need
- 127.0.0.1 binding requirement reduces network exfiltration surface

**Residual risk:** Open-source does not mean safe. Code must actually be audited,
not just available. This skill requires "you can read the code" but does not
require that the user actually reads all of it.

---

## T3: Documentation Drift (Stale Contract)

**Category:** Reliability
**Likelihood:** High (without the pre-commit hook, increases with refactor frequency)
**Impact:** Medium — agent follows outdated architecture, produces wrong implementations

**Description:** CLAUDE.md describes the project's tech stack, commands, and
conventions. After a refactor, migration, or dependency upgrade, CLAUDE.md may
no longer reflect reality. The agent follows the stale contract and produces
code that is syntactically valid but architecturally wrong.

**Documented case:** Agents follow stale `.cursorrules` after refactors
(r/cursor community, 2025).

**Mitigation (this skill):**
- Pre-commit hook detects architecture-relevant file changes and warns
- Pre-commit hook updates `.ai-context/session-context.md` with last 10 commits
- `contract_version` field in CLAUDE.md frontmatter — bump it when structure changes
- Agent's artifact preservation rule: read → compare → diff before updating

**Residual risk:** Pre-commit hook detects file-name-pattern changes, not
semantic drift. A renamed directory with the same conventions would not trigger
a warning. Human review is still required after major refactors.

---

## T4: Lossy Context Compaction

**Category:** Reliability
**Likelihood:** High (any session > ~2 hours on complex tasks)
**Impact:** Medium — agent loses architectural decisions, reverts to defaults
or invents facts

**Description:** Claude Code compacts context automatically at ~80% usage. The
compaction is lossy by design: recent context is compressed, and subtle decisions
from the current session may be lost. The agent does not report what was lost.

**Documented case:** "Claude Code is definitely dumber after the compaction"
(DoltHub Engineering Blog, Jun 2025).

**Mitigation (this skill):**
- Context rotation at 65% (not 80%) gives 15% buffer for safe handover
- mem_save before rotation preserves key decisions in Engram
- HANDOVER.md at project root gives the next session a precise starting point
- mem_context at session start after compaction retrieves stored decisions

**Residual risk:** Compaction cannot be prevented, only anticipated. If the
agent fails to rotate at 65% (user overrides, or hooks not installed), context
will be lost. The 65% threshold itself is a policy choice, not a technical
guarantee.

---

## T5: Artifact Overwrite / Destruction

**Category:** Reliability
**Likelihood:** Low (requires misconfigured skill or explicit bad instruction)
**Impact:** High — CLAUDE.md or AGENTS.md overwritten means session-to-session
continuity is lost

**Description:** An agent following the skill might attempt to regenerate
CLAUDE.md from the template, overwriting customized content that the team has
accumulated. Without the artifact preservation rule, this is a silent data loss.

**Mitigation (this skill):**
- Artifact preservation rule (SKILL.md): read → compare → diff → update; never
  regenerate from scratch without explicit user approval
- Changes > 10 lines require explicit user confirmation (DEC-003)
- Git tracking of CLAUDE.md provides recovery via `git checkout`

**Residual risk:** If CLAUDE.md is not committed to git, recovery is impossible.
Teams should commit CLAUDE.md. If the user explicitly approves a full regeneration,
the skill complies — user override always wins.

---

## T6: Excess Operational Friction

**Category:** Usability
**Likelihood:** High for `strict` mode on trivial tasks; Low with correct mode usage
**Impact:** Low-Medium — teams abandon the skill, lose all protections

**Description:** Skill adds verification overhead. For trivial tasks (typo fixes,
documentation updates), that overhead is pure cost with no benefit. If the skill
cannot distinguish trivial from critical, teams will disable it entirely.

**Documented baseline:** The DiD study estimated 25-minute added latency for
small changes when full protocol is applied indiscriminately.

**Mitigation (this skill):**
- `light` mode for trivial tasks (documentation, renames) — no evidence chain,
  no gates, just read-before-write
- Automatic mode detection from file-type signals
- User override always available — skill never blocks permanently

**Residual risk:** Mode detection is heuristic. A file named `auth.md` (mode:
`strict` due to `auth` keyword) that contains documentation (should be `light`)
would trigger unnecessary overhead. User override resolves this — but the user
must know to use it.

---

## T7: Memory Poisoning via Stale Engram Artifacts

**Category:** Reliability
**Likelihood:** Low (requires specific conditions: old artifacts not cleaned up)
**Impact:** Medium — agent retrieves stale decisions and acts on outdated facts

**Description:** Engram stores facts from previous sessions. If the project's
stack changes (PostgreSQL replaced by MongoDB, for example) but the old Engram
artifact is not updated, `mem_context` may return: "We use PostgreSQL 16."
The agent would then write PostgreSQL-specific code for a MongoDB project.

**Mitigation (this skill):**
- Stack changes trigger `mem_save` with date tag (02-memory-protocol.md)
- CLAUDE.md and Engram should be consistent — if they conflict, trust CLAUDE.md
  (the file is readable and verifiable; memory is opaque)
- When conflict detected: agent notes it explicitly and asks user to resolve

**Residual risk:** If the user does not trigger `mem_save` on stack changes,
stale artifacts persist indefinitely. Engram has no expiry mechanism.

---

## Risk Summary

| Threat | Likelihood | Impact | Mitigation Status |
|--------|-----------|--------|------------------|
| T1: Prompt injection via MCP | Medium | High | Checklist required — residual risk remains |
| T2: Untrusted tool descriptions | Low | High | Open-source requirement — audit not guaranteed |
| T3: Documentation drift | High | Medium | Pre-commit hook — semantic drift not detected |
| T4: Lossy compaction | High | Medium | 65% rotation — not preventable, only anticipated |
| T5: Artifact overwrite | Low | High | Preservation rule + git — requires git tracking |
| T6: Excessive friction | High (without light mode) | Medium | Light mode + auto-detection — heuristic |
| T7: Memory poisoning | Low | Medium | Date-tagged saves — requires discipline |
