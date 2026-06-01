import { Locale } from '../../settings';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDigits(n: number): string {
  return Array.from({ length: n }, () => randomInt(0, 9)).join('');
}

function pick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

const PL_MOBILE_PREFIXES = ['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88'];
const DE_MOBILE_PREFIXES = ['0151', '0152', '0157', '0160', '0162', '0170', '0171', '0172', '0175', '0176', '0177'];
const RU_MOBILE_PREFIXES = ['900', '901', '902', '910', '915', '916', '920', '921', '925', '926', '950', '960'];
const FR_MOBILE_PREFIXES = ['06', '07'];
const EN_AREA_CODES      = ['212', '310', '312', '404', '415', '617', '713', '718', '773', '818'];

function generatePhonePl(): string {
  return pick(PL_MOBILE_PREFIXES) + randomDigits(7);
}

function generatePhoneDe(): string {
  return pick(DE_MOBILE_PREFIXES) + ' ' + randomDigits(8);
}

function generatePhoneRu(): string {
  return `+7 ${pick(RU_MOBILE_PREFIXES)} ${randomDigits(3)}-${randomDigits(2)}-${randomDigits(2)}`;
}

function generatePhoneFr(): string {
  return `${pick(FR_MOBILE_PREFIXES)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;
}

function generatePhoneEn(): string {
  return `(${pick(EN_AREA_CODES)}) ${randomDigits(3)}-${randomDigits(4)}`;
}

export function generatePhone(locale: Locale = 'pl'): string {
  switch (locale) {
    case 'pl': return generatePhonePl();
    case 'de': return generatePhoneDe();
    case 'ru': return generatePhoneRu();
    case 'fr': return generatePhoneFr();
    default:   return generatePhoneEn();
  }
}
