# Visión del proyecto — tequia.dev

> Documento vivo. Última actualización: 2026-09-18.
> Objetivo: dejar por escrito hacia dónde va este sitio antes de tocar código, para que cada cambio futuro (copy, rutas, componentes) se pueda evaluar contra un criterio claro.

## 1. Objetivo de negocio

Jhon quiere usar tequia.dev como su activo principal de posicionamiento para dar el salto al freelance / trabajo remoto, sirviendo a **dos públicos con intención distinta**:

1. **Dueños de negocio / decisores no técnicos** que necesitan digitalizar procesos, construir un sistema a medida o un MVP → deberían terminar en una **oferta de servicios B2B** (qué hago, para quién, cómo es el proceso, cómo contactar).
2. **Reclutadores técnicos / empresas contratando talento** (full-time o por proyecto) → deberían terminar en una página tipo **currículum digital** (`/hire-me`): experiencia, stack, disponibilidad, forma de contacto directa.

Hoy el sitio no distingue entre ambos. Todo visitante ve lo mismo, sin importar si busca "contratar un servicio" o "contratar una persona".

## 2. Auditoría del estado actual

**Stack:** Astro 7 + TypeScript + Tailwind v4, desplegado como sitio estático en GitHub Pages con dominio propio (`tequia.dev`, ver `public/CNAME`). Una sola página (`src/pages/index.astro`), sin routing adicional.

**Estructura actual de la home (de arriba a abajo):**
1. `Header` — solo un botón de cambio de tema (claro/oscuro).
2. `Profile` — avatar, nombre, rol (`"Software Developer · Laravel & PHP · Builder"`), descripción genérica, iconos de redes (Instagram, WhatsApp, GitHub).
3. `Projects` — 3 proyectos (Nexo, Faro, Atlas) con stack técnico, sin métricas de impacto de negocio.
4. `Links` — estilo "linktree": Instagram, WhatsApp, GitHub.
5. `Contact` — un único formulario genérico (nombre, correo, teléfono, mensaje vía Formspree) + botón de WhatsApp.
6. `Footer` — copyright + enlaces "Privacy"/"Terms" que son placeholders (`href="#"`, no funcionales).

**Extras existentes:**
- Un **chatbot** propio (`src/chatbot/`) con intents por palabras clave (quién es Jhon, stack, experiencia, proyectos, servicios, contacto, disponibilidad, etc.). Es la pieza más "inteligente" del sitio y ahora mismo no diferencia audiencia.
- SEO mínimo: un solo `<title>` y `<meta description>` estáticos en `Layout.astro`, sin Open Graph/Twitter cards, sin JSON-LD (`Person`/`ProfessionalService`), sin sitemap ni robots.txt explícitos.
- Commit reciente (`a5c9f30`) eliminó secciones de cine/música para simplificar la home — ya hay una intención previa de enfocar el sitio, buena base para continuar en esa dirección.

**Diagnóstico:** el sitio funciona como una **tarjeta de presentación tipo "linktree"**, no como una herramienta de conversión. No hay bifurcación de audiencia, no hay prueba social (testimonios), no hay CV descargable ni LinkedIn, los proyectos se presentan como piezas técnicas y no como casos de negocio, y el único formulario de contacto es genérico para cualquier tipo de visitante.

## 3. Problema central

> El sitio no le pide nada al visitante ni le dice adónde ir. Un reclutador y un dueño de pyme ven exactamente la misma página, con el mismo lenguaje técnico, y ninguno de los dos encuentra rápido lo que necesita para decidir.

## 4. Los dos públicos y qué necesita cada uno

| | Dueño de negocio / cliente B2B | Reclutador técnico / empresa contratante |
|---|---|---|
| **Busca** | Resolver un problema de negocio (digitalizar, automatizar, construir un sistema) | Evaluar si Jhon encaja en un rol/equipo |
| **Lenguaje que entiende** | Resultados, tiempos, costos, "¿cómo me ayuda esto a vender/operar mejor?" | Stack, seniority, experiencia verificable, disponibilidad |
| **Necesita ver** | Casos de éxito con impacto de negocio, proceso de trabajo, forma de cotizar | Historial laboral, proyectos técnicos, CV descargable, LinkedIn, disponibilidad, modalidad (remoto/full-time) |
| **CTA ideal** | "Cuéntame tu proyecto" / WhatsApp / formulario de negocio | Ir a `/hire-me`, descargar CV, LinkedIn, agendar llamada |
| **Fricción actual** | Ve un formulario genérico y proyectos con stack técnico sin contexto de negocio | No hay página de CV, no hay LinkedIn, no hay disponibilidad ni modalidad de trabajo visible |

## 5. Arquitectura de información propuesta

**Home (`/`) como bifurcador, no como todo-en-uno.**
Debajo de la presentación breve, dos tarjetas/CTAs igual de visibles y explícitas, por ejemplo:
- 🏢 **"Tengo un negocio y quiero digitalizarlo"** → ancla o página de servicios.
- 👔 **"Soy reclutador / busco talento para mi equipo"** → `/hire-me`.

El resto de la home se simplifica: menos "linktree personal" (Instagram puede bajar de prioridad o ir al footer) y más prueba de trabajo condensada.

**`/hire-me` (nueva página, orientada a reclutadores):**
- Encabezado tipo CV: rol objetivo, años de experiencia, disponibilidad (full-time / freelance / ambos) y modalidad (remoto, híbrido, ubicación).
- Timeline de experiencia (ej. Operación Sistémica S.A.S. como Full Stack Laravel).
- Stack técnico agrupado por relevancia (backend, frontend, infra).
- Proyectos como evidencia técnica (Nexo, Faro, Atlas) con enfoque en arquitectura/decisiones técnicas.
- CV descargable en PDF.
- Enlace a LinkedIn (falta hoy — ver sección 7).
- Un único CTA claro: agendar llamada / escribir directamente para procesos de contratación.

**Sección o página de servicios (orientada a negocios, puede vivir en `/` o en `/servicios`):**
- Para quién es (pymes, negocios que necesitan digitalizar procesos, MVPs).
- Paquetes/tipos de servicio (ej. sistema a medida, automatización, mantenimiento, consultoría técnica) — no hace falta precio exacto, pero sí dar una señal ("cotización a medida según alcance").
- Proceso de trabajo (descubrimiento → propuesta → desarrollo → entrega/soporte) para bajar la incertidumbre de contratar a un freelancer.
- Casos de éxito reformulados con lenguaje de negocio: qué problema resolvía, qué logró (ej. Faro: "sistema de gestión para pequeños negocios con infraestructura de costo mínimo" ya apunta bien a esto, falta el resultado).
- Formulario de contacto específico para negocio (tipo de proyecto, presupuesto estimado) — distinto del formulario genérico actual.

**Chatbot como router activo:** ya existe la infraestructura de intents; se puede añadir una pregunta temprana ("¿buscas un servicio para tu negocio o estás evaluando contratar talento?") que dirija a `/hire-me` o a servicios, reforzando la bifurcación también en el chat.

## 6. Gaps identificados (para roadmap)

1. Sin rutas adicionales — todo vive en `index.astro`.
2. Sin página de CV/reclutamiento (`/hire-me`).
3. Sin oferta de servicios B2B explícita (paquetes, proceso, para quién).
4. Sin LinkedIn (clave para reclutadores) — solo Instagram, WhatsApp, GitHub.
5. Sin CV descargable.
6. Sin prueba social (testimonios de clientes o compañeros de trabajo) — confirmado que aún no existen, se resuelve más adelante.
7. Sin diferenciación de formularios de contacto por tipo de visitante.
8. Proyectos presentados como stack técnico, no como casos de negocio con resultados.
9. SEO básico ausente: OG/Twitter cards, JSON-LD `Person`, sitemap.
10. Sin analítica — hoy no hay forma de saber qué visitantes llegan ni qué hacen.
11. Footer con enlaces placeholder ("Privacy"/"Terms" → `#`).
12. Todo el contenido está en español — si se apunta a mercado remoto/internacional, `/hire-me` en inglés puede ser valioso.

## 7. Roadmap propuesto (por fases)

**Fase 0 — Este documento.** Alinear visión antes de tocar código.

**Fase 1 — Estructura, bifurcación e idioma. ✅ Implementada (2026-09-18)**
- [x] Enrutamiento por idioma (`/en/`, `/es/`) con inglés como default de config, `/` como stub de detección — ver sección 11.
- [x] Home rediseñada como bifurcador (`AudienceSplit`: dos CTAs hacia `/services` y `/hire-me`).
- [x] `/hire-me` con encabezado tipo CV (ubicación, disponibilidad, modalidad), stack, experiencia, formación y botón de descarga de CV.
- [x] `/services` con paquetes, proceso de trabajo y CTA de contacto orientado a negocio.
- [x] SEO básico: canonical + `hreflang` (incluye `x-default`) por página, OG/Twitter cards, JSON-LD `Person`, sitemap con anotaciones de idioma (`@astrojs/sitemap`), `robots.txt`.
- [x] Chatbot traducido (intents, quick replies y copy de la UI) y activo en ambos idiomas.
- [ ] LinkedIn en los enlaces sociales — **pendiente**, sigue bloqueado por la sección 12 (no se fabricó una URL).
- [ ] CV en PDF real — la ruta `/cv/jhon-tequia.pdf` ya está enlazada desde `/hire-me` en ambos idiomas, pero el archivo aún no existe en `public/cv/`; hoy el botón de descarga da 404 hasta que Jhon entregue el PDF.

**Fase 2 — Contenido y prueba de valor.**
- Reescribir el copy de cada sección con el lenguaje correcto por audiencia.
- Reformular proyectos como casos con resultado de negocio (para servicios) y con profundidad técnica (para `/hire-me`).
- CV descargable en PDF.
- Testimonios si existen (o pedirlos a clientes/excompañeros).

**Fase 3 — Medición y crecimiento.**
- Analítica ligera (ej. Plausible/Umami, respetuosa de privacidad) segmentada por página/CTA.
- Formularios diferenciados por audiencia con campos relevantes (tipo de proyecto/presupuesto vs. tipo de rol/disponibilidad).
- Contenido adicional (casos de estudio extendidos, blog) para SEO de largo plazo si hay tiempo/interés.
- Versión en inglés de `/hire-me` (confirmado para esta fase, no antes, aunque el objetivo remoto internacional ya existe hoy).

## 8. Métricas de éxito

- Clics diferenciados en los dos CTAs de la home (negocio vs. reclutador).
- Visitas y conversiones (contacto, descarga de CV) en `/hire-me` vs. sección de servicios.
- Envíos del formulario de contacto, segmentados por tipo de visitante.
- Clics en WhatsApp vs. formulario vs. LinkedIn.
- (Si se activa el chatbot como router) cuántas conversaciones eligen "negocio" vs. "reclutador".

## 9. Decisiones confirmadas (input de Jhon, 2026-09-18)

- **Disponibilidad:** ambos — abierto a full-time y a freelance por proyecto, sin preferencia marcada. `/hire-me` y la sección de servicios deben coexistir sin que una reste peso a la otra.
- **Modalidad y ubicación:** actualmente en Bogotá, abierto a híbrido/presencial local con posibilidad de reubicación, y también a remoto internacional. `/hire-me` debe mostrar esto explícitamente (ubicación actual + apertura a reubicación + remoto) para no filtrar oportunidades por defecto.
- **CV:** ya existe un CV en PDF actualizado — se enlaza/descarga directo desde `/hire-me` (falta que Jhon lo entregue como archivo para incluirlo en `public/`).
- **LinkedIn:** no confirmado como activo — pendiente crear/activar el perfil y enlazarlo junto al CV en `/hire-me` y en `social-links.ts`.
- **Precios en servicios B2B:** solo "cotización a medida", sin cifras públicas. El CTA de servicios debe llevar a conversación (formulario/WhatsApp), no a una tabla de precios.
- **Testimonios:** no hay ninguno todavía. La sección de prueba social queda fuera de la Fase 1/2 y se agrega más adelante cuando existan (Operación Sistémica S.A.S. o algún cliente freelance son las fuentes más probables).
- ~~**Versión en inglés de `/hire-me`:** no es prioridad de Fase 1...~~ **Superado (2026-09-18):** se decidió construir el sitio completo como bilingüe (`/en/`, `/es/`) desde la Fase 1, no solo `/hire-me`. Ver sección 11.

## 11. Internacionalización (i18n) — arquitectura y SEO

**Decisión (2026-09-18):** el sitio pasa a ser bilingüe (inglés/español) desde la Fase 1, con soporte pensado para agregar más idiomas después. Justificación de negocio: Jhon apunta tanto a mercado local (Bogotá/Colombia, híbrido/presencial) como a remoto internacional, y quiere poder compartir un link específico por audiencia (`tequia.dev/es` a mercado local, `tequia.dev/en` a mercado internacional).

**Ruteo:**
- Cada idioma vive en su propia URL real y con contenido propio: `/en/*` y `/es/*`. Nunca "un solo HTML traducido por JS".
- Se implementa con el [i18n routing nativo de Astro](https://docs.astro.build/en/guides/internationalization/): `defaultLocale: "en"`, `locales: ["en", "es"]`, `routing.prefixDefaultLocale: true` (para que el inglés también tenga prefijo `/en/` explícito y sea igual de "compartible" que `/es/`).
- Config centralizada en un archivo propio (ej. `src/i18n/config.ts`) con la lista de idiomas disponibles y sus etiquetas — alimenta tanto la config de Astro como el selector de idioma, para que agregar un tercer idioma en el futuro sea un solo punto de cambio.

**Qué pasa en la raíz (`tequia.dev/`):**
- No es una página de contenido real: es un stub delgado con `rel="canonical"` hacia `/en/`, etiquetas `hreflang` recíprocas (`hreflang="en"` → `/en/`, `hreflang="es"` → `/es/`, `hreflang="x-default"` → `/en/`), y un redirect por JS en el cliente.
- **Regla de detección confirmada:** si `navigator.language` empieza en `es`, redirige a `/es/`; en cualquier otro caso (inglés, otro idioma, o si no se puede detectar), redirige a `/en/` (el default de config). Esto da una mejor primera impresión a quien llega sin contexto (ej. alguien de Colombia que encontró el dominio pelado) sin contradecir que el default de negocio sea inglés.
- Esta lógica es solo para visitantes reales vía JS; los crawlers ven el canonical + hreflang del stub y indexan `/en/` y `/es/` de forma independiente, sin duplicar contenido ni perder ranking.

**Selector de idioma (UI):**
- Icono junto al botón de tema en el `Header`. Al hacer clic despliega las opciones disponibles (leídas del config, hoy: English / Español).
- Cambia de idioma preservando la página actual (`/es/hire-me` ↔ `/en/hire-me`, no vuelve a home).
- Guarda la elección en `localStorage` solo como conveniencia para visitas futuras al dominio pelado (`/`) — nunca sobreescribe una URL con prefijo de idioma explícito a la que el usuario ya entró directamente.

**SEO:**
- Cada página localizada (`/en/...`, `/es/...`) declara canonical a sí misma y `hreflang` alternate hacia sus pares — es el patrón que usan sitios como Stripe o Airbnb para no competir consigo mismos en buscadores.
- Sitemap (`@astrojs/sitemap`) debe incluir ambas rutas por página con sus anotaciones de idioma.
- El default de idioma (inglés) no afecta el posicionamiento de la versión en español: Google indexa y posiciona cada URL según su propio idioma y contenido, no según cuál sea "la default".

**Estrategia de contenido:**
- Con solo dos idiomas y este tamaño de sitio, se duplica por archivo en vez de armar un sistema de diccionario/traducción genérico (sería sobre-ingeniería). Ej.: `profile.en.ts` / `profile.es.ts`, mismo patrón para `projects`, `contact`, y las respuestas del chatbot.

## 12. Decisiones aún pendientes

- Entregar el archivo del CV en PDF para incluirlo en el sitio (posiblemente en dos idiomas si aplica).
- Crear/activar y compartir el enlace de LinkedIn.
- Confirmar si el enfoque "linktree" (Instagram, etc.) se conserva tal cual o se relega a footer para no restar seriedad profesional frente a ambas audiencias.
