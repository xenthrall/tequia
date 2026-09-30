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
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Los borradores se ven en `npm run dev` pero no se publican.
    draft: z.boolean().default(false),
    // En una traducción: id de la nota original, p.ej. "es/hola-soy-yo".
    translationOf: z.string().optional(),
  }),
});

export const collections = { notas };
