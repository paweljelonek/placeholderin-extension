import { Locale } from '../../settings';
import { firstName } from './firstName';
import { lastName } from './lastName';

export interface Rule {
  type: string;
  test: (field: HTMLInputElement) => boolean;
  generate: (locale: Locale) => string;
}

export const rules: Rule[] = [
  firstName,
  lastName,
];
