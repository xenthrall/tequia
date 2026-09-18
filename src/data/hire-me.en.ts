import type { HireMeContent } from "./hire-me";

export const hireMe: HireMeContent = {
  headline: "Full-stack developer, open to full-time and freelance roles",
  location: "Based in Bogotá, Colombia",
  availability: ["Full-time", "Freelance / contract"],
  modality: "Open to hybrid or on-site work in Bogotá (relocation possible), and to international remote roles.",
  stackGroups: [
    { label: "Backend", items: ["PHP", "Laravel", "Livewire", "Filament", "MySQL", "PostgreSQL"] },
    { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Tailwind CSS"] },
    { label: "Tools & infra", items: ["Docker", "Git", "Supabase", "Vite"] },
  ],
  experience: [
    {
      role: "Full Stack Laravel Developer",
      organization: "Operación Sistémica S.A.S.",
      description:
        "Designed, built and evolved a modular business ERP using Laravel, Filament and MySQL: business modules, APIs, external integrations and modular architecture.",
    },
  ],
  education: [
    {
      title: "Technologist in Software Analysis and Development",
      institution: "SENA",
    },
    {
      title: "English program (A1 → C1)",
      institution: "Smart Academy",
      description: "In progress.",
    },
  ],
  cvUrl: "/cv/jhon-tequia.pdf",
  cvLabel: "Download CV",
  ctaLabel: "Let's talk about a role",
  contactSubtitle: "Hiring for a full-time role or a short-term project? Tell me about it and let's see if it's a fit.",
};
