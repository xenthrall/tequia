import {
  siPhp,
  siLaravel,
  siFilament,
  siLivewire,
  siTailwindcss,
  siReact,
  siTypescript,
  siVite,
  siSupabase,
  siPostgresql,
} from "simple-icons";
import type { Project } from "./projects";

// Projects shown in the projects section.
// Each project requires { title, description, technologies }.
// `url` is optional and `featured: true` highlights the project visually.
export const projects: Project[] = [
  {
    title: "Nexo",
    description: "Modular platform for education management.",
    url: "https://nexo.tequia.dev/",
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
      { name: "Filament", icon: siFilament },
      { name: "Livewire", icon: siLivewire },
      { name: "Tailwind CSS", icon: siTailwindcss },
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
