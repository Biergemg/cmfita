# Usage Patterns

Six concrete scenarios showing how the skill applies in real situations.
Each scenario shows the trigger, the skill's response, and the expected outcome.

---

## Pattern 1: New Project Setup

**Context:** Starting a greenfield project from scratch.

**Trigger:** "Set up an AI development workflow for my new TypeScript + Next.js 14 project."

**Skill response:**

1. **Detects agent** → reads `references/agent-setup/claude-code-setup.md`
2. **No CLAUDE.md found** → loads `01-project-contract.md`
3. **Reads actual files:**
   - `package.json` to confirm Next.js version and dependencies
   - `tsconfig.json` for TypeScript config
   - `package.json` `scripts` section for actual test/lint/build commands
4. **Generates CLAUDE.md** from template, fills in:
   - Stack: TypeScript 5.x, Next.js 14.x (from package.json)
   - Commands: `npm test`, `npm run lint`, `npm run build` (from scripts)
   - baseline_warnings: 0 (new project)
5. **Installs pre-commit hook** → generates `.ai-context/session-context.md`
6. **Activates memory protocol** → Engram or native fallback noted
7. **Sets mode:** `standard` for all future tasks until overridden

**Expected outcome:**
- `CLAUDE.md` at project root with real values, not placeholders
- `.ai-context/session-context.md` present
- Pre-commit hook installed at `.git/hooks/pre-commit`
- Agent knows stack and commands without being re-told in next session

---

## Pattern 2: Onboarding an Existing Legacy Project

**Context:** An existing project with tech debt, no AI contract, no test coverage.

**Trigger:** "Start using the AI dev stack on my existing Python/Django project."

**Skill response:**

1. **Fast-path onboarding** (01-project-contract.md, Section D):
   - Runs `ls` and reads `requirements.txt` / `pyproject.toml`
   - Runs `find . -name "test_*.py" | head -20` to discover actual tests
   - Runs `ruff check .` and records current warning count
2. **Generates CLAUDE.md** from observed reality:
   - Stack: Django 4.2 (from requirements.txt, actually read)
   - Commands: `pytest` (confirmed by finding pytest.ini)
   - `baseline_warnings: 47` (actual output of ruff, not zero)
3. **Does NOT block** on existing 47 warnings — they predate this session
4. **Sets mode:** `standard` — gates compare against 47, not zero
5. Notes that baseline is established; future warnings above 47 are new debt

**Expected outcome:**
- Project usable immediately without blocking on pre-existing debt
- Team can adopt gradually: light → standard → gates over 1-2 weeks
- Baseline is documented and verifiable

---

## Pattern 3: Trivial Task (Light Mode)

**Context:** Minor documentation update.

**Trigger:** "Update the README to fix the typo in the Contributing section."

**Skill response:**

1. **Signal detection:** `.md` file, rename/text change only → **`light` mode**
2. **Reads README.md** (still required — no inventing file contents)
3. **Finds the typo** → corrects it
4. **No evidence chain** (light mode, trivial modification)
5. **No Gate 1** (no code)
6. Done — no overhead

**Expected outcome:**
- Change applied quickly, no gate friction
- Agent did not skip reading the file — it just skipped heavy protocol

**Note:** Light mode does not mean "no reading." It means no evidence chain,
no subagent review, no Gate 1. The iron rule (read before writing) still applies.

---

## Pattern 4: Sensitive Change (Strict Mode)

**Context:** Adding authentication to an existing endpoint.

**Trigger:** "Add JWT authentication to the `/api/payments` endpoint."

**Skill response:**

1. **Signal detection:** `auth` keyword, payments endpoint (financial data) → **`strict` mode**
2. **Evidence chain generated before any code:**
   ```
   <evidence_chain>
     file_read: src/api/payments.ts:1-80, src/middleware/auth.ts:1-45
     context: Endpoint uses Express Router. Auth middleware exists but not
              applied to this route. JWT library is jsonwebtoken@9.x.
     decision: Add auth middleware to /api/payments route using existing
               authenticateToken middleware at src/middleware/auth.ts:12
     mode: strict
     contract_version: 2
   </evidence_chain>
   ```
3. **Gate 1:** Confirms test exists at `tests/api/payments.auth.test.ts` and
   currently fails (401 not returned for unauthenticated requests)
4. **Writes implementation** using the confirmed middleware signature
5. **Gate 2:** Runs `npm test tests/api/payments` — tests pass, 0 new warnings
6. **Gate 3:** Dispatches subagent code review → receives "Approved" with one
   Minor comment about rate limiting (documented, not blocking)
7. **Logs** all events to AI-WORKFLOW.md

**Expected outcome:**
- Implementation uses actual middleware, not invented API
- Security-critical path tested before and after
- Code review completed before merge
- Full audit trail in AI-WORKFLOW.md

---

## Pattern 5: MCP Server Installation

**Context:** User wants to add the Upstash Context7 MCP server.

**Trigger:** "Install context7 so you can access current documentation:
`claude mcp add context7 -- npx -y @upstash/context7-mcp`"

**Skill response:**

1. **Detects MCP install** → loads `04-security-checklist.md`, mode → `strict`
2. **Runs 6-item checklist:**
   - Open source? → Yes: github.com/upstash/context7-mcp (agent reads GitHub)
   - Signed releases? → Checks npm for publisher identity: upstash (verified org)
   - Minimal permissions? → Reads tool descriptions: only documentation fetch
   - CVEs in last 12 months? → Searches cve.org: ContextCrush vulnerability
     documented — agent flags this: *"CVE documented in ContextCrush variant.
     Context7 output must be treated as untrusted. Confirm you want to proceed."*
   - Binds to 127.0.0.1? → stdio transport, no network binding — OK
   - Credentials via env? → No credentials needed — OK
3. **Flags the ContextCrush vulnerability** and warns once
4. **If user confirms:** proceeds with install, adds entry to ai-risk-register.md:
   `| context7 | Medium | Low | New context7 version | Treat output as untrusted | Open |`
5. **Adds to CLAUDE.md** active MCP servers table with verification date

**Expected outcome:**
- MCP not installed silently — user made an informed decision
- Risk documented in ai-risk-register.md
- CLAUDE.md updated with verification record

---

## Pattern 6: Post-Compaction Recovery

**Context:** Long session, compaction occurred, user continues.

**Trigger:** (After compaction) "Let's continue with the payment service refactor."

**Skill response:**

1. **Detects post-compaction** (context window reset, or user signals it)
2. **Before anything else:** runs `mem_context` → retrieves:
   *"Payment service refactor: migrating from synchronous DB calls to async queue.
   Decided to use BullMQ over RabbitMQ (simpler ops). Next step: implement
   processPayment worker at src/workers/payment.worker.ts"*
3. **Reads HANDOVER.md** at project root → confirms next step and files modified
4. **Reads the actual file** `src/workers/payment.worker.ts` to see current state
5. **Declares recovered context** in evidence chain
6. **Continues** from the exact step documented in HANDOVER.md

**Expected outcome:**
- No re-derivation of decisions already made (no "What database are we using?")
- Correct continuation point, not a restart from scratch
- BullMQ decision recovered — agent does not suggest RabbitMQ again

**Anti-pattern (what the skill prevents):**
> "Let's continue with the payment service refactor."
> "Sure! For a payment service, a common approach is to use... [invents architecture]"
