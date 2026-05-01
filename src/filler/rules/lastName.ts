import { Locale } from '../../settings';
import { Rule } from './index';

const data: Record<Locale, string[]> = {
  en: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Taylor'],
  pl: ['Nowak', 'Kowalski', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamińska', 'Lewandowski', 'Zielińska', 'Szymański', 'Woźniak'],
};

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

const attr = (f: HTMLInputElement) =>
  `${f.getAttribute('autocomplete') ?? ''} ${f.name} ${f.id} ${f.placeholder}`.toLowerCase();

export const lastName: Rule = {
  type: 'lastName',
  test: f =>
    f.getAttribute('autocomplete') === 'family-name' ||
    /last.?name|lname|surname|nazwisko/i.test(attr(f)),
  generate: locale => pick(data[locale] ?? data.en),
};
