---
name: performance-reporting
description: Use for utilization, throughput, downtime, success-rate, and filament-consumption reports.
---

# Performance reporting

Use this skill for farm performance metrics including utilization, throughput, downtime, and success rates.

## Utilization

Call `farm_utilization` for utilization percentage and idle-reason breakdowns.

Identify idle-reason leaks (why printers are not printing when they could be).

## Throughput

Call `throughput_report` for production volume and success rates.

## Downtime

Call `printer_downtime` for gap-by-gap analysis of worst-performing printers.

## Correlating metrics

When the worst success rate coincides with high idle hours, pair `throughput_report` with `farm_utilization` to identify the leak.

## Restrictions

Do **not** call provenance tools.

## Tools

| Intent | Tool |
|--------|------|
| Utilization % and idle reasons | `farm_utilization` |
| Production and success rate | `throughput_report` |
| Downtime by printer | `printer_downtime` |

## Example queries

- "What's my farm utilization?" → `farm_utilization`.
- "How many parts did we print this week?" → `throughput_report`.
- "Which printer has the most downtime?" → `printer_downtime`.
- "Why is utilization low?" → `farm_utilization` to identify idle-reason leaks.
