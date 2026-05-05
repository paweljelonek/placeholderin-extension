export type Gender = 'male' | 'female';

function pad(n: number, len: number): string {
  return String(n).padStart(len, '0');
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generatePesel(gender?: Gender): string {
  const resolvedGender: Gender = gender ?? (Math.random() < 0.5 ? 'male' : 'female');

  const year = randomInt(1960, 2005);
  const month = randomInt(1, 12);
  const day = randomInt(1, new Date(year, month, 0).getDate());

  const encodedMonth = year >= 2000 ? month + 20 : month;

  const serial = randomInt(0, 999);
  const genderDigit =
    resolvedGender === 'male'
      ? [1, 3, 5, 7, 9][randomInt(0, 4)]
      : [0, 2, 4, 6, 8][randomInt(0, 4)];

  const digits = [
    ...pad(year % 100, 2).split('').map(Number),
    ...pad(encodedMonth, 2).split('').map(Number),
    ...pad(day, 2).split('').map(Number),
    ...pad(serial, 3).split('').map(Number),
    genderDigit,
  ];

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
  const checkDigit = (10 - (sum % 10)) % 10;

  return digits.join('') + checkDigit;
}
