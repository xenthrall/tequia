import { getCollection, type CollectionEntry } from "astro:content";
import { locales, notesRoutes, type Locale, type LocalePaths } from "../i18n/config";

// Toda la lógica de la sección de notas vive aquí (consultas, rutas,
// traducciones, etiquetas, paginación) para que las páginas en
// src/pages/{en,es}/... sean envoltorios delgados. Ver docs/notas.md.

export type Note = CollectionEntry<"notas">;

export const NOTES_PER_PAGE = 20;

export function noteLocale(note: Note): Locale {
  return note.id.split("/")[0] as Locale;
}

export function noteSlug(note: Note): string {
  return note.id.split("/")[1];
}

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

let allNotesPromise: Promise<Note[]> | undefined;

// Todas las notas publicables (borradores solo en `npm run dev`), de la más
// reciente a la más antigua. Valida las referencias de traducción una sola
// vez por build: un `translationOf` roto hace fallar el build en vez de
// publicar un enlace muerto.
function getAllNotes(): Promise<Note[]> {
  allNotesPromise ??= getCollection("notas", (note) => import.meta.env.DEV || !note.data.draft).then((notes) => {
    const ids = new Set(notes.map((note) => note.id));

    for (const note of notes) {
      const original = note.data.translationOf;
      if (!original) continue;

      if (!ids.has(original)) {
        throw new Error(`Nota "${note.id}": translationOf "${original}" no existe (¿o es un borrador?).`);
      }
      if (original.split("/")[0] === noteLocale(note)) {
        throw new Error(`Nota "${note.id}": translationOf debe apuntar a una nota en otro idioma.`);
      }
    }

    return notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  });

  return allNotesPromise;
}

export async function getNotes(locale: Locale): Promise<Note[]> {
  return (await getAllNotes()).filter((note) => noteLocale(note) === locale);
}

// Versiones de la misma nota en otros idiomas: la original y todas sus
// traducciones comparten el id de la original como "clave de grupo".
export async function getTranslations(note: Note): Promise<Note[]> {
  const groupId = note.data.translationOf ?? note.id;
  const all = await getAllNotes();

  return all.filter((other) => other.id !== note.id && (other.id === groupId || other.data.translationOf === groupId));
}

// ---------------------------------------------------------------------------
// Rutas
// ---------------------------------------------------------------------------

export function notesIndexPath(locale: Locale, page = 1): string {
  const { base, page: pageSegment } = notesRoutes[locale];
  return page <= 1 ? `/${locale}/${base}/` : `/${locale}/${base}/${pageSegment}/${page}/`;
}

export function notePath(note: Note): string {
  const locale = noteLocale(note);
  return `/${locale}/${notesRoutes[locale].base}/${noteSlug(note)}/`;
}

export function tagPath(locale: Locale, tag: string): string {
  const { base, tags } = notesRoutes[locale];
  return `/${locale}/${base}/${tags}/${slugifyTag(tag)}/`;
}

export function notesRssPath(locale: Locale): string {
  return `/${locale}/${notesRoutes[locale].base}/rss.xml`;
}

// Rutas de una nota en cada idioma: su traducción si existe; si no, el
// índice de notas de ese idioma (sin hreflang).
export async function notePaths(note: Note): Promise<LocalePaths> {
  const translations = await getTranslations(note);

  return Object.fromEntries(
    locales.map(({ code }) => {
      if (code === noteLocale(note)) return [code, { path: notePath(note), translated: true }];
      const translation = translations.find((other) => noteLocale(other) === code);
      return [code, translation ? { path: notePath(translation), translated: true } : { path: notesIndexPath(code), translated: false }];
    }),
  ) as LocalePaths;
}

// Rutas de un listado (índice, página N o etiqueta). Solo la primera página
// del índice tiene un equivalente real en otros idiomas; el resto de
// listados enlaza al índice del otro idioma.
export function notesListPaths(locale: Locale, currentPath: string): LocalePaths {
  const isIndex = currentPath === notesIndexPath(locale);

  return Object.fromEntries(
    locales.map(({ code }) => [
      code,
      code === locale
        ? { path: currentPath, translated: true }
        : { path: notesIndexPath(code), translated: isIndex },
    ]),
  ) as LocalePaths;
}

// ---------------------------------------------------------------------------
// Etiquetas
// ---------------------------------------------------------------------------

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface TagSummary {
  name: string;
  slug: string;
  count: number;
}

// Etiquetas de un idioma, de la más usada a la menos usada. Dos variantes
// que producen el mismo slug ("Carrera" y "carrera") cuentan como una sola.
export function summarizeTags(notes: Note[]): TagSummary[] {
  const bySlug = new Map<string, TagSummary>();

  for (const note of notes) {
    for (const name of note.data.tags) {
      const slug = slugifyTag(name);
      const summary = bySlug.get(slug) ?? { name, slug, count: 0 };
      summary.count += 1;
      bySlug.set(slug, summary);
    }
  }

  return [...bySlug.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function notesWithTag(notes: Note[], slug: string): Note[] {
  return notes.filter((note) => note.data.tags.some((tag) => slugifyTag(tag) === slug));
}

// ---------------------------------------------------------------------------
// Presentación
// ---------------------------------------------------------------------------

export interface NotesPage {
  notes: Note[];
  page: number;
  totalPages: number;
}

export function paginateNotes(notes: Note[], page: number): NotesPage {
  const totalPages = Math.max(1, Math.ceil(notes.length / NOTES_PER_PAGE));
  const start = (page - 1) * NOTES_PER_PAGE;
  return { notes: notes.slice(start, start + NOTES_PER_PAGE), page, totalPages };
}

// Números de página 2..N (la página 1 es el índice).
export function extraPageNumbers(notes: Note[]): number[] {
  const { totalPages } = paginateNotes(notes, 1);
  return Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
}

export function groupByYear(notes: Note[]): { year: number; notes: Note[] }[] {
  const groups: { year: number; notes: Note[] }[] = [];

  for (const note of notes) {
    const year = note.data.date.getUTCFullYear();
    const last = groups.at(-1);
    if (last?.year === year) last.notes.push(note);
    else groups.push({ year, notes: [note] });
  }

  return groups;
}

const WORDS_PER_MINUTE = 200;

export function readingMinutes(note: Note): number {
  const words = (note.body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Las fechas del frontmatter ("2026-09-30") se leen como medianoche UTC; se
// formatean en UTC para que no retrocedan un día en la zona horaria de Bogotá.
export function formatNoteDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
