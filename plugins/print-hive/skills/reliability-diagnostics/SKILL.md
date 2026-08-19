---
name: reliability-diagnostics
description: Use for recurring failures and root-cause evidence.
---

# Reliability diagnostics

Use this skill to investigate recurring failures and identify root-cause correlations.

## Failure patterns

Call `failure_patterns` with filters nested under `filters`:
- `printerId` — specific printer
- `modelFileId` — specific model file
- `material` — material type
- `reason` — failure reason

## Caution on causality

Use cautious language: patterns **correlate with** failures, not **cause** them. Failure patterns are evidence, not proof.

## Live printer errors

For a current printer error, use `printer_live_status` combined with `printers_list` to get the printer model.

Do **not** invent wiki URLs or call a `printer_error_help` tool (it does not exist on the public MCP).

## Restrictions

- Do not call provenance tools.
- Do not fabricate error documentation links.

## Tools

| Intent | Tool |
|--------|------|
| Failure patterns | `failure_patterns` |
| Current printer error | `printer_live_status` |
| Printer model info | `printers_list` |

## Example queries

- "Why does this model keep failing?" → `failure_patterns` with `modelFileId` filter.
- "Is this printer unreliable?" → `failure_patterns` with `printerId` filter.
- "What's the error on P1S-02?" → `printer_live_status` for that printer.
