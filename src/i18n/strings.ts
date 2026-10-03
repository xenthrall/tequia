import type { Locale } from "./config";

export interface WorkSectionStrings {
  title: string;
  heading: { lead: string; emphasis: string };
  intro: string;
  count: (n: number) => string;
  status: { active: string; paused: string; archived: string };
  backTo: string;
}

export interface UiStrings {
  header: {
    themeToggle: string;
    languageSwitcher: string;
    backToHome: string;
    menu: string;
    nav: { home: string; projects: string; experiments: string; notes: string; work: string; services: string; hireMe: string };
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
  work: {
    // Una entrada por `kind` de la colección de proyectos.
    project: WorkSectionStrings;
    experiment: WorkSectionStrings;
    hypothesis: string;
    since: string;
    promoted: (date: string) => string;
    builtOn: string;
    foundationOf: string;
    stack: string;
    visit: string;
    code: string;
    viewAll: string;
    // Bloque que explica el ciclo de vida de un experimento.
    lifecycle: { title: string; description: string };
  };
  availability: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  workWithMe: {
    title: string;
    heading: { lead: string; emphasis: string };
    intro: string;
  };
  projects: {
    vaultPreview: {
      vault: string;
      finance: string;
      financeHint: string;
      items: string[];
      report: string;
    };
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
    menu: "Menu",
    nav: { home: "Home", projects: "Projects", experiments: "Experiments", notes: "Notes", work: "Work with me", services: "Services", hireMe: "Hire me" },
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
  work: {
    project: {
      title: "Projects",
      heading: { lead: "What I'm", emphasis: "building" },
      intro: "The things I put serious time into because I believe they matter, and that I'll keep working on.",
      count: (n) => `${n} ${n === 1 ? "project" : "projects"}`,
      status: { active: "Active", paused: "Paused", archived: "Archived" },
      backTo: "All projects",
    },
    experiment: {
      title: "Experiments",
      heading: { lead: "In the", emphasis: "lab" },
      intro: "Ideas on trial. If they work, they become a project; if not, they stay here with what I learned.",
      count: (n) => `${n} ${n === 1 ? "experiment" : "experiments"}`,
      status: { active: "Running", paused: "Paused", archived: "Discarded" },
      backTo: "All experiments",
    },
    hypothesis: "The question",
    since: "Since",
    promoted: (date) => `Started as an experiment · promoted ${date}`,
    builtOn: "Built on",
    foundationOf: "Foundation of",
    stack: "Stack",
    visit: "Visit",
    code: "Code",
    viewAll: "View all",
    lifecycle: {
      title: "How an experiment grows",
      description: "Every experiment tries to answer one question. If it works, it gets promoted to a project; if it doesn't, it stays archived here with what I learned.",
    },
  },
  availability: {
    eyebrow: "Right now",
    title: "Open to new opportunities",
    description: "I'm looking for a full-time role, in Bogotá or remote, and I take on freelance projects. If something here is useful to you, let's talk.",
    cta: "Work with me",
  },
  workWithMe: {
    title: "Work with me",
    heading: { lead: "Let's work", emphasis: "together" },
    intro: "Whether you're hiring for your team or need software for your business, here's where to start.",
  },
  projects: {
    vaultPreview: {
      vault: "Vault",
      finance: "Finance",
      financeHint: "Income · expenses",
      items: ["Credential", "Confidential note", "Time capsule"],
      report: "Monthly report",
    },
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
    menu: "Menú",
    nav: { home: "Inicio", projects: "Proyectos", experiments: "Experimentos", notes: "Notas", work: "Trabajemos", services: "Servicios", hireMe: "Contratar" },
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
  work: {
    project: {
      title: "Proyectos",
      heading: { lead: "Lo que estoy", emphasis: "construyendo" },
      intro: "Las cosas en las que invierto tiempo en serio porque creo que son importantes, y en las que voy a seguir trabajando.",
      count: (n) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
      status: { active: "Activo", paused: "En pausa", archived: "Archivado" },
      backTo: "Todos los proyectos",
    },
    experiment: {
      title: "Experimentos",
      heading: { lead: "En el", emphasis: "laboratorio" },
      intro: "Ideas a prueba. Si funcionan, se convierten en proyecto; si no, quedan aquí con lo que aprendí.",
      count: (n) => `${n} ${n === 1 ? "experimento" : "experimentos"}`,
      status: { active: "En curso", paused: "En pausa", archived: "Descartado" },
      backTo: "Todos los experimentos",
    },
    hypothesis: "La pregunta",
    since: "Desde",
    promoted: (date) => `Empezó como experimento · promovido en ${date}`,
    builtOn: "Construido sobre",
    foundationOf: "Base de",
    stack: "Stack",
    visit: "Visitar",
    code: "Código",
    viewAll: "Ver todos",
    lifecycle: {
      title: "Cómo crece un experimento",
      description: "Cada experimento intenta responder una pregunta. Si funciona, pasa a ser proyecto; si no, queda archivado aquí con lo que aprendí.",
    },
  },
  availability: {
    eyebrow: "Ahora mismo",
    title: "Abierto a nuevas oportunidades",
    description: "Busco un rol de tiempo completo, en Bogotá o remoto, y tomo proyectos freelance. Si algo de lo que ves aquí te sirve, hablemos.",
    cta: "Trabajemos",
  },
  workWithMe: {
    title: "Trabajemos",
    heading: { lead: "Trabajemos", emphasis: "juntos" },
    intro: "Si buscas talento para tu equipo o software para tu negocio, por aquí se empieza.",
  },
  projects: {
    vaultPreview: {
      vault: "Bóveda",
      finance: "Finanzas",
      financeHint: "Ingresos · gastos",
      items: ["Credencial", "Nota confidencial", "Cápsula del tiempo"],
      report: "Reporte del mes",
    },
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
