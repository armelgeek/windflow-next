export const locales = [
  "en",
  "fr"
] as const;

export type Locale = (typeof locales)[number];

export const labels = {
  en: "English",
  fr: "French"
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷"
};
