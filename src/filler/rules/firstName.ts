import { Locale } from '../../settings';
import { Rule } from './index';

const data: Record<Locale, string[]> = {
  en: ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Barbara'],
  pl: ['Jan', 'Anna', 'Piotr', 'Maria', 'Krzysztof', 'Katarzyna', 'Andrzej', 'Małgorzata', 'Tomasz', 'Agnieszka'],
};

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

const attr = (f: HTMLInputElement) =>
  `${f.getAttribute('autocomplete') ?? ''} ${f.name} ${f.id} ${f.placeholder}`.toLowerCase();

export const firstName: Rule = {
  type: 'firstName',
  test: f =>
    f.getAttribute('autocomplete') === 'given-name' ||
    /first.?name|frst.?name|fname|imie|imię/i.test(attr(f)),
  generate: locale => pick(data[locale] ?? data.en),
};
