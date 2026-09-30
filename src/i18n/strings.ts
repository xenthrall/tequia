import type { Locale } from "./config";

export interface UiStrings {
  header: {
    themeToggle: string;
    languageSwitcher: string;
    backToHome: string;
    nav: { home: string; services: string; hireMe: string; notes: string };
  };
  hero: {
    clockLabel: string;
    latestNote: string;
    readNote: string;
    // Qué estoy haciendo "probablemente" según la hora de Bogotá: cada frase
    // aplica hasta la hora `until` (exclusiva, 0-24). Solo por diversión.
    status: { until: number; text: string }[];
  };
  sections: {
    projects: string;
    links: string;
    contact: string;
  };
  projects: {
    heading: { lead: string; emphasis: string };
    countLabel: string;
    featured: string;
    viewProject: string;
    vaultPreview: {
      vault: string;
      finance: string;
      financeHint: string;
      items: string[];
      report: string;
    };
  };
  about: {
    heading: { lead: string; emphasis: string; trail: string };
    eyebrow: string;
  };
  contact: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
    optional: string;
    placeholders: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
    submit: string;
    submitting: string;
    errorMessage: string;
    thankYouTitle: string;
    thankYouMessage: string;
    whatsappPrompt: string;
    whatsappButton: string;
  };
  audienceSplit: {
    eyebrow: string;
    business: { title: string; description: string; cta: string };
    recruiter: { title: string; description: string; cta: string };
  };
  hireMe: {
    stack: string;
    experience: string;
    education: string;
  };
  services: {
    packagesHeading: string;
    processHeading: string;
  };
  notes: {
    title: string;
    heading: { lead: string; emphasis: string };
    intro: string;
    count: (n: number) => string;
    minRead: string;
    topics: string;
    allNotes: string;
    taggedWith: string;
    empty: string;
    draft: string;
    newer: string;
    older: string;
    pageOf: (page: number, total: number) => string;
    rss: string;
    backToNotes: string;
    // Nombre de cada idioma dentro de este idioma ("Spanish" / "español").
    languageNames: Record<Locale, string>;
    readIn: (language: string) => string;
    translatedFrom: (language: string) => string;
  };
}

const en: UiStrings = {
  header: {
    themeToggle: "Toggle appearance",
    languageSwitcher: "Change language",
    backToHome: "Back to home",
    nav: { home: "Home", services: "Services", hireMe: "Hire me", notes: "Notes" },
  },
  hero: {
    clockLabel: "Local time · Bogotá",
    latestNote: "Latest note",
    readNote: "Read note",
    status: [
      { until: 6, text: "probably asleep (or debugging something)" },
      { until: 9, text: "starting the day" },
      { until: 13, text: "most likely coding" },
      { until: 14, text: "having lunch" },
      { until: 19, text: "building something" },
      { until: 21, text: "learning something new" },
      { until: 24, text: "maybe playing the piano" },
    ],
  },
  sections: {
    projects: "Projects",
    links: "Links",
    contact: "Contact",
  },
  projects: {
    heading: { lead: "What I'm", emphasis: "building" },
    countLabel: "projects",
    featured: "Featured project",
    viewProject: "View project",
    vaultPreview: {
      vault: "Vault",
      finance: "Finance",
      financeHint: "Income · expenses",
      items: ["Credential", "Confidential note", "Time capsule"],
      report: "Monthly report",
    },
  },
  about: {
    heading: { lead: "A bit", emphasis: "more", trail: "about me" },
    eyebrow: "Experience · stack",
  },
  contact: {
    title: "Have an idea? Let's talk.",
    subtitle:
      "If you're thinking about building an application, digital product or tool and need a developer to make it real, tell me about it.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
    },
    optional: "(optional)",
    placeholders: {
      name: "Your name",
      email: "you@email.com",
      phone: "+1 000 000 0000",
      message: "Tell me about your idea, project or role",
    },
    submit: "Send message",
    submitting: "Sending...",
    errorMessage: "There was an error sending your message. Try again or reach out on WhatsApp.",
    thankYouTitle: "Message sent!",
    thankYouMessage: "Thanks for reaching out. I read every message carefully and will get back to you soon.",
    whatsappPrompt: "Prefer something more direct?",
    whatsappButton: "Chat on WhatsApp",
  },
  audienceSplit: {
    eyebrow: "What are you looking for?",
    business: {
      title: "I run a business",
      description: "Digitize a process, build a custom system or an MVP.",
      cta: "See services",
    },
    recruiter: {
      title: "I'm hiring talent",
      description: "Experience, stack, availability and CV for recruiters.",
      cta: "View my profile",
    },
  },
  hireMe: {
    stack: "Stack",
    experience: "Experience",
    education: "Education",
  },
  services: {
    packagesHeading: "How I can help",
    processHeading: "How we'd work together",
  },
  notes: {
    title: "Notes",
    heading: { lead: "Loose", emphasis: "notes" },
    intro: "Ideas, lessons and thoughts I find worth sharing. No schedule: I write when something deserves it.",
    count: (n) => `${n} ${n === 1 ? "note" : "notes"}`,
    minRead: "min read",
    topics: "Topics",
    allNotes: "All notes",
    taggedWith: "Notes on",
    empty: "No notes published yet.",
    draft: "Draft",
    newer: "Newer",
    older: "Older",
    pageOf: (page, total) => `Page ${page} of ${total}`,
    rss: "RSS",
    backToNotes: "All notes",
    languageNames: { en: "English", es: "Spanish" },
    readIn: (language) => `Read in ${language}`,
    translatedFrom: (language) => `Translated from ${language}.`,
  },
};

const es: UiStrings = {
  header: {
    themeToggle: "Cambiar apariencia",
    languageSwitcher: "Cambiar idioma",
    backToHome: "Volver al inicio",
    nav: { home: "Inicio", services: "Servicios", hireMe: "Contratar", notes: "Notas" },
  },
  hero: {
    clockLabel: "Hora local · Bogotá",
    latestNote: "Última nota",
    readNote: "Leer nota",
    status: [
      { until: 6, text: "seguramente durmiendo (o depurando algo)" },
      { until: 9, text: "arrancando el día" },
      { until: 13, text: "seguramente programando" },
      { until: 14, text: "almorzando" },
      { until: 19, text: "construyendo algo" },
      { until: 21, text: "aprendiendo algo nuevo" },
      { until: 24, text: "quizás tocando piano" },
    ],
  },
  sections: {
    projects: "Proyectos",
    links: "Enlaces",
    contact: "Contacto",
  },
  projects: {
    heading: { lead: "Lo que estoy", emphasis: "construyendo" },
    countLabel: "proyectos",
    featured: "Proyecto destacado",
    viewProject: "Ver proyecto",
    vaultPreview: {
      vault: "Bóveda",
      finance: "Finanzas",
      financeHint: "Ingresos · gastos",
      items: ["Credencial", "Nota confidencial", "Cápsula del tiempo"],
      report: "Reporte del mes",
    },
  },
  about: {
    heading: { lead: "Un poco", emphasis: "más", trail: "de mí" },
    eyebrow: "Experiencia · stack",
  },
  contact: {
    title: "¿Tienes una idea? Conversemos.",
    subtitle:
      "Si estás pensando en construir una aplicación, producto digital o herramienta y buscas un desarrollador para llevarla a la realidad, cuéntame sobre ella.",
    fields: {
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      message: "Mensaje",
    },
    optional: "(opcional)",
    placeholders: {
      name: "Tu nombre",
      email: "tu@correo.com",
      phone: "+57 300 000 0000",
      message: "Cuéntame sobre tu idea, proyecto o colaboración",
    },
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    errorMessage: "Ocurrió un error al enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.",
    thankYouTitle: "¡Mensaje enviado!",
    thankYouMessage: "Gracias por escribirme. Leo cada mensaje con calma y te responderé muy pronto para conversar sobre tu idea.",
    whatsappPrompt: "¿Prefieres algo más directo?",
    whatsappButton: "Hablar por WhatsApp",
  },
  audienceSplit: {
    eyebrow: "¿Qué estás buscando?",
    business: {
      title: "Tengo un negocio",
      description: "Digitalizar un proceso, construir un sistema a medida o un MVP.",
      cta: "Ver servicios",
    },
    recruiter: {
      title: "Busco talento",
      description: "Experiencia, stack, disponibilidad y CV para reclutadores.",
      cta: "Ver mi perfil",
    },
  },
  hireMe: {
    stack: "Stack",
    experience: "Experiencia",
    education: "Formación",
  },
  services: {
    packagesHeading: "Cómo puedo ayudarte",
    processHeading: "Cómo trabajaríamos juntos",
  },
  notes: {
    title: "Notas",
    heading: { lead: "Notas", emphasis: "sueltas" },
    intro: "Ideas, aprendizajes y pensamientos que siento que vale la pena compartir. Sin calendario: escribo cuando algo lo amerita.",
    count: (n) => `${n} ${n === 1 ? "nota" : "notas"}`,
    minRead: "min de lectura",
    topics: "Temas",
    allNotes: "Todas las notas",
    taggedWith: "Notas sobre",
    empty: "Todavía no hay notas publicadas.",
    draft: "Borrador",
    newer: "Más recientes",
    older: "Anteriores",
    pageOf: (page, total) => `Página ${page} de ${total}`,
    rss: "RSS",
    backToNotes: "Todas las notas",
    languageNames: { en: "inglés", es: "español" },
    readIn: (language) => `Leer en ${language}`,
    translatedFrom: (language) => `Traducida del ${language}.`,
  },
};

const dictionaries: Record<Locale, UiStrings> = { en, es };

export function getStrings(locale: Locale): UiStrings {
  return dictionaries[locale];
}
