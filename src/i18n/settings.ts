// src/i18n/settings.ts
export const languages = ['en', 'de'] as const
export type Language = (typeof languages)[number]
export const defaultLanguage: Language = 'en'
