---
title: harbor-node
description: Daemon que corre agentes de IA y sesiones de terminal en servidores remotos, y las transmite a Harbor por una conexión saliente.
kind: experiment
status: active
kicker: Agentes remotos
hypothesis: ¿Puede un daemon liviano mantener viva una sesión de agente o terminal en un servidor remoto, aunque se caiga la conexión, sin abrir puertos?
since: 2026-09-02
repo: https://github.com/xenthrall/harbor-node
license: MIT
stack: [Go]
---

<!-- Jhon: revisa la hipótesis y amplía con tus palabras. Ideas: qué es Harbor y qué falta para la siguiente prueba. -->

harbor-node es el trabajador remoto de Harbor. Se conecta hacia afuera por WebSocket, supervisa un proceso dentro de un PTY (por defecto `bash`) y transmite su entrada y salida por ese canal.

## Lo que estoy probando

- Reconexión con backoff exponencial sin matar el proceso supervisado: si se cae la conexión, la sesión sigue viva y se retoma al volver.
- Un protocolo de mensajes todavía provisional, antes de escribir la especificación formal de Harbor.
