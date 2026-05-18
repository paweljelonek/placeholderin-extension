import { Rule, attr } from './index';
import { generatePesel } from '../generators/pesel';

export const pesel: Rule = {
  type: 'pesel',
  icon: '🆔',
  test: f => /pesel/i.test(attr(f)),
  generate: () => generatePesel(),
};
