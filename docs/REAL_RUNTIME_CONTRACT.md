# Real runtime contract

Aegis is not considered real because a screen says `running`. It is real only when a runtime adapter performs an action and emits evidence.

## Adapter contract

Every adapter implements:

```js
{
  id,
  capabilities,
  async healthCheck(),
  async plan(input, context),
  async execute(input, context),
  async verify(result, context),
  async rollback(result, context)
}
```

`execute` must return an artifact/evidence reference or a structured failure. `verify` is mandatory for completion. A provider response alone is not proof.

## Execution state

```text
DISCOVERED
→ PLANNED
→ WAITING_APPROVAL
→ READY
→ RUNNING
→ VERIFYING
→ SUCCEEDED

RUNNING → RETRYING → RUNNING
RUNNING → BLOCKED
RUNNING → FAILED
```

## Boundaries

- The commander decides intent and assignment.
- Capabilities describe what can be done.
- Adapters perform it.
- The event bus reports it.
- The UI renders it.
- Governance pauses side effects.
- Memory stores durable, verified lessons.

No adapter may silently install software, send communication, publish, deploy, spend, delete data or access a camera without an approval record.

## Repository inspection

Before a coding agent edits a project, the repository inspector must return:

- safe workspace path
- visible files/directories
- package manifest and scripts
- git branch/status
- timestamp

The inspector is read-only. Editing requires a separate workspace capability and approval policy.
