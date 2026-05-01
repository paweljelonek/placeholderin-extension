import { Action } from './types';
import { fillForm }      from './handlers/fillForm';
import { fillFirstName } from './handlers/fillFirstName';
import { fillLastName }  from './handlers/fillLastName';
import { openSettings }  from './handlers/openSettings';

export const actions: Action[] = [
  { label: 'Fill form with fake data', handler: fillForm },
  { label: 'Fill first name',          handler: fillFirstName },
  { label: 'Fill last name',           handler: fillLastName },
  { label: 'Settings',                 handler: openSettings },
];
