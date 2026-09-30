export type Locale = "en" | "es";

export interface LocaleInfo {
  code: Locale;
  label: string;
  htmlLang: string;
}

// Idioma que responde el dominio pelado (tequia.dev) y target por defecto
// para hreflang="x-default". Ver docs/vision.md §11.
export const defaultLocale: Locale = "en";

// Idiomas soportados. Agregar uno nuevo (ej. "pt") es: añadirlo aquí y crear
// los archivos de contenido `*.pt.ts` que el resto del código espera.
export const locales: LocaleInfo[] = [
  { code: "en", label: "English", htmlLang: "en" },
  { code: "es", label: "Español", htmlLang: "es" },
];

export const siteUrl = "https://tequia.dev";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale.code === value);
}

// Quita el prefijo de idioma ("/en", "/es") de una ruta, dejando la parte
// que es igual en todos los idiomas ("/", "/hire-me", "/services").
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|es)(\/.*|$)/);
  return match ? match[2] || "/" : pathname;
}

// Construye la ruta equivalente en otro idioma a partir de la ruta actual,
// preservando la página (usada por el selector de idioma y por hreflang).
export function localizedPath(pathname: string, locale: Locale): string {
  const bare = stripLocale(pathname);
  const normalized = bare === "/" ? "" : bare.replace(/\/$/, "");
  return `/${locale}${normalized}/`;
}

export function alternateLinks(pathname: string): { locale: Locale; href: string }[] {
  return locales.map(({ code }) => ({
    locale: code,
    href: `${siteUrl}${localizedPath(pathname, code)}`,
  }));
}

// Segmentos de URL de la sección de notas en cada idioma (/es/notas/,
// /en/notes/). Ver docs/notas.md.
export const notesRoutes: Record<Locale, { base: string; page: string; tags: string }> = {
  en: { base: "notes", page: "page", tags: "tags" },
  es: { base: "notas", page: "pagina", tags: "etiquetas" },
};

// Ruta equivalente de la página actual en cada idioma, para páginas cuya URL
// no se traduce solo cambiando el prefijo (p.ej. una nota con slug propio en
// cada idioma). `translated: false` significa que no existe una versión real
// en ese idioma: el selector de idioma lleva a `path` (un índice) pero no se
// declara como hreflang.
export type LocalePaths = Record<Locale, { path: string; translated: boolean }>;
