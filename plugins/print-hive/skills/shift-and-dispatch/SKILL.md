---
name: shift-and-dispatch
description: >-
  Use for shift/session summaries, what-next priorities, farm playbook, personal work
  queues, supervisor dispatch, at-risk briefing (fresh vs archive-aged), restock
  OUT-then-LOW lists, or handing matching / tonight queue candidates to Counter.
---

# Shift and dispatch

Use this skill for session recaps, what-next priorities, personal assignments, and supervisor dispatch queues.

## Session recap

For "my session" or "what happened this shift", call `session_summary` with `current: true`.

## What next / priority

For "what should I do next" or farm priorities, call `farm_playbook` only. Do not re-rank results by hand.

Before briefing playbook or at-risk items, split **fresh** vs **archive-aged** tombstones. Lead with fresh work; do not let archive-aged dominate the briefing.

### Restock OUT-then-LOW → Counter

For restock OUT-then-LOW lists (or any handoff of matching + tonight queue candidates to Counter):

1. Call `farm_playbook` first so overnight capacity is not stolen by ad-hoc restock queueing.
2. Then hand Make matching and tonight queue candidates to Counter.
3. Start still needs Control scope or the Hive UI — do not invent a start.
4. Never invent stock counts.

Playbook kinds include:
- `resolve_network` — fix connectivity issues
- `resolve_at_risk` — address jobs at risk
- `clear_bed` — clear finished prints
- `start_job` — dispatch queued jobs
- `resolve_offline` — bring printers online
- `preload_filament` — prepare filament for upcoming jobs

## Personal work queue

For "my assignments" or "what's assigned to me", call `operator_dispatch_queue` in personal mode.

For supervisor dispatch or team assignments, call `operator_dispatch_queue` in supervisor mode.

## Context before what-next

Always check `operator_annotations` before answering what-next questions. Annotations may include reservations, avoids, or notes that affect priority.

## Tools

| Intent | Tool |
|--------|------|
| Session recap | `session_summary` |
| Farm priorities | `farm_playbook` |
| My assignments | `operator_dispatch_queue` |
| Current annotations | `operator_annotations` |
| At-risk jobs | `jobs_at_risk` |
