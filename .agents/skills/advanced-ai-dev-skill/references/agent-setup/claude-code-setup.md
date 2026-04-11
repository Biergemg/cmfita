# Claude Code Setup

**Support level: Complete.** All skill capabilities available natively.
This is the recommended agent for this skill.

---

## MCP Configuration Scopes

Claude Code supports three distinct scopes for MCP server configuration:

| Scope | Config file | When to use |
|-------|------------|-------------|
| Local (machine-only, not committed) | `~/.claude.json` | Personal servers, credentials, tools you don't want in version control |
| Project (shared with team) | `.mcp.json` at project root | Team-shared servers — commit to the repo |
| User (global, all projects) | `~/.config/claude/settings.json` | Servers you use across all projects |

**Best practice:** Use project scope for team tools. Use local scope for anything
involving credentials. Never put credentials in `.mcp.json` (committed to git).

**CLI commands:**
```bash
claude mcp add <name> -- <command> [args]      # Add server
claude mcp add --scope local <name> -- ...     # Add to local scope
claude mcp list                                 # List active servers
claude mcp remove <name>                        # Remove server
```

---

## 16 Available Hooks

Claude Code fires these lifecycle events. Attach shell scripts via
`~/.claude/settings.json` under the `"hooks"` key.

| Hook | When it fires |
|------|--------------|
| `SessionStart` | Beginning of every session |
| `SessionEnd` | Session closes |
| `PreToolUse` | Before any tool call executes |
| `PostToolUse` | After any tool call completes |
| `PreCompact` | Before automatic context compaction (at ~80%) |
| `PostCompact` | After compaction completes |
| `PreCommit` | Before `git commit` |
| `PostCommit` | After `git commit` |
| `PrePush` | Before `git push` |
| `PostPush` | After `git push` |
| `PreBash` | Before bash command runs |
| `PostBash` | After bash command completes |
| `PreEdit` | Before file edit |
| `PostEdit` | After file edit |
| `PreRead` | Before file read |
| `PostRead` | After file read |

**Hooks for this skill:**

```json
{
  "hooks": {
    "SessionStart": [{
      "command": "test -f HANDOVER.md && echo '⚠️  HANDOVER.md exists — read it before starting' && cat HANDOVER.md || true"
    }],
    "PreCompact": [{
      "command": "engram session-summary 2>/dev/null && echo 'State saved to Engram' || echo 'Engram unavailable — update HANDOVER.md manually before /clear'"
    }],
    "PreCommit": [{
      "command": "git log --oneline -10 > .ai-context/session-context.md && echo 'Context updated' || true"
    }]
  }
}
```

Add to `~/.claude/settings.json` (user-level) or `.claude/settings.json`
(project-level, commit to repo).

---

## Memory System

### Engram (recommended — full persistence)

```bash
brew install gentleman-programming/tap/engram
claude plugin marketplace add Gentleman-Programming/engram
claude plugin install engram

# Validate:
engram version
engram tui    # Opens interactive TUI for viewing stored memories
```

Memory tools available after install:
- `mem_save`: Save a fact or decision to Engram
- `mem_context`: Retrieve all context for the current project
- `mem_search`: Search stored memories
- `mem_session_summary`: Generate and save a session summary

**Known Engram limitation:** Artifacts > ~2000 tokens are truncated silently.
Split large artifacts before saving (see references/02-memory-protocol.md).

### Native memory (fallback — no install required)

Auto-memory at `~/.claude/projects/<project-hash>/memory/`

Limits: first 200 lines or 25KB of `MEMORY.md` are loaded automatically.

Check what's loaded in the current session: `/memory`

For large projects, split into topic files with an index in MEMORY.md.

---

## Plugin Marketplace

```bash
claude plugin marketplace list                 # Browse available plugins
claude plugin marketplace add <org>/<plugin>   # Install from marketplace
claude plugin install <plugin>                 # Activate installed plugin
claude plugin list                             # Show installed plugins
claude plugin remove <plugin>                  # Remove plugin
```

---

## Validation Commands

```bash
claude --version                          # Confirm CLI version
claude mcp list                           # List active MCP servers
/memory                                   # Show what's loaded in current session
engram version && engram tui              # Validate Engram (if installed)
ls ~/.claude/skills/                      # Confirm skill is discoverable
```

---

## Capability Notes

- **Subagents:** Supported via `claude --print` piped through Bash tool or
  dispatched as parallel agents
- **Tool allow/deny:** Partial — use PreToolUse hook to intercept and control
  specific tool calls
- **Skill auto-loading:** Skills in `~/.claude/skills/` load automatically when
  description matches session context — no @-mention required
- **Project-per-config:** Yes, via `.mcp.json` and `.claude/settings.json` at
  project root

---

## Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Skill not loading | Description doesn't match context | Start session with a message matching the description keywords |
| Engram `mem_save` silent truncation | Artifact > 2000 tokens | Split into chunks < 1800 tokens before saving |
| Hook not firing | Syntax error in settings.json | Validate JSON: `python3 -m json.tool ~/.claude/settings.json` |
| Native memory not loading | File > 25KB or > 200 lines | Split into topic files with index in MEMORY.md |
| MCP server not appearing | Wrong scope or config file | Check `claude mcp list` — confirm server is in expected scope |
