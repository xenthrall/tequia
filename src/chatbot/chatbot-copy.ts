import type { Locale } from "../i18n/config";

export interface ChatCopy {
  assistantName: string;
  onlineLabel: string;
  openAriaLabel: string;
  closeToggleAriaLabel: string;
  closeButtonAriaLabel: string;
  dialogAriaLabel: string;
  welcomeMessage: string;
  inputPlaceholder: string;
  inputAriaLabel: string;
  sendAriaLabel: string;
  typingAriaLabel: string;
}

const en: ChatCopy = {
  assistantName: "Jhon's Assistant",
  onlineLabel: "Online",
  openAriaLabel: "Open Jhon's assistant",
  closeToggleAriaLabel: "Close Jhon's assistant",
  closeButtonAriaLabel: "Close assistant",
  dialogAriaLabel: "Jhon's assistant",
  welcomeMessage: "Hi, I'm Jhon's assistant. Ask me about his projects, experience, technologies or ways to contact him.",
  inputPlaceholder: "Type a message...",
  inputAriaLabel: "Type your message to the assistant",
  sendAriaLabel: "Send message",
  typingAriaLabel: "The assistant is typing",
};

const es: ChatCopy = {
  assistantName: "Jhon's Assistant",
  onlineLabel: "En línea",
  openAriaLabel: "Abrir el asistente de Jhon",
  closeToggleAriaLabel: "Cerrar el asistente de Jhon",
  closeButtonAriaLabel: "Cerrar asistente",
  dialogAriaLabel: "Asistente de Jhon",
  welcomeMessage: "Hola, soy el asistente de Jhon. Pregúntame sobre sus proyectos, experiencia, tecnologías o formas de contacto.",
  inputPlaceholder: "Escribe un mensaje...",
  inputAriaLabel: "Escribe tu mensaje para el asistente",
  sendAriaLabel: "Enviar mensaje",
  typingAriaLabel: "El asistente está escribiendo",
};

const copyByLocale: Record<Locale, ChatCopy> = { en, es };

export function getChatCopy(locale: Locale): ChatCopy {
  return copyByLocale[locale];
}
