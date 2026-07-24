# Print Hive plugins

![Print Hive](plugins/print-hive/assets/printhive-logo-stacked@2x.png)

Official Print Hive plugins for Claude Code and Codex. Connect an agent to your organization-scoped Print Hive fleet, models, files, materials, inventory, Makes, print jobs, and guarded printer controls through OAuth.

## Claude Code

```sh
claude plugin marketplace add PrintHive/print-hive-plugins
claude plugin install print-hive@print-hive --scope user
```

Start Claude Code, open `/mcp`, and complete Print Hive authorization.

## Codex

```sh
codex plugin marketplace add PrintHive/print-hive-plugins
codex plugin add print-hive@print-hive
```

Start a new Codex thread and complete Print Hive authorization when prompted.

## ChatGPT

The reviewed public ChatGPT/Codex listing uses the same MCP server:

```text
https://api.printhiv3d.com/v1/mcp
```

Until the directory listing is approved, add it as a custom MCP connector using OAuth discovery.

## Safety

- Every request is bound to the authenticated Print Hive organization.
- OAuth grants are separated by printers, models, jobs, inventory, Makes, fleet, and telemetry domains.
- Production mutations require exact targets and may require explicit confirmation.
- Dangerous printer operations are not implicitly granted to public OAuth clients.
- Printer credentials are entered only in the Print Hive web application.

Read the [documentation](https://printhiv3d.com/mcp), [privacy policy](https://printhiv3d.com/privacy), [terms](https://printhiv3d.com/terms), or [contact support](https://printhiv3d.com/support).
