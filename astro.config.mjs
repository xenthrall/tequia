// astro.config.mjs

import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://xenthrall.github.io",
  base: "/tequia",

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
