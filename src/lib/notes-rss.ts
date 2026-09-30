import { getProfile } from "../data/profile";
import { getStrings } from "../i18n/strings";
import { siteUrl, type Locale } from "../i18n/config";
import { getNotes, notePath, notesIndexPath, notesRssPath } from "./notes";

// Feed RSS 2.0 de las notas de un idioma. Se arma a mano (son pocas líneas)
// para no sumar una dependencia; lo sirven src/pages/{en,es}/.../rss.xml.ts.

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function notesRssResponse(locale: Locale): Promise<Response> {
  const profile = getProfile(locale);
  const strings = getStrings(locale);
  const notes = (await getNotes(locale)).filter((note) => !note.data.draft);

  const items = notes
    .map((note) => {
      const url = `${siteUrl}${notePath(note)}`;
      return `    <item>
      <title>${escapeXml(note.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(note.data.description)}</description>
      <pubDate>${note.data.date.toUTCString()}</pubDate>
${note.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${strings.notes.title} — ${profile.name}`)}</title>
    <link>${siteUrl}${notesIndexPath(locale)}</link>
    <description>${escapeXml(strings.notes.intro)}</description>
    <language>${locale}</language>
    <atom:link href="${siteUrl}${notesRssPath(locale)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
