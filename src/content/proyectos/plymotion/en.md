---
title: Plymotion
description: A desktop app that turns any video or GIF into your Linux boot animation (Plymouth). Focused on Ubuntu with GNOME.
kind: experiment
status: active
kicker: Linux desktop
hypothesis: Can customizing the Linux boot animation be as easy as picking a video, without touching the terminal or putting the system at risk?
since: 2025-10-01
repo: https://github.com/xenthrall/plymotion
license: MIT
stack: [Python, FastAPI, React, TypeScript, Vite, Tailwind CSS]
---

Plymotion takes a video or GIF, trims it and turns it into a Plymouth theme ready to install. Before you reboot, a simulator shows you how the boot screen will look.

## What I'm testing

- A local desktop app (FastAPI and React in a native window) that isn't installed on the system and leaves nothing running when you close it.
- Changing sensitive parts of the system safely: automatic backups, a single `pkexec` prompt per action, and a broken theme that never prevents booting.
