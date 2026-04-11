# Compatibility Matrix

Detailed breakdown of which skill capabilities are available in each supported
agent, and what fallbacks apply when a capability is absent.

**Last verified:** 2026-04-07

---

## Summary Table

| Capability | Claude Code | Cursor | Codex | Windsurf |
|------------|:----------:|:------:|:-----:|:--------:|
| MCP native | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| MCP config scopes (local/project/user) | ✅ Full | ⚠️ Partial | ✅ Full | ⚠️ Partial |
| Hooks (automated events) | ✅ 16 hooks | ❌ No equivalent | ❌ No equivalent | ❌ No equivalent |
| Persistent memory (Engram) | ✅ Plugin + MCP | ✅ MCP | ✅ MCP | ✅ MCP |
| Native memory | ✅ ~/.claude/projects/ | ⚠️ Memories feature | ❌ None | ✅ Memories feature |
| Subagent dispatch | ✅ Full | ⚠️ Composer (partial) | ⚠️ Limited | ❌ Limited |
| Tool allow/deny lists | ⚠️ Via hooks | ⚠️ Partial | ✅ Full | ⚠️ Partial |
| Skill auto-loading | ✅ Full | ❌ Manual @-mention | ❌ Manual reference | ❌ Manual reference |
| Plugin/skill marketplace | ✅ Full | ⚠️ Partial | ❌ No equivalent | ⚠️ Partial |
| Project-level config | ✅ .mcp.json | ✅ .cursor/mcp.json | ✅ .codex/config.toml | ⚠️ Partial |
| Skill support level | ✅ Complete | ⚠️ Adapted | ⚠️ Adapted | ⚠️ Adapted |

Legend: ✅ Full support · ⚠️ Partial / requires fallback · ❌ Not available

---

## Claude Code — Full Support

**Why it's recommended:** Claude Code is the only agent with full support for
all skill capabilities without requiring manual workarounds.

### Key capabilities
- **16 hooks**: SessionStart, SessionEnd, PreToolUse, PostToolUse, PreCompact,
  PostCompact, PreCommit, PostCommit, PrePush, PostPush, PreBash, PostBash,
  PreEdit, PostEdit, PreRead, PostRead
- **MCP scopes**: local (`~/.claude.json`), project (`.mcp.json`), user-level
- **Native memory**: `~/.claude/projects/<hash>/memory/` — first 200 lines
  or 25KB loaded automatically
- **Engram**: installable via `claude plugin marketplace add` — full integration
- **Skill auto-loading**: SKILL.md loads when description matches context

### Known limitations
- Allow/deny lists for tools are partial — use hooks (PreToolUse) for
  fine-grained control
- Native memory limit (200 lines / 25KB) requires topic-split files for
  large projects

---

## Cursor — Adapted Support

### Key capabilities
- MCP via `.cursor/mcp.json`
- `.cursorrules` as project contract (equivalent to CLAUDE.md)
- Infix autocomplete model (sees surrounding code — stronger for inline
  completion than Claude Code)
- Composer for multi-file changes

### Key limitations and fallbacks

| Missing capability | Fallback |
|-------------------|----------|
| No hooks | Pre-commit hook for context updates; manual session-start checklist |
| No skill auto-loading | @-mention SKILL.md and reference files explicitly each session |
| ~40 tool limit for MCP | Audit MCP server count before adding new ones |
| `.cursorrules` links not auto-read | Write rules inline in .cursorrules; don't rely on linked docs |
| Partial memory (Memories feature — limited control) | Engram via MCP + HANDOVER.md |
| Partial subagent support | Manual code review checklist when composer subagent not practical |

### Tool limit management
Cursor enforces approximately 40 active MCP tools. Exceeding this causes silent
failures where tools appear registered but don't execute. Audit with:
`Settings → MCP → list active servers → count tools per server`

---

## Codex — Adapted Support

### Key capabilities
- MCP stdio and HTTP streamable transports
- Per-project config: `.codex/config.toml`
- Global config: `~/.codex/config.toml`
- **Strongest allow/deny lists** of all supported agents (both tools and shell
  commands configurable)
- TUI `/mcp` command to list active servers

### Key limitations and fallbacks

| Missing capability | Fallback |
|-------------------|----------|
| No hooks | Manual checkpoints at session start, before close, before large changes |
| No skill auto-loading | Reference SKILL.md and reference files explicitly |
| No native memory | Engram via MCP stdio + HANDOVER.md + .ai-context/session-context.md |
| Limited subagent dispatch | Second Codex invocation for Gate 3 code review, or manual checklist |
| No plugin marketplace | Install via local config + `codex mcp add` CLI |

### Unique strength
Allow/deny lists in Codex are more explicit than any other agent, making it
strong for enforcing tier-3 permission rules (see 04-security-checklist.md).

---

## Windsurf — Adapted Support

### Key capabilities
- MCP native support
- **Plan Mode**: agent thinks and plans without executing — ideal for design
  and spec phases
- **Code Mode**: agent executes against the codebase
- Memories feature: learns codebase over time (limited user control)

### Key limitations and fallbacks

| Missing capability | Fallback |
|-------------------|----------|
| No hooks (no equivalent to Claude Code's 16 hooks) | Manual checklist at session start and end |
| No skill auto-loading | Reference files explicitly per session |
| Memories feature has limited user control | Audit stored memories after refactors; update stale entries |
| Limited subagent support | Manual code review in new session with diff as input |
| No config scopes (project-level partial) | Keep all config in CLAUDE.md / AGENTS.md at project root |

### Plan Mode / Code Mode workflow

The Plan Mode / Code Mode split maps naturally to the SDD phases in AGENTS.md:
- **Plan Mode**: init, explore, propose, spec, design, tasks phases
- **Code Mode**: apply, verify phases
- Never jump directly to Code Mode for non-trivial changes without a Plan Mode
  review first

---

## Fallback Summary

If you are using a non-Claude-Code agent, activate these fallbacks at the
start of each session:

```
[ ] Read HANDOVER.md if it exists (session context restoration)
[ ] Read CLAUDE.md (project contract)
[ ] Run mem_context if Engram is installed
[ ] Declare active degraded mode: [capabilities missing]
[ ] Manual Gate 1 before any code
```

This manual session-start checklist replaces the SessionStart hook available
only in Claude Code.
