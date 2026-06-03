import { describe, it, expect } from 'vitest';
import { postalCodeGenerator } from '../../../src/filler/providers/postalCode';

describe('PostalCodeGenerator', () => {
  it('generates Polish format XX-XXX', () => {
    expect(postalCodeGenerator.generate('pl')).toMatch(/^\d{2}-\d{3}$/);
  });

  it('generates English format XXXXX', () => {
    expect(postalCodeGenerator.generate('en')).toMatch(/^\d{5}$/);
  });

  it('generates French format XXXXX', () => {
    expect(postalCodeGenerator.generate('fr')).toMatch(/^\d{5}$/);
  });

  it('generates Spanish format XXXXX', () => {
    expect(postalCodeGenerator.generate('es')).toMatch(/^\d{5}$/);
  });
});
