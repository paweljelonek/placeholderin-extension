import { describe, it, expect } from 'vitest';
import { generatePesel } from '../../../src/filler/generators/pesel';

function isValidPesel(pesel: string): boolean {
  if (!/^\d{11}$/.test(pesel)) return false;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.split('').map(Number);
  const sum = digits.slice(0, 10).reduce((acc, d, i) => acc + d * weights[i], 0);
  return (10 - (sum % 10)) % 10 === digits[10];
}

function getGenderFromPesel(pesel: string): 'male' | 'female' {
  return Number(pesel[9]) % 2 === 1 ? 'male' : 'female';
}

describe('generatePesel', () => {
  it('generates a valid PESEL (checksum correct)', () => {
    for (let i = 0; i < 20; i++) {
      expect(isValidPesel(generatePesel())).toBe(true);
    }
  });

  it('generates male PESEL when gender is male', () => {
    for (let i = 0; i < 10; i++) {
      expect(getGenderFromPesel(generatePesel('male'))).toBe('male');
    }
  });

  it('generates female PESEL when gender is female', () => {
    for (let i = 0; i < 10; i++) {
      expect(getGenderFromPesel(generatePesel('female'))).toBe('female');
    }
  });

  it('generates both genders when no gender specified', () => {
    const genders = new Set(
      Array.from({ length: 50 }, () => getGenderFromPesel(generatePesel()))
    );
    expect(genders.size).toBe(2);
  });
});
