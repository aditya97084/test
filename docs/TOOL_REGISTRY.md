# Tool knowledge and Paperclip boundary

Aegis must know what a tool can do before assigning work. The registry is the source of truth; UI cards are projections of it.

Each tool declares:

- `description`: plain-language explanation for the user
- `capabilities`: typed actions it can perform
- `status` and `health`: discovered runtime state, never guessed
- `risk`: approval policy input
- `requires`: dependencies or credentials
- `adapter`: native, Hermes, Gemini, MCP, n8n, Paperclip, browser or provider
- `usage`: how the commander should invoke it

## Paperclip

Paperclip is an optional **control-plane adapter**, not Aegis's brain. Aegis remains the commander and capability router. Paperclip can provide:

- organization/company structure
- agent registration and reporting lines
- goals and heartbeat scheduling
- budgets and governance
- pause/resume/override controls

Aegis adds what Paperclip does not own: local environment discovery, browser/desktop/camera/voice, unified memory, provider routing, mission workspaces, verification and the final human conversation.

When Paperclip is not installed, the registry must say `not_configured`; Aegis must not manufacture a connected organization.

## Example assignment

```text
Goal: research competitors and create a launch site

Required capabilities:
- web.search, browser.read
- workspace.write
- runtime.node
- artifact.create
- review.verify

Available implementations:
- Browser Agent: adapter_required
- Workspace Files: ready
- Git: detected
- Hermes: not_configured
- Paperclip: not_configured

Decision:
Use ready local capabilities now, ask to configure browser/Hermes if needed,
show the user the plan, then require approval before writes or publishing.
```
