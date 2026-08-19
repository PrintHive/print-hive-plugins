---
name: briefing-settings
description: Use for briefing schedules, alert thresholds, and why an alert did not send.
---

# Briefing settings

Use this skill to check briefing schedules, alert thresholds, and diagnose why an alert did not send.

## Settings status

Call `assistant_settings_status` to view current briefing configuration and alert thresholds.

## Settings mutation

Settings cannot be changed through chat. Direct the user to the Hive notification settings in the web app for any changes.

## Tools

| Intent | Tool |
|--------|------|
| View settings | `assistant_settings_status` |

## Example queries

- "When are my briefings scheduled?" → `assistant_settings_status`.
- "Why didn't I get an alert?" → `assistant_settings_status` to check thresholds and enabled state.
- "Change my alert threshold" → Direct to Hive notification settings; no MCP mutation tool available.
