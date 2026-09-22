---
name: morning-cos-brief
description: >-
  Use for the Mon–Sat morning chief-of-staff brief. Merge shipping, blocked, and
  needsOperator items from polled sources. Stay quiet when nothing material
  changed. Never invent status. Not for product code, customer email, printer
  control, or full project work.
---

# Morning CoS brief

Chief-of-staff morning brief for Print Hive operators. Merge polled signals into
three buckets. Stay quiet when nothing material changed.

## Schedule (reference)

- Live routine: **Mon–Sat 8:00 AM America/Denver** (`0 8 * * 1-6`). Sunday off.
- This skill is the packaging contract. Keep the live schedule and prompt in one
  place. Do not invent a second schedule here.

## Sources to poll

Poll the farm MCP and any operator-configured crew or system labels you use for
status. Record the exact labels you polled in `sourcesPolled`.

If a source does not answer, say so in `notes` or omit the item. Never invent.

Optional `floor` block (not required): `{ queued?, schedulable?, pauses?,
clearBeds? }` from Print Hive MCP farm queue or floor reads only.

## Output buckets

Merge into exactly these sections. Omit empty ones. If all are empty and nothing
material changed, stay **quiet**.

1. **shipping** — what moved or shipped since the last brief
2. **blocked** — stuck work that needs a decision or unblock
3. **needsOperator** — items that need the farm owner or on-call operator

## Hard rules

- **Never invent status.** Only report what a polled source actually returned.
- **Quiet** if nothing material changed (no shipping, blocked, or needsOperator
  items).
- Anti-jobs: no product code, no customer email, no printer control, no full
  project work.

## Payload

Prefer the versioned JSON in `schema/brief.v1.json`.

## Tools / sources

| Intent | Source |
|--------|--------|
| Farm / queue / printers | Print Hive MCP (via the `print-hive` plugin) |
| Crew or system status | Messages or read receipts from labels you configure |
| Briefing settings / thresholds | `briefing-settings` skill → `assistant_settings_status` |

## Example

- Weekday 8am: poll sources → emit brief JSON → post only if `materialChanged`
  is true.
- Sunday or empty merge → stay quiet. Do not post filler such as "(no change.)".
