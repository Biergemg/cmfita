# Publishing

How to prepare and publish this skill to the Claude Code marketplace or as a
standalone Git repository.

---

## Status Levels

| Status | Meaning | Who should use it |
|--------|---------|-------------------|
| `draft` | Internal use only. Breaking changes may happen without notice. | Skill authors and early testers |
| `beta` | Tested in real projects. Breaking changes will be documented. External testers welcome. | Teams willing to track changes |
| `stable` | Validated across multiple real projects. Breaking changes require major version bump and migration guide. | All users |

The current status is set in `manifest.yaml` under `status:`. Update it before
publishing.

---

## Pre-Publication Checklist

Complete all items before changing status from `draft` to `beta` or `stable`.

### Content quality
- [ ] All 5 validation tests pass end-to-end (docs/validation.md)
- [ ] No placeholder text in any file (search for `[FILL IN]`, `TODO`, `TBD`)
- [ ] All CVE entries verified as current (check cve.org — CVEs may have been
  updated or new ones published since last validation)
- [ ] All agent-setup files verified against current published agent documentation
- [ ] All command syntax tested in the target agent version

### Metadata
- [ ] `manifest.yaml` status updated from `draft` to target level
- [ ] `manifest.yaml` `last_validated_at` updated to today's date
- [ ] `manifest.yaml` `skill_version` bumped per versioning rules in this doc
- [ ] CHANGELOG.md updated: move items from `[Unreleased]` to the new version

### Documentation
- [ ] README.md compatibility table reflects current agent versions and capabilities
- [ ] docs/compatibility-matrix.md matches current agent capabilities
- [ ] DECISIONS.md has entries for all non-obvious design decisions made
- [ ] CONTRIBUTING.md accurately describes the current contribution workflow

### Governance
- [ ] LICENSE file is present and has the correct year
- [ ] .gitignore excludes AI output artifacts (HANDOVER.md, .ai-context/, etc.)
- [ ] No secrets, credentials, or personal data in any file

---

## Publishing to Claude Code Marketplace

```bash
# Ensure you have the Claude CLI installed and authenticated
claude --version

# Validate the skill loads correctly locally
ls ~/.claude/skills/advanced-ai-dev-skill/SKILL.md

# Publish (reads manifest.yaml for metadata)
claude plugin marketplace publish \
  --repo https://github.com/<org>/advanced-ai-dev-skill

# The published version will be manifest.yaml skill_version
# Users install with:
# claude plugin marketplace add <org>/advanced-ai-dev-skill
```

---

## Publishing as a Standalone Git Repository

Alternative for teams that prefer not to use the marketplace.

```bash
# Tag the release
git tag v0.9.0
git push origin v0.9.0

# Users install by cloning directly to their skills directory
git clone https://github.com/<org>/advanced-ai-dev-skill \
  ~/.claude/skills/advanced-ai-dev-skill

# For other agents: clone to a local path and reference from config
```

Document the clone install path in your README.md Quick Start section.

---

## Versioning Rules

| Change type | Version bump | Example |
|-------------|-------------|---------|
| Bug fixes, factual corrections, new CVEs | PATCH | 0.9.0 → 0.9.1 |
| New modules, templates, agent support (backward compatible) | MINOR | 0.9.0 → 0.10.0 |
| Breaking changes to gates, modes, artifact paths | MAJOR | 0.9.0 → 1.0.0 |

**Breaking changes** must include a migration guide in CHANGELOG.md explaining
what users need to update in their projects (e.g., renamed artifact path,
changed gate threshold, removed required field from CLAUDE.md template).

---

## After Publishing

### Monitor for calibration issues

- **High override rate** (> 30% for a specific gate): The gate may be too
  aggressive. Collect real project data, propose threshold adjustment via PR
  with evidence.
- **High false positive rate**: Gates blocking progress without finding real
  problems. May indicate mode decision table needs refinement.
- **Abandonment reports**: Users loading the skill and then disabling it.
  Investigate whether `light` mode is not being used where appropriate.

### Keep CVE table current

The CVE table in `references/04-security-checklist.md` covers documented
vulnerabilities as of the `last_validated_at` date. Check quarterly:
```
https://www.cve.org/cgi-bin/cvekey.cgi?keyword=mcp+model+context+protocol
```
Add new entries as PATCH releases. Never remove entries — keep historical
record for teams that may still be running affected versions.

### Agent version tracking

Each agent release may change capabilities, command syntax, or configuration
formats. When a new major version of a supported agent ships, review the
corresponding `agent-setup/*.md` file and update if needed. If the change is
backward-incompatible, bump the skill's MINOR version.
