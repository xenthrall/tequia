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

// Menús desplegables (<details data-dropdown>: idioma y menú móvil): se
// cierran al tocar fuera, con Escape, y al abrir uno se cierran los demás.
const dropdowns = [...document.querySelectorAll<HTMLDetailsElement>("details[data-dropdown]")];

const closeDropdowns = (except?: HTMLDetailsElement) => {
  for (const dropdown of dropdowns) {
    if (dropdown !== except) dropdown.open = false;
  }
};

for (const dropdown of dropdowns) {
  dropdown.addEventListener("toggle", () => {
    if (dropdown.open) closeDropdowns(dropdown);
  });
}

document.addEventListener("click", (event) => {
  const target = event.target as Node;
  if (!dropdowns.some((dropdown) => dropdown.contains(target))) closeDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDropdowns();
});

// Jhon's Assistant — el idioma viene de <html lang>, que Layout.astro fija
// según la ruta (/en/, /es/).
const htmlLang = document.documentElement.lang;
const locale = isLocale(htmlLang) ? htmlLang : defaultLocale;
initChatbot(locale);
