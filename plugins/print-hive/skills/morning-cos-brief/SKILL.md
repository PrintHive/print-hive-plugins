---
name: morning-cos-brief
description: Use for the Mon–Sat morning Chief-of-Staff brief — merge shipping / blocked / needs-Jerrod from crew bots. Quiet when nothing material changed. Never invent status. Not for product code, customer email, printer control, or full project work.
---

# Morning CoS brief

Chief-of-Staff morning brief for Print Hive operators. Merge crew signals into three buckets. Stay quiet when nothing material changed.

## Schedule (reference)

- Live routine: **Mon–Sat 8:00 AM America/Denver** (`0 8 * * 1-6`). Sunday off.
- This skill is the packaging contract. The schedule/prompt live on the Daily Brief bot routine; do not invent a second schedule here.

## Sources to poll

Pulse, PrintHive, Comb, Vertex, Ryujin, Quill, Wisp, Mochi, Closer.

Include **Cap** only when Enchanted Hollow work is material that morning.

## Output buckets

Merge into exactly these sections (omit empty ones; if all empty and nothing material changed → **quiet**):

1. **shipping** — what moved / shipped since last brief
2. **blocked** — stuck work that needs a decision or unblock
3. **needsJerrod** — items that require Jerrod specifically

## Hard rules

- **Never invent status.** Only report what a polled source actually returned.
- **Quiet** if nothing material changed (no shipping, blocked, or needs-Jerrod items).
- Anti-jobs: no product code, no customer email, no printer control, no full project work.
- SSR `Daily Brief` visual card is **out of scope** (PrintHive follow-on). Do not claim it is live.

## Payload

Prefer the versioned JSON in `schema/brief.v1.json`. Daily Brief owns the CoS prompt and may refine field names; until then use this provisional schema.

## Tools / sources

| Intent | Source |
|--------|--------|
| Farm / queue / printers | Print Hive MCP (via `print-hive` plugin) |
| Crew status | Message or read receipts from Pulse, Comb, Vertex, Ryujin, Quill, Wisp, Mochi, Closer, Cap (Hollow-only) |
| Briefing settings / thresholds | `briefing-settings` skill → `assistant_settings_status` |

## Example

- Weekday 8am: poll crew → emit brief JSON → post only if `materialChanged: true`.
- Sunday or empty merge → stay quiet (no filler "(no change.)").
