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

## Creating a theme

You pick a video or GIF and adjust the size, FPS and number of colors. A smaller size and fewer colors mean a faster boot.

![Theme creation screen, waiting for a video or GIF](./ui-crear-tema.png)
*Create theme · Oct 2026*

On the timeline you trim the clip and see live how many frames you'll get and how long the loop lasts. A real boot only takes a few seconds, so a short clip looks better than a long video.

![Trimming a GIF with frames and loop length calculated live](./ui-recorte.png)
*Trimming and settings · Oct 2026*

## Testing it without rebooting

The simulator plays the theme the way Plymouth will: at 50 Hz, at real size, on a simulated screen at the resolution you choose.

![Boot simulator showing the animation centered on a black background](./ui-simulador.png)
*Boot simulator · Oct 2026*

## Gallery and system

The themes you generate stay in a gallery, animated on hover, and install with one click.

![Gallery of generated themes with their resolution, frames, length and size](./ui-galeria.png)
*Gallery · Oct 2026*

The System view lists every installed theme and which one is active. If something goes wrong there's always a way out: a broken theme never prevents booting.

![Themes installed on the system, with the active one marked and recovery help](./ui-sistema.png)
*System · Oct 2026*

## Login logo

It also replaces the logo GDM shows on the login screen, with a real-size preview before applying it.

![Preview of the custom logo on a replica of the login screen](./ui-logo-login.png)
*Login logo · Oct 2026*

## What I'm testing

- A local desktop app (FastAPI and React in a native window) that isn't installed on the system and leaves nothing running when you close it.
- Changing sensitive parts of the system safely: automatic backups, a single `pkexec` prompt per action, and a broken theme that never prevents booting.
