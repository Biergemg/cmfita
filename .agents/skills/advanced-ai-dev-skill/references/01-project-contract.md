# Project Contract

**Purpose:** Create and maintain the project "constitution" — the file the
agent loads at the start of every session to know the stack, commands,
conventions, and prohibited actions without being told.

**Produces:** `CLAUDE.md` (single agent) or `AGENTS.md` (multi-agent),
`.ai-context/session-context.md`, `.git/hooks/pre-commit`

---

## Section A: CLAUDE.md Minimum Structure

Use `references/templates/CLAUDE.md.template` as the starting point.
Fill in every field from actual project files — never from memory or guesses.

**Reading order for stack discovery:**
1. `package.json` (Node/JS projects) or `pyproject.toml` / `requirements.txt`
   (Python) or `go.mod` (Go) or `Cargo.toml` (Rust)
2. Test config files (`jest.config.js`, `pytest.ini`, `go.mod`)
3. Lint config files (`.eslintrc`, `ruff.toml`, `.golangci.yml`)
4. `scripts` section of `package.json` for exact command names

**Required fields:**
```yaml
---
contract_version: 1
last_updated: YYYY-MM-DD
changed_by: [initialization | pre-commit hook | manual]
---
```

**Stack section:** exact technologies with versions read from dependency files.
Not "Node.js" — "Node.js 20.11.0 (from .nvmrc)".

**Commands section:** commands that actually run in this repo, confirmed by
running them or reading config. Not "npm test" — `npm run test:unit` if that
is the actual script.

**No-guessing rules** (copy verbatim into CLAUDE.md):
```
- If information is missing, ask. Do not assume.
- If you haven't seen the file, do not invent its contents. Read it first.
- If the test does not fail before you write code, you did not write the correct test.
- "Reasonable defaults" is not evidence. The actual file is evidence.
```

**Baseline:** established by running lint/analysis before any changes. Record
the actual number. `baseline_warnings: 0` is only correct for new projects.

---

## Section B: AGENTS.md for Multi-Agent Flows

When multiple agents, personas, or agent types collaborate on the same project,
create `AGENTS.md` alongside `CLAUDE.md`. Use
`references/templates/AGENTS.md.template` as starting point.

**SDD phases (based on gentle-ai / Gentleman-Programming pattern):**

| Phase | Produces | Consumes | Exit gate |
|-------|----------|----------|-----------|
| `init` | CLAUDE.md, baseline | — | Contract loaded, agent knows stack |
| `explore` | Architecture map, dependency list | CLAUDE.md | Agent describes stack without prompting |
| `propose` | 2-3 solution options | Explore output | Human selects option |
| `spec` | Detailed spec document | Selected proposal | Spec reviewed and approved |
| `design` | Technical design, interface definitions | Spec | Design reviewed |
| `tasks` | Atomic task list with dependencies | Design | Tasks are independently testable |
| `apply` | Working code with tests | Task list | All gates pass (Gates 1 and 2) |
| `verify` | Review report (Critical/Important/Minor/Approved) | Apply output | No Critical or Important issues |
| `archive` | HANDOVER.md, mem_session_summary | Verify output | Next session resumes from archive |

**Phase rules:**
- Each phase produces a concrete artifact before the next begins
- No phase skips its exit gate
- Human approval required at: propose→spec, spec→design, verify→archive

---

## Section C: Pre-Commit Hook

Install at `.git/hooks/pre-commit` and make executable (`chmod +x`):

```bash
#!/bin/bash
# pre-commit hook: keeps AI agent context current
set -e

# Generate rolling context from last 10 commits
mkdir -p .ai-context
git log --oneline -10 > .ai-context/session-context.md
echo "" >> .ai-context/session-context.md
echo "Last updated: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> .ai-context/session-context.md
echo "Changed files (staged): $(git diff --name-only --cached | wc -l | tr -d ' ') files" >> .ai-context/session-context.md

# Detect architecture-relevant changes and warn
CHANGED_STAGED=$(git diff --name-only --cached 2>/dev/null || true)
if echo "$CHANGED_STAGED" | grep -qE "(schema|migration|model|arch|infra|docker|ci|compose|Dockerfile)"; then
  echo "⚠️  ARCHITECTURE CHANGED: review CLAUDE.md manually — stack or commands may need updating"
fi

# Update contract last_updated if CLAUDE.md is being committed
if echo "$CHANGED_STAGED" | grep -q "^CLAUDE.md$"; then
  if command -v sed &>/dev/null; then
    sed -i "s/last_updated: .*/last_updated: $(date +%Y-%m-%d)/" CLAUDE.md 2>/dev/null || true
    git add CLAUDE.md 2>/dev/null || true
  fi
fi
```

**Windows:** Hooks depend on bash. Requires Git Bash or WSL.

---

## Section D: Fast-Path Onboarding (Existing Projects)

For projects that already exist, do NOT start from the empty template.
The template is for new projects. For existing projects:

1. **Scan reality first (read, don't assume):**
   ```bash
   ls                                           # project root structure
   cat package.json | grep '"version"'          # confirm package manager
   find . -name "*.test.*" -not -path "*/node_modules/*" | head -20
   find . -name "*.spec.*" -not -path "*/node_modules/*" | head -20
   # Run the lint command and capture output:
   npm run lint 2>&1 | tail -5               # or ruff check . | tail -5
   ```

2. **Record baseline from actual lint output:**
   - Run the lint tool and count current warnings
   - This number becomes `baseline_warnings` in CLAUDE.md
   - Never set `baseline_warnings: 0` for a project with existing warnings

3. **Read existing CLAUDE.md / .cursorrules if present:**
   - Compare with template structure
   - Identify missing fields
   - Propose additions (do not overwrite existing content)
   - For changes > 10 lines: require explicit approval before applying

4. **Validate onboarding:** Open a new session and ask the agent what the
   tech stack and test command are. It must answer correctly without being told.

---

## Artifact Preservation Rule

When any output artifact already exists in the target project:

1. Read the existing file completely
2. Compare with the template from `references/templates/`
3. Produce a summary of what would change
4. For changes > 10 lines: present a diff and wait for explicit approval
5. Apply the update, preserving existing content that isn't replaced
6. Never delete content from CLAUDE.md or AGENTS.md without explicit instruction

**Never regenerate from scratch using the template unless the user explicitly
requests it and the existing content is known to be incorrect.**
