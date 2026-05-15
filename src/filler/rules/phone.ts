import { Rule, attr } from './index';
import { generatePhone } from '../generators/phone';

export const phone: Rule = {
  type: 'phone',
  label: 'Telefon',
  icon: '📞',
  test: f =>
    /^tel(-national|-local)?$/.test(f.getAttribute('autocomplete') ?? '') ||
    /(?<![a-z])(tel|phone|mobile|gsm)/i.test(attr(f)),
  generate: () => generatePhone('pl'),
};
