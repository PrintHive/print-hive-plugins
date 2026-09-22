---
name: risk-readiness
description: >-
  Use for jobs at risk (fresh vs archive-aged), queue schedulability vs ready-to-start,
  start-now recommendations with BOV / bed clear verification, idle-printer readiness,
  maintenance debt, or service planning.
---

# Risk and readiness

Use this skill to assess jobs at risk, queue health, printer readiness, and maintenance state.

## Jobs at risk

Call `jobs_at_risk` to find jobs that may fail or miss deadlines.

Before briefing at-risk results, split **fresh** items from **archive-aged** tombstones. Lead with fresh risk; do not let archive-aged entries dominate the briefing.

## Queue health

Call `queue_health` to check what is **schedulable**. Cite `queue.queued_count` for queue size, not `jobs_list` length.

`queue_health` alone is **not** enough to say something can start. Schedulable ≠ ready-to-start.

### BOV before any start recommend

Before recommending that a job or printer can start now:

1. Call `printers_query` (or equivalent) and require bed-occupancy verification (BOV): `bed_clear_verified` / `bedClear` true on the candidate printer(s).
2. OR an explicit human override in the **current** conversation.
3. Treat `ready_source: operator_override` with `bed_clear_verified: false` as **not** clear — do not recommend start.

### Multi-color restock → AMS vs Make

Before recommending or accepting a **multi-color** restock start into OUT / the interim registry:

1. Call `printer_ams` (or filament state) on the candidate printer.
2. Cross-check loaded AMS slots against the Make's `required_materials`.
3. Known control-scope filament-assign debt does **not** waive this check — still verify AMS vs Make before accept.

Cross-check with fleet-operations start gates (BOV / Control) when moving from accept to actual start.

## Maintenance

| Intent | Tool |
|--------|------|
| Maintenance due | `maintenance_debt` |
| Service window planning | `maintenance_service_plan` |

Maintenance write operations (complete, snooze, dismiss, enter mode) have no public MCP tool. Direct the user to the Hive UI for those actions.

## Tools

| Intent | Tool |
|--------|------|
| At-risk jobs | `jobs_at_risk` |
| Queue runnable / schedulable | `queue_health` |
| Printer readiness / BOV | `printers_query` |
| Maintenance debt | `maintenance_debt` |
| Service plan | `maintenance_service_plan` |

## Example queries

- "Are any jobs at risk?" → `jobs_at_risk`; split fresh vs archive-aged before briefing.
- "What can start now?" → `queue_health` for schedulable candidates, **then** `printers_query` (or equivalent) BOV on each candidate (`bed_clear_verified` / `bedClear` true, or current-conversation human override). Never answer from `queue_health` alone.
- "Is any maintenance overdue?" → `maintenance_debt`.
- "Plan a service window" → `maintenance_service_plan`.
- "Mark maintenance complete" → Direct to Hive UI; no MCP write tool available.
