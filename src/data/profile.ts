import type { Locale } from "../i18n/config";
import { profile as en } from "./profile.en";
import { profile as es } from "./profile.es";

export interface Profile {
  name: string;
  role: string;
  description: string;
  avatar: string;
}

const profiles: Record<Locale, Profile> = { en, es };

export function getProfile(locale: Locale): Profile {
  return profiles[locale];
}
