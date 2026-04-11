# Changelog

All notable changes to this skill are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows Semantic Versioning as defined in [PUBLISHING.md](PUBLISHING.md).

---

## [Unreleased]

---

## [0.9.0] — 2026-04-07

Initial draft release. All components present but not yet validated across
all supported agent combinations. See Known Limitations.

### Added

**Core orchestrator**
- `SKILL.md` — orchestrator with light/standard/strict modes, evidence chain
  format, graceful degradation table, artifact preservation rule, user override
  protocol, and 10 documented limitations

**Configuration**
- `manifest.yaml` — agent compatibility matrix, MCP spec version pin
  (2025-06-18), artifact outputs list, evidence sources, known limitations

**Reference modules**
- `references/01-project-contract.md` — CLAUDE.md minimum structure with
  frontmatter, AGENTS.md for multi-agent SDD phases, pre-commit hook that
  updates `.ai-context/session-context.md`, fast-path onboarding for existing
  projects with baseline establishment
- `references/02-memory-protocol.md` — Engram installation per agent type,
  event→action→tool table, documented Engram truncation bug with workaround
  (chunk at < 2000 tokens), native fallback at `~/.claude/projects/`
- `references/03-verification-gates.md` — Gate 1 (before code: tests exist
  and fail), Gate 2 (after code: tests pass, 0 new warnings), Gate 3 (before
  merge: subagent review Critical/Important/Minor/Approved), Gate 4 (weekly
  health metrics), base-lining rule, rationalization table (6 entries)
- `references/04-security-checklist.md` — 6-item pre-MCP installation
  checklist, secure configuration template, destructive actions tier-3 list,
  CVE reference table (CVE-2025-54136, CVE-2025-53110, CVE-2025-5277,
  ContextCrush), AI risk register minimum structure
- `references/05-context-rotation.md` — 65% threshold rationale, 4-step
  rotation sequence (mem_save → HANDOVER.md → /clear → resume), HANDOVER.md
  path fixed at project root, optional hook-based automatic monitoring
- `references/06-evals-and-tracing.md` — 8 minimum events to log, 6 health
  metrics, 3 skill cost metrics (override rate, false positive rate,
  abandonment rate), 5 qualitative evaluation questions, traceability rule

**Output templates (8)**
- `CLAUDE.md.template` — contract_version frontmatter, tech stack section,
  critical commands, no-guessing rules, prohibited files, naming conventions,
  baseline fields, MCP server registry, decisions log
- `AGENTS.md.template` — SDD phase table (init/explore/propose/spec/design/
  tasks/apply/verify/archive), phase rules, agent assignment table
- `session-context.md.template` — format matching pre-commit hook output,
  manually-maintained active tasks and blocked items sections
- `HANDOVER.md.template` — what we were doing, decisions made, exact next step,
  files modified, files read (not modified), open questions, active mode, context
  metrics at handover
- `AI-WORKFLOW.md.template` — session log format, architectural decision log,
  agent performance observations, mode usage history
- `tooling-compatibility.md.template` — per-project agent capability map,
  MCP server registry with security verification status, known conflicts
- `ai-risk-register.md.template` — risk table with impact/probability/trigger/
  mitigation/status, 6 pre-populated initial risks, risk definition guide
- `ai-eval-rubric.md.template` — evaluation table mapping 5 qualitative
  questions to 4-level scale, skill cost metrics section, trend tracking

**Agent-specific setup guides (4)**
- `references/agent-setup/claude-code-setup.md` — MCP scopes (local/project/
  user), 16 hooks with descriptions, Engram installation, memory limits,
  plugin marketplace commands, capability notes
- `references/agent-setup/cursor-setup.md` — 40-tool limit, .cursorrules
  structure, @-mention limitation, pre-commit hook pattern, Engram via MCP
- `references/agent-setup/codex-setup.md` — config.toml locations, MCP stdio
  and HTTP streamable, allow/deny lists, TUI /mcp command
- `references/agent-setup/windsurf-setup.md` — Plan Mode vs Code Mode
  workflow, Memories feature caveats, manual fallbacks for missing hooks

**Documentation (6)**
- `docs/architecture.md` — module relationships, progressive loading system,
  degradation flow, artifact lifecycle
- `docs/compatibility-matrix.md` — detailed capability table per agent,
  fallback mapping, unsupported feature list
- `docs/installation.md` — step-by-step for each agent, gradual adoption path,
  minimal install option
- `docs/validation.md` — 5 reproducible validation tests with pass criteria
- `docs/usage-patterns.md` — 6 scenarios: new project, legacy project, trivial
  task, sensitive change, MCP installation, post-compaction recovery
- `docs/threat-model.md` — 7 threat categories with likelihood, impact, and
  mitigation status

**Governance**
- `DECISIONS.md` — 8 design decisions with context, alternatives, consequences
- `CHANGELOG.md` — this file
- `CONTRIBUTING.md` — evidence-based contribution policy
- `PUBLISHING.md` — pre-publication checklist, status levels, versioning rules
- `LICENSE` — MIT
- `.gitignore` — OS, editor, env, AI output artifacts

### Known Limitations (Draft Status)

- Engram integration tested only with Claude Code; Cursor/Codex/Windsurf
  integration not validated end-to-end
- Automatic context rotation hooks require manual setup by the user; no
  pre-built hook scripts are included in this release
- Windsurf hook support is limited to manual fallbacks — no automated
  equivalent to Claude Code's 16 hooks
- No automated test suite for the skill itself (validation is manual per
  docs/validation.md)
- CVE table reflects status as of 2026-04-07; new CVEs may have been published
  since then — check cve.org before relying on the table

---

## [0.1.0 — 0.8.0]

Internal development iterations. Not publicly documented.
