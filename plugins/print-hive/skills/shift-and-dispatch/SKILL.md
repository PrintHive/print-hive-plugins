---
name: shift-and-dispatch
description: Use for shift/session summaries, ranked farm next actions, personal work queues, and supervisor dispatch.
---

# Shift and dispatch

Use this skill for session recaps, what-next priorities, personal assignments, and supervisor dispatch queues.

## Session recap

For "my session" or "what happened this shift", call `session_summary` with `current: true`.

## What next / priority

For "what should I do next" or farm priorities, call `farm_playbook` only. Do not re-rank results by hand.

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
