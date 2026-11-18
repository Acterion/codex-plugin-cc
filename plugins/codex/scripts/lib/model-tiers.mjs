export const MODEL_TIERS = Object.freeze([
  Object.freeze({
    name: "quick",
    level: 1,
    model: "gpt-6-luna",
    effort: "low",
    useFor: "Small, bounded changes with an obvious implementation path.",
    examples: ["rename a field", "add a narrow unit test", "fix a local validation bug"]
  }),
  Object.freeze({
    name: "standard",
    level: 2,
    model: "gpt-6.2-sol",
    effort: "medium",
    useFor: "Normal feature and backend work with familiar patterns and moderate repository discovery.",
    examples: ["add a CRUD endpoint", "implement pagination", "extend an existing service"]
  }),
  Object.freeze({
    name: "hard",
    level: 3,
    model: "gpt-6.2-sol",
    effort: "high",
    useFor: "Cross-cutting implementation where architecture, correctness, and verification all matter.",
    examples: ["design a transactional workflow", "refactor a subsystem", "repair a concurrency bug"]
  }),
  Object.freeze({
    name: "expert",
    level: 4,
    model: "gpt-6.2-astra",
    effort: "medium",
    useFor: "Long-horizon technical work with ambiguous root causes or several interacting constraints.",
    examples: ["migrate a persistence layer", "redesign a distributed job runner", "optimize a critical algorithm"]
  }),
  Object.freeze({
    name: "maximum",
    level: 5,
    model: "gpt-6.2-astra",
    effort: "high",
    useFor: "Rare quality-first work where a marginal reliability gain justifies the highest latency and usage.",
    examples: ["plan a zero-downtime high-risk migration", "resolve a novel consistency failure", "audit a safety-critical protocol"]
  })
]);

const TIER_ALIASES = new Map([
  ["1", "quick"],
  ["t1", "quick"],
  ["fast", "quick"],
  ["2", "standard"],
  ["t2", "standard"],
  ["balanced", "standard"],
  ["3", "hard"],
  ["t3", "hard"],
  ["4", "expert"],
  ["t4", "expert"],
  ["5", "maximum"],
  ["t5", "maximum"],
  ["max", "maximum"]
]);

export function resolveModelTier(value) {
  if (value == null || String(value).trim() === "") {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();
  const name = TIER_ALIASES.get(normalized) ?? normalized;
  const tier = MODEL_TIERS.find((candidate) => candidate.name === name);
  if (!tier) {
    throw new Error(
      `Unsupported Codex tier "${value}". Use one of: ${MODEL_TIERS.map((candidate) => candidate.name).join(", ")}.`
    );
  }
  return tier;
}

export function renderModelTierGuide() {
  const lines = [
    "# Codex engineering tiers",
    "",
    "Choose the lowest tier that reliably clears the task. Explicit --model or --effort flags override the tier defaults.",
    ""
  ];

  for (const tier of MODEL_TIERS) {
    lines.push(
      `## T${tier.level} ${tier.name}`,
      `Model: ${tier.model}`,
      `Reasoning effort: ${tier.effort}`,
      `Use for: ${tier.useFor}`,
      `Examples: ${tier.examples.join("; ")}`,
      ""
    );
  }

  lines.push(
    "## Selection rules",
    "",
    "- Escalate for interacting unknowns, irreversible data changes, concurrency, security, or costly failure—not merely for a large diff.",
    "- De-escalate when the task is mechanical, acceptance criteria are crisp, and targeted tests give fast feedback.",
    "- Use maximum selectively and compare it with expert on representative work.",
    "- Astra runs at high effort at most: above high it added about 40% cost and no capability (owner, 2026-09-30).",
    "- Model availability depends on the account and on the Codex CLI version (an old CLI hides newer models); pass --model directly when your Codex configuration requires another model.",
    "",
    "Run specialist work with `/codex:backend --tier hard ...` or `/codex:domain --tier expert ...`.",
    ""
  );

  return lines.join("\n");
}
