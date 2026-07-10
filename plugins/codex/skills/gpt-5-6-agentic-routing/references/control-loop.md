# Agentic engineering control loop

Use one persistent Codex task when the goal and assumptions remain stable. Send delta instructions with `--resume` instead of restating the full context.

1. Orient: read applicable repository instructions, map the relevant path, and reproduce or characterize current behavior.
2. Frame: identify acceptance criteria, material risks, and the shortest useful validation ladder.
3. Act: implement the complete in-scope change. Avoid product-direction changes and unrelated cleanup.
4. Verify: run the cheapest discriminating checks first, then the broadest relevant non-destructive checks available.
5. Repair: diagnose failures, update the implementation or tests, and rerun affected checks. Do not stop at the first failed validation.
6. Hand off: report the outcome, changed files, evidence, and only material residual risks.

## Stop conditions

Stop and return to Claude when correctness depends on missing product intent, an external write or destructive action needs authority, credentials or infrastructure are unavailable, or further progress would materially expand scope.

Do not stop merely because the task is large, the first hypothesis failed, or a test exposed more in-scope work.

## Tier changes during a task

Do not restart at a higher tier for an ordinary implementation mistake. Escalate only when evidence reveals harder reasoning: interacting failure modes, ambiguity that survives repository inspection, or validation whose cost makes repeated weak attempts wasteful.
