import en from '../../_locales/en/messages.json';
import pl from '../../_locales/pl/messages.json';
import de from '../../_locales/de/messages.json';
import ru from '../../_locales/ru/messages.json';
import fr from '../../_locales/fr/messages.json';
import { Locale } from '../settings/types';

export type MessageKey = keyof typeof en;

const catalogues = { en, pl, de, ru, fr } as Record<Locale, typeof en>;

export function t(key: MessageKey, lang: Locale): string {
  return (catalogues[lang]?.[key] ?? en[key]).message;
}

export function ruleKey(type: string): MessageKey {
  return `rule${type.charAt(0).toUpperCase()}${type.slice(1)}` as MessageKey;
}

export function applyI18n(lang: Locale): void {
  document.documentElement.lang = lang;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n as MessageKey;
    el.textContent = t(key, lang);
  });
}
