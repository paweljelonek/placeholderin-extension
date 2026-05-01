import { Locale, Settings } from './types';

function detectLocale(): Locale {
  const lang = chrome.i18n.getUILanguage().split('-')[0].toLowerCase();
  return (Object.values(Locale) as string[]).includes(lang)
    ? (lang as Locale)
    : Locale.EN;
}

export function loadSettings(): Promise<Settings> {
  const defaults: Settings = {
    locale: detectLocale(),
    fillOnlyEmpty: true,
  };
  return new Promise(resolve =>
    chrome.storage.sync.get(defaults, r => resolve(r as Settings))
  );
}

export function saveSettings(patch: Partial<Settings>): Promise<void> {
  return new Promise(resolve =>
    chrome.storage.sync.set(patch, resolve)
  );
}
