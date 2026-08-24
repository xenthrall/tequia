export interface ContactConfig {
  formspreeId: string;
  whatsapp: {
    number: string;
    message: string;
  };
}

// Datos de la sección de contacto.
export const contact: ContactConfig = {
  formspreeId: "mkjwrazq",
  whatsapp: {
    number: "573248213023",
    message:
      "Hola Jhon, me interesa conversar contigo sobre una idea o proyecto que tengo y quisiera conocer cómo podrías ayudarme.",
  },
};
