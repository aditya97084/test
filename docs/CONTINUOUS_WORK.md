# Continuous work, research and installation policy

## 24/7 model

Aegis can keep a goal alive, but a local process is not magically reliable when the machine sleeps. Production 24/7 mode requires a supervised worker (systemd/Docker/desktop service), durable event storage and a restart policy. The runtime must expose whether it is:

```text
FOREGROUND_LOCAL
SUPERVISED_LOCAL
REMOTE_WORKER
STOPPED
```

Never show `24/7` unless a worker heartbeat and durable queue are healthy.

## Tool detection and installation

On scan, Aegis detects installed CLIs such as Codex, Claude Code, OpenCode, Hermes, OpenClaw and Antigravity. It shows the exact status and what the tool can do. Missing tools produce an install plan, not an automatic shell command.

Installation flow:

```text
missing tool → compatible install plan → user approval → sandboxed installer
→ health check → capability registration → mission re-plan
```

Credentials and remote access always remain explicit.

## Research and fact checking

A research mission produces an artifact, not just a paragraph:

```json
{
  "question": "...",
  "claims": [{"text":"...","sources":["..."],"confidence":0.0,"checked_at":"..."}],
  "sources": [{"url":"...","title":"...","retrieved_at":"..."}],
  "limitations": [],
  "review_state":"pending"
}
```

For YouTube/video research, Aegis can search and use available metadata/transcripts. It must cite the video, separate observed facts from inference, and ask permission before storing personal or copyrighted content. “Learn the style” means derive an explicit style profile (structure, pacing, vocabulary, visual rhythm) from permitted references; it must not clone a creator's identity or silently train a model.
