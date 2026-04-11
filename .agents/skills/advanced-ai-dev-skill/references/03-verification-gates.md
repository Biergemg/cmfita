# Verification Gates

**Purpose:** Quality checkpoints that the agent must complete before advancing
between phases. Prevent the documented failure mode: +30% static analysis
warnings and +41% cyclomatic complexity post-adoption (DiD study, 807 repos, 2025).

---

## Intensity Mode Decision

Determine mode before any action. Apply the first matching row.

| Signal detected | Mode |
|----------------|------|
| Only `.md`, `.txt`, `.rst`, renames, documentation | `light` |
| Code files, new functions, features, refactors | `standard` |
| `schema`, `migration`, `auth`, `security`, `deploy`, `infra`, `docker`, `ci`, `compose`, `.env` | `strict` |
| Command contains `rm`, `drop`, `delete`, `push origin main`, deploy to prod | `strict` (mandatory — cannot be overridden by mode detection) |
| User states mode explicitly | Respect override, log it once |

**Mode applies for the entire task.** If signals change mid-task (e.g., a
feature add touches an auth file), escalate mode; never downgrade mid-task.

---

## Gate 1 — Before Writing Any Code

**Active in:** `standard` and `strict` (mandatory); `light` (advisory)

```
□ Did you read the relevant files? (not assumed their content)
□ Does a test exist that describes the expected behavior?
□ Does that test FAIL currently?
  (if it doesn't fail, either the test is wrong or the feature already exists)
```

**If any answer is NO in `standard` or `strict`:** Stop. Resolve before
continuing. Do not write code until all three boxes are checked.

**TDD rule (non-negotiable in `standard` and `strict`):**

> Write test → watch it fail → write minimal code → watch it pass → refactor.

Without watching the test fail first, you cannot know if the test actually
tests what you believe it tests. A test that was never red proves nothing.

**Rationalization table — none of these are valid reasons to skip Gate 1:**

| Rationalization | Response |
|----------------|----------|
| "The user already explained the context" | Explanation ≠ evidence. Read the file. |
| "Reasonable defaults for this stack" | Invented facts. Read the actual file. |
| "I'll add tests after, it's faster" | Tests-after ≠ tests-first. Not equivalent. |
| "It's a small change, testing is overkill" | Small changes break things. 30-second test cost vs unknown risk. |
| "The tests take 5 minutes to run" | Run in isolation: `jest --testNamePattern`, `pytest -k test_name`. |
| "I know what this code does" | You know what you *think* it does. The test proves it. |
| "The deadline is in 30 minutes" | A broken feature shipped faster is still broken. |

---

## Gate 2 — After Writing Code

**Active in:** `standard` and `strict` (mandatory); `light` (advisory)

```
□ Does the test that previously failed now pass?
□ Do all previously passing tests still pass?
□ Does lint report 0 new warnings? (compare against baseline_warnings in CLAUDE.md)
```

**If any answer is NO in `standard` or `strict`:** Do not advance to review.
Fix the failure first.

**On warnings:** Never silence a warning with `// eslint-disable` or
`# noqa` without a comment explaining why it is safe to ignore. Unexplained
silencing is a gate violation equivalent to a new warning.

**Delta, not zero:** Gate 2 checks new warnings against `baseline_warnings`
in CLAUDE.md, not against zero. Pre-existing warnings do not block progress.

---

## Gate 3 — Before Merge / PR

**Active in:** `strict` (mandatory); `standard` (required for features/bugfixes;
optional for docs-only); `light` (optional)

```
□ Dispatch code review subagent with the commit SHA or diff
□ Subagent response must classify findings as: Critical / Important / Minor / Approved
□ Fix all Critical findings before merge
□ Fix all Important findings before merge
□ Document Minor findings and decide: fix now or create a tracked issue
□ If the reviewer is wrong: document the disagreement explicitly
```

**If no subagent available:** Convert to manual checklist. Use the same
severity labels. Ask a human reviewer if possible.

**Reviewer disagreement protocol:** If you believe the review finding is
incorrect, do not silently ignore it. Write in the PR description:
```
<!-- Reviewer flagged: [finding]. Evidence against: [file:line] shows [X].
     Decision: not applying — [reason]. -->
```

---

## Gate 4 — Weekly Health Metrics

**Run:** Weekly, or before any architectural decision.

```
- Delta of static analysis warnings this week vs last week
  (current_count - baseline_warnings should be ≤ 0)
- Delta of cyclomatic complexity this week vs last week
- Rate of PRs merged without human modifications
```

**If warnings or complexity trend upward week over week:** Stop new feature
work. Audit recent changes for debt accumulation. Do not add new features
while the delta is positive.

---

## Base-Lining Rule

The skill distinguishes:
- **Pre-existing technical debt:** existed before the current task was started
- **Debt introduced by this task:** caused by changes in this session/PR

**Gates do NOT block on pre-existing debt** in `standard` mode.
`baseline_warnings` in CLAUDE.md is the reference point, not zero.

**Exception:** In `strict` mode or when the user explicitly requests
sanitization, gates may enforce zero-delta on the total warning count.

**How to re-baseline after a cleanup sprint:**
1. Complete the cleanup
2. Run lint and record the new count
3. Update `baseline_warnings` in CLAUDE.md
4. Bump `contract_version` in the frontmatter
5. Commit CLAUDE.md — the pre-commit hook will update `last_updated`
