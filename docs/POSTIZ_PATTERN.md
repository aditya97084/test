# Postiz pattern applied to Aegis

Postiz is a useful reference for the **shape of a production automation product**, not a brain to copy. Its public repository currently uses a pnpm monorepo with separate frontend, backend and orchestrator apps, Prisma/Postgres, Temporal, MCP, public API/SDK and integration adapters. The README also exposes an n8n node and Make integration. Its backend boots NestJS, starts MCP and uses Temporal workers; the system has explicit configuration checks and health-gated startup.

## What Aegis takes from it

```text
Aegis UI
  ↓ API / SSE
Control plane (missions, agents, goals, approvals, budgets)
  ↓
Durable orchestrator (queue, retries, schedules, heartbeats)
  ↓
Worker adapters (Hermes, Codex, Claude Code, OpenCode, OpenClaw, browser)
  ↓
External capabilities (MCP, n8n, GitHub, web, voice, deployment)
  ↓
Artifacts + verification + memory
```

### Separation that prevents pattern breakage

- **Frontend** only renders runtime state and sends commands.
- **API/control plane** owns domain records and permissions.
- **Orchestrator** owns task ordering, retries, schedules and heartbeats.
- **Workers** execute one capability and report evidence.
- **Adapters** translate vendor-specific APIs into capability contracts.
- **Memory** stores durable verified knowledge, not transient UI state.
- **Observability** exposes health, queue, worker, event and artifact state.

Aegis should not put provider-specific logic inside the UI or turn n8n/Paperclip into the commander.

## Autopilot contract

```text
Goal created
→ requirements clarified
→ mission persisted
→ task graph persisted
→ capabilities resolved
→ worker heartbeat confirmed
→ task dispatched
→ progress events emitted
→ result artifact stored
→ verifier checks evidence
→ retry/backoff or approval
→ next dependent task
→ final result + audit trail
```

A queue item cannot be marked done from a model message alone. A worker must return an artifact/evidence reference and a verifier must pass.

## Health-gated startup

Postiz's current public issues also show an important operational lesson: a worker can appear started while its dependency is unavailable, leaving queued work stuck. Aegis therefore needs explicit states:

```text
runtime healthy
worker registered
queue polling
capability healthy
mission runnable
```

If any dependency is not healthy, the UI must show `BLOCKED: dependency unavailable`, not `running`.

## Aegis implementation order

1. Keep the current capability registry and repository inspector.
2. Persist missions/tasks/events in a durable store.
3. Add a scheduler/worker heartbeat and queue leases.
4. Add adapter workers one at a time: native repo, browser, Hermes, Codex/OpenCode, Claude, OpenClaw.
5. Add MCP/n8n/Paperclip as adapters.
6. Add artifact verification and retry policies.
7. Add voice/vision and 3D presence only as projections of real events.

This gives Aegis Postiz-like operational discipline without reducing Aegis to a social scheduler.
