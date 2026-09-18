import type { Locale } from "../i18n/config";
import type { ChatLink } from "./chatbot-links";
import { chatbotData as en } from "./chatbot-data.en";
import { chatbotData as es } from "./chatbot-data.es";

export type { ChatLink } from "./chatbot-links";

export interface Intent {
  id: string;
  keywords: string[];
  response: string;
  links?: ChatLink[];
  quickReplies?: string[];
}

export interface ChatResponse {
  id: string;
  text: string;
  links?: ChatLink[];
  quickReplies?: string[];
}

export interface ChatbotData {
  intents: Intent[];
  fallbackResponse: ChatResponse;
  openingQuickReplies: string[];
}

const dataByLocale: Record<Locale, ChatbotData> = { en, es };

export function getChatbotData(locale: Locale): ChatbotData {
  return dataByLocale[locale];
}
