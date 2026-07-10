import test from "node:test";
import assert from "node:assert/strict";

import { buildEngineeringPrompt } from "../plugins/codex/scripts/lib/engineering-profiles.mjs";
import { MODEL_TIERS, renderModelTierGuide, resolveModelTier } from "../plugins/codex/scripts/lib/model-tiers.mjs";

test("GPT-5.6 tiers map difficulty to model and effort", () => {
  assert.deepEqual(
    MODEL_TIERS.map(({ name, model, effort }) => ({ name, model, effort })),
    [
      { name: "quick", model: "gpt-5.6-luna", effort: "low" },
      { name: "standard", model: "gpt-5.6-terra", effort: "medium" },
      { name: "hard", model: "gpt-5.6", effort: "high" },
      { name: "expert", model: "gpt-5.6", effort: "xhigh" },
      { name: "maximum", model: "gpt-5.6", effort: "max" }
    ]
  );
  assert.equal(resolveModelTier("t2").name, "standard");
  assert.equal(resolveModelTier("max").name, "maximum");
  assert.throws(() => resolveModelTier("impossible"), /Unsupported GPT-5\.6 tier/);
});

test("tier guide explains all tiers and escalation", () => {
  const guide = renderModelTierGuide();
  assert.match(guide, /T1 quick/);
  assert.match(guide, /T5 maximum/);
  assert.match(guide, /Explicit --model or --effort flags override/);
  assert.match(guide, /irreversible data changes, concurrency, security/);
});

test("engineering profiles keep product direction separate from technical execution", () => {
  const backend = buildEngineeringPrompt("backend", "Implement idempotent webhook delivery.");
  const domain = buildEngineeringPrompt("domain", "Implement exact invoice proration.");

  assert.match(backend, /backend implementation owner/);
  assert.match(backend, /Treat the request as product direction and own the technical execution/);
  assert.match(backend, /data integrity, transactions, idempotency, concurrency/);
  assert.match(backend, /Implement idempotent webhook delivery/);
  assert.match(domain, /domain implementation owner/);
  assert.match(domain, /vocabulary, invariants, state transitions/);
  assert.match(domain, /Implement exact invoice proration/);
  assert.throws(() => buildEngineeringPrompt("frontend", "Build it."), /Unsupported engineering profile/);
});
