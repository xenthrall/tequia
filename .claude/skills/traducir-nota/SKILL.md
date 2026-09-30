---
name: traducir-nota
description: Traduce una nota de src/content/notas/es/ al inglés y la enlaza como traducción. Úsala cuando Jhon pida traducir una nota o ejecute /traducir-nota.
argument-hint: <ruta de la nota en español, o su slug>
---

# Traducir una nota al inglés

Crea la versión en inglés de una nota escrita en español, siguiendo `docs/notas.md`.

## Pasos

1. **Ubica la original.** El argumento puede ser una ruta (`src/content/notas/es/2026/mi-nota.md`) o solo el slug (`mi-nota`); búscala en `src/content/notas/es/**`. Si no se indica ninguna, lista las notas en español que aún no tienen traducción (ninguna nota en `src/content/notas/en/**` con `translationOf: es/<slug>`) y pregunta cuál.
2. **Comprueba que no exista ya** una traducción con `translationOf: es/<slug>`. Si existe, pregunta si hay que actualizarla (p.ej. porque la original cambió) en vez de crear otra.
3. **Traduce con la voz de Jhon**, no literal: primera persona, tono cercano y directo, frases naturales en inglés. Conserva la estructura (títulos, listas, énfasis), los bloques de código tal cual (traduce solo sus comentarios si aportan) y los nombres propios.
4. **Adapta los enlaces internos** al inglés: `/es/notas/` → `/en/notes/`, `/es/notas/rss.xml` → `/en/notes/rss.xml`, `/es/<página>/` → `/en/<página>/`. Si enlaza otra nota en español que tiene traducción, apunta a la traducción.
5. **Frontmatter** del archivo nuevo:
   - `title` y `description` traducidos (`description` ≤ 220 caracteres).
   - `date` igual a la original; `updated` solo si la original lo tiene.
   - `tags` traducidos, reutilizando los que ya existan en `src/content/notas/en/**` cuando signifiquen lo mismo (revisa antes con grep).
   - `translationOf: es/<slug-original>`.
   - `draft` igual al de la original.
6. **Nombre del archivo**: slug en inglés (minúsculas, guiones, sin tildes), en la misma carpeta de año: `src/content/notas/en/<año>/<slug-en>.md`.
7. **Verifica** con `npm run build` (valida el esquema y el `translationOf`).
8. **Resume** para Jhon: ruta creada, URL resultante (`/en/notes/<slug-en>/`) y cualquier frase donde hayas tenido que interpretar el sentido, para que la revise. No hagas commit salvo que lo pida.
