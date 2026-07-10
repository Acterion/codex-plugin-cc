# Codex plugin for Claude Code

Use Claude Code for orchestration and product direction while Codex handles reviews and difficult technical implementation.

This plugin is for Claude Code users who want an easy way to start using Codex from the workflow
they already have.

<video src="./docs/plugin-demo.webm" controls muted playsinline autoplay></video>

## What You Get

- `/codex:review` and `/codex:adversarial-review` for read-only review
- `/codex:backend` for substantial APIs, data, migrations, reliability, security, and performance work
- `/codex:domain` for invariants, state machines, algorithms, financial or temporal rules, and business-critical logic
- `/codex:tiers` for deterministic GPT-5.6 model and reasoning-effort guidance
- `/codex:rescue`, `/codex:transfer`, `/codex:status`, `/codex:result`, and `/codex:cancel` to delegate work, hand off sessions, and manage background jobs

## Requirements

- **ChatGPT subscription (incl. Free) or OpenAI API key.**
  - Usage will contribute to your Codex usage limits. [Learn more](https://developers.openai.com/codex/pricing).
- **Node.js 18.18 or later**
- **GPT-5.6 access for the new tiered engineering commands.** Availability is account-dependent; direct `--model` overrides remain supported.

## Install

Add the marketplace in Claude Code:

```bash
/plugin marketplace add Acterion/codex-plugin-cc
```

Install the plugin:

```bash
/plugin install codex@acterion-codex
```

Reload plugins:

```bash
/reload-plugins
```

Then run:

```bash
/codex:setup
```

`/codex:setup` will tell you whether Codex is ready. If Codex is missing and npm is available, it can offer to install Codex for you.

If you prefer to install Codex yourself, use:

```bash
npm install -g @openai/codex
```

If Codex is installed but not logged in yet, run:

```bash
!codex login
```

After install, you should see:

- the slash commands listed below
- the `codex:codex-rescue` subagent in `/agents`

One simple first run is:

```bash
/codex:review --background
/codex:backend --tier hard implement idempotent webhook processing
/codex:status
/codex:result
```

## Usage

### `/codex:review`

Runs a normal Codex review on your current work. It gives you the same quality of code review as running `/review` inside Codex directly.

> [!NOTE]
> Code review especially for multi-file changes might take a while. It's generally recommended to run it in the background.

Use it when you want:

- a review of your current uncommitted changes
- a review of your branch compared to a base branch like `main`

Use `--base <ref>` for branch review. It also supports `--wait` and `--background`. It is not steerable and does not take custom focus text. Use [`/codex:adversarial-review`](#codexadversarial-review) when you want to challenge a specific decision or risk area.

Examples:

```bash
/codex:review
/codex:review --base main
/codex:review --background
```

This command is read-only and will not perform any changes. When run in the background you can use [`/codex:status`](#codexstatus) to check on the progress and [`/codex:cancel`](#codexcancel) to cancel the ongoing task.

### `/codex:adversarial-review`

Runs a **steerable** review that questions the chosen implementation and design.

It can be used to pressure-test assumptions, tradeoffs, failure modes, and whether a different approach would have been safer or simpler.

It uses the same review target selection as `/codex:review`, including `--base <ref>` for branch review.
It also supports `--wait` and `--background`. Unlike `/codex:review`, it can take extra focus text after the flags.

Use it when you want:

- a review before shipping that challenges the direction, not just the code details
- review focused on design choices, tradeoffs, hidden assumptions, and alternative approaches
- pressure-testing around specific risk areas like auth, data loss, rollback, race conditions, or reliability

Examples:

```bash
/codex:adversarial-review
/codex:adversarial-review --base main challenge whether this was the right caching and retry design
/codex:adversarial-review --background look for race conditions and question the chosen approach
```

This command is read-only. It does not fix code.

### `/codex:rescue`

Hands a task to Codex through the `codex:codex-rescue` subagent.

Use it when you want Codex to:

- investigate a bug
- try a fix
- continue a previous Codex task
- take a faster or cheaper pass with a smaller model

> [!NOTE]
> Depending on the task and the model you choose these tasks might take a long time and it's generally recommended to force the task to be in the background or move the agent to the background.

It supports `--background`, `--wait`, `--resume`, and `--fresh`. If you omit `--resume` and `--fresh`, the plugin can offer to continue the latest rescue thread for this repo.

Examples:

```bash
/codex:rescue investigate why the tests started failing
/codex:rescue fix the failing test with the smallest safe patch
/codex:rescue --resume apply the top fix from the last run
/codex:rescue --tier standard investigate the flaky integration test
/codex:rescue --model gpt-5.6-terra --effort medium investigate the flaky integration test
/codex:rescue --model spark fix the issue quickly
/codex:rescue --background investigate the regression
```

You can also just ask for a task to be delegated to Codex:

```text
Ask Codex to redesign the database connection to be more resilient.
```

**Notes:**

- if you do not pass `--tier`, `--model`, or `--effort`, rescue uses your Codex defaults.
- `--tier` accepts `quick`, `standard`, `hard`, `expert`, or `maximum`.
- if you say `spark`, the plugin maps that to `gpt-5.3-codex-spark`
- follow-up rescue requests can continue the latest Codex task in the repo

### `/codex:backend`

Hands a backend outcome to the `codex:codex-backend-engineer` subagent. Claude retains product direction and permission boundaries; Codex inspects the repository, chooses the technical plan, implements it, runs checks, repairs failures, and returns evidence.

Backend and domain commands default to the `hard` tier and run in the background unless `--wait` is supplied.

Examples:

```bash
/codex:backend implement idempotent webhook delivery with duplicate-request tests
/codex:backend --tier expert migrate the queue worker to lease-based ownership without losing jobs
/codex:backend --wait --tier standard add cursor pagination to the existing endpoint
```

### `/codex:domain`

Hands domain modeling and business-critical implementation to the `codex:codex-domain-engineer` subagent.

Examples:

```bash
/codex:domain replace invoice proration with exact decimal semantics and preserve stored totals
/codex:domain --tier expert model the order lifecycle as explicit valid state transitions
/codex:domain --resume apply the migration strategy from the previous domain run
```

### `/codex:tiers`

Prints the model, effort, task examples, and escalation guidance for each engineering tier:

| Tier | Runtime | Typical work |
|---|---|---|
| `quick` | GPT-5.6 Luna, low | narrow mechanical changes with fast targeted tests |
| `standard` | GPT-5.6 Terra, medium | ordinary features and familiar integrations |
| `hard` | GPT-5.6 Sol, high | cross-cutting correctness, concurrency, and subsystem work |
| `expert` | GPT-5.6 Sol, xhigh | long-horizon work with interacting unknowns |
| `maximum` | GPT-5.6 Sol, max | rare quality-first tasks with unusually costly failure |

Choose the lowest tier that reliably clears the task. Escalate for interacting unknowns, irreversible data changes, concurrency, security, or weak feedback—not merely for a large diff. Explicit `--model` and `--effort` flags override a tier.

The family mapping follows the [official GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model).

### `/codex:transfer`

Creates a persistent Codex thread from the current Claude Code session and prints a `codex resume <session-id>` command.

Use it when you started a debugging or implementation conversation in Claude Code and want to continue that same context directly in Codex.

Examples:

```bash
/codex:transfer
/codex:transfer --source ~/.claude/projects/-Users-me-repo/<session-id>.jsonl
```

The plugin's existing `SessionStart` hook supplies the current transcript path automatically; `--source` is available as a manual override. The transfer uses Codex's external-agent session importer, so it follows the same conversion rules as importing Claude history in the Codex App and creates visible turns that can be continued in the App or TUI. The source must be under `~/.claude/projects`, and older Codex versions that do not expose session import must be upgraded before using this command.

### `/codex:status`

Shows running and recent Codex jobs for the current repository.

Examples:

```bash
/codex:status
/codex:status task-abc123
```

Use it to:

- check progress on background work
- see the latest completed job
- confirm whether a task is still running

### `/codex:result`

Shows the final stored Codex output for a finished job.
When available, it also includes the Codex session ID so you can reopen that run directly in Codex with `codex resume <session-id>`.

Examples:

```bash
/codex:result
/codex:result task-abc123
```

### `/codex:cancel`

Cancels an active background Codex job.

Examples:

```bash
/codex:cancel
/codex:cancel task-abc123
```

### `/codex:setup`

Checks whether Codex is installed and authenticated.
If Codex is missing and npm is available, it can offer to install Codex for you.

You can also use `/codex:setup` to manage the optional review gate.

#### Enabling review gate

```bash
/codex:setup --enable-review-gate
/codex:setup --disable-review-gate
```

When the review gate is enabled, the plugin uses a `Stop` hook to run a targeted Codex review based on Claude's response. If that review finds issues, the stop is blocked so Claude can address them first.

> [!WARNING]
> The review gate can create a long-running Claude/Codex loop and may drain usage limits quickly. Only enable it when you plan to actively monitor the session.

## Typical Flows

### Review Before Shipping

```bash
/codex:review
```

### Hand A Problem To Codex

```bash
/codex:rescue investigate why the build is failing in CI
```

### Hand Off Heavy Engineering

```bash
/codex:backend --tier hard redesign the retry pipeline to be idempotent and observable
/codex:domain --tier expert implement exact settlement allocation with invariant tests
```

### Start Something Long-Running

```bash
/codex:adversarial-review --background
/codex:backend --tier expert investigate and fix the flaky distributed test
```

Then check in with:

```bash
/codex:status
/codex:result
```

## Codex Integration

The Codex plugin wraps the [Codex app server](https://developers.openai.com/codex/app-server). It uses the global `codex` binary installed in your environment and [applies the same configuration](https://developers.openai.com/codex/config-basic).

### Common Configurations

If you want to change the default reasoning effort or model used by commands without an explicit tier, define it in user-level or project-level `config.toml`. For example:

```toml
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
```

Your configuration will be picked up based on:

- user-level config in `~/.codex/config.toml`
- project-level overrides in `.codex/config.toml`
- project-level overrides only load when the [project is trusted](https://developers.openai.com/codex/config-advanced#project-config-files-codexconfigtoml)

## Agentic Control Loop

The specialist profiles give Codex one compact operating contract:

1. Orient on repository instructions and current behavior.
2. Frame acceptance criteria, material risks, and the validation ladder.
3. Implement the complete in-scope change.
4. Run targeted checks, then broader relevant validation.
5. Repair failures and rerun affected checks.
6. Hand back the outcome, changed files, evidence, and material residual risks.

This loop is deliberately not a verbose response template. GPT-5.6 performs better with short, outcome-focused prompts than with accumulated generic instructions. Claude should specify product intent, non-discoverable constraints, approval boundaries, and success criteria; Codex should own the technical path.

Good:

```text
Implement idempotent webhook processing for duplicate delivery IDs. Preserve the current HTTP contract. Schema migrations are allowed; deployment is not. Add tests proving duplicate deliveries emit one domain event and retries after transient failure succeed.
```

Avoid:

```text
Read every file, think step by step, write a detailed plan, ask before every edit, be concise, be exhaustive, verify everything three times, and use best practices.
```

Check out the Codex docs for more [configuration options](https://developers.openai.com/codex/config-reference).

### Moving The Work Over To Codex

Delegated tasks and any [stop gate](#what-does-the-review-gate-do) run can also be directly resumed inside Codex by running `codex resume` either with the specific session ID you received from running `/codex:result` or `/codex:status` or by selecting it from the list.

This way you can review the Codex work or continue the work there.

## FAQ

### Do I need a separate Codex account for this plugin?

If you are already signed into Codex on this machine, that account should work immediately here too. This plugin uses your local Codex CLI authentication.

If you only use Claude Code today and have not used Codex yet, you will also need to sign in to Codex with either a ChatGPT account or an API key. [Codex is available with your ChatGPT subscription](https://developers.openai.com/codex/pricing/), and [`codex login`](https://developers.openai.com/codex/cli/reference/#codex-login) supports both ChatGPT and API key sign-in. Run `/codex:setup` to check whether Codex is ready, and use `!codex login` if it is not.

### Does the plugin use a separate Codex runtime?

No. This plugin delegates through your local [Codex CLI](https://developers.openai.com/codex/cli/) and [Codex app server](https://developers.openai.com/codex/app-server/) on the same machine.

That means:

- it uses the same Codex install you would use directly
- it uses the same local authentication state
- it uses the same repository checkout and machine-local environment

### Will it use the same Codex config I already have?

Yes. If you already use Codex, the plugin picks up the same [configuration](#common-configurations).

### Can I keep using my current API key or base URL setup?

Yes. Because the plugin uses your local Codex CLI, your existing sign-in method and config still apply.

If you need to point the built-in OpenAI provider at a different endpoint, set `openai_base_url` in your [Codex config](https://developers.openai.com/codex/config-advanced/#config-and-state-locations).
