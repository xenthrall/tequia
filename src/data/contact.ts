import type { Locale } from "../i18n/config";
import { contact as en } from "./contact.en";
import { contact as es } from "./contact.es";

export interface ContactConfig {
  formspreeId: string;
  whatsapp: {
    number: string;
    message: string;
  };
}

const contactByLocale: Record<Locale, ContactConfig> = { en, es };

export function getContact(locale: Locale): ContactConfig {
  return contactByLocale[locale];
}
