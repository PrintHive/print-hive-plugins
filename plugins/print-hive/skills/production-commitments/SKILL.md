---
name: production-commitments
description: Use when deciding whether work can be accepted, quoted, rushed, or promised by a date.
---

# Production commitments

Use this skill when evaluating whether work can be accepted, quoted, rushed, or promised by a deadline.

## Promise advisor

Call `production_promise_advisor` to assess production capacity.

Lead the response with the status:
- `safe_to_promise` — capacity exists with margin
- `risky` — capacity is tight, may require trade-offs
- `not_safe` — cannot reliably commit
- `needs_input` — additional information required

Never pass `organizationId`; it is derived from the credential.

## Do not stitch manually

Do not manually combine queue health, material runway, and risk data. The `production_promise_advisor` already synthesizes these factors.

## Tools

| Intent | Tool |
|--------|------|
| Promise assessment | `production_promise_advisor` |

## Example queries

- "Can I promise 50 parts by Friday?" → `production_promise_advisor`, lead with status.
- "Should I accept this rush order?" → `production_promise_advisor`, evaluate risk level.
- "What's my capacity for next week?" → `production_promise_advisor` with date range.
