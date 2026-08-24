// GitHub Pages de proyecto sirve el sitio bajo un subpath (p.ej. "/tequia/",
// ver `base` en astro.config.mjs). Astro no reescribe automáticamente los
// atributos src/href que apuntan a archivos de `public/` ni las URLs usadas
// en fetch() en runtime — solo lo hace para rutas de página y assets
// procesados por `astro:assets`. Este helper centraliza ese prefijo para
// cualquier referencia a un archivo público (favicon, imágenes, música).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
