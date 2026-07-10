---
name: domain-engineering
description: Frame and execute complex domain engineering through Codex, including invariants, state machines, algorithms, financial and temporal rules, business-critical calculations, and persistence mapping. Use when Claude owns product direction while GPT-5.6 derives the technical model, implementation, and verification from repository evidence.
---

# Domain Engineering

Forward the outcome through `task --profile domain --write`. Default to the `hard` tier; use `expert` for interacting invariants or ambiguous legacy semantics, and `maximum` only when failure is unusually costly.

## Make semantics observable

State business rules and compatibility constraints in user language. Require Codex to locate where those rules currently live, make invariants explicit in code, and prove them with focused examples or property tests.

Let Codex choose aggregates, value objects, state machines, modules, and persistence mapping. Naming a pattern in the prompt is appropriate only when the pattern itself is a project constraint.

Read [references/domain-modeling-lenses.md](references/domain-modeling-lenses.md) for tasks involving state, money, time, identity, or legacy migration.

## Protect boundaries

Keep pure domain decisions separate from transport and storage accidents where the repository architecture permits it. Preserve intentional historical behavior during migrations and surface any ambiguity that requires product direction.

The run must implement, validate, repair failures, and report evidence. Do not accept a plan as completion for a change request.
