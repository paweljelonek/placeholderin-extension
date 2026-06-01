import { describe, it, expect } from 'vitest';
import { generatePhone } from '../../../src/filler/generators/phone';

const PL_MOBILE_PREFIXES = ['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88'];

describe('generatePhone', () => {
  it('generates exactly 9 digits', () => {
    for (let i = 0; i < 20; i++) {
      expect(generatePhone()).toMatch(/^\d{9}$/);
    }
  });

  it('starts with a valid Polish mobile prefix', () => {
    for (let i = 0; i < 20; i++) {
      const num = generatePhone();
      expect(PL_MOBILE_PREFIXES).toContain(num.slice(0, 2));
    }
  });

  it('generates different numbers', () => {
    const nums = new Set(Array.from({ length: 20 }, () => generatePhone()));
    expect(nums.size).toBeGreaterThan(1);
  });

  it('generates a valid number for country pl', () => {
    expect(generatePhone('pl')).toMatch(/^\d{9}$/);
  });

  it('generates a valid French mobile number', () => {
    for (let i = 0; i < 20; i++) {
      expect(generatePhone('fr')).toMatch(/^0[67]( \d{2}){4}$/);
    }
  });
});
