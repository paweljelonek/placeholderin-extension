import { Rule, attr } from './index';
import { cityGenerator } from '../providers/city';

export const city: Rule = {
  type: 'city',
  label: 'Miasto',
  icon: '🏙',
  test: f =>
    f.getAttribute('autocomplete') !== 'address-line2' &&
    (f.getAttribute('autocomplete') === 'address-level2' ||
    /city|town|miasto/i.test(attr(f))),
  generate: locale => cityGenerator.generate(locale),
};
