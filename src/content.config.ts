import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { isLocale } from "./i18n/config";

// Notas: un archivo Markdown por nota y por idioma, en
// src/content/notas/<idioma>/[<subcarpetas>/]<slug>.md
// Las subcarpetas (p.ej. por año) son solo para ordenar el repo: no cambian la
// URL. El id de cada entrada es "<idioma>/<slug>". Guía completa en docs/notas.md.
const notas = defineCollection({
  loader: glob({
    base: "./src/content/notas",
    // Los archivos que empiezan por "_" (plantillas, borradores personales)
    // se ignoran.
    pattern: "*/**/[!_]*.md",
    generateId: ({ entry }) => {
      const [locale] = entry.split("/");
      if (!isLocale(locale)) {
        throw new Error(`Nota "${entry}": la primera carpeta debe ser un idioma (en, es).`);
      }
      const slug = entry.split("/").pop()!.replace(/\.md$/, "");
      return `${locale}/${slug}`;
    },
  }),
  schema: z.object({
    title: z.string(),
    // Resumen de 1-2 frases: se usa en el listado, en buscadores y al compartir.
    description: z.string().max(220),
    // Frase de la nota que se cita en el bloque de la home. Si falta, se usa `description`.
    highlight: z.string().max(200).optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Los borradores se ven en `npm run dev` pero no se publican.
    draft: z.boolean().default(false),
    // En una traducción: id de la nota original, p.ej. "es/hola-soy-yo".
    translationOf: z.string().optional(),
  }),
});

// Proyectos y experimentos: una sola colección, un archivo por idioma en
// src/content/proyectos/<idioma>/<slug>.md. El slug es el mismo en todos los
// idiomas (son nombres propios). Promover un experimento a proyecto es
// cambiar `kind` y poner `promotedOn`: no se mueve el archivo. Guía completa
// en docs/proyectos.md.
const proyectos = defineCollection({
  loader: glob({
    base: "./src/content/proyectos",
    pattern: "*/**/[!_]*.md",
    generateId: ({ entry }) => {
      const [locale] = entry.split("/");
      if (!isLocale(locale)) {
        throw new Error(`Proyecto "${entry}": la primera carpeta debe ser un idioma (en, es).`);
      }
      const slug = entry.split("/").pop()!.replace(/\.md$/, "");
      return `${locale}/${slug}`;
    },
  }),
  schema: z.object({
    title: z.string(),
    // Resumen de 1-2 frases: tarjeta, buscadores y al compartir.
    description: z.string().max(220),
    // project = inversión seria y a largo plazo; experiment = idea a prueba.
    kind: z.enum(["project", "experiment"]),
    status: z.enum(["active", "paused", "archived"]).default("active"),
    // Etiqueta corta sobre el título (ej. "Plataforma base").
    kicker: z.string(),
    // Solo experimentos: la pregunta que el experimento intenta responder.
    hypothesis: z.string().optional(),
    since: z.coerce.date().optional(),
    // Fecha en que un experimento pasó a ser proyecto.
    promotedOn: z.coerce.date().optional(),
    // Slugs de otros proyectos sobre los que está construido (ej. ["atlas"]).
    builtOn: z.array(z.string()).default([]),
    url: z.url().optional(),
    repo: z.url().optional(),
    license: z.string().optional(),
    // Nombres de src/data/technologies.ts.
    stack: z.array(z.string()).default([]),
    // Miniatura ilustrativa en la tarjeta (ver ProjectPreview.astro).
    preview: z.enum(["vault", "dashboard", "modules"]).optional(),
    // El destacado ocupa el bloque grande de su sección.
    featured: z.boolean().default(false),
    // Orden manual dentro de su sección (menor primero).
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notas, proyectos };
