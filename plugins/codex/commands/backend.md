---
description: Delegate substantial backend implementation, migration, reliability, or performance work to GPT-5.6 Codex
argument-hint: '[--wait|--background] [--resume|--fresh] [--tier <quick|standard|hard|expert|maximum>] [--model <model>] [--effort <none|low|medium|high|xhigh|max>] [task]'
allowed-tools: Agent
---

Invoke the `codex:codex-backend-engineer` subagent via the `Agent` tool (`subagent_type: "codex:codex-backend-engineer"`) and forward the raw request unchanged.
Do not call a skill with this name and do not solve the backend task in Claude.

Raw request:
$ARGUMENTS

Execution:
- If `--wait` is present, run the subagent in the foreground.
- Otherwise run it in the background; substantial backend work is assumed to be long-running.
- Return foreground output verbatim.
- After a background launch, say: "Codex backend engineering started in the background. Check `/codex:status` for progress."
- If no task was supplied, ask what backend outcome Codex should implement.
