export const i18n = {
  defaultLocale: "tr",
  locales: ["tr"],
  fallbackLng: "tr"
} as const;

export type Locale = (typeof i18n)["locales"][number];
