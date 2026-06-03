export const Locale = {
  EN: 'en',
  PL: 'pl',
  DE: 'de',
  RU: 'ru',
  FR: 'fr',
  ES: 'es',
} as const;

export type Locale = typeof Locale[keyof typeof Locale];

export interface Shortcut {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
}

export interface Settings {
  locale: Locale;
  uiLanguage: Locale;
  fillOnlyEmpty: boolean;
  shortcut: Shortcut;
  quickFillItems: string[];
}
