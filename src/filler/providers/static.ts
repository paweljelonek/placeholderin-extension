import { Locale } from '../../settings';
import { DataGenerator } from '../generators';

export class StaticDataGenerator implements DataGenerator {
  constructor(private readonly data: Partial<Record<Locale, string[]>> & { en: string[] }) {}

  generate(locale: Locale): string {
    const pool = this.data[locale]?.length ? this.data[locale]! : this.data.en;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
