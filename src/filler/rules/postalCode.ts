import { Rule, attr } from './index';
import { postalCodeGenerator } from '../providers/postalCode';

export const postalCode: Rule = {
  type: 'postalCode',
  icon: '📮',
  test: f =>
    f.getAttribute('autocomplete') === 'postal-code' ||
    /postal|zip|postcode|kod.?pocztowy/i.test(attr(f)),
  generate: locale => postalCodeGenerator.generate(locale),
};
