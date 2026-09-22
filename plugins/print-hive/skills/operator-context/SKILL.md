---
name: operator-context
description: Use for recommendation follow-through, receipts, annotations, reservations, avoids, and shift-handoff.
---

# Operator context

Use this skill for recommendation receipts, annotations, reservations, avoids, and shift handoff.

## Recommendation receipts

Call `assistant_recommendation_receipts` to see acknowledged recommendations.

Note: **acknowledged is not done**. A receipt means the operator saw the recommendation, not that the action was completed.

## Annotations

Always call `operator_annotations` before answering priority, scheduling, or what-next questions.

Annotations may include:
- Reservations (printer reserved for specific work)
- Avoids (printer should not be used)
- Notes (context for shift handoff)

## Creating or modifying annotations

**API-key path is a hard stop.** `operator_annotation_preview` / `operator_annotation_apply` require a human operator session. On an API-key credential:

- Read `operator_annotations` only.
- Do **not** call preview or apply, do not loop retries, and do not open a consent card for tools that cannot succeed on this path.
- Route annotation writes to a human-session path or the Hive UI.

When a human operator session is available:

1. Call `operator_annotation_preview` to preview the change.
2. Show the preview to the user.
3. Only after explicit user consent, call `operator_annotation_apply` with `approved: true`.

Never apply annotations without user confirmation.

## Tools

| Intent | Tool |
|--------|------|
| Recommendation receipts | `assistant_recommendation_receipts` |
| Current annotations | `operator_annotations` |
| Preview annotation | `operator_annotation_preview` |
| Apply annotation | `operator_annotation_apply` |

## Example queries

- "What did I acknowledge?" → `assistant_recommendation_receipts`.
- "Are there any reservations?" → `operator_annotations`.
- "Reserve P1S-01 for customer order" → Human session: preview then apply with confirmation. API-key: hard stop; Hive UI or human-session path.
- "Shift handoff notes" → `operator_annotations` for current notes.
