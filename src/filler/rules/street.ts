import { Rule, attr } from './index';
import { streetGenerator } from '../providers/street';

export const street: Rule = {
  type: 'street',
  label: 'Ulica',
  icon: '🏠',
  test: f =>
    f.getAttribute('autocomplete') !== 'address-line2' &&
    (f.getAttribute('autocomplete') === 'street-address' ||
    f.getAttribute('autocomplete') === 'address-line1' ||
    /street|address|ulica|adres/i.test(attr(f))),
  generate: locale => streetGenerator.generate(locale),
};
