export const Locale = {
  EN: 'en',
  PL: 'pl',
} as const;

export type Locale = typeof Locale[keyof typeof Locale];

export interface Settings {
  locale: Locale;
  fillOnlyEmpty: boolean;
}
