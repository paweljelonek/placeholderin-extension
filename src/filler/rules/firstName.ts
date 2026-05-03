import { Rule, attr } from './index';
import { firstNameGenerator } from '../providers/firstName';

export const firstName: Rule = {
  type: 'firstName',
  test: f =>
    f.getAttribute('autocomplete') === 'given-name' ||
    /first.?name|frst.?name|fname|imie|imię/i.test(attr(f)),
  generate: locale => firstNameGenerator.generate(locale),
};
