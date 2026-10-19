## Commands

- for running script in particular package (filtering) put filter after the command: `pnpm <script> --filter @petlogica/*`

## Code Style Guidelines

- **TypeScript**: Use strict typing. **Never use `any` or type casting (`as any`)**. Fix types at the source.
- **Mongoose Models**: Extend `Document` properly and define instance methods in interfaces to avoid type casting.
- **Imports**: Group by external/internal; no duplicate imports.
- **Naming**: PascalCase for components/types, camelCase for variables/functions.
- **Error Handling**: Use proper error boundaries and typed error handling.
- **React**: Functional components with hooks; avoid class components.
- **Formatting**: See `.editorconfig` and `.prettierrc.cjs`.
- **Structure**: Place related functionality in the same directory. Tests live next to code (e.g., `src/services/foo.ts` and `src/services/foo.test.ts`).
- **Files**: One component per file; filename matches export.
- **Unused Variables**: Prefix with `_` if intentionally unused.
- **React**: Don't pass callbacks directly to an element. Extract it to variable and pass callback as variable.

## Comments

- Default to no code comments.
- Never add comments that restate code, describe straightforward control flow, explain where a value is populated, or document behavior evident from names, types, and tests.
- Do not add “why this exists” comments for ordinary architectural boundaries or implementation choices. Put durable architectural information in documentation instead.
- Add a comment only when it explains a non-obvious invariant, external constraint, workaround, or correctness requirement that cannot be expressed through code.
- Before adding a comment, prefer clearer naming, extracted functions, stronger types, or a test.
- When modifying code, remove redundant comments in the touched area.

## Documentation

- Architecture: `docs/architecture.md` (index + decisions; per-area detail in `docs/architecture/`, auto-loaded by path rules in `.claude/rules/`)
- Development guide: `docs/development-guide.md` (setup, env vars, troubleshooting)
- Nutritional metrics: `docs/metrics.md` (PCI scoring formulas)
- CI/CD: `docs/ci-cd.md` (deployment, versioning)
- Public site (`apps/site`): `apps/site/README.md` (local dev, Cloudflare Workers build, revalidate contract)
- Cloudflare IaC: `infra/cloudflare/README.md` (Terraform module, TFC workflow)

## Tools & Integrations

- For GitHub operations (PRs, issues, diffs, comments), use the `gh` CLI.
- For all Linear operations, use the MCP Linear server; only fall back to bash if it is unavailable or explicitly fails.

## Approval Rules

- Before any external write action, ask for explicit user approval in the current turn.
- Never create, update, or archive Linear issues without explicit confirmation.
- Never create, update, merge, or comment on GitHub issues/PRs without explicit confirmation.

## Lessons Learned

- **CLI Argument Types**: Use explicit type annotations for CLI handlers to avoid implicit `any`.
- **Boolean Logic**: Be explicit with boolean expressions, especially with optional numbers.
- **Enum Usage**: Prefer enum values over string literals; avoid manual mapping.
- **Active Development Phase**: No backward compatibility.
- **ESM Module Imports**: All relative imports in TS must include `.js` extension (e.g., `from './types.js'`).
- **Import Types from Shared Package**: Use types from `@petlogica/api-client` (Zod schemas), not Mongoose model files.
- **Monorepo Build Dependencies**: If adding exports to shared packages, rebuild them first (e.g., `pnpm --filter @petlogica/api-client build`).
- **MongoDB Package Imports**: Import specific types from `mongodb` (no default imports).
- **Mongoose Index Strategy**: Define indexes with `schema.index()` rather than field-level `index: true`.
- **Index Redundancy**: Avoid redundant indexes when a compound index already covers the query prefix (e.g., `{ a: 1 }` is usually redundant if `{ a: 1, b: 1 }` exists for the same access pattern).
- **Database to API Type Mapping**: Never use type assertions to convert Mongoose docs to API types. Use mapper functions in `@apps/api/src/db/mappers.ts`.
- **Ticket Scoping**: Every ticket should deliver runnable functionality, not standalone models/schemas without a consuming endpoint.
- **Untrusted Input Safety**: Treat externally sourced values (env/config/API/system outputs) as untrusted. Validate and sanitize before use, especially in shell/command contexts, to prevent injection vulnerabilities.
- **Skill Source of Truth**: Keep local skills under `.agents/skills/*` as the canonical source. `.claude/skills` is a single symlink to `.agents/skills` — new skills are picked up automatically.
- **Error Handling**: Never expose internal error details to clients. Log the full error server-side with relevant context, then return a generic message.
- **Observability Reuse**: Prefer existing HTTP/tRPC duration telemetry before adding new per-call duration logs; add additional logs only when current observability is insufficient.
- **Mock/Prod Parity**: Ensure mock/in-memory infrastructure preserves production data-flow topology (e.g., shared queue state between producers and consumers), not just matching method signatures.
- **Single Source of Truth**: Keep configuration values defined in one authoritative place; when duplication is unavoidable, add explicit references between definitions to reduce drift risk.
- **Queue Consumer Rollouts**: Treat new queue consumers as cross-layer changes; ship application wiring, runtime configuration, and IAM permissions together to avoid partial deployments.
- **Atomic Progress Updates**: When per-item state and aggregate progress counters must stay aligned, update both atomically (for example, in one transaction) to preserve invariants under retries and crashes.
- **Consistency Paths Need Integration Coverage**: For critical consistency behavior (transactions, retries, and acknowledgements), include at least one integration-style test against real datastore semantics in addition to mocked unit tests.
- **Test Value**: Do not add trivial tests that merely restate static wiring, prop passthrough, or implementation details evident from the code. Tests should protect meaningful behavior, logic, or contracts.
- **Cross-Service Structured Logging**: Both Node.js (Pino) and Python services use JSON logs with matching field names (`level`, `time`, `hostname`, `msg`). In Python, use `extra={}` for structured fields instead of f-string interpolation.
- **Docs Describe Current State**: Documentation should describe current behavior and architecture, not historical transitions or prior implementation states.
- **GitHub Remote**: The GitHub repo is `petlogica/petlogica` (not matching the local directory name). Use this for all GitHub MCP tool calls.
- **Concurrency Controls Scope**: Only add single-flight locks or semaphores when protecting a shared local resource (CPU-bound inference, model state, file handle). HTTP proxy services have no such constraint — concurrent requests are just concurrent outbound calls, which is safe and desirable.
- We use Linear; access via its MCP when needed
- Do not overengineer; keep it simple
- Never force-push anything
- **Native First**: Prefer native/standard libraries over third-party dependencies
- **Logging**: Use `ctx.logger` in tRPC procedures instead of `console.log`; include relevant context
- **No Time Estimates**: Don't plan in weeks or provide timelines
- **Documentation Updates**: After significant features or architectural changes, use the `write-high-level-docs` skill to update `docs/architecture.md` if needed
- **Destructive Operations Warning**: Before suggesting irreversible operations (deleting infra, dropping DBs, force-pushing), explicitly warn about consequences, affected resources, and recovery steps
- **CI/CD Component Consistency**: New monorepo components should follow the existing change-detection + git tag pattern in `ci-cd.yml` (detect changes since last deployment tag, deploy only if changed, create a `@petlogica/<component>-YYYY.MM.DD.N` tag on success).

## Communication Instructions

- **Communication Style**: Be direct and honest. No excessive politeness or "sandwiching" criticism. No marketing-style language or superlatives
- **Explanations**: Skip explanations of trivial steps unless explicitly requested

## Linear Defaults

- Team: Developers
- Default project: POC

## Reference Files

- @.editorconfig
- @.prettierrc.cjs
- @docs/architecture.md


## UI-kit

UI kit is located in `packages/ui-kit`.

* radix-ui primitives are used as a basement for ui kit.
* Common components are generated with shadcn (config in `packages/ui-kit/components.json`).
* If application requires a common component it should be added to ui-kit
* radix-primitives are re-exported from the ui-kit package

### Typography

- For all repository UI, use the brand typography classes from `packages/ui-kit/src/brand.css` (for example, `text-b2`, `text-l1`, and heading or `-sb` variants).
- Use a compatible brand class when its font size differs from the intended size by at most 1px, including exactly 1px. Match the text role, weight, and line height as well as size.
- Before using a standard Tailwind size, a custom size, or a brand size more than 1px away, ask the user if no compatible brand class is within that tolerance. State the intended size, nearest brand option, and difference; wait for the user's decision before applying the exception.
- Apply feature-scoped overrides to shared components when a typography refactor is scoped to one feature. See `docs/development-guide.md` for the typography mapping.
