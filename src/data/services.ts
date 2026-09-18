import type { Locale } from "../i18n/config";
import { services as en } from "./services.en";
import { services as es } from "./services.es";

export interface ServicePackage {
  title: string;
  description: string;
  bullets: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServicesContent {
  headline: string;
  intro: string;
  packages: ServicePackage[];
  process: ProcessStep[];
  ctaLabel: string;
  contactSubtitle: string;
}

const servicesByLocale: Record<Locale, ServicesContent> = { en, es };

export function getServices(locale: Locale): ServicesContent {
  return servicesByLocale[locale];
}
