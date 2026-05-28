---
name: add-new-page-or-route
description: Workflow command scaffold for add-new-page-or-route in ui-demo.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-page-or-route

Use this workflow when working on **add-new-page-or-route** in `ui-demo`.

## Goal

Adds a new page to the app, including route registration, UI, and tests.

## Common Files

- `src/pages/*.tsx`
- `src/App.tsx`
- `src/components/Layout.tsx`
- `src/test/pages/*.test.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new file in src/pages/ for the page implementation.
- Register the route in src/App.tsx (and/or update navigation in src/components/Layout.tsx).
- Create or update test files in src/test/pages/ for the new page.
- Optionally, update navigation items or related components.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.