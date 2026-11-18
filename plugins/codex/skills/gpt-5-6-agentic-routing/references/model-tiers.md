# Codex model tiers

The plugin uses task tiers, not claims that one configuration is universally best. Evaluate representative tasks and move down when quality holds.

| Tier | Model | Effort | Representative work |
|---|---|---|---|
| quick | `gpt-6-luna` | `low` | localized tests, validation fixes, mechanical changes |
| standard | `gpt-6.2-sol` | `medium` | endpoints, service extensions, familiar integrations |
| hard | `gpt-6.2-sol` | `high` | transactional workflows, concurrency, subsystem refactors |
| expert | `gpt-6.2-astra` | `medium` | ambiguous root causes, distributed redesigns, hard optimization |
| maximum | `gpt-6.2-astra` | `high` | rare, quality-first work with unusually costly failure |

## Boundary examples

Choose `quick` over `standard` when the changed surface is small and a targeted test makes correctness obvious. Choose `standard` when discovery spans several modules but the architecture is familiar.

Choose `hard` over `standard` when the task crosses consistency, security, data lifecycle, or concurrency boundaries. Choose `expert` when several such risks interact or the root cause is genuinely ambiguous.

Choose `maximum` only after deciding that additional latency and usage are acceptable and a marginal reliability improvement matters. Compare it with `expert`; highest effort is not automatically the best tradeoff.

Sol is the fast go-to coding model and Astra the most capable one (server descriptions, 2026-11-18). Astra runs at `high` effort at most: above `high` it added about 40% cost and no capability (owner, 2026-09-30). Model access depends on the account and on the Codex CLI version; an old CLI hides newer models.
