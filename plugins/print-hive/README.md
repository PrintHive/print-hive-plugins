# Print Hive agent plugin

One plugin package supports Claude Code and Codex. Both clients connect to the same remote, organization-scoped Print Hive MCP server over OAuth.

## Claude Code

```sh
claude plugin marketplace add ascension/print-hive-plugins
claude plugin install print-hive@print-hive --scope user
```

Start an interactive Claude Code session, open `/mcp`, and complete Print Hive authorization. OAuth must be completed interactively before using the plugin from headless `claude -p` sessions.

## Codex

Add the repository marketplace, then install the plugin:

```sh
codex plugin marketplace add ascension/print-hive-plugins
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
claude plugin validate ./plugins/print-hive --strict
python3 /path/to/plugin-creator/scripts/validate_plugin.py ./plugins/print-hive
```
