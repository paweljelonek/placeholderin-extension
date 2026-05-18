import { Rule, attr } from './index';
import { lastNameGenerator } from '../providers/lastName';

export const lastName: Rule = {
  type: 'lastName',
  icon: '👤',
  test: f =>
    f.getAttribute('autocomplete') === 'family-name' ||
    /last.?name|lname|surname|nazwisko/i.test(attr(f)),
  generate: locale => lastNameGenerator.generate(locale),
};
