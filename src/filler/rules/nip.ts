import { Rule, attr } from './index';
import { generateNip } from '../generators/nip';

export const nip: Rule = {
  type: 'nip',
  label: 'NIP',
  icon: '🏢',
  test: f => /(?<![a-z])nip(?![a-z])|tax[_-]?id/i.test(attr(f)),
  generate: () => generateNip('pl'),
};
