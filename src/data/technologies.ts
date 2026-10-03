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
  type SimpleIcon,
} from "simple-icons";

// Tecnologías que se pueden nombrar en `stack` del frontmatter de un proyecto
// (src/content/proyectos/). Para agregar una, importa su icono de
// simple-icons y añádela aquí con el nombre exacto que se usará.
export const technologies: Record<string, SimpleIcon> = {
  PHP: siPhp,
  Laravel: siLaravel,
  Filament: siFilament,
  "Tailwind CSS": siTailwindcss,
  React: siReact,
  TypeScript: siTypescript,
  Vite: siVite,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  Docker: siDocker,
};
