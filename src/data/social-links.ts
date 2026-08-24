import { siInstagram, siWhatsapp, siGithub, type SimpleIcon } from "simple-icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: SimpleIcon;
}

// Iconos de redes sociales mostrados en la cabecera del perfil.
// Para agregar una red social nueva, importa su icono de simple-icons
// y agrega un objeto { name, url, icon } a este arreglo.
export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://instagram.com/tequia.dev",
    icon: siInstagram,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/573248213023",
    icon: siWhatsapp,
  },
  {
    name: "GitHub",
    url: "https://github.com/xenthrall",
    icon: siGithub,
  },
];
