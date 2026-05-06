export type PhoneCountry = 'pl';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PL_MOBILE_PREFIXES = ['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88'];

function generatePhonePl(): string {
  const prefix = PL_MOBILE_PREFIXES[randomInt(0, PL_MOBILE_PREFIXES.length - 1)];
  const rest = Array.from({ length: 7 }, () => randomInt(0, 9)).join('');
  return prefix + rest;
}

export function generatePhone(country: PhoneCountry = 'pl'): string {
  switch (country) {
    case 'pl':
    default:
      return generatePhonePl();
  }
}
