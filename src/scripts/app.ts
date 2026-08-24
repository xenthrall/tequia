import { initChatbot } from "../chatbot/chatbot";
import { initMusicPlayer } from "../music/music-player";
import { initCinema } from "../cinema/cinema";

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

// Music player
initMusicPlayer();

// Modo cine (capa inmersiva que aparece mientras suena la música)
initCinema();
