import { describe, it, expect } from 'vitest';
import { StaticDataGenerator } from '../../../src/filler/providers/static';

const data = { en: ['Alice', 'Bob'], pl: ['Anna', 'Jan'] };

describe('StaticDataGenerator', () => {
  it('returns a value from the correct locale pool', () => {
    const gen = new StaticDataGenerator(data);
    expect(data.en).toContain(gen.generate('en'));
    expect(data.pl).toContain(gen.generate('pl'));
  });

  it('falls back to en when locale pool is missing', () => {
    const gen = new StaticDataGenerator({ en: ['fallback'], pl: [] });
    expect(gen.generate('pl')).toBe('fallback');
  });
});
