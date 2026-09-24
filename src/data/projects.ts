import type { SimpleIcon } from "simple-icons";
import type { Locale } from "../i18n/config";
import { projects as en } from "./projects.en";
import { projects as es } from "./projects.es";

export interface ProjectTechnology {
  name: string;
  icon: SimpleIcon;
}

export interface Project {
  title: string;
  description: string;
  url: string | null;
  technologies: ProjectTechnology[];
  // Etiqueta corta sobre el título (ej. "Plataforma base").
  kicker: string;
  // Estado o licencia mostrado como insignia (ej. "Demo", "En desarrollo").
  badge?: string;
  // Miniatura ilustrativa de la interfaz del proyecto en su tarjeta.
  preview?: ProjectPreview;
  // El proyecto destacado ocupa el bloque grande del tablero.
  featured?: boolean;
}

export type ProjectPreview = "vault" | "dashboard" | "modules";

const projectsByLocale: Record<Locale, Project[]> = { en, es };

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}
