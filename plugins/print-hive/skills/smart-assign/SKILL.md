---
name: smart-assign
description: Use when choosing the best printer for a job or model file.
---

# Smart assign

Use this skill to find the best printer for a job or model file based on compatibility, availability, and required actions.

## Finding compatible printers

1. Resolve the job or file ID via `jobs_get` or `print_job_resource_search`.
2. Call `model_file_compatible_printers` with `jobId` or `fileId`.

## Presenting results

Lead with the best match and list any required actions:
- Filament load or swap needed
- Nozzle change required
- Printer currently busy

## Restrictions

- Do **not** call any provenance tool.
- Do not invent compatibility logic; rely on `model_file_compatible_printers`.

## Tools

| Intent | Tool |
|--------|------|
| Look up job details | `jobs_get` |
| Search for jobs | `print_job_resource_search` |
| Compatible printers | `model_file_compatible_printers` |

## Example queries

- "Which printer should I use for this job?" → Resolve job ID, then `model_file_compatible_printers`.
- "Find a printer for the benchy file" → Resolve file ID via search, then `model_file_compatible_printers`.
- "What needs to happen to print this on P1S-03?" → `model_file_compatible_printers`, report required actions.
