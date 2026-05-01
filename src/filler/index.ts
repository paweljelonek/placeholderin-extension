import { Settings } from '../settings';
import { rules } from './rules';

const SKIP = new Set(['hidden', 'submit', 'button', 'reset', 'checkbox', 'radio', 'file', 'image', 'range', 'color']);

export function fillAll(settings: Settings, only?: string[]): void {
  const fields = document.querySelectorAll<HTMLInputElement>('input, textarea');

  const activeRules = only
    ? rules.filter(r => only.includes(r.type))
    : rules;

  fields.forEach(field => {
    if (SKIP.has(field.type)) return;
    if (settings.fillOnlyEmpty && field.value.trim() !== '') return;

    const rule = activeRules.find(r => r.test(field));
    if (!rule) return;

    field.value = rule.generate(settings.locale);
    field.dispatchEvent(new Event('input',  { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
