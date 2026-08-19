# Print Hive agent plugin

One plugin package supports Claude Code, Codex, Cursor, and Grok Bot. All clients connect to the same remote, organization-scoped Print Hive MCP server over OAuth.

## Cursor / Grok Bot

Install from the Cursor Marketplace (after publish):

1. Open Cursor Settings → Plugins → Marketplace
2. Search for "Print Hive"
3. Click Install, then complete Print Hive OAuth authorization

Until the marketplace listing is published, install locally for testing:

```sh
git clone https://github.com/PrintHive/print-hive-plugins ~/.cursor/plugins/local/print-hive-plugins
```

For headless Grok Bot agents without built-in OAuth, use the agent claim flow documented in `skills/grok-claim/SKILL.md`.

**Private/headless fallback:** If OAuth is unavailable, you can configure a static API key in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "print-hive": {
      "type": "http",
      "url": "https://api.printhiv3d.com/v1/mcp",
      "headers": {
        "Authorization": "Bearer <your-api-key>"
      }
    }
  }
}
```

This method is not recommended for interactive use. Prefer OAuth for better security and scope control.

## Claude Code

```sh
claude plugin marketplace add PrintHive/print-hive-plugins
claude plugin install print-hive@print-hive --scope user
```

Start an interactive Claude Code session, open `/mcp`, and complete Print Hive authorization. OAuth must be completed interactively before using the plugin from headless `claude -p` sessions.

## Codex

Add the repository marketplace, then install the plugin:

```sh
codex plugin marketplace add PrintHive/print-hive-plugins
codex plugin add print-hive@print-hive
```

Start a new Codex thread and complete OAuth when the Print Hive MCP server first requests authorization.

## ChatGPT

ChatGPT uses the same remote MCP endpoint as a custom connector:

```text
https://api.printhiv3d.com/v1/mcp
```

Use OAuth discovery. Do not configure a shared static API key for a public connector.

## Security model

- Every MCP request is bound to the authenticated user's active Print Hive organization.
- OAuth scopes map to `read` and `control`; OAuth does not implicitly grant `dangerous` printer operations.
- Write tools require explicit target resolution, and high-impact operations expose confirmation fields.
- Printer access codes and host credentials are entered only in the Print Hive web app.
- Model-file binaries are uploaded through Print Hive rather than copied through an agent conversation.

Read the [privacy policy](https://printhiv3d.com/privacy), [terms of service](https://printhiv3d.com/terms), or [contact support](https://printhiv3d.com/support).

## Validation

```sh
# Claude Code
claude plugin validate ./plugins/print-hive --strict
python3 /path/to/plugin-creator/scripts/validate_plugin.py ./plugins/print-hive

# Cursor (when cursor CLI validation is available)
cursor plugin validate ./plugins/print-hive
```
