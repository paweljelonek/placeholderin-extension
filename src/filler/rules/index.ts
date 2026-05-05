import { Locale } from '../../settings';
import { firstName } from './firstName';
import { lastName } from './lastName';
import { city } from './city';
import { street } from './street';

export const attr = (f: HTMLInputElement) =>
  `${f.getAttribute('autocomplete') ?? ''} ${f.name} ${f.id} ${f.placeholder}`.toLowerCase();

export interface Rule {
  type: string;
  test: (field: HTMLInputElement) => boolean;
  generate: (locale: Locale) => string;
}

export const rules: Rule[] = [
  firstName,
  lastName,
  city,
  street,
];
