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
- "Reserve P1S-01 for customer order" → Preview then apply with confirmation.
- "Shift handoff notes" → `operator_annotations` for current notes.
