---
name: add-new-feature-or-component
description: Workflow command scaffold for add-new-feature-or-component in ui-demo.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-feature-or-component

Use this workflow when working on **add-new-feature-or-component** in `ui-demo`.

## Goal

Implements a new UI feature or component, including its logic, UI, and comprehensive tests.

## Common Files

- `src/components/*.tsx`
- `src/pages/*.tsx`
- `src/hooks/*.ts`
- `src/utils/*.ts`
- `src/test/components/*.test.tsx`
- `src/test/pages/*.test.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update one or more files in src/components/, src/pages/, src/hooks/, or src/utils/ to implement the feature.
- Update or create corresponding test files in src/test/components/, src/test/pages/, src/test/hooks/, or src/test/utils/.
- Update shared files (e.g., src/index.css, src/App.tsx, src/components/Layout.tsx) if necessary for integration or styling.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.