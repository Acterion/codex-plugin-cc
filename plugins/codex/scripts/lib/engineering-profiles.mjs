const PROFILES = Object.freeze({
  backend: Object.freeze({
    owner: "backend implementation owner",
    focus: "Check only relevant API contracts, data integrity, transactions, idempotency, concurrency, security, failure handling, and observability."
  }),
  domain: Object.freeze({
    owner: "domain implementation owner",
    focus: "Make relevant vocabulary, invariants, state transitions, boundaries, time or numeric semantics, and persistence mapping explicit in code and tests."
  })
});

export function listEngineeringProfiles() {
  return Object.keys(PROFILES);
}

export function buildEngineeringPrompt(profileName, task) {
  if (profileName == null || String(profileName).trim() === "") {
    return task;
  }

  const normalized = String(profileName).trim().toLowerCase();
  const profile = PROFILES[normalized];
  if (!profile) {
    throw new Error(
      `Unsupported engineering profile "${profileName}". Use one of: ${listEngineeringProfiles().join(", ")}.`
    );
  }

  const goal = String(task ?? "").trim();
  return [
    `Act as the ${profile.owner} for this repository.`,
    "",
    "Goal:",
    goal,
    "",
    "Operating contract:",
    "- Treat the request as product direction and own the technical execution.",
    "- Inspect repository instructions and current behavior before choosing the implementation.",
    "- Keep changes in scope; pause only for missing information that changes correctness, safety, or an irreversible action.",
    `- ${profile.focus}`,
    "- Implement the complete result, run targeted validation, repair failures, then run the broadest relevant non-destructive checks available.",
    "- Finish with the outcome, changed files, verification evidence, and material residual risks."
  ].join("\n");
}
