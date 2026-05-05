import { Action } from './types';
import { fillForm }      from './handlers/fillForm';
import { fillFirstName } from './handlers/fillFirstName';
import { fillLastName }  from './handlers/fillLastName';
import { fillCity }      from './handlers/fillCity';
import { fillStreet }    from './handlers/fillStreet';
import { openSettings }  from './handlers/openSettings';

export const actions: Action[] = [
  { label: 'Fill form with fake data', handler: fillForm },
  { label: 'Fill first name',          handler: fillFirstName },
  { label: 'Fill last name',           handler: fillLastName },
  { label: 'Fill city',                handler: fillCity },
  { label: 'Fill street',              handler: fillStreet },
  { label: 'Settings',                 handler: openSettings },
];
