# Design Decisions

This document records design decisions made while materializing the roadmap
specification (`ROADMAP_SKILL_AVANZADO.md`) into working files.

Format: each entry explains the context, decision, alternatives rejected, and
consequences. Entries are numbered for stable cross-reference.

---

## DEC-001: Repo location vs installed location are separate artifacts

**Date:** 2026-04-07
**Context:** The skill needs to exist both as a Git repository (for
contribution, versioning, and publication) and as an installed skill in
`~/.claude/skills/` (for runtime use by Claude Code). These are different
concerns.
**Decision:** The Git repo at `advanced-ai-dev-skill/` is the source of truth.
Users install by cloning it to `~/.claude/skills/advanced-ai-dev-skill/`. The
installed copy is a deployment artifact — it should not be edited directly.
**Alternatives considered:** Single location with symlinks — rejected because
symlinks are fragile across machines and create confusion about which copy is
authoritative.
**Consequences:** CONTRIBUTING.md must be clear that changes go to the repo,
not the installed copy. PUBLISHING.md must document the install-from-clone
workflow.

---

## DEC-002: HANDOVER.md path fixed at project root

**Date:** 2026-04-07
**Context:** The roadmap specified "ruta estricta en el root del proyecto" but
did not define behavior for monorepos, where multiple sub-projects may be
active simultaneously.
**Decision:** `HANDOVER.md` lives at the root of the git repository (same
level as `.git/`). For monorepos, when working on a specific sub-project, name
it `HANDOVER-<subproject-name>.md` at the repo root. The base `HANDOVER.md`
name is reserved for the primary or most recently active context.
**Alternatives considered:** `.ai-context/HANDOVER.md` — rejected because
agents need to locate this file without explicit instruction about its path;
the repo root is the most predictable location.
**Consequences:** session-context.md.template and 05-context-rotation.md both
reference the repo root as the canonical location.

---

## DEC-003: Artifact update policy uses unified diff + threshold

**Date:** 2026-04-07
**Context:** The roadmap says "if artifact already exists: read → compare →
diff → update without destroying content." It did not specify what "diff"
means operationally or when to ask for approval vs. apply silently.
**Decision:** When updating an existing artifact (CLAUDE.md, AGENTS.md, etc.),
the agent must: (1) read the existing file, (2) identify what would change,
(3) state the changes in the evidence_chain block before applying. For changes
affecting > 10 lines, explicit user confirmation is required before applying.
For changes ≤ 10 lines (typo fixes, field updates), apply and note in the
evidence_chain.
**Alternatives considered:** Always ask — too much friction for minor updates.
Always apply silently — too risky for large structural changes.
**Consequences:** 01-project-contract.md documents this threshold. SKILL.md
Artifact Preservation Rule references it.

---

## DEC-004: Baseline warning count established at onboarding, not at zero

**Date:** 2026-04-07
**Context:** Verification gates block on "new warnings vs baseline." For new
projects, the baseline is zero. For existing projects with pre-existing
technical debt, using zero as baseline would immediately block all work.
**Decision:** Fast-path onboarding (01-project-contract.md, Section D) requires
running the lint tool before making any changes and recording the output count
in `CLAUDE.md` as `baseline_warnings`. Gates compare the delta from this
number. Pre-existing debt above the baseline does not block current work (except
in `strict` mode when the user explicitly requests sanitization).
**Alternatives considered:** Zero baseline always — blocked adoption for
existing projects. No baseline — gates would have no reference point.
**Consequences:** CLAUDE.md.template includes a `baseline_warnings` field.
03-verification-gates.md documents the base-lining rule explicitly.

---

## DEC-005: Engram is optional, not required

**Date:** 2026-04-07
**Context:** The roadmap describes Engram as the memory persistence mechanism.
Engram is a third-party tool. Making it a required component would block
adoption for teams that cannot or will not install it.
**Decision:** Engram is listed as `optional_components` in manifest.yaml. The
memory protocol (02-memory-protocol.md) defines a full fallback path: CLAUDE.md
+ HANDOVER.md + `.ai-context/session-context.md`. All memory operations have
a documented fallback that does not require Engram.
**Alternatives considered:** Required component — blocked adoption. Not
mentioned — teams would not know it exists.
**Consequences:** The skill works without Engram at reduced memory persistence
quality. Teams must choose which tier they want at onboarding time.

---

## DEC-006: AGENTS.md.template added (not in original roadmap file list)

**Date:** 2026-04-07
**Context:** The roadmap references `AGENTS.md` as a required output artifact
for multi-agent workflows and describes its structure (SDD phases), but the
original template list in the roadmap did not include `AGENTS.md.template`.
**Decision:** Added `references/templates/AGENTS.md.template` to ensure teams
have a structured starting point for multi-agent projects. Documented here per
the "if you add a file not in the list, document why" rule established in the
task specification.
**Alternatives considered:** Leave it undocumented — teams would have to
derive the structure from 01-project-contract.md. Embed in CLAUDE.md.template
— too heavy for single-agent projects.
**Consequences:** Templates directory is slightly larger than the roadmap
specified but more complete. CONTRIBUTING.md notes that template additions
require a DECISIONS.md entry.

---

## DEC-007: ai-eval-rubric.md.template operationalizes qualitative questions

**Date:** 2026-04-07
**Context:** The roadmap's Section 06-evals-and-tracing.md defines evaluation
questions qualitatively ("Did the skill prevent the agent from inventing
facts?"). Without a rubric template, teams would interpret these questions
differently, making evaluation non-reproducible.
**Decision:** Created `references/templates/ai-eval-rubric.md.template` with
a table mapping each evaluation question to a 4-level scale
(Prevented / Partial / Did Not / N/A) and a frequency column. The template is
filled out per project, per quarter, or per significant phase.
**Alternatives considered:** Leave as free-form questions — non-reproducible.
Define a scoring formula — too rigid for the available evidence base.
**Consequences:** Teams can compare evaluation results over time and across
projects. Skill cost metrics (override rate, false positive rate) are included
as rows in the rubric.

---

## DEC-008: session-context.md is hook-generated, template shows format only

**Date:** 2026-04-07
**Context:** `.ai-context/session-context.md` is generated by the pre-commit
hook from `git log --oneline -10`. It is not manually authored in normal
operation. A template that looks like a blank form would be misleading.
**Decision:** `references/templates/session-context.md.template` shows the
format the hook produces (git log lines + timestamp) plus two manually
maintained sections: "Active tasks" (what the human is currently working on,
not derivable from git log) and "Blocked items" (blockers not visible in
commits). The template comment explains that only those two sections are
manually maintained; the rest is auto-generated.
**Alternatives considered:** No template — teams would not know the format
expected by the agents that read this file. Full manual template — misleading
about what is automated.
**Consequences:** 01-project-contract.md and agent-setup files reference
`.ai-context/session-context.md` consistently. The pre-commit hook script
produces output compatible with this template.
