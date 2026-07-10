# GPT-5.6 prompt practices

## Good: outcome, boundary, evidence

```text
Implement idempotent webhook processing for duplicate delivery IDs. Preserve the current HTTP contract. Schema migrations are allowed; external deployment is not. Add tests that prove duplicate deliveries produce one domain event and that retries after a transient failure still succeed.
```

This states what is not discoverable and leaves technical planning to Codex.

## Bad: long procedural choreography

```text
First inspect every file. Then think step by step. Make a detailed plan. Ask before each edit. Be concise. Be exhaustive. Verify everything three times. Use best practices. Do not stop early.
```

This mixes contradictory style signals, repeats default agent behavior, and causes permission friction and over-exploration.

## Good: difficult domain task

```text
Replace floating-point invoice proration with exact decimal semantics. Existing invoices must retain their stored totals. New calculations must preserve the invariant that line totals plus tax equal the invoice total in the settlement currency. Implement the migration and property tests; do not deploy it.
```

## Bad: architecture by prompt

```text
Create a Money value object, repository layer, strategy pattern, event bus, and six services to fix invoice rounding.
```

Do not prescribe architecture unless it is a product constraint. Let repository evidence drive the design.

## Good: prioritization instead of generic brevity

```text
Finish with the implementation outcome, verification evidence, and material residual risks. Omit repeated recap and optional background first.
```

Avoid bare instructions such as “be concise”; they can make GPT-5.6 omit required artifacts.
