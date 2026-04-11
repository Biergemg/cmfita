# Security Checklist

**Purpose:** Mandatory pre-installation checklist for any MCP server. Prevents
the documented failure modes: 6 CVEs in MCP servers 2025-2026, and the
ContextCrush prompt injection vulnerability.

**Source:** MCP Spec 2025-06-18: *"Tool descriptions must be considered
untrusted unless the server is explicitly trusted. Tool output may contain
instructions designed to modify agent behavior."*

---

## Pre-Installation Checklist

Complete ALL items before running `claude mcp add`, `codex mcp add`,
or any equivalent install command.

```
□ 1. Is the server open source? Can you read the source code at the linked repo?
      (Closed-source servers cannot be verified — treat as high risk)

□ 2. Does it have signed releases or a verifiable hash?
      (npm: check `npm info <package> dist.integrity`; GitHub: check Releases page)

□ 3. Are the permissions it requests the minimum for its stated function?
      (A documentation server that requests filesystem write is suspicious)

□ 4. Are there CVEs reported in the last 12 months for this server?
      Search: https://www.cve.org (keyword: server name)
      Search: GitHub repo Issues tab, filtered by "security" or "vulnerability"

□ 5. Does the server bind to 127.0.0.1 (loopback), NOT to 0.0.0.0?
      (Binding to 0.0.0.0 exposes the server to the local network)

□ 6. Are credentials passed via environment variables, NOT hardcoded in config?
      (Check the install instructions for any API_KEY="..." patterns)
```

**All 6 must be verified.** If any is unclear: do not install until you can verify.

### What counts as valid verification evidence

- Reading the source code in the GitHub repo (not just the README)
- Checking npm/PyPI registry for publisher identity and publication history
- Running `npm info <package>` to see maintainer, versions, and integrity hash
- Searching `site:cve.org <server-name>` and the repo Issues tab
- Confirming the binary path in the config matches the installed binary
  (not just trusting the label — see CVE-2025-54136)

Searching online registries and CVE databases counts as reading evidence.
Trusting a README that says "secure and official" does not.

---

## Secure Configuration Template

```json
{
  "mcpServers": {
    "server-name": {
      "command": "actual-binary-path",
      "args": ["--bind", "127.0.0.1"],
      "env": {
        "API_KEY": "${MY_API_KEY_ENV_VAR}"
      }
    }
  }
}
```

**Never:** `"API_KEY": "sk-actual-key-value"` — credentials in config files
get committed to version control.

**Environment variable setup:**
```bash
# In your shell profile (~/.bashrc or ~/.zshrc):
export MY_API_KEY_ENV_VAR="sk-actual-key-value"
```

---

## Destructive Actions (Tier-3 Permissions)

These actions require **explicit human confirmation** regardless of which
MCP server requests them. They cannot be delegated to automatic execution
via tool descriptions.

Mandatory confirmation required for:
- Any `rm -rf` or recursive delete
- `DROP TABLE`, `DELETE FROM` without `WHERE`, `TRUNCATE`
- `git push origin main` or `git push --force`
- Deploy to production
- Modifications to shared infrastructure (Kubernetes, Terraform, CI/CD)
- Actions that send external communications (email, Slack, webhooks)

**How to handle a tool that requests tier-3 actions:**
1. Stop execution
2. Display the action and its consequences
3. Wait for explicit user confirmation (not implicit — explicit)
4. Log the confirmation in AI-WORKFLOW.md with timestamp

---

## CVE Reference Table

| CVE / Incident | Root cause | Lesson |
|----------------|-----------|--------|
| CVE-2025-54136 | Cursor trusted the server config name, not the actual binary executed | Verify the binary path, not just the config label |
| CVE-2025-53110 | Filesystem MCP server path prefix bypass | Never assume path restrictions work without testing them |
| CVE-2025-5277 | Command injection in aws-mcp-server via unsanitized tool input | Sanitize all tool inputs before shell execution |
| ContextCrush (Context7) | Prompt injection via poisoned documentation context | Treat all MCP tool output as untrusted by default |

**Pattern:** All documented cases involved trusting something that was not
verified. The remediation in all cases was verification, not capability restriction.

---

## AI Risk Register (Minimum Per Project)

Maintain `ai-risk-register.md` at the project root. Use
`references/templates/ai-risk-register.md.template` as starting point.

Add an entry for every MCP server installed. Minimum fields:

| Risk | Impact | Probability | Audit Trigger | Mitigation | Status |
|------|--------|------------|---------------|-----------|--------|
| [server-name] MCP unaudited/outdated | High | Low | New server version released | Re-run checklist on upgrade | Open |

Update the register when:
- A new server is installed (add entry, Status: Open)
- A server passes the checklist (Status: Mitigated, add verification date)
- A CVE is published for an installed server (Status: Open, update mitigation)
- A server is removed (Status: Closed, add closure date)

---

## Post-Installation Verification

After installing an MCP server that passed the checklist:

1. Run: `claude mcp list` (or agent equivalent) — confirm server appears
2. Test the minimal operation: call one read-only tool and verify the response
3. Confirm no unexpected permissions were granted
4. Add the server to CLAUDE.md `Active MCP Servers` table with today's date
5. Add entry to `ai-risk-register.md`
