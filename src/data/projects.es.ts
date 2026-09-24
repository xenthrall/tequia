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

// Proyectos mostrados en la sección de projects.
// Cada proyecto requiere { title, description, technologies }.
// `url` es opcional y `featured: true` lo muestra en el bloque grande del tablero.
export const projects: Project[] = [
  {
    title: "Café del Tiempo",
    kicker: "Proyecto destacado",
    badge: "Open source · MIT",
    preview: "vault",
    description:
      "Suite personal modular y autoalojada para proteger lo que más importa: bóveda cifrada de credenciales y secretos, y finanzas personales.",
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
    kicker: "Gestión para negocios",
    badge: "Demo",
    preview: "dashboard",
    description:
      "Sistema de gestión para pequeños negocios, construido con infraestructura de costo mínimo.",
    url: "https://xenthrall.github.io/faro/public",
    technologies: [
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "Vite", icon: siVite },
      { name: "Supabase", icon: siSupabase },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
  },

  {
    title: "Atlas",
    kicker: "Plataforma base",
    badge: "En desarrollo",
    preview: "modules",
    description:
      "Plataforma modular que sirve como base para desarrollar proyectos, ideas y herramientas.",
    url: null,
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
    ],
  },
];
