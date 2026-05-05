import { Locale } from '../../settings';
import { DataGenerator } from '../generators';

function digits(n: number): string {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
}

class PostalCodeGenerator implements DataGenerator {
  generate(locale: Locale): string {
    switch (locale) {
      case 'pl': return `${digits(2)}-${digits(3)}`;
      case 'en': return digits(5);
    }
  }
}

export const postalCodeGenerator = new PostalCodeGenerator();
