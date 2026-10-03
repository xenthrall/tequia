---
title: harbor-node
description: A daemon that runs AI coding agents and terminal sessions on remote servers, streaming them to Harbor over an outbound connection.
kind: experiment
status: active
kicker: Remote agents
hypothesis: Can a lightweight daemon keep an agent or terminal session alive on a remote server, even when the connection drops, without opening any ports?
since: 2026-09-02
repo: https://github.com/xenthrall/harbor-node
license: MIT
stack: [Go]
---

harbor-node is Harbor's remote worker. It connects outward over WebSocket, supervises a process inside a PTY (`bash` by default) and streams its input and output through that channel.

## What I'm testing

- Reconnecting with exponential backoff without killing the supervised process: if the connection drops, the session stays alive and picks up again when it's back.
- A message protocol that's still provisional, before writing Harbor's formal specification.
