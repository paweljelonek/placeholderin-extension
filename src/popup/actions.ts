import { Action } from './types';
import { fillForm } from './handlers/fillForm';
import { openSettings } from './handlers/openSettings';

export const actions: Action[] = [
  { label: 'Fill form with fake data', handler: fillForm },
  { label: 'Settings', handler: openSettings },
];
