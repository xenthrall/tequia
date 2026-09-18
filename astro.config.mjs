// astro.config.mjs

import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Dominio propio (ver public/CNAME) servido en la raíz — sin `base`,
  // GitHub Pages ya no publica el sitio bajo /tequia/.
  site: "https://tequia.dev",

  // Ver docs/vision.md §11: inglés como idioma por defecto, ambos idiomas
  // con prefijo explícito (/en/, /es/) para que cualquiera de las dos rutas
  // sea igual de "compartible". `/` (sin prefijo) es un stub de detección,
  // no una ruta i18n — ver src/pages/index.astro.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    sitemap({
      // "/" es solo el stub de detección de idioma (canonical → /en/), no
      // una página de contenido — se excluye para no listar una URL
      // duplicada de /en/ en el sitemap.
      filter: (page) => page !== "https://tequia.dev/",
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // @formspree/ajax's "browser" field points to a global/IIFE build with
        // no ESM exports, which Vite picks over "module" by default. Force the
        // ESM build so named imports (initForm) resolve correctly.
        "@formspree/ajax": fileURLToPath(
          new URL("./node_modules/@formspree/ajax/dist/index.mjs", import.meta.url)
        ),
      },
    },
  },
});
