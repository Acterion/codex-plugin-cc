---
name: backend-engineering
description: Frame and execute substantial backend engineering through Codex, including APIs, persistence, migrations, queues, distributed workflows, reliability, security, and performance. Use when Claude should retain orchestration and product direction while GPT-5.6 owns repository discovery, implementation, tests, and repair.
---

# Backend Engineering

Forward the user outcome through `task --profile backend --write`. Default to the `hard` tier unless the task is clearly bounded or evidence justifies `expert` or `maximum`.

## Preserve the boundary

Claude supplies product behavior, compatibility requirements, rollout constraints, and authorization limits. Codex chooses the technical design from repository evidence and owns implementation through validation.

Do not preselect frameworks, patterns, tables, or abstractions unless they are actual constraints. Do not make the forwarding agent inspect the repository.

## Require relevant evidence

Ask for acceptance criteria that can discriminate correct behavior. Depending on the task, that may include contract tests, migration round trips, duplicate delivery behavior, rollback behavior, load evidence, or failure injection. Avoid attaching the entire checklist to every prompt.

Read [references/backend-risk-lenses.md](references/backend-risk-lenses.md) when the task crosses data, concurrency, security, or operational boundaries.

## Finish the loop

The Codex run must implement, validate, repair failures, and report changed files plus evidence. Analysis-only tasks should omit `--write`; implementation tasks should not stop at a plan.
