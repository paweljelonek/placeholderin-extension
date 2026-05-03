import { Locale } from '../../settings';

export interface DataGenerator {
  generate(locale: Locale): string;
}
