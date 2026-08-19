---
name: filament-operations
description: Use for physical filament unload/load/swap and narrated loads.
---

# Filament operations

Use this skill for physical filament operations: unload, load, swap, and narrated assignment recording.

## Narrated loads

For "I loaded X into slot Y" (recording an assignment, not physical motion):

1. Call `narrated_filament_load_preview` with the details.
2. Show the preview to the user.
3. Only after explicit approval, call `narrated_filament_load_confirm`.

This records the assignment in the system but does **not** physically load filament.

## Physical motion operations

For actual filament motion (machine-controlled load/unload):

1. Check current state with `printer_filament_state`.
2. Unload: `filament_unload` with `confirm: true`.
3. Load: `filament_load`.
4. Acknowledge completion: `filament_acknowledge`.
5. Assign slots: `filament_assign_slots`.

## Safety rules

- **One printer at a time**, operator-attended.
- **Never unload a printer that is printing.**
- If a motion tool skips or refuses, honor the refusal.
- Do **not** invent `rotation_begin` or `rotation_event` tools (they do not exist on the public MCP).

## Tools

| Intent | Tool |
|--------|------|
| Current filament state | `printer_filament_state` |
| Preview narrated load | `narrated_filament_load_preview` |
| Confirm narrated load | `narrated_filament_load_confirm` |
| Physical unload | `filament_unload` |
| Physical load | `filament_load` |
| Acknowledge | `filament_acknowledge` |
| Assign slots | `filament_assign_slots` |

## Example queries

- "I just loaded white PLA into slot 2" → `narrated_filament_load_preview`, then confirm.
- "Unload the filament from P1S-01" → Check state, then `filament_unload` with confirmation.
- "What's loaded in the AMS?" → `printer_filament_state` or `printer_ams`.
