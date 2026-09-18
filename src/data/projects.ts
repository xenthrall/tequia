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
  featured?: boolean;
}

const projectsByLocale: Record<Locale, Project[]> = { en, es };

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}
