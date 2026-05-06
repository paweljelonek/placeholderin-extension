import { describe, it, expect } from 'vitest';
import { generateNip } from '../../../src/filler/generators/nip';

function isValidNip(nip: string): boolean {
  if (!/^\d{10}$/.test(nip)) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const digits = nip.split('').map(Number);
  const sum = digits.slice(0, 9).reduce((acc, d, i) => acc + d * weights[i], 0);
  const checkDigit = sum % 11;
  return checkDigit !== 10 && checkDigit === digits[9];
}

describe('generateNip', () => {
  it('generates a valid NIP (checksum correct)', () => {
    for (let i = 0; i < 50; i++) {
      expect(isValidNip(generateNip())).toBe(true);
    }
  });

  it('generates a valid NIP for country pl', () => {
    for (let i = 0; i < 20; i++) {
      expect(isValidNip(generateNip('pl'))).toBe(true);
    }
  });

  it('generates exactly 10 digits', () => {
    expect(generateNip()).toMatch(/^\d{10}$/);
  });

  it('never starts with 0', () => {
    for (let i = 0; i < 50; i++) {
      expect(generateNip()[0]).not.toBe('0');
    }
  });
});
