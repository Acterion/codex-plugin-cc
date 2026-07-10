# Domain modeling lenses

Apply only the relevant lenses.

- Vocabulary: one term per concept; identify aliases and overloaded names before changing them.
- Invariants: state what must remain true before and after each operation and where it is enforced.
- State: enumerate valid transitions, illegal transitions, retries, cancellation, and terminal states.
- Identity: distinguish entity identity, equality, deduplication keys, and external identifiers.
- Money and measurement: define precision, rounding, units, currency conversion, and reconciliation invariants.
- Time: define timezone, clock source, intervals, boundary inclusion, ordering, and late events.
- Algorithms: specify correctness properties, complexity limits, determinism, tie-breaking, and degenerate inputs.
- Persistence: separate domain meaning from schema shape; account for old records, partial migrations, and mixed versions.

Prefer example tables and property tests when prose leaves edge cases ambiguous. Preserve legacy outputs deliberately, not accidentally.
