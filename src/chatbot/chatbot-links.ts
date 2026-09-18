import { socialLinks } from "../data/social-links";
import { links } from "../data/links";

export interface ChatLink {
  label: string;
  url: string;
}

function findUrl<T extends { url: string }>(list: T[], predicate: (item: T) => boolean): string | undefined {
  return list.find(predicate)?.url;
}

// Compartido entre chatbot-data.en.ts y chatbot-data.es.ts: social-links.ts y
// links.ts no están localizados (son marcas/URLs, no copy).
export const whatsappUrl = findUrl(socialLinks, (item) => item.name === "WhatsApp");
export const githubUrl = findUrl(socialLinks, (item) => item.name === "GitHub");
export const instagramUrl = findUrl(socialLinks, (item) => item.name === "Instagram");
export const websiteUrl = findUrl(links, (item) => item.title === "tequia.dev");
