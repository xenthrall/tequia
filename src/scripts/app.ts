import { initChatbot } from "../chatbot/chatbot";
import { isLocale, defaultLocale } from "../i18n/config";

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

// Jhon's Assistant — el idioma viene de <html lang>, que Layout.astro fija
// según la ruta (/en/, /es/).
const htmlLang = document.documentElement.lang;
const locale = isLocale(htmlLang) ? htmlLang : defaultLocale;
initChatbot(locale);
