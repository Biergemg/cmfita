# Contributing

This skill is designed to be stable and evidence-based. Contributions that
improve accuracy, fix factual errors, or extend coverage to new agents are
welcome. Contributions that add opinions without evidence are not.

---

## Principles

1. **Evidence-based only.** Every behavioral change to the skill must cite a
   verifiable source: a published study, a documented CVE, a confirmed agent
   capability, or an observed and reproducible failure mode. "I think this
   would be better" is not a valid basis for a PR.

2. **Conservative by default.** If an ambiguity exists in the evidence, resolve
   it conservatively (more verification, not less). If you believe a gate is
   miscalibrated, provide data from multiple real projects before proposing
   loosening it.

3. **No scope creep.** This skill addresses the four documented failure modes in
   the roadmap. Features that do not address one of those four problems — even
   good features — belong in a different skill.

---

## What Can Change Without a DECISIONS.md Entry

- Factual corrections: wrong command syntax, outdated agent capability
  descriptions, expired CVE information, incorrect URLs
- New CVE entries in the security checklist (add row to table, cite cve.org)
- Typos and clarity improvements that don't change the meaning of a rule
- Additional examples in usage-patterns.md
- Template improvements that don't change field names or required structure

---

## What Requires a DECISIONS.md Entry

- Any change to the main decision flow in SKILL.md
- Any change to gate thresholds (65% context, gate conditions, mode triggers)
- Any change to mode definitions (what light/standard/strict mean)
- Adding or removing items from `required_components` or `optional_components`
  in manifest.yaml
- Changing artifact paths or names (HANDOVER.md location, .ai-context/ path)
- Adding a new template
- Adding a new reference module (01–06 namespace)

Use the format from DECISIONS.md (DEC-NNN / Date / Context / Decision /
Alternatives considered / Consequences).

---

## What Requires a Version Bump in manifest.yaml

- **PATCH** (0.9.x): Bug fixes, factual corrections, new CVE entries,
  updated command syntax, improved wording that doesn't change meaning
- **MINOR** (0.x.0): New modules, new templates, new agent-setup guides,
  new optional components — backward compatible additions
- **MAJOR** (x.0.0): Breaking changes to gate behavior, mode definitions,
  artifact paths, or required components. These require explicit documentation
  in CHANGELOG.md about migration from the previous version.

---

## How to Propose a Change

1. **Open an issue** describing:
   - The problem or gap
   - Evidence supporting the change (links to sources)
   - Proposed solution

2. **Wait for discussion** before opening a PR. For factual corrections,
   a PR without prior issue is acceptable.

3. **One concern per PR.** Do not combine unrelated changes. If two modules
   need updating for unrelated reasons, open two PRs.

4. **Do not modify multiple modules in one PR** unless they are logically
   coupled (e.g., a CVE that requires updates to both the security checklist
   and the threat model).

---

## Testing a Change

Before submitting, verify that all 5 validation tests still pass:

```
docs/validation.md — Test 1: Onboarding from zero
docs/validation.md — Test 2: Post-compaction recovery
docs/validation.md — Test 3: Gate 1 enforcement
docs/validation.md — Test 4: Security checklist enforcement
docs/validation.md — Test 5: Context rotation at 65%
```

Document your test results in the PR description. A PR that changes gate
behavior without evidence that the tests still pass will not be merged.

---

## What to Avoid

- Don't loosen gates without data from real projects showing they produce
  unacceptable false positive rates. A high false positive rate is a valid
  problem — but the solution is calibration, not removal.
- Don't add capabilities that require new third-party dependencies without
  documenting them as optional with a full fallback path.
- Don't change file paths or artifact names without updating every cross-
  reference in the repository (SKILL.md, all reference modules, all docs).
- Don't copy content from the roadmap document verbatim without adapting it
  to the operational format of the target file.

---

## Adding Support for a New Agent

1. Create `references/agent-setup/<agent-name>-setup.md`
2. Add the agent to the capability table in `docs/compatibility-matrix.md`
3. Update the compatibility table in `README.md`
4. Add the agent to `minimum_supported_agents` or note it as experimental
   in manifest.yaml
5. Create a DECISIONS.md entry for any capabilities that required special
   handling or fallbacks
6. Update CHANGELOG.md under [Unreleased]
