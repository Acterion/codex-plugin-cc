---
description: Delegate complex domain modeling, invariants, algorithms, or business-rule implementation to GPT-5.6 Codex
argument-hint: '[--wait|--background] [--resume|--fresh] [--tier <quick|standard|hard|expert|maximum>] [--model <model>] [--effort <none|low|medium|high|xhigh|max>] [task]'
allowed-tools: Agent
---

Invoke the `codex:codex-domain-engineer` subagent via the `Agent` tool (`subagent_type: "codex:codex-domain-engineer"`) and forward the raw request unchanged.
Do not call a skill with this name and do not solve the domain task in Claude.

Raw request:
$ARGUMENTS

Execution:
- If `--wait` is present, run the subagent in the foreground.
- Otherwise run it in the background; substantial domain work is assumed to be long-running.
- Return foreground output verbatim.
- After a background launch, say: "Codex domain engineering started in the background. Check `/codex:status` for progress."
- If no task was supplied, ask what domain outcome Codex should implement.
