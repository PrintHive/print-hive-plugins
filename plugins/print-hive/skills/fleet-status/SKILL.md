---
name: fleet-status
description: Use for read-only fleet status queries including online/offline connectivity, idle activity, and hardware or loaded-filament inventory.
---

# Fleet status

Use this skill for read-only fleet status: online/offline connectivity, idle activity, hardware or loaded-filament inventory.

## Connectivity vs. activity

- `offline` / `is_connected` is network connectivity.
- `status` is print activity (IDLE, PRINTING, PAUSED, etc.).
- Never infer connectivity from print activity.

Count offline printers from the `offline` field. A printer is idle when `status` is IDLE **and** `offline` is false.

## Fleet inventory queries

For nozzle size, material type, or color inventory across the fleet, use `printers_query`.

Translate color names to hex before calling. The `color.hex` field expects a hex value, not a color name.

## Tools

| Intent | Tool |
|--------|------|
| List all printers | `printers_list` |
| Filter by nozzle/material/color | `printers_query` |
| Live printer state | `printer_live_status` |
| AMS slots and loaded filament | `printer_ams` |
| Current filament state | `printer_filament_state` |

## Example queries

- "How many printers are offline?" → `printers_list`, count where `offline` is true.
- "Which printers have 0.4mm nozzles?" → `printers_query` with nozzle filter.
- "Show me printers with black PLA loaded" → `printers_query` with material and color.hex filters.
