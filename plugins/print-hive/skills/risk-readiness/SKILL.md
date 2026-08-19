---
name: risk-readiness
description: Use for jobs at risk, queue schedulability, idle-printer readiness, maintenance debt, or service planning.
---

# Risk and readiness

Use this skill to assess jobs at risk, queue health, printer readiness, and maintenance state.

## Jobs at risk

Call `jobs_at_risk` to find jobs that may fail or miss deadlines.

## Queue health

Call `queue_health` to check what can be scheduled and started.

Cite `queue.queued_count` for queue size, not `jobs_list` length.

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
| Queue runnable | `queue_health` |
| Maintenance debt | `maintenance_debt` |
| Service plan | `maintenance_service_plan` |

## Example queries

- "Are any jobs at risk?" → `jobs_at_risk`.
- "What can start now?" → `queue_health`, report runnable jobs.
- "Is any maintenance overdue?" → `maintenance_debt`.
- "Plan a service window" → `maintenance_service_plan`.
- "Mark maintenance complete" → Direct to Hive UI; no MCP write tool available.
