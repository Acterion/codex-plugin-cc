# Backend risk lenses

Use only the lenses relevant to the requested behavior.

- Contracts: request and response compatibility, error semantics, versioning, retries, and cancellation.
- Data: constraints, transaction boundaries, isolation, backfill correctness, rollback, and mixed-version operation.
- Delivery: idempotency keys, deduplication, ordering, at-least-once effects, poison messages, and replay.
- Concurrency: ownership, races, locks, leases, timeouts, partial failure, and stale writes.
- Security: authentication, authorization at resource boundaries, tenant isolation, secret handling, and audit trails.
- Operations: observability, bounded retries, circuit breaking, capacity, degradation, and runbook-relevant failures.
- Performance: measurement before optimization, representative data shape, query plans, allocations, and tail latency.

Prefer executable evidence over prose. Add a regression test at the lowest layer that proves the bug and a contract or integration check where cross-boundary behavior matters.
