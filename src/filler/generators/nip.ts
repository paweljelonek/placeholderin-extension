export type NipCountry = 'pl';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNipPl(): string {
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  let digits: number[];
  let checkDigit: number;

  do {
    digits = [randomInt(1, 9), ...Array.from({ length: 8 }, () => randomInt(0, 9))];
    const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
    checkDigit = sum % 11;
  } while (checkDigit === 10);

  return digits.join('') + checkDigit;
}

export function generateNip(country: NipCountry = 'pl'): string {
  switch (country) {
    case 'pl':
    default:
      return generateNipPl();
  }
}
