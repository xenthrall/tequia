import type { Locale } from "./config";

export interface UiStrings {
  header: {
    themeToggle: string;
    languageSwitcher: string;
    backToHome: string;
  };
  sections: {
    projects: string;
    links: string;
    contact: string;
  };
  projects: {
    featured: string;
    viewProject: string;
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
  footer: {
    privacy: string;
    terms: string;
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
}

const en: UiStrings = {
  header: {
    themeToggle: "Toggle appearance",
    languageSwitcher: "Change language",
    backToHome: "Back to home",
  },
  sections: {
    projects: "Projects",
    links: "Links",
    contact: "Contact",
  },
  projects: {
    featured: "Featured project",
    viewProject: "View project",
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
  footer: {
    privacy: "Privacy",
    terms: "Terms",
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
      cta: "View hire-me page",
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
};

const es: UiStrings = {
  header: {
    themeToggle: "Cambiar apariencia",
    languageSwitcher: "Cambiar idioma",
    backToHome: "Volver al inicio",
  },
  sections: {
    projects: "Proyectos",
    links: "Enlaces",
    contact: "Contacto",
  },
  projects: {
    featured: "Proyecto destacado",
    viewProject: "Ver proyecto",
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
  footer: {
    privacy: "Privacidad",
    terms: "Términos",
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
      cta: "Ir a hire-me",
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
};

const dictionaries: Record<Locale, UiStrings> = { en, es };

export function getStrings(locale: Locale): UiStrings {
  return dictionaries[locale];
}
