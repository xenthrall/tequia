---
title: Plymotion
description: App de escritorio que convierte cualquier video o GIF en la animación de arranque (Plymouth) de tu Linux. El foco es Ubuntu con GNOME.
kind: experiment
status: active
kicker: Escritorio Linux
hypothesis: ¿Puede personalizar la animación de arranque de Linux ser tan fácil como elegir un video, sin tocar la terminal ni arriesgar el sistema?
since: 2025-10-01
repo: https://github.com/xenthrall/plymotion
license: MIT
stack: [Python, FastAPI, React, TypeScript, Vite, Tailwind CSS]
---

<!-- Jhon: revisa la hipótesis y amplía con tus palabras. -->

Plymotion toma un video o GIF, lo recorta y lo convierte en un tema de Plymouth listo para instalar. Antes de reiniciar, un simulador te muestra cómo se va a ver el arranque.

## Lo que estoy probando

- Una app de escritorio local (FastAPI y React en una ventana nativa) que no se instala en el sistema y no deja nada corriendo al cerrarla.
- Cambiar partes delicadas del sistema de forma segura: backup automático, un solo prompt de `pkexec` por acción y un tema roto que nunca impide arrancar.
