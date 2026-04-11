# Installation

Step-by-step installation for each supported agent. Follow the section for
your agent. All sections share the same prerequisite.

---

## Prerequisites

- Git installed
- Access to your agent's configuration directory
- For Engram (optional): Homebrew on macOS/Linux, or equivalent package manager

---

## Option A: Install for Claude Code (Recommended)

### Step 1 — Clone to skills directory

```bash
git clone https://github.com/<org>/advanced-ai-dev-skill \
  ~/.claude/skills/advanced-ai-dev-skill
```

Claude Code automatically discovers skills in `~/.claude/skills/`.

### Step 2 — Verify skill is discovered

Open a new Claude Code session and confirm:
```
ls ~/.claude/skills/advanced-ai-dev-skill/SKILL.md   # file exists
```

The skill appears in the session's available skills list. It loads
automatically when the session context matches the description.

### Step 3 — (Optional) Install Engram for persistent memory

```bash
brew install gentleman-programming/tap/engram
claude plugin marketplace add Gentleman-Programming/engram
claude plugin install engram

# Validate:
engram version
engram tui
```

Without Engram, the skill uses the native fallback:
`~/.claude/projects/<project-hash>/memory/` (200 lines / 25KB limit).

### Step 4 — (Optional) Set up context rotation hook

Add to `~/.claude/settings.json`:
```json
{
  "hooks": {
    "SessionStart": [{ "command": "cat HANDOVER.md 2>/dev/null || true" }],
    "PreCompact": [{ "command": "engram session-summary 2>/dev/null || true" }]
  }
}
```

Without the hook, rotate manually when you observe context > 65%.

### Step 5 — Initialize your first project

```bash
# Copy CLAUDE.md template to your project
cp ~/.claude/skills/advanced-ai-dev-skill/references/templates/CLAUDE.md.template \
  /path/to/your/project/CLAUDE.md

# Fill in the template (read from actual project files, do not guess)
# Then validate in a new session — the agent should know the stack without being told
```

---

## Option B: Install for Cursor

### Step 1 — Clone to a local directory

```bash
git clone https://github.com/<org>/advanced-ai-dev-skill \
  ~/skills/advanced-ai-dev-skill
```

Cursor does not have a standard skills directory. Use any path you prefer.

### Step 2 — Configure MCP (Engram, if desired)

Add to `.cursor/mcp.json` in your project:
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

### Step 3 — Create .cursorrules in your project

```bash
cp ~/skills/advanced-ai-dev-skill/references/templates/CLAUDE.md.template \
  /path/to/your/project/.cursorrules
```

Note: In Cursor, the project contract lives in `.cursorrules`. Fill it in
from your actual project files.

### Step 4 — Session start manual checklist

Because Cursor has no hooks, at the start of each session:
```
@.cursorrules              ← loads project contract
@HANDOVER.md               ← if it exists, loads session context
@.ai-context/session-context.md   ← loads rolling commit context
```

### Step 5 — Install pre-commit hook for context updates

```bash
cp ~/skills/advanced-ai-dev-skill/references/01-project-contract.md \
  /dev/null   # read the pre-commit hook script from Section C in that file
# Install at .git/hooks/pre-commit
```

---

## Option C: Install for Codex

### Step 1 — Clone to a local directory

```bash
git clone https://github.com/<org>/advanced-ai-dev-skill \
  ~/skills/advanced-ai-dev-skill
```

### Step 2 — Configure MCP in codex config

For Engram, add to `~/.codex/config.toml` (global) or `.codex/config.toml`
(per-project):

```toml
[mcp_servers.engram]
command = "engram"
args = ["mcp"]
transport = "stdio"
```

Or via CLI:
```bash
codex mcp add engram -- engram mcp
```

### Step 3 — Configure allow/deny lists (recommended for strict projects)

```toml
[permissions]
allow_tools = ["read_file", "write_file", "run_tests", "run_lint"]

[shell]
deny_commands = ["rm -rf", "git push origin main", "DROP TABLE"]
```

### Step 4 — Create project contract

```bash
cp ~/skills/advanced-ai-dev-skill/references/templates/CLAUDE.md.template \
  /path/to/your/project/CLAUDE.md
```

---

## Option D: Install for Windsurf

### Step 1 — Clone to a local directory

```bash
git clone https://github.com/<org>/advanced-ai-dev-skill \
  ~/skills/advanced-ai-dev-skill
```

### Step 2 — Configure MCP (optional)

Follow Windsurf's MCP configuration documentation for adding Engram.

### Step 3 — Create project contract

```bash
cp ~/skills/advanced-ai-dev-skill/references/templates/CLAUDE.md.template \
  /path/to/your/project/CLAUDE.md
```

### Step 4 — Use Plan Mode / Code Mode deliberately

- **Plan Mode** for design, spec, and task breakdown (init → tasks phases)
- **Code Mode** for implementation and verification (apply → verify phases)

See `references/agent-setup/windsurf-setup.md` for the full workflow.

---

## Gradual Adoption Path

If installing into an existing project with ongoing work, use this order to
avoid disrupting the team:

1. **Day 1:** Install skill. Copy CLAUDE.md.template. Run lint and record
   `baseline_warnings` (do not set to zero — use real count).
2. **Day 2-3:** Apply `light` mode to all tasks. Get familiar with the
   contract format. No gates yet.
3. **Week 1:** Enable `standard` mode for new features. Gates 1 and 2 active.
4. **Week 2+:** Enable Gate 3 (code review) for PRs. Enable Engram if desired.
5. **Ongoing:** Run Gate 4 (weekly metrics) to track debt delta.

---

## Minimal Install (No Optional Components)

If you can only install the core skill without Engram or hooks:

```bash
# 1. Clone the skill
git clone <url> ~/.claude/skills/advanced-ai-dev-skill   # Claude Code
# (or local path for other agents)

# 2. Copy CLAUDE.md template to project
cp .../templates/CLAUDE.md.template ./CLAUDE.md

# 3. Run the pre-commit hook script manually to generate .ai-context/
git log --oneline -10 > .ai-context/session-context.md

# 4. Follow the validation tests in docs/validation.md
```

This gives you: project contract, verification gates, security checklist,
and context rotation (manual). No automatic memory persistence.
