import {
  siPhp,
  siLaravel,
  siFilament,
  siTailwindcss,
  siReact,
  siTypescript,
  siVite,
  siSupabase,
  siPostgresql,
  siSqlite,
  siDocker,
} from "simple-icons";
import type { Project } from "./projects";

// Projects shown in the projects section.
// Each project requires { title, description, technologies }.
// `url` is optional and `featured: true` highlights the project visually.
export const projects: Project[] = [
  {
    title: "Café del Tiempo",
    description:
      "Self-hosted, modular personal suite to protect what matters most: an encrypted vault for credentials and secrets, and personal finance.",
    url: "https://cafe.tequia.dev/",
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
      { name: "Filament", icon: siFilament },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "SQLite", icon: siSqlite },
      { name: "Docker", icon: siDocker },
    ],
    featured: true,
  },

  {
    title: "Faro",
    description: "Management system for small businesses, built on minimal-cost infrastructure.",
    url: "https://xenthrall.github.io/faro/public",
    technologies: [
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "Vite", icon: siVite },
      { name: "Supabase", icon: siSupabase },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
    featured: true,
  },

  {
    title: "Atlas",
    description: "Modular platform that serves as a base to build projects, ideas and tools.",
    url: null,
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
    ],
  },
];
