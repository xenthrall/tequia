import { initChatbot } from "../chatbot/chatbot";

// Theme toggle with persisted preference
const themeToggle = document.querySelector<HTMLButtonElement>("#theme-toggle");

themeToggle?.addEventListener("click", () => {
  const isLight = document.documentElement.classList.toggle("light-mode");

  try {
    localStorage.setItem("theme", isLight ? "light" : "dark");
  } catch {
    // Storage unavailable (e.g. private browsing).
  }
});

// Jhon's Assistant
initChatbot();
