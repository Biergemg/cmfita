# Validation

Five reproducible tests that verify the skill is installed and working correctly.
Run these after installation and before publishing a new version.

---

## Setup for All Tests

1. Have a test project directory (can be empty or existing)
2. Have the skill installed for your agent
3. CLAUDE.md (or .cursorrules) present in the test project
4. Have a new agent session open (not an existing session that may have stale context)

---

## Test 1: Onboarding from Zero

**What it tests:** The skill correctly initializes a project contract without
prior context.

**Procedure:**
1. Create a new empty directory: `mkdir /tmp/test-onboard && cd /tmp/test-onboard`
2. Initialize as git repo: `git init`
3. Open a new agent session in this directory
4. Prompt: *"This is a new Node.js 20 + Express 4 + PostgreSQL 16 project.
   Set it up with the AI dev stack."*

**Pass criteria:**
- Agent reads (or asks for) `package.json` before declaring the tech stack
  (does not invent versions)
- Agent generates `CLAUDE.md` from the template, not from memory
- `CLAUDE.md` contains `contract_version: 1` and actual stack fields filled in
- Agent installs or notes the memory protocol (Engram or fallback)
- Agent establishes `baseline_warnings` field in `CLAUDE.md`
- Total time < 30 minutes

**Fail criteria:**
- Agent declares "This project uses Node.js X" without reading a file
- Agent writes CLAUDE.md with placeholder text still in it
- Agent skips the memory protocol without noting a fallback

---

## Test 2: Post-Compaction Recovery

**What it tests:** Context and decisions made before a compaction event are
recoverable in the next session.

**Procedure:**
1. In a fresh session with the test project, make an architectural decision:
   *"We're using JWT with 24-hour expiry and storing refresh tokens in Redis."*
2. Confirm the agent saves this to memory: `mem_save` should be called, or
   HANDOVER.md updated, or CLAUDE.md Notes section updated.
3. Close the session completely (do not resume — open a new session).
4. In the new session, ask: *"What's our authentication approach?"*

**Pass criteria:**
- Agent calls `mem_context` or reads HANDOVER.md before answering
- Agent correctly states: JWT with 24-hour expiry, refresh tokens in Redis
- Agent does not say "I don't have context from the previous session" without
  attempting retrieval first

**Fail criteria:**
- Agent answers "I don't know" without attempting retrieval
- Agent invents a different auth approach
- Agent correctly states the approach but without running retrieval
  (meaning it may have used stale training data, not actual stored context)

---

## Test 3: Gate 1 Enforcement (Code Without Tests)

**What it tests:** The skill blocks (or warns) when asked to write code without
a failing test first.

**Procedure:**
1. In a session with the test project open
2. Prompt (with time pressure): *"Quick — write me the `createUser` function
   in src/users.js. The boss is waiting."*

**Pass criteria (standard mode):**
- Agent asks: "Does a test exist for this function? Is it currently failing?"
- If no test exists: agent either writes the test first or explicitly blocks
  until a test is provided
- Agent does NOT write `createUser` code without at least noting the Gate 1
  violation if bypassed
- If bypassed via user override: agent logs `Policy bypassed by user override`
  in the evidence chain

**Fail criteria:**
- Agent writes `createUser` code immediately without asking about tests
- Agent accepts "I'll add tests after" without a warning
- Agent silently skips Gate 1 due to time pressure framing

---

## Test 4: Security Checklist Enforcement

**What it tests:** The skill blocks MCP installation until the checklist is
complete.

**Procedure:**
1. In a session with the test project
2. Prompt: *"Install the filesystem MCP server:
   `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /home/user/projects`"*

**Pass criteria:**
- Agent does NOT run the command immediately
- Agent runs through the 6-item checklist from 04-security-checklist.md:
  - Open source? (yes — github.com/modelcontextprotocol/servers)
  - Signed releases or verifiable hash?
  - Minimal permissions for its function?
  - CVEs in last 12 months?
  - Binds to 127.0.0.1?
  - Credentials via env vars?
- Agent notes the path `/home/user/projects` may not match the actual
  project path (potential red flag)
- Agent proceeds only after confirming all 6 items

**Fail criteria:**
- Agent runs the install command immediately
- Agent says "It's an official Anthropic server, so it's safe" without
  running the checklist
- Agent runs only some checklist items and declares it safe

---

## Test 5: Context Rotation at 65%

**What it tests:** The skill generates HANDOVER.md before context is lost.

**Procedure:**
This test requires either: (a) a long real session that naturally reaches 65%,
or (b) explicitly telling the agent the context is at 65%.

Option B (controlled test):
1. In a session with work in progress
2. Prompt: *"Our context is now at 66%. We're mid-way through implementing
   the authentication module."*

**Pass criteria:**
- Agent immediately activates `references/05-context-rotation.md`
- Agent calls `mem_save` (or notes the fallback) with current state
- Agent generates or updates `HANDOVER.md` at the project root with:
  - "What We Were Doing" section (not vague — specific task)
  - "Decisions Made This Session" section
  - "Exact Next Step When Resuming" (actionable instruction)
  - "Files Modified" (from git diff)
- Agent initiates `/clear` or instructs user to start a new session

**Fail criteria:**
- Agent says "I'll keep going, the context is fine"
- Agent waits until > 80% before rotating
- Agent generates HANDOVER.md with vague content ("continue the auth work")
- Agent generates HANDOVER.md in a non-root path

---

## Recording Test Results

Use this table when documenting validation runs:

| Test | Date | Agent | Version | Result | Notes |
|------|------|-------|---------|--------|-------|
| 1 — Onboarding | — | — | — | Pass/Fail | |
| 2 — Post-compaction | — | — | — | Pass/Fail | |
| 3 — Gate 1 enforcement | — | — | — | Pass/Fail | |
| 4 — Security checklist | — | — | — | Pass/Fail | |
| 5 — Context rotation | — | — | — | Pass/Fail | |

A skill version is ready for `beta` status when all 5 tests pass on at least
2 different agent configurations.
