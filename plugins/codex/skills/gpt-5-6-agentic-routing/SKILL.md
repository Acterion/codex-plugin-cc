---
name: gpt-5-6-agentic-routing
description: Choose GPT-5.6 Sol, Terra, or Luna plus an appropriate reasoning effort, and shape compact Codex handoffs for engineering work. Use for model-tier selection, rescue routing, backend or domain delegation, prompt migration from GPT-5.4, and any request that asks Claude to orchestrate while Codex owns technical execution.
---

# GPT-5.6 Agentic Routing

Keep Claude at the orchestration boundary: provide the goal, product constraints, approval boundaries, and success criteria. Let Codex inspect the repository, choose the technical plan, implement, verify, and repair.

## Route by difficulty

Use the lowest tier likely to complete the work reliably:

- `quick`: Luna + low for narrow, mechanical changes.
- `standard`: Terra + medium for ordinary feature work.
- `hard`: Sol + high for cross-cutting correctness work. Default for backend and domain profiles.
- `expert`: Sol + xhigh for long-horizon work with interacting unknowns.
- `maximum`: Sol + max only for rare quality-first work where failure is unusually costly.

Run `node "${CLAUDE_PLUGIN_ROOT}/scripts/gpt-5-6-tiers.mjs"` for the complete table and examples. Read [references/model-tiers.md](references/model-tiers.md) when choosing between adjacent tiers.

## Build the handoff

Prefer a short outcome contract over a stack of generic XML blocks. Include only:

1. Goal and observable end state.
2. Constraints that are not discoverable from the repository.
3. Permission boundary for external, destructive, or irreversible actions.
4. Required evidence or acceptance checks.

Do not prescribe repository-reading steps, restate standard coding behavior, demand hidden reasoning, or repeat verification instructions. Backend and domain profiles already add a compact execution loop.

## Control the loop

Codex should orient, frame risks, act, verify, repair, and hand off. This is a control loop, not a response outline: do not require narration at every phase.

Read [references/control-loop.md](references/control-loop.md) when the task is long-running, has expensive validation, or may need escalation. Read [references/prompt-practices.md](references/prompt-practices.md) for good and bad prompt examples.

## Escalate deliberately

Escalate a tier for interacting unknowns, concurrency, security boundaries, irreversible data changes, weak test feedback, or a costly failure mode. Do not escalate solely because the diff may be large.

Direct `--model` and `--effort` flags override tier defaults. Preserve them when the user names a specific runtime choice.
