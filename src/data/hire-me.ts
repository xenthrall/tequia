import type { Locale } from "../i18n/config";
import { hireMe as en } from "./hire-me.en";
import { hireMe as es } from "./hire-me.es";

export interface ExperienceItem {
  role: string;
  organization: string;
  period?: string;
  description: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  description?: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface HireMeContent {
  headline: string;
  location: string;
  availability: string[];
  modality: string;
  stackGroups: StackGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  // Ruta al PDF del CV dentro de `public/`. Falta el archivo real — ver
  // docs/vision.md §12 (pendiente que Jhon entregue el PDF).
  cvUrl: string;
  cvLabel: string;
  ctaLabel: string;
  contactSubtitle: string;
}

const hireMeByLocale: Record<Locale, HireMeContent> = { en, es };

export function getHireMe(locale: Locale): HireMeContent {
  return hireMeByLocale[locale];
}
