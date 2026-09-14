# Aegis build order

## P0 — Runtime spine (implemented in this slice)

- Local HTTP runtime with health endpoint
- Environment discovery (Node, Python, Git, Docker, browser hints)
- Capability registry with real health state
- Mission/task domain records
- SSE event stream
- Approval endpoint and audit events
- No fake connected providers

## P1 — Real local execution

- Workspace manager with path sandboxing
- Native filesystem and terminal adapters
- Command allowlist and approval policy
- Artifact manifest and verification hooks
- Mission persistence (SQLite or JSONL event store)

## P2 — Orchestration

- Requirement extractor and clarification state
- Task graph and dependency scheduler
- Agent registry and role-based routing
- Bounded retries and pause/resume/cancel
- Critic → fixer → verification loop

## P3 — Interoperability

- MCP adapter with server discovery and permission mapping
- Provider/model registry and fallback routing
- n8n adapter for integrations, never as the commander
- Browser adapter with isolated profiles

## P4 — Human presence

- Central voice pipeline (STT → commander → TTS)
- Live browser/code workspace
- Agent rooms and per-capability chat
- Camera/vision as an optional permissioned capability

## P5 — Distribution

- First-run installer and system audit
- Docker/desktop packaging
- Local-only default
- Tailscale/Cloudflare remote access guide
- Import/export of agent profiles, skills and memory

The 3D layer is last: it renders the real event stream and never animates simulated work.
