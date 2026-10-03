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
// Consultas
// ---------------------------------------------------------------------------

let allWorkPromise: Promise<Work[]> | undefined;

// Todo lo publicable (borradores solo en `npm run dev`), en orden de sección:
// destacado primero, luego `order`, luego el más reciente. Valida una sola vez
// por build las referencias de `builtOn` y los nombres de `stack`: un error
// hace fallar el build en vez de publicar un enlace o un icono roto.
function getAllWork(): Promise<Work[]> {
  allWorkPromise ??= getCollection("proyectos", (work) => import.meta.env.DEV || !work.data.draft).then((all) => {
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
