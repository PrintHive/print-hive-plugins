---
name: material-runway
description: >-
  Use when checking which spools may run out, what to reload before a shift, whether
  catalog shortage / order / substitute asks need an AMS loaded-state cross-check first,
  or when overnight / multi-printer restock or queue-batch material risk is in play.
---

# Material runway

Use this skill to check filament runway, identify spools at risk of running out, and plan pre-shift reloads.

## Checking runway

Call `material_runway` to get filament status across the farm.

Lead the response with:
1. `unmet_filaments` — filaments needed but not available
2. `will_run_out` — spools projected to deplete before jobs complete

## Interpreting results

- `remaining_grams: null` means tracking is disabled for that spool, not that it is safe or at risk.
- Do not assume null remaining is zero or infinite.
- Sort by urgency: unmet first, then soonest depletion.

## AMS cross-check before catalog shortage

Before treating catalog/Spool "0 kg LOW" as a farm-wide blocker or proposing order/substitute: cross-check `printer_ams` / loaded state. Inventory lag can falsify shortage (e.g. catalog shows 0 kg while AMS still has the spool running).

## Tools

| Intent | Tool |
|--------|------|
| Filament runway | `material_runway` |
| Inventory stock | `inventory_list` |
| AMS / loaded state | `printer_ams` |

## Example queries

- "What filament will run out?" → `material_runway`, report `will_run_out`.
- "What do I need to reload before my shift?" → `material_runway`, report `unmet_filaments` and imminent depletions.
- "Do I have enough white PLA?" → `material_runway` filtered or `inventory_list`; if catalog shows 0 kg LOW, cross-check `printer_ams` before ordering or substituting.
