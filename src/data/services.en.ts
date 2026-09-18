import type { ServicesContent } from "./services";

export const services: ServicesContent = {
  headline: "Digitize your business with software that fits how you work",
  intro:
    "I help small and medium businesses replace spreadsheets and manual processes with custom software — from a first working MVP to a full internal system.",
  packages: [
    {
      title: "Custom system / MVP",
      description: "A tailored application built around your actual process, not a generic template.",
      bullets: ["Discovery of your current process", "A working MVP you can start using", "Clear scope, no surprises"],
    },
    {
      title: "Process automation",
      description: "Connect the tools you already use and remove manual, repetitive work.",
      bullets: ["Integrations between existing tools", "Automated reports and workflows", "Less time on repetitive tasks"],
    },
    {
      title: "Maintenance & support",
      description: "Keep an existing system healthy, secure and evolving with your business.",
      bullets: ["Bug fixes and updates", "New features over time", "Direct communication, no ticket queue"],
    },
  ],
  process: [
    { title: "1. Discovery", description: "We talk about your process, your problem and what success looks like." },
    { title: "2. Proposal", description: "You get a clear scope and a quote tailored to your project — no public price list, every project is different." },
    { title: "3. Build", description: "I work in short iterations so you can see progress and give feedback early." },
    { title: "4. Delivery & support", description: "You get a working system, plus ongoing support if you need it." },
  ],
  ctaLabel: "Tell me about your project",
  contactSubtitle: "Tell me about your business, the process you want to fix, and what success would look like — I'll follow up with a tailored proposal.",
};
