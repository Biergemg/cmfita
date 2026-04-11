# advanced-ai-dev-skill

> **Status:** `draft` · **Agents:** Claude Code · Cursor · Codex · Windsurf · **License:** MIT

A skill (protocol layer) for AI-assisted software development. Prevents the four documented failure modes of agent-assisted coding without requiring you to invent your own governance per project.

---

## The Problem (Evidence-Based)

Adopting AI coding agents produces measurable negative effects when verification does not keep pace with generation:

| Problem | Evidence |
|---------|----------|
| +30% static analysis warnings, +41% cyclomatic complexity post-adoption | DiD study, 807 repos with Cursor, 2025 |
| 16.2% of Claude Code PRs required human modification (especially bugfixes) | 567 PRs study, 2025 |
| Context compaction at 80% is lossy — agent gets "dumber" after compact | DoltHub Engineering Blog, Jun 2025 |
| Agents follow stale architecture after refactors | r/cursor community, 2025 |
| 6 CVEs in MCP servers documented in 2025-2026 | cve.org + vendor advisories |

This skill does not promise to fix all of these. It provides structured protocols that reduce their probability and impact.

---

## What This Is Not

- Not a productivity multiplier guarantee
- Not a replacement for human code review
- Not a security certification for MCP servers
- Not a universal solution for all agents and projects

---

## What This Includes

### Core orchestrator
- `SKILL.md` — main entry point with decision flow, modes, and rules

### 6 reference modules (loaded on demand)
- `01-project-contract.md` — CLAUDE.md structure, AGENTS.md for multi-agent flows, pre-commit hook, fast-path onboarding
- `02-memory-protocol.md` — Engram installation, event→action table, native fallback
- `03-verification-gates.md` — 4 quality gates, TDD rule, base-lining, rationalization table
- `04-security-checklist.md` — pre-MCP checklist, CVE reference table, risk register
- `05-context-rotation.md` — 65% threshold, HANDOVER.md sequence, hook variants
- `06-evals-and-tracing.md` — events to log, health metrics, skill cost metrics, evaluation questions

### 8 output templates
CLAUDE.md · AGENTS.md · session-context.md · HANDOVER.md · AI-WORKFLOW.md ·
tooling-compatibility.md · ai-risk-register.md · ai-eval-rubric.md

### 4 agent-specific setup guides
Claude Code · Cursor · Codex · Windsurf

### Documentation
Architecture · compatibility matrix · installation · validation · usage patterns · threat model

---

## Who This Is For

Teams and individuals using AI-assisted development with Claude Code, Cursor, Codex, or Windsurf who want:
- Structured verification without inventing it per project
- Context persistence across sessions
- Security hygiene before installing MCP servers
- Reproducible quality gates grounded in empirical evidence

---

## Repository Structure

```
advanced-ai-dev-skill/
├── SKILL.md                    # Main orchestrator (< 300 lines)
├── manifest.yaml               # Version, compatibility, components
├── README.md                   # This file
├── LICENSE                     # MIT
├── DECISIONS.md                # Design decisions made while building this
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # How to propose changes
├── PUBLISHING.md               # How to publish to marketplace or registry
├── docs/
│   ├── architecture.md         # Module relationships and design rationale
│   ├── compatibility-matrix.md # Detailed agent capability comparison
│   ├── installation.md         # Step-by-step installation for each agent
│   ├── validation.md           # 5 reproducible validation tests
│   ├── usage-patterns.md       # 6 usage scenarios with examples
│   └── threat-model.md         # Known risks and mitigations
└── references/
    ├── 01-project-contract.md
    ├── 02-memory-protocol.md
    ├── 03-verification-gates.md
    ├── 04-security-checklist.md
    ├── 05-context-rotation.md
    ├── 06-evals-and-tracing.md
    ├── templates/
    │   ├── CLAUDE.md.template
    │   ├── AGENTS.md.template
    │   ├── session-context.md.template
    │   ├── HANDOVER.md.template
    │   ├── AI-WORKFLOW.md.template
    │   ├── tooling-compatibility.md.template
    │   ├── ai-risk-register.md.template
    │   └── ai-eval-rubric.md.template
    └── agent-setup/
        ├── claude-code-setup.md
        ├── cursor-setup.md
        ├── codex-setup.md
        └── windsurf-setup.md
```

---

## Quick Start

```bash
# 1. Clone to your Claude Code skills directory (or equivalent)
git clone https://github.com/<org>/advanced-ai-dev-skill \
  ~/.claude/skills/advanced-ai-dev-skill

# 2. Read the setup guide for your agent
# Claude Code:
cat references/agent-setup/claude-code-setup.md

# 3. Copy CLAUDE.md template to your project and fill it in
cp references/templates/CLAUDE.md.template /path/to/your/project/CLAUDE.md
# Edit the template — fill in stack, commands, baseline

# 4. Run the validation procedure to confirm the skill is working
cat docs/validation.md
```

For full installation instructions, see [docs/installation.md](docs/installation.md).

---

## Compatibility

| Capability | Claude Code | Cursor | Codex | Windsurf |
|------------|------------|--------|-------|----------|
| MCP native | Full | Full | Full | Full |
| Configuration scopes | Full | Partial | Full | Partial |
| Hooks (automated) | Full (16 hooks) | Limited | Limited | Limited |
| Persistent memory | Full (Engram + native) | Partial | Partial | Partial (Memories) |
| Subagent dispatch | Full | Partial | Limited | Limited |
| Skill auto-loading | Full | No (manual @) | No | No |
| Full skill support | ✅ Complete | ⚠️ Adapted | ⚠️ Adapted | ⚠️ Adapted |

Full details: [docs/compatibility-matrix.md](docs/compatibility-matrix.md)

---

## Validation

After installation, confirm the skill works with the 5 tests in [docs/validation.md](docs/validation.md):

1. Onboarding from zero in < 30 minutes
2. Post-compaction recovery — context restores correctly
3. Gate 1 enforcement — blocks code-without-tests
4. Security checklist enforcement — blocks MCP install without verification
5. Context rotation at 65% — HANDOVER.md is generated before compaction

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All behavioral changes require evidence.

---

## License

MIT — see [LICENSE](LICENSE).
