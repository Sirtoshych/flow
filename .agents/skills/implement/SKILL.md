---
name: implement
description: Implement a Linear ticket end-to-end
disable-model-invocation: true
argument-hint: <Linear ticket ID, e.g. PET-123>
---

Implement the Linear ticket: $ARGUMENTS

## Workflow

1. **Fetch ticket** from Linear using the MCP tools (get issue details, comments, attachments)
2. **Understand requirements** - read the ticket description, acceptance criteria, linked documents, **and all comments** (comments often contain scope clarifications, additional requirements, or design decisions that are not in the description)
3. **Plan implementation** - identify affected files, consider edge cases, check for related code
4. **Update ticket status** - set ticket to "In Progress" if needed
5. **Implement** - write code following project conventions (see CLAUDE.md)
6. **Update/write tests** - ensure tests cover the new functionality
7. **Verify** - run `pnpm typecheck`, `pnpm lint`, `pnpm test`
8. **Update docs** - if architecturally significant, use the high-level-docs-writer skill

## Post-Implementation: Capture Learnings

After implementation is complete, review what was discovered during the session:

### What to Capture

#### 1. Durable Lessons Learned → AGENTS.md

Capture only insights that are likely to stay valuable across many tickets:

- Behavioral rules (how we should implement things)
- Architectural principles (how systems should be shaped/integrated)
- Security and reliability guardrails
- Reusable patterns that prevent recurring mistakes

Do **not** capture ticket-local or transient details:

- Exact file paths tied to one implementation
- One-time migration/deployment steps
- Temporary workarounds or version-specific quirks
- Details that become irrelevant if a single module is removed

When proposing a lesson, phrase it as a general rule:

- Good: “Validate untrusted config keys before exporting env vars in shell scripts.”
- Avoid: “In `apps/api/scripts/docker-entrypoint.sh`, do X.”

Add approved durable lessons to the "Lessons Learned" section in `AGENTS.md`.

#### 2. Path-Filtered Rules → `.claude/rules/` (Optional)

If work revealed long-lived, directory-specific context that is repeatedly needed:

- Consider creating a rule file that loads relevant context when touching those files
- Example: after heavy work in `apps/api/src/scoring/`, ensure `.claude/rules/scoring.md` exists and imports relevant docs

Ask me before creating new rules.

### Output

1. List insights discovered during the session
2. Mark each insight as `Persist` (durable, broad, future-useful) or `Skip` (ticket-specific/transient)
3. Propose final generalized wording for each `Persist` insight and where it should be stored
4. Wait for approval before writing anything

## Notes

- Ask clarifying questions if requirements are ambiguous
- Do not commit or push unless explicitly asked
