# Antigravity / coding-agent handoff

You are setting up Aegis, a local-first Personal Autonomous Work OS. Do not treat it as a static dashboard or rewrite the UI before understanding the runtime.

## First boot

```bash
npm install --no-audit --no-fund
npm run setup
npm run dev
```

Open `http://localhost:5173`.

## Read before changing code

1. `docs/ARCHITECTURE.md`
2. `docs/REAL_RUNTIME_CONTRACT.md`
3. `docs/TOOL_REGISTRY.md`
4. `docs/POSTIZ_PATTERN.md`
5. `docs/ROADMAP.md`
6. `docs/AUDIT_2026-09-15.md`

## Non-negotiable architecture

- UI renders real runtime state; no fake agent counts, health, progress or success.
- Discover the machine and tools before assigning work.
- Capabilities are contracts; tools/providers are adapters.
- Commander owns intent and routing. Paperclip, n8n and MCP do not replace it.
- Every task needs an execution adapter, an event trail, an artifact/evidence result and verification.
- External communication, publishing, deployment, spending, destructive actions and installs require approval.
- A failure can create a lesson candidate; only a tested lesson becomes procedural memory.
- Keep provider-specific code out of the UI.

## First implementation priority

Build the durable orchestrator and real adapters in this order:

1. persisted missions/tasks/events
2. worker heartbeat and queue leases
3. native workspace/repository adapter
4. Hermes adapter
5. Codex/Claude Code/OpenCode adapters
6. OpenClaw gateway adapter
7. MCP discovery and permission mapping
8. Paperclip control-plane adapter
9. Gemini voice/vision adapter
10. browser and fact-check workers

Before declaring a feature done, run the API audit and `npx vite build`. If a provider is missing, show `NOT CONFIGURED` or `ADAPTER REQUIRED`; never simulate it.
