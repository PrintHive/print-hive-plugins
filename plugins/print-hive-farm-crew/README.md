# Print Hive Farm Crew

Marketplace pack of role agents for Print Hive operators on Cursor and Grok Bot.

| Agent | Job |
| --- | --- |
| **Foreman** | Onboard MCP/auth and route the crew |
| **Trendy** | Scout models worth printing (sourced shortlist) |
| **Spool** | Filament/AMS/inventory truth and reorder drafts |
| **Nest** | Slice via Hive Slice or local slicers |
| **Wrench** | Maintenance and failure troubleshooting |
| **Counter** | Channel SKUs, paid orders into the queue |

## Safety

- Queue or slice only when asked.
- Confirm before buys, parts, start/stop, or g-code.
- Never invent stock, orders, metrics, or error codes.
- Same Print Hive MCP as the core plugin: `https://api.printhiv3d.com/v1/mcp` (OAuth).

## Install

After marketplace publish: Settings → Plugins → Marketplace → search **Print Hive Farm Crew**.

Local Cursor IDE dogfood:

```sh
cp -R plugins/print-hive-farm-crew ~/.cursor/plugins/local/print-hive-farm-crew
```

Companion connector skills live in the `print-hive` plugin in this repo.

## Privacy

[Privacy](https://printhiv3d.com/privacy) · [Terms](https://printhiv3d.com/terms) · [MCP docs](https://printhiv3d.com/mcp)

## Staff / CoS

Companion skill (ships with the `print-hive` plugin): **morning-cos-brief** — Mon–Sat morning chief-of-staff merge of shipping / blocked / needsOperator. Quiet when nothing material changed.

