---
name: commit
description: Create a git commit with a properly formatted message
---

Create a git commit.

## Commit Message Format

`<TICKET>: <what this commit does>`

- Start with the Linear ticket ID (e.g. `PET-40`)
- Follow with a colon and space
- Write a short phrase answering "what does this commit do?" — answer should read like "adds X", "fixes Y", "removes Z"

**Example:** `PET-40: adds expo mobile app scaffold`

## Steps

1. Run `git status` and `git diff` to understand what changed
2. Determine which packages are affected by the changes (check which `apps/*` or `packages/*` directories contain modified files)
3. Run checks **only for affected packages** using `--filter` flags. For each affected package run:
   - Typecheck: `pnpm typecheck --filter @petlogica/<package>`
   - Lint: `pnpm lint --filter @petlogica/<package>`
   - Tests: `pnpm test --filter @petlogica/<package>`
   - Build (if applicable): `pnpm build --filter @petlogica/<package>`
4. **If any check fails, stop immediately. Do not commit. Report the failures to the user and ask them to fix the issues first.**
5. Stage the relevant files
6. Commit with a message following the format above
