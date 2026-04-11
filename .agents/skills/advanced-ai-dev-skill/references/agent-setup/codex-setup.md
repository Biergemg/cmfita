# Codex Setup

**Support level: Adapted.** Strong MCP support with the most explicit
allow/deny controls of any supported agent. Some automation requires manual
equivalents.

---

## Configuration Files

| Scope | Location | Notes |
|-------|----------|-------|
| Global (all projects) | `~/.codex/config.toml` | Default settings |
| Per-project | `.codex/config.toml` at project root | Overrides global for this project |

Per-project config takes precedence over global. Commit `.codex/config.toml`
to the repo for team-shared settings. Keep credentials in global config or
environment variables — never commit them.

---

## MCP Configuration

Codex supports two MCP transports:

**stdio (local process — recommended for security):**
```toml
[mcp_servers.engram]
command = "engram"
args = ["mcp"]
transport = "stdio"
timeout_seconds = 30

[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
transport = "stdio"
timeout_seconds = 60
```

**HTTP streamable (remote server):**
```toml
[mcp_servers.my-remote-server]
url = "http://127.0.0.1:8080/mcp"
transport = "http"
timeout_seconds = 30
```

**CLI commands:**
```bash
codex mcp add engram -- engram mcp          # Add server via CLI
codex mcp list                              # List configured servers (or use /mcp in TUI)
```

**TUI command:** `/mcp` inside the Codex interactive session lists all active servers.

---

## Allow / Deny Lists (Strongest in Class)

Codex supports explicit allow/deny for both tools and shell commands.
Use this to enforce tier-3 permission requirements from
`references/04-security-checklist.md`:

```toml
[permissions]
# Only allow specific tools (whitelist approach):
allow_tools = ["read_file", "write_file", "run_shell"]

# Or deny dangerous tools (blacklist approach):
deny_tools = ["delete_file"]

[shell]
# Allow specific commands — use for repeatable, safe operations:
allow_commands = [
  "npm test",
  "npm run lint",
  "git status",
  "git diff",
  "git log --oneline -10"
]

# Deny destructive commands — enforce tier-3 protection:
deny_commands = [
  "rm -rf",
  "git push origin main",
  "git push --force",
  "DROP TABLE",
  "DELETE FROM"
]
```

**Recommendation:** Start with deny_commands for the tier-3 list. Add
allow_commands only if you want to restrict to a specific set of approved
operations.

---

## Project Contract

Codex natively reads `AGENTS.md` in multi-agent workflows. For single-agent
use, `CLAUDE.md` at project root serves as the contract — reference it at
the start of each session.

There is no `.cursorrules` equivalent in Codex. Use `CLAUDE.md` directly.

---

## Session Start Protocol (Manual — No Hooks)

At the start of each session, manually:

1. Reference the project contract:
   "Read CLAUDE.md and tell me the tech stack and test command."
2. If HANDOVER.md exists:
   "Read HANDOVER.md and tell me where we left off."
3. If Engram is configured:
   Run `mem_context` to retrieve stored decisions.

---

## Memory Protocol

```toml
# In .codex/config.toml:
[mcp_servers.engram]
command = "engram"
args = ["mcp"]
transport = "stdio"
```

Without Engram: maintain HANDOVER.md + `.ai-context/session-context.md` manually.

---

## Verification Gates in Codex

All 4 gates apply with the following adaptation:

**Gate 3 (code review subagent):**
- Start a second Codex invocation with just the diff as context
- Or use the manual Critical/Important/Minor/Approved checklist

**Gate 4 (weekly metrics):**
- Configure deny_commands to prevent merges without gate completion
- Or run metrics manually with your lint/complexity tooling

---

## Capability Summary

| Capability | Status in Codex |
|------------|----------------|
| MCP native | ✅ Full (stdio + HTTP) |
| Config scopes (global + per-project) | ✅ Full |
| Hooks | ❌ Limited — manual session-start protocol |
| Allow/deny lists | ✅ Strongest of all supported agents |
| Native memory | ❌ No equivalent — use Engram |
| Skill auto-loading | ❌ Manual reference required |
| Subagent dispatch | ⚠️ Limited — second invocation pattern |

---

## Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| MCP server not responding | Timeout too short | Increase `timeout_seconds` for slow servers |
| Tool denied unexpectedly | allow_tools whitelist too restrictive | Add the tool to allow_tools or remove the whitelist |
| Engram not connecting | MCP config not in correct toml section | Check that `[mcp_servers.engram]` has correct indentation |
| Shell command denied | deny_commands list catching legitimate command | Review: is the deny pattern too broad? Narrow the pattern. |
