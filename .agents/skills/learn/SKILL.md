---
name: learn
description: Capture only high-level, durable architectural/behavioral lessons and path-scoped rules discovered during a session
argument-hint: <optional context, e.g. PET-123 or "today's work">
---

Capture learnings from this session: $ARGUMENTS

While working, you discovered something. Also, the user may have taught you project context. Present these insights.

## What to Capture

### 1. Durable Lessons Learned -> AGENTS.md

Capture only patterns worth remembering permanently for this repository:

- High-level architectural principles
- High-level behavioral/approach preferences
- Decision-making heuristics that apply across many tasks
- Stable team conventions that are broadly applicable

Skip:

- Temporary knowledge: one-time migration steps, version-specific workarounds, transient dependency issues, or anything that stops being relevant once a task is complete
- Implementation-specific details (exact file paths, exact resource names, one-off commands, ticket-specific tactics)
- Tooling choices that are only valid for a narrow context unless generalized into a broader principle
- Library/API-specific gotchas from third-party systems; those belong in code comments or docs near the integration

Rule of thumb: if the insight would look out of place in an architecture or engineering-principles page, mark it `Skip`.

Add approved durable items to the "Lessons Learned" section in `AGENTS.md`.

### 2. Path-Scoped Context Rules -> `.claude/rules/` (Optional)

If work revealed long-lived, directory-specific context that should auto-load:

- Consider creating or updating a rule file under `.claude/rules/`
- Example: after extensive work in `apps/api/src/scoring/`, ensure `.claude/rules/scoring.md` points to relevant docs
- Also capture **recurring environment/workflow details** that an agent would otherwise rediscover through trial and error every session — e.g., which runtime to use (venv path, nvm version), how to run tools, required activation steps. These are prime candidates for path-scoped rules.

Ask the user before creating new rules.

## Output

1. List insights discovered during the session
2. Mark each one as `Persist` or `Skip`
3. For each `Persist` item, provide a one-line generalization showing why it is high-level and broadly reusable
4. Propose where each `Persist` item should be stored (`AGENTS.md` or a path-scoped rule file)
5. Wait for user approval before writing anything
