# Proyectos y experimentos — guía práctica

Decisiones de producto en `docs/vision.md` §0 y §14. Esta guía es el "cómo".

- **Proyecto** (`kind: project`): algo en lo que invierto tiempo en serio porque creo que es importante, y en lo que voy a seguir trabajando.
- **Experimento** (`kind: experiment`): una idea a prueba, con una pregunta (`hypothesis`) que intenta responder.

## Flujo

1. Copia la carpeta `src/content/proyectos/_plantilla/` a `src/content/proyectos/<slug>/`.
2. Llena el frontmatter de `es.md` y escribe en el cuerpo qué es, por qué existe y qué estás aprendiendo. Si quieres la versión en inglés, crea `en.md` al lado.
3. Mientras tenga `draft: true` solo se ve en `npm run dev`. Quítalo para publicar.

## Dónde van los archivos

**Un proyecto es una carpeta**: sus textos (uno por idioma) y sus imágenes viven juntos.

```
src/content/proyectos/
  _plantilla/es.md         ← plantilla (las carpetas con "_" no se publican)
  atlas/
    es.md                  → /es/proyectos/atlas/
    en.md                  → /en/projects/atlas/
    diagrama-modulos.svg   ← imagen compartida por ambos idiomas
  faro/
    es.md                  → /es/experimentos/faro/   (kind: experiment)
    en.md                  → /en/experiments/faro/
```

- **El nombre de la carpeta es el slug** de la URL, igual en todos los idiomas. Minúsculas, sin tildes, con guiones. No lo cambies después de publicar (rompe enlaces compartidos).
- **El archivo se llama como el idioma**: `es.md`, `en.md`. Si solo existe uno, el selector de idioma lleva al índice del otro.
- La carpeta **no** depende de si es proyecto o experimento: eso lo decide `kind`. Así promover no mueve archivos.
- Borrar un proyecto es borrar su carpeta: no quedan imágenes sueltas en otro lado.

## Imágenes

Opcionales: solo donde aporten. Van en la carpeta del proyecto y se nombran según su tipo, para que se agrupen solas:

| Nombre | Para qué |
|---|---|
| `portada.webp` | Portada: arriba en la ficha y como **vista previa al compartir el enlace** (LinkedIn, WhatsApp). Una por proyecto, `.webp`, `.png` o `.jpg`, idealmente 1600×900. No se referencia desde el texto: basta con que exista. |
| `ui-<qué>.webp` | Capturas de la interfaz: `ui-boveda.webp`, `ui-simulador.webp`. |
| `diagrama-<qué>.svg` | Arquitectura y flujos (Excalidraw → SVG). Se muestran sobre fondo blanco para que se lean en modo oscuro. |
| `datos-<qué>.webp` | Modelos de datos, tablas, esquemas. |
| `demo.mp4` | Video demo (o `demo.webm`). Uno por proyecto. Se muestra arriba en la ficha en lugar de la portada, que pasa a ser su póster (la imagen antes de reproducir). Como la portada, no se referencia desde el texto. Idealmente corto y de pocos MB. |

Minúsculas, con guiones, sin tildes. Puedes subir capturas en `.png`: Astro las convierte a `.webp` liviano al publicar. Para usarlas en el texto, **siempre con `./`**, y el pie de foto en la línea siguiente (sin línea en blanco en medio), en cursiva y con la fecha de la captura:

```md
![Simulador de arranque a tamaño real](./ui-simulador.webp)
*Simulador de arranque · oct 2026*
```

La fecha hace que una captura vieja se lea como una foto de ese momento, no como algo desactualizado. Astro optimiza las imágenes solo (tamaño, formato y carga diferida). En **Café del Tiempo**, solo capturas con datos de prueba.

**El build vigila el orden:**
- Imagen referenciada que no existe → falla (`ImageNotFound`).
- Imagen en la carpeta que ningún idioma usa → falla (`Imagen sin usar: …`). Úsala o bórrala. La `portada` es la excepción.
- Cualquier otro archivo en la carpeta de un proyecto (un `.txt`, un video con otro nombre…) → falla (`Archivo no reconocido: …`).

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
