import { respond } from "./chatbot-engine";
import { getChatbotData } from "./chatbot-data";
import { getChatCopy } from "./chatbot-copy";
import type { Locale } from "../i18n/config";
import {
  mountChatWidget,
  appendMessage,
  appendQuickReplies,
  showTypingIndicator,
  removeNode,
  openPanel,
  closePanel,
  isPanelOpen,
  setSendEnabled,
} from "./chatbot-ui";

export function initChatbot(locale: Locale): void {
  const data = getChatbotData(locale);
  const copy = getChatCopy(locale);

  async function handleUserMessage(rawMessage: string): Promise<void> {
    const message = rawMessage.trim();
    if (!message) return;

    appendMessage({ role: "user", text: message });

    const typingIndicator = showTypingIndicator();
    const reply = await respond(message, data);
    removeNode(typingIndicator);

    appendMessage({ role: "bot", text: reply.text, links: reply.links });

    if (reply.quickReplies?.length) {
      appendQuickReplies(reply.quickReplies, handleUserMessage);
    }
  }

  function showWelcomeMessage(): void {
    appendMessage({ role: "bot", text: copy.welcomeMessage });
    appendQuickReplies(data.openingQuickReplies, handleUserMessage);
  }

  const els = mountChatWidget(copy);
  let hasGreeted = false;

  function toggle() {
    if (isPanelOpen()) {
      closePanel();
      return;
    }

    openPanel();

    if (!hasGreeted) {
      hasGreeted = true;
      showWelcomeMessage();
    }
  }

  els.toggle.addEventListener("click", toggle);
  els.close.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isPanelOpen()) {
      closePanel();
    }
  });

  els.input.addEventListener("input", () => {
    setSendEnabled(els.input.value.trim().length > 0);
  });

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = els.input.value;
    if (!message.trim()) return;

    els.input.value = "";
    setSendEnabled(false);

    handleUserMessage(message);
  });
}
