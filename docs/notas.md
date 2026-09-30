# Notas — guía para escribir y publicar

Sección personal de escritura del sitio: ideas, aprendizajes y pensamientos, sin calendario. Decisiones de producto en `docs/vision.md` §13.

## Flujo

1. Copia `src/content/notas/_plantilla.md` a `src/content/notas/es/<año>/<slug>.md`.
2. Escribe en Markdown. Mientras tenga `draft: true` solo se ve en `npm run dev`.
3. Cuando esté lista, quita `draft: true`.
4. (Opcional) En Claude Code: `/traducir-nota <ruta-de-la-nota>` crea la versión en inglés.
5. Revisa la traducción, haz commit y push a `main`: GitHub Pages publica solo.

## Dónde van los archivos

```
src/content/notas/
  _plantilla.md                  ← plantilla (los archivos con "_" no se publican)
  es/2026/hola-soy-yo.md          → /es/notas/hola-soy-yo/
  en/2026/hi-its-me.md            → /en/notes/hi-its-me/  (traducción, cuando exista)
```

- **La primera carpeta es el idioma** (`es`, `en`). Es obligatoria.
- **Las subcarpetas por año son solo orden**: no cambian la URL. Con cientos de notas, el repo sigue navegable.
- **El nombre del archivo es el slug** de la URL: `es/2026/mi-nota.md` → `/es/notas/mi-nota/`. Minúsculas, sin tildes, con guiones. No lo cambies después de publicar (rompe enlaces compartidos).
- El slug debe ser único **dentro de cada idioma**, aunque esté en otra carpeta de año.

## Frontmatter

| Campo | Obligatorio | Uso |
|---|---|---|
| `title` | sí | Título de la nota. |
| `description` | sí | 1–2 frases, máx. 220 caracteres. Se ve en el listado, en Google, en el RSS y al compartir. |
| `date` | sí | `AAAA-MM-DD`. Ordena las notas y agrupa por año. |
| `updated` | no | Fecha de una edición importante (va a los metadatos del artículo). |
| `tags` | no | Temas, p.ej. `[desarrollo, carrera]`. Cada uno genera su página. Mayúsculas y tildes dan igual para la URL (`Reflexión` → `/etiquetas/reflexion/`), pero conviene reutilizar siempre la misma forma. |
| `draft` | no | `true` = solo visible en desarrollo. |
| `translationOf` | solo en traducciones | Id de la original: `es/<slug>`. Enlaza ambas versiones (selector de idioma, hreflang, aviso "Traducida del español"). Si apunta a una nota que no existe, el build falla a propósito. |

## Qué genera el sitio

| Ruta (es / en) | Qué es |
|---|---|
| `/es/notas/` · `/en/notes/` | Índice: notas agrupadas por año, temas y enlace al RSS. |
| `/es/notas/pagina/2/` · `/en/notes/page/2/` | Páginas siguientes (20 notas por página, `NOTES_PER_PAGE` en `src/lib/notes.ts`). |
| `/es/notas/<slug>/` · `/en/notes/<slug>/` | Cada nota. |
| `/es/notas/etiquetas/<tema>/` · `/en/notes/tags/<topic>/` | Notas de un tema. |
| `/es/notas/rss.xml` · `/en/notes/rss.xml` | Feed RSS por idioma. |

Una nota sin traducción existe solo en su idioma: no aparece en el otro índice, y el selector de idioma lleva al índice de notas del otro idioma.

## Imágenes

Colócalas en `public/notas/<slug>/` y enlázalas con ruta absoluta: `![Descripción](/notas/mi-nota/diagrama.webp)`. Prefiere `.webp` y siempre escribe el texto alternativo.

## Código

La lógica vive en `src/lib/notes.ts` (consultas, rutas, traducciones, etiquetas, paginación) y `src/lib/notes-rss.ts`. Las vistas están en `src/components/notes/`; las páginas de `src/pages/{en,es}/...` son envoltorios de pocas líneas. El esquema del frontmatter está en `src/content.config.ts`.
