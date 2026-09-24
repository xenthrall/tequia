import { whatsappUrl, githubUrl, instagramUrl, websiteUrl } from "./chatbot-links";
import type { ChatbotData } from "./chatbot-data";

const contactLinks = whatsappUrl ? [{ label: "Message on WhatsApp", url: whatsappUrl }] : [];

// Questions shown as buttons when the chat opens.
const openingQuickReplies = [
  "What does Jhon do?",
  "What technologies does he use?",
  "What projects is he building?",
  "How can I contact him?",
];

// Suggestions shown when the question isn't recognized.
const fallbackQuickReplies = ["What technologies does he use?", "What projects does he have?", "What does Jhon do?"];

// Each intent defines keywords/phrases and a fixed response.
// `links` (optional) is shown as chips below the message.
// `quickReplies` (optional) suggests follow-up questions.
export const chatbotData: ChatbotData = {
  openingQuickReplies,
  fallbackResponse: {
    id: "fallback",
    text: "I'm not sure how to answer that yet. You can ask me about Jhon's projects, experience, technologies, services or ways to contact him.",
    links: [],
    quickReplies: fallbackQuickReplies,
  },
  intents: [
    {
      id: "is_jhon",
      keywords: ["are you jhon", "are you a bot", "are you an ai", "are you real", "who are you"],
      response: "No, I'm Jhon's virtual assistant. I'm here to help you learn about his work, projects and services.",
    },
    {
      id: "greeting",
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "whats up"],
      response: "Hi! I'm Jhon's assistant. Ask me about his projects, experience, technologies or ways to contact him.",
      quickReplies: openingQuickReplies,
    },
    {
      id: "about",
      keywords: ["what does jhon do", "who is jhon", "about jhon", "what do you do", "introduce yourself", "tell me about jhon"],
      response:
        "Jhon is a software developer and digital product builder. He works mainly with PHP and Laravel, with experience in web applications, business systems, APIs and modular architectures.",
    },
    {
      id: "skills",
      keywords: ["technology", "technologies", "stack", "languages", "tools", "what does he work with", "what does he use", "what does he code with"],
      response: "Jhon works mainly with PHP and Laravel. He also uses Livewire, Filament, Tailwind CSS, JavaScript, MySQL, PostgreSQL, Docker and Git.",
    },
    {
      id: "laravel",
      keywords: ["laravel"],
      response: "Yes, Laravel is his main framework. He combines it with Livewire and Filament to build complete applications and business systems.",
    },
    {
      id: "experience",
      keywords: ["experience", "where has he worked", "previous job", "work history", "company", "operacion sistemica"],
      response:
        "Jhon worked as a Full Stack Laravel Developer at Operación Sistémica S.A.S., taking part in the design, development and evolution of a modular business ERP built with Laravel, Filament and MySQL. His responsibilities included business modules, APIs, external integrations and modular architecture.",
    },
    {
      id: "education",
      keywords: ["education", "studies", "academic background", "sena", "english", "where did he study"],
      response:
        "Jhon holds a Technologist degree in Software Analysis and Development from SENA. He's also currently studying English at Smart Academy, in a program that goes from level A1 to C1.",
    },
    {
      id: "atlas",
      keywords: ["atlas"],
      response:
        "Atlas is a base platform focused on building modular, highly extensible systems. It serves as the technological foundation for different products, with a focus on modular architecture, extensibility, reuse, multi-tenancy and business systems.",
    },
    {
      id: "cafe-del-tiempo",
      keywords: ["cafe del tiempo", "cafe", "vault", "passwords", "personal finance"],
      response:
        "Café del Tiempo is a self-hosted, modular personal suite for safeguarding the information that matters most. It includes an encrypted vault for credentials, secrets and confidential notes, plus a personal finance module. It's built with Laravel, Filament and Tailwind CSS, runs on PostgreSQL in production (or SQLite when self-hosted), deploys with Docker and is open source (MIT). Later on, Jhon plans to let anyone who doesn't want to self-host use the production instance he maintains for free.",
    },
    {
      id: "projects",
      keywords: ["projects", "what is he building", "what is he working on", "what is he creating"],
      response:
        "Jhon is currently building Atlas, a modular base platform, and Café del Tiempo, a self-hosted personal suite with an encrypted vault and personal finance.",
      quickReplies: ["Tell me about Atlas", "What is Café del Tiempo?"],
    },
    {
      id: "services",
      keywords: ["services", "what does he offer", "how can he help", "what can you do", "what can he do"],
      response:
        "Jhon can help with web application development, Laravel development, APIs, business systems, ERPs, modular architecture, service integration, MVPs and process automation.",
      quickReplies: ["How can I contact him?"],
    },
    {
      id: "availability",
      keywords: ["available", "availability", "when can he start", "does he have time"],
      response: "I don't have information about his current availability. You can contact him directly to ask.",
      links: contactLinks,
    },
    {
      id: "contact",
      keywords: ["contact", "how do i contact him", "talk to jhon", "hire him", "hire", "quote", "budget", "price"],
      response: "You can contact me directly to talk about your project and see how I can help you.",
      links: contactLinks,
    },
    {
      id: "github",
      keywords: ["github", "repository", "repositories", "code"],
      response: "You can find his projects on GitHub.",
      links: githubUrl ? [{ label: "View GitHub", url: githubUrl }] : [],
    },
    {
      id: "instagram",
      keywords: ["instagram"],
      response: "You can follow his content on Instagram.",
      links: instagramUrl ? [{ label: "View Instagram", url: instagramUrl }] : [],
    },
    {
      id: "website",
      keywords: ["website", "main site", "tequia.dev"],
      response: "His main site is tequia.dev.",
      links: websiteUrl ? [{ label: "Visit tequia.dev", url: websiteUrl }] : [],
    },
    {
      id: "thanks",
      keywords: ["thanks", "thank you", "thx"],
      response: "You're welcome! If you'd like to know more about Jhon, I'm here.",
    },
  ],
};
