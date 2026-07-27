# GPT-5.6 model tiers

The plugin uses task tiers, not claims that one configuration is universally best. Evaluate representative tasks and move down when quality holds.

| Tier | Model | Effort | Representative work |
|---|---|---|---|
| quick | `gpt-5.6-luna` | `low` | localized tests, validation fixes, mechanical changes |
| standard | `gpt-5.6-terra` | `medium` | endpoints, service extensions, familiar integrations |
| hard | `gpt-5.6-sol` | `high` | transactional workflows, concurrency, subsystem refactors |
| expert | `gpt-5.6-sol` | `xhigh` | ambiguous root causes, distributed redesigns, hard optimization |
| maximum | `gpt-5.6-sol` | `max` | rare, quality-first work with unusually costly failure |

## Boundary examples

Choose `quick` over `standard` when the changed surface is small and a targeted test makes correctness obvious. Choose `standard` when discovery spans several modules but the architecture is familiar.

Choose `hard` over `standard` when the task crosses consistency, security, data lifecycle, or concurrency boundaries. Choose `expert` when several such risks interact or the root cause is genuinely ambiguous.

Choose `maximum` only after deciding that additional latency and usage are acceptable and a marginal reliability improvement matters. Compare it with `expert`; highest effort is not automatically the best tradeoff.

The family mapping and supported `none`, `low`, `medium`, `high`, `xhigh`, and `max` efforts follow the [official GPT-5.6 model guidance](https://developers.openai.com/api/docs/guides/latest-model). Model access remains account-dependent.
