---
name: library-inventory
description: Manage Print Hive models, model files, filament materials, inventory, and Makes through organization-scoped MCP tools.
---

# Manage models, materials, inventory, and Makes

All IDs must come from the active organization. Never accept an organization ID from prose and pass it through; the server derives organization scope from the credential.

## Models and files

- Use `models_list` to find model metadata and `model_files_list` to resolve printable files.
- Use `model_create` only after showing the normalized name, source, source ID, and tags; then set `confirm: true`.
- Model-file upload is intentionally completed in the Print Hive app. Call `platform_links` and open `models`; do not put binary data, signed URLs, or storage credentials in chat.
- Use `printer_file_upload` to transfer an existing library file to a verified printer, and poll `printer_file_task_status` before reporting success.

## Filament and inventory

- Use `materials_list` for the material catalog and `inventory_list` for owned stock.
- Use `material_create` and `inventory_adjust` only after displaying the exact material/item, units, quantity delta, and resulting expected quantity. Set `confirm: true` only after user approval.
- Never silently convert spools, grams, kilograms, or lengths. If units are unclear, stop before writing.
- For loaded printer filament, use the dedicated filament-state and AMS tools rather than inventory estimates.

## Makes

- Use `makes_list` to inspect recipes and linked files.
- Before `make_create`, resolve every model-file ID, quantities, optional SKU, and notes. Show the proposed Make and require confirmation.
- A Make describes a production configuration; it does not itself start a printer. Queue and start jobs through the separate fleet workflow.

After any mutation, re-read the affected resource and report the server-returned ID and resulting state.
