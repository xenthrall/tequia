import type { HireMeContent } from "./hire-me";

export const hireMe: HireMeContent = {
  headline: "Desarrollador full-stack, abierto a full-time y freelance",
  location: "Con base en Bogotá, Colombia",
  availability: ["Tiempo completo", "Freelance / por proyecto"],
  modality: "Abierto a trabajo híbrido o presencial en Bogotá (con posibilidad de reubicación), y a roles remotos internacionales.",
  stackGroups: [
    { label: "Backend", items: ["PHP", "Laravel", "Livewire", "Filament", "MySQL", "PostgreSQL"] },
    { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Tailwind CSS"] },
    { label: "Herramientas e infraestructura", items: ["Docker", "Git", "Supabase", "Vite"] },
  ],
  experience: [
    {
      role: "Desarrollador Full Stack Laravel",
      organization: "Operación Sistémica S.A.S.",
      description:
        "Diseño, desarrollo y evolución de un ERP empresarial modular con Laravel, Filament y MySQL: módulos de negocio, APIs, integraciones externas y arquitectura modular.",
    },
  ],
  education: [
    {
      title: "Tecnólogo en Análisis y Desarrollo de Software",
      institution: "SENA",
    },
    {
      title: "Programa de inglés (A1 → C1)",
      institution: "Smart Academy",
      description: "En curso.",
    },
  ],
  cvUrl: "/cv/jhon-tequia-es.pdf",
  cvLabel: "Descargar CV",
  ctaLabel: "Hablemos de una oportunidad",
  contactSubtitle: "¿Tienes una vacante de tiempo completo o un proyecto corto? Cuéntame de qué se trata y veamos si encajamos.",
};
