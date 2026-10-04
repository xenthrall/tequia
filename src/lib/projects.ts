import { getCollection, type CollectionEntry } from "astro:content";
import { technologies } from "../data/technologies";
import { locales, sectionPath, type Locale, type LocalePaths } from "../i18n/config";

// Lógica de proyectos y experimentos (consultas, rutas, relaciones), para que
// las páginas en src/pages/{en,es}/... sean envoltorios delgados. Ver
// docs/proyectos.md y docs/vision.md §14.

export type Work = CollectionEntry<"proyectos">;
export type WorkKind = Work["data"]["kind"];

export function workLocale(work: Work): Locale {
  return work.id.split("/")[0] as Locale;
}

export function workSlug(work: Work): string {
  return work.id.split("/")[1];
}

// ---------------------------------------------------------------------------
// Imágenes
// ---------------------------------------------------------------------------

// Imágenes de cada proyecto, en su carpeta junto a es.md / en.md. La portada
// no se referencia desde el texto: se detecta por nombre (portada.webp, .png
// o .jpg). El resto se usa desde el Markdown con `./<archivo>`.
const IMAGE_FILE = /^\/src\/content\/proyectos\/([^_/][^/]*)\/([^/]+\.(?:webp|png|jpe?g|gif|avif|svg))$/;
const COVER_FILE = /^portada\.(?:webp|png|jpe?g)$/;

const imageModules = import.meta.glob<ImageMetadata>("/src/content/proyectos/*/*.{webp,png,jpg,jpeg,gif,avif,svg}", {
  eager: true,
  import: "default",
});

const projectImages = Object.entries(imageModules).flatMap(([path, image]) => {
  const match = path.match(IMAGE_FILE);
  return match ? [{ slug: match[1], file: match[2], image }] : [];
});

export function workCover(work: Work): ImageMetadata | undefined {
  return projectImages.find(({ slug, file }) => slug === workSlug(work) && COVER_FILE.test(file))?.image;
}

// Video demo: como la portada, se detecta por nombre (demo.mp4 o demo.webm) y
// se muestra arriba en la ficha, con la portada como póster. Markdown no
// puede incrustar videos, por eso no se referencia desde el texto.
const DEMO_FILE = /^demo\.(?:mp4|webm)$/;

const demoModules = import.meta.glob<string>("/src/content/proyectos/*/demo.{mp4,webm}", {
  eager: true,
  query: "?url",
  import: "default",
});

export function workDemo(work: Work): { src: string; type: string } | undefined {
  const entry = Object.entries(demoModules).find(([path]) => path.split("/").at(-2) === workSlug(work));
  if (!entry) return undefined;
  const [path, src] = entry;
  return { src, type: path.endsWith(".webm") ? "video/webm" : "video/mp4" };
}

// Todos los archivos de las carpetas de proyectos (sin importarlos: solo las
// rutas), para detectar los que no siguen la convención.
const projectFiles = Object.keys(import.meta.glob("/src/content/proyectos/*/*")).flatMap((path) => {
  const [, slug, file] = path.match(/^\/src\/content\/proyectos\/([^/]+)\/([^/]+)$/) ?? [];
  return slug && !slug.startsWith("_") ? [{ slug, file }] : [];
});

// Guardián del orden (docs/proyectos.md, Imágenes):
// - cada archivo de la carpeta de un proyecto es un texto por idioma, una
//   imagen o el video demo;
// - cada imagen (salvo la portada) la referencia algún idioma, borradores
//   incluidos, para que no se acumulen capturas viejas.
// Las referencias rotas ya las detecta Astro.
function assertProjectFolders(all: Work[]) {
  for (const { slug, file } of projectFiles) {
    const known = /^[a-z]{2}\.md$/.test(file) || DEMO_FILE.test(file) || projectImages.some((image) => image.slug === slug && image.file === file);
    if (!known) {
      throw new Error(
        `Archivo no reconocido: src/content/proyectos/${slug}/${file}. Se esperan es.md/en.md, imágenes (portada, ui-…, diagrama-…, datos-…, codigo-…) o demo.mp4.`,
      );
    }
  }

  for (const { slug, file } of projectImages) {
    if (COVER_FILE.test(file)) continue;
    const used = all.some((work) => workSlug(work) === slug && work.body?.includes(`./${file}`));
    if (!used) {
      throw new Error(`Imagen sin usar: src/content/proyectos/${slug}/${file}. Referénciala con ![...](./${file}) o bórrala.`);
    }
  }
}

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

let allWorkPromise: Promise<Work[]> | undefined;

// Todo lo publicable (borradores solo en `npm run dev`), en orden de sección:
// destacado primero, luego `order`, luego el más reciente. Valida una sola vez
// por build las referencias de `builtOn`, los nombres de `stack` y las
// imágenes sin usar: un error hace fallar el build en vez de publicar un
// enlace o un icono roto, o dejar basura en el repo.
function getAllWork(): Promise<Work[]> {
  allWorkPromise ??= getCollection("proyectos").then((everything) => {
    assertProjectFolders(everything);

    const all = everything.filter((work) => import.meta.env.DEV || !work.data.draft);
    const ids = new Set(all.map((work) => work.id));

    for (const work of all) {
      const locale = workLocale(work);
      for (const slug of work.data.builtOn) {
        if (!ids.has(`${locale}/${slug}`)) {
          throw new Error(`Proyecto "${work.id}": builtOn "${slug}" no existe en "${locale}" (¿o es un borrador?).`);
        }
      }
      for (const name of work.data.stack) {
        if (!technologies[name]) {
          throw new Error(`Proyecto "${work.id}": la tecnología "${name}" no está en src/data/technologies.ts.`);
        }
      }
      if (work.data.promotedOn && work.data.kind !== "project") {
        throw new Error(`Proyecto "${work.id}": promotedOn solo aplica a kind: project.`);
      }
    }

    return all.sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        a.data.order - b.data.order ||
        (b.data.since?.getTime() ?? 0) - (a.data.since?.getTime() ?? 0),
    );
  });

  return allWorkPromise;
}

export async function getWork(locale: Locale, kind?: WorkKind): Promise<Work[]> {
  return (await getAllWork()).filter((work) => workLocale(work) === locale && (!kind || work.data.kind === kind));
}

// Proyectos sobre los que está construido `work`, y los que se construyen sobre él.
export async function getRelations(work: Work): Promise<{ builtOn: Work[]; foundationOf: Work[] }> {
  const siblings = await getWork(workLocale(work));
  const slug = workSlug(work);

  return {
    builtOn: work.data.builtOn.map((other) => siblings.find((sibling) => workSlug(sibling) === other)!),
    foundationOf: siblings.filter((sibling) => sibling.data.builtOn.includes(slug)),
  };
}

// ---------------------------------------------------------------------------
// Rutas
// ---------------------------------------------------------------------------

export function workIndexPath(locale: Locale, kind: WorkKind): string {
  return sectionPath(locale, kind === "project" ? "projects" : "experiments");
}

export function workPath(work: Work): string {
  return `${workIndexPath(workLocale(work), work.data.kind)}${workSlug(work)}/`;
}

// Ficha en cada idioma: la misma entrada (mismo slug) si existe; si no, el
// índice de su sección en ese idioma (sin hreflang).
export async function workPaths(work: Work): Promise<LocalePaths> {
  const all = await getAllWork();

  return Object.fromEntries(
    locales.map(({ code }) => {
      const counterpart = all.find((other) => other.id === `${code}/${workSlug(work)}`);
      return [code, counterpart ? { path: workPath(counterpart), translated: true } : { path: workIndexPath(code, work.data.kind), translated: false }];
    }),
  ) as LocalePaths;
}

// ---------------------------------------------------------------------------
// Presentación
// ---------------------------------------------------------------------------

export function workStack(work: Work) {
  return work.data.stack.map((name) => ({ name, icon: technologies[name] }));
}

// "ago 2026" / "Aug 2026". Fechas del frontmatter en UTC, como en las notas.
export function formatMonth(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export type ProjectPreview = NonNullable<Work["data"]["preview"]>;
