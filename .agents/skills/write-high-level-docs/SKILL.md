---
name: write-high-level-docs
description: Document completed work only when changes are architecturally significant; update high-level docs with concise, current-state information.
argument-hint: <optional summary of completed changes>
---

Review completed changes and decide whether high-level documentation should be updated: $ARGUMENTS

## Goal

Keep project documentation lean and accurate by documenting architecture-level changes only.

## Workflow

1. Gather change context from user summary, recent conversation, and relevant diffs.
2. **Staleness check**: Search docs for references to renamed, moved, or deleted components. Stale references must be fixed regardless of change significance.
3. Evaluate significance. Document only changes that affect architecture, core design decisions, or developer workflows.
4. If documentation is not needed **and** no stale references exist, state that the change is implementation-level and no docs update is required.
5. If documentation is needed or stale references were found, update the smallest appropriate file set:
   - `docs/architecture/<area>.md`: architecture, infrastructure, data flow, security model for one area. Pick the file whose path rule in `.claude/rules/` covers the changed code
   - `docs/architecture.md`: only the cross-cutting decisions list, the area index table, and supported languages. A new area means a new `docs/architecture/<area>.md` **plus** an index row **plus** a path-scoped rule in `.claude/rules/`
   - `docs/development-guide.md`: setup, workflows, commands, env/config for developers
   - `README.md`: high-level project usage/setup information
6. Keep edits concise and integrated with existing sections; avoid adding implementation details.
7. Ensure docs describe current behavior, not migration history.

## Decision Criteria

Document when at least one is true:

- New or removed core system component/service
- Change to major technology choice or system boundary
- New cross-cutting pattern affecting multiple areas
- New interface/abstraction boundary designed for extensibility (even if only one implementation exists yet)
- Meaningful change to developer workflow or required setup
- Security/auth/data handling approach changed at system level
- Existing docs reference renamed, moved, or deleted components (staleness)

Do not document when changes are local refactors, naming cleanups, or straightforward implementation details visible in code — **but still fix any stale references** those changes create in existing docs.

## Writing Rules

- Prefer bullets over long prose.
- Explain what changed and why it matters; avoid how-level detail.
- Match existing style and section structure.
- Keep wording concrete and minimal.
