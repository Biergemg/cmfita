# Architecture

How the skill is structured, why it is structured that way, and how the
components relate to each other.

---

## Design Philosophy

The skill is a **protocol layer**, not a chatbot persona. It defines:
- What to do in specific situations
- In what order
- What to verify before continuing
- When to stop and ask for human input

It does **not** define a fixed conversation flow or override the agent's
reasoning. It provides structure that the agent applies when the context matches.

---

## Progressive Loading System

The skill is designed to minimize token cost when it doesn't need to be fully
active.

| Level | What loads | When | Token cost |
|-------|-----------|------|-----------|
| 1 | `name` + `description` from YAML frontmatter | Always (at skill discovery) | ~100 tokens |
| 2 | Full `SKILL.md` body | When context matches description | ~400-600 tokens |
| 3 | Individual `references/*.md` files | Only when the step requires it | ~200-800 tokens each |

**Implication:** `SKILL.md` must be a decision map, not a complete manual.
Details belong in reference files. Reference files are loaded on demand, not
upfront.

---

## Module Structure and Relationships

```
SKILL.md (orchestrator)
│
├── Reads: references/agent-setup/<agent>-setup.md
│   └── Establishes: agent capabilities, fallbacks to activate
│
├── Reads: references/01-project-contract.md
│   └── Produces: CLAUDE.md / AGENTS.md / .ai-context/session-context.md
│   └── Installs: pre-commit hook
│
├── Reads: references/02-memory-protocol.md
│   └── Activates: Engram or native fallback
│   └── Establishes: mem_save / mem_context / mem_session_summary protocol
│
├── Reads: references/03-verification-gates.md
│   └── Gates: Gate 1 (before code) → Gate 2 (after code) → Gate 3 (before merge)
│   └── Weekly: Gate 4 (health metrics)
│
├── Reads: references/04-security-checklist.md
│   └── Blocks: MCP install until all 6 items verified
│   └── Produces: ai-risk-register.md entry
│
├── Reads: references/05-context-rotation.md
│   └── Triggers: at 65% context usage
│   └── Produces: HANDOVER.md at project root
│
└── Reads: references/06-evals-and-tracing.md
    └── Logs: events to AI-WORKFLOW.md
    └── Tracks: health metrics weekly
```

---

## Mode Decision Flow

The mode (`light` / `standard` / `strict`) determines which gates are mandatory
vs advisory. The mode is determined from file type signals before any action.

```
Incoming task
     │
     ▼
Detect signals in: file types, keywords in task, command content
     │
     ├── .md/.txt/renames only → light
     │     Gates 1-3: advisory
     │     Evidence chain: only for file-modifying decisions
     │
     ├── Code / features / refactors → standard (default)
     │     Gates 1-3: mandatory
     │     Evidence chain: non-obvious decisions
     │
     └── schema/migration/auth/deploy/infra/ci/rm/drop → strict
           Gates 1-3: mandatory
           Gate 3: requires subagent review
           Destructive actions: explicit human approval
           Evidence chain: every decision
```

User override of mode is always accepted. It is logged once in the evidence
chain and then the overridden mode is applied for the remainder of the task.

---

## Artifact Lifecycle

```
Skill loads CLAUDE.md.template
     │
     ▼
Fast-path onboarding OR new project creation
     │
     ├── New project: copy template → fill in from actual files
     │
     └── Existing project:
           Read existing CLAUDE.md
           Compare with template structure
           Propose diff if > 10 lines change
           Apply update preserving existing content
     │
     ▼
CLAUDE.md active — loaded every session
     │
     ├── Pre-commit hook → updates .ai-context/session-context.md
     │     (last 10 commits + timestamp)
     │
     ├── Context reaches 65%
     │     → mem_save: current state
     │     → Generate HANDOVER.md at project root
     │     → /clear or session restart
     │     → Resume: read HANDOVER.md → mem_context → continue
     │
     └── Session closes
           → mem_session_summary
           → HANDOVER.md updated if needed
```

---

## Graceful Degradation Flow

Each capability has an explicit fallback. The skill declares which tier is
active at the start of each session.

```
Full tier (Claude Code + Engram + hooks)
│   mem_save/mem_context/mem_session_summary
│   Automatic context rotation via hooks
│   Subagent code review
│
├── No Engram → Partial memory tier
│   CLAUDE.md + HANDOVER.md + .ai-context/session-context.md
│   Manual context rotation at 65%
│   Subagent code review if available
│
├── No hooks → Manual checkpoint tier
│   Read HANDOVER.md at session start manually
│   Manual context monitoring
│   Manual code review checklist
│
└── Minimal tier (any agent, no tools)
    CLAUDE.md only
    Evidence chain to prevent invented facts
    Manual gates 1-2 (no subagent for gate 3)
    No automatic memory — all context in CLAUDE.md
```

---

## Security Model

The skill assumes tool descriptions from MCP servers are **untrusted** by
default. This follows MCP Spec 2025-06-18 explicitly.

Trust is established per server through the checklist in
`references/04-security-checklist.md`. Once a server passes the checklist, it
is recorded in CLAUDE.md with the verification date. Trust does not transfer
to other servers or other versions of the same server.

Destructive actions always require explicit human confirmation, regardless of
which server requests them. This cannot be overridden by tool descriptions.

---

## Evidence-Chain Model

Every non-trivial decision made by the agent must be traceable to at least one
of five sources:

1. A file that was read (with path and line range)
2. The project contract (CLAUDE.md version and section)
3. Memory retrieved (mem_context result)
4. A policy from this skill (which rule, and why it applies here)
5. A test or lint result (command run and its output)

If a decision cannot be traced to any of these: it was invented.
The skill treats invented facts as a protocol violation requiring a stop and
re-verification.
