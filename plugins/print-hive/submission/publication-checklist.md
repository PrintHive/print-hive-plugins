# Print Hive plugin publication checklist

## Shared release

- [ ] Merge and deploy the plugin, API, OAuth, and marketing-site changes.
- [ ] Confirm `https://api.printhiv3d.com/v1/mcp` returns `401` without credentials and advertises OAuth resource metadata.
- [ ] Confirm OAuth authorization-server and protected-resource discovery documents return `200`.
- [ ] Confirm privacy, terms, support, MCP overview, and client setup pages return `200`.
- [ ] Create a dedicated reviewer organization with synthetic data and simulator or non-production printers.
- [ ] Create reviewer credentials without MFA, SMS, email-code, VPN, or private-network dependencies.
- [ ] Never commit reviewer credentials or production printer secrets.

## OpenAI

- [ ] Verify the publishing individual or business in the OpenAI organization.
- [ ] Confirm the submitter has Apps Management `Write`.
- [ ] Create a `With MCP` submission using `https://api.printhiv3d.com/v1/mcp`.
- [ ] Set `OPENAI_APPS_CHALLENGE` in the production API environment to the exact portal-provided token.
- [ ] Verify the challenge is returned verbatim from `https://api.printhiv3d.com/.well-known/openai-apps-challenge`.
- [ ] Upload the skill bundle and stacked Print Hive logo.
- [ ] Confirm every discovered tool includes `readOnlyHint`, `destructiveHint`, and `openWorldHint`.
- [ ] Enter the five positive and three negative cases from `openai-test-cases.md`.
- [ ] Enter listing copy, category, countries/regions, support and legal URLs, CSP domains, release notes, and policy attestations.
- [ ] Submit for review; after approval, choose the release time and publish.

## Anthropic

- [x] Validate the public marketplace and plugin with Claude Code strict validation.
- [x] Publish the distributable bundle to `PrintHive/print-hive-plugins`.
- [x] Install from the public Git marketplace in a clean Claude Code profile.
- [ ] Complete OAuth against a reviewer account.
- [ ] Submit the plugin through the Claude.ai or Anthropic Console plugin form.
- [ ] Supply the stacked Print Hive logo, listing copy, public repository, support and legal URLs, MCP URL, OAuth details, and reviewer access requested by the form.

## Cursor / Grok Bot

- [x] Create `.cursor-plugin/marketplace.json` at repo root.
- [x] Create `plugins/print-hive/.cursor-plugin/plugin.json`.
- [x] Create `plugins/print-hive/mcp.json` for Cursor MCP discovery.
- [x] Create `plugins/print-hive/rules/print-hive-farm.mdc` with farm safety rules.
- [x] Create `plugins/print-hive/skills/grok-claim/SKILL.md` for headless agent auth.
- [x] Create `plugins/print-hive/server.json` for MCP registry listing.
- [x] Update READMEs to include Cursor as a first-class client.
- [x] Create `plugins/print-hive/submission/cursor-listing.md` with marketplace copy.
- [x] Add 11 operator workflow skills (v0.1.4): fleet-status, shift-and-dispatch, material-runway, production-commitments, smart-assign, risk-readiness, performance-reporting, reliability-diagnostics, operator-context, filament-operations, briefing-settings.
- [ ] Test local installation in Cursor.
- [ ] Complete OAuth against a reviewer account.
- [ ] Submit to https://cursor.com/marketplace/publish.
- [ ] Update https://www.printhiv3d.com/docs/mcp/cursor to lead with marketplace install.

## Official MCP Registry

The server.json at `plugins/print-hive/server.json` is prepared for the official registry at `registry.modelcontextprotocol.io` but is **not yet published**. Domain verification is required first.

### Domain verification (required)

Choose DNS or HTTP verification for `printhiv3d.com` to claim the `com.printhiv3d` namespace:

**Option A: DNS verification**
1. Generate an Ed25519 or ECDSA P-384 keypair.
2. Add a DNS TXT record to `printhiv3d.com` in the format: `v=MCPv1; k=[algorithm]; p=[public_key]`
3. Run: `mcp-publisher login dns --domain=printhiv3d.com --private-key=HEX_KEY`

**Option B: HTTP verification**
1. Generate an Ed25519 or ECDSA P-384 keypair.
2. Host the public key at `https://printhiv3d.com/.well-known/mcp-registry-auth`
3. Run: `mcp-publisher login http --domain=printhiv3d.com --private-key=HEX_KEY`

### Publish to registry

After successful domain verification:

- [ ] Validate the server.json: `mcp-publisher validate plugins/print-hive/server.json`
- [ ] Publish to registry: `mcp-publisher publish plugins/print-hive/server.json`
- [ ] Confirm listing appears at `https://registry.modelcontextprotocol.io/servers/com.printhiv3d/print-hive`
