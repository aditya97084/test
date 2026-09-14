# Aegis Personal Autonomous Work OS

Aegis is a local-first autonomous work operating system. The UI is a control surface over runtime state; it must never invent agent health, tool activity, progress, or success.

## North star

A human expresses an outcome by voice or chat. Aegis discovers the local environment, asks only necessary questions, creates a mission, decomposes it into tasks, selects agents/capabilities/providers, executes real work, observes and verifies results, recovers from failure, asks for approval at policy boundaries, and returns artifacts plus proof.

```text
Intent → Clarify → Mission → Plan → Capability discovery → Assign
→ Execute → Observe → Verify → Recover → Approve → Deliver → Learn
```

## Runtime layers

```text
Presence: voice, chat, live activity, browser/code previews
Governance: approvals, risk, budgets, audit trail, stop/pause
Orchestration: commander, planner, task graph, dispatcher, retries
Execution: native adapters, MCP adapters, n8n adapter, browser, filesystem, code
Intelligence: model/provider registry and routing policy
Memory: working, episodic, semantic, procedural, preferences
Foundation: local server, event bus, workspace, persistence, discovery
```

## Domain model

- **User** — source of intent and approval authority.
- **Goal** — desired outcome, can outlive a conversation.
- **Mission** — a goal in execution with plan, state, workspace and policy.
- **Task** — a bounded unit with inputs, dependencies, assignee, output and verification.
- **Agent** — role-based worker with instructions, memory scope and permissions.
- **Capability** — a typed contract, independent of its implementation.
- **Tool/adapter** — an implementation of a capability (native, MCP, CLI, n8n, provider).
- **Runtime** — process that performs work and emits events.
- **Artifact** — file, URL, report, commit, preview or evidence.
- **Lesson** — a tested, reusable correction; never promote raw failures directly to memory.
- **Approval** — policy-controlled human decision before side effects.

## Capability registry

Agents ask the registry what is available; they do not assume that tools exist. A capability record has:

```json
{
  "id": "browser.navigate",
  "type": "native",
  "provider": "chromium",
  "status": "ready",
  "local": true,
  "risk": "medium",
  "permissions": ["browser.read", "browser.write"],
  "input_schema": {},
  "output_schema": {},
  "dependencies": [],
  "verification": "page_loaded",
  "health": { "status": "healthy", "checked_at": "..." }
}
```

MCP, n8n and external products are adapters in this registry, not the brain. Aegis can choose n8n for an integration workflow, but the commander owns intent and routing.

## Mission lifecycle

```text
DRAFT → CLARIFYING → PLANNED → WAITING_APPROVAL → RUNNING
→ VERIFYING → COMPLETED
                 ↘ BLOCKED / FAILED / CANCELLED
```

Each transition emits a durable event. The event stream is the source for the UI, audit trail, replay and future learning.

## Agent roles

Commander, Planner, Researcher, Builder, Designer, Browser, Critic/QA, Deployment and Memory are roles—not hard-coded providers. Provider routing can map a role to Gemini, Claude, a local model, OpenCode, Hermes, or another available provider based on capability, quality, latency, cost and privacy.

## Safety and governance

Risk levels: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.

- Read-only local inspection: usually low.
- Writing local files or installing packages: medium.
- Sending, publishing, deploying or contacting people: high.
- Spending money, destructive actions or sensitive communication: critical.

The runtime pauses before a policy boundary. Approval contains the exact action, scope, reason, files/artifacts, risk and expiry. Every approval is audited.

## Self-correction

```text
failure → diagnosis → root cause → lesson candidate → replay/test → promote
```

A lesson becomes procedural memory only after a measurable test passes. Retries are bounded. The system must preserve the failing event and never claim success from a tool response alone.

## First boot / public install

Aegis performs a local audit of OS, CPU/RAM/GPU, Node, Python, Git, Docker, browsers, local models, CLIs, ports, services and MCP servers. Missing components are suggestions until the user approves installation. After installation, health checks refresh the registry.

## Golden end-to-end test

> Build a small marketing agency. Ask only required questions. Inspect available capabilities. Show a plan. After approval, assign real agents, create artifacts in a workspace, verify them, stop before external publishing, and return result plus evidence.

A feature is complete only when a real execution path, event stream, error handling, verification and UI reflection exist. UI-only mock success is not completion.
