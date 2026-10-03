# Proyectos y experimentos — guía práctica

Decisiones de producto en `docs/vision.md` §0 y §14. Esta guía es el "cómo".

- **Proyecto** (`kind: project`): algo en lo que invierto tiempo en serio porque creo que es importante, y en lo que voy a seguir trabajando.
- **Experimento** (`kind: experiment`): una idea a prueba, con una pregunta (`hypothesis`) que intenta responder.

## Flujo

1. Copia `src/content/proyectos/_plantilla.md` a `src/content/proyectos/es/<slug>.md` (y su par en `en/` si quieres la versión en inglés).
2. Llena el frontmatter y escribe en el cuerpo qué es, por qué existe y qué estás aprendiendo.
3. Mientras tenga `draft: true` solo se ve en `npm run dev`. Quítalo para publicar.

## Dónde van los archivos

```
src/content/proyectos/
  _plantilla.md          ← plantilla (los archivos con "_" no se publican)
  es/atlas.md            → /es/proyectos/atlas/
  en/atlas.md            → /en/projects/atlas/
  es/faro.md             → /es/experimentos/faro/   (kind: experiment)
```

- **La primera carpeta es el idioma** (`es`, `en`).
- **El slug (nombre del archivo) es el mismo en ambos idiomas**: así el sitio sabe que `es/atlas.md` y `en/atlas.md` son el mismo proyecto (selector de idioma, hreflang). Si solo existe en un idioma, el selector lleva al índice del otro.
- La carpeta del archivo **no** depende de si es proyecto o experimento: eso lo decide `kind`. Así promover no mueve archivos.

## Frontmatter

| Campo | Obligatorio | Uso |
|---|---|---|
| `title` | sí | Nombre. |
| `description` | sí | 1–2 frases, máx. 220 caracteres. Tarjeta, Google y al compartir. |
| `kind` | sí | `project` o `experiment`. |
| `status` | no | `active` (por defecto), `paused` o `archived`. En experimentos se muestran como "En curso", "En pausa" y "Descartado". |
| `kicker` | sí | Etiqueta corta sobre el título ("Plataforma base"). |
| `hypothesis` | en experimentos | La pregunta que el experimento intenta responder. Se destaca en la tarjeta y en la ficha. |
| `since` | no | `AAAA-MM-DD`. Se muestra como "Desde ago 2026". |
| `promotedOn` | al promover | Fecha en que un experimento pasó a ser proyecto. Solo con `kind: project`. |
| `builtOn` | no | Slugs de proyectos sobre los que está construido, p.ej. `[atlas]`. La ficha del otro muestra "Base de: …" sola. Si el slug no existe, el build falla. |
| `url` / `repo` | no | Sitio o demo, y repositorio. |
| `license` | no | P.ej. `MIT`. Muestra la insignia "Open source · MIT". |
| `stack` | no | Nombres de `src/data/technologies.ts`. Para una tecnología nueva, agrégala ahí primero (si no, el build falla). |
| `preview` | no | Miniatura ilustrativa: `vault`, `dashboard` o `modules` (`src/components/ProjectPreview.astro`). |
| `featured` | no | Ocupa el bloque grande de su sección. Uno por sección. |
| `order` | no | Orden manual dentro de la sección (menor primero; por defecto 100). |
| `draft` | no | `true` = solo visible en desarrollo. |

## El ciclo de vida de un experimento

**Funcionó → se promueve a proyecto.** En sus archivos (`es/` y `en/`):

```yaml
kind: project          # antes: experiment
promotedOn: 2026-12-01
# hypothesis puede quedarse: la ficha la sigue mostrando como "La pregunta"
```

La URL vieja `/es/experimentos/<slug>/` sigue funcionando: redirige sola a `/es/proyectos/<slug>/`, y la ficha muestra "Empezó como experimento · promovido en dic 2026".

**No funcionó → se archiva, no se borra.**

```yaml
status: archived
```

Y escribe en el cuerpo qué aprendiste. Mostrar lo que no salió es parte de la identidad del sitio.
