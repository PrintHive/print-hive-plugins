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

- [ ] Validate the public marketplace and plugin with Claude Code strict validation.
- [x] Publish the distributable bundle to `PrintHive/print-hive-plugins`.
- [ ] Install from the public Git marketplace in a clean Claude Code profile and complete OAuth.
- [ ] Submit the plugin through the Claude.ai or Anthropic Console plugin form.
- [ ] Supply the stacked Print Hive logo, listing copy, public repository, support and legal URLs, MCP URL, OAuth details, and reviewer access requested by the form.
