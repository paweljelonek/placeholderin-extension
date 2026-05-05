import { Action } from './types';
import { fillForm }      from './handlers/fillForm';
import { fillFirstName } from './handlers/fillFirstName';
import { fillLastName }  from './handlers/fillLastName';
import { fillCity }      from './handlers/fillCity';
import { fillStreet }      from './handlers/fillStreet';
import { fillPostalCode }  from './handlers/fillPostalCode';
import { fillPesel }     from './handlers/fillPesel';
import { openSettings }  from './handlers/openSettings';

export const actions: Action[] = [
  { label: 'Wypełnij formularz', icon: '✦', handler: fillForm, primary: true },
  { label: 'Imię',               icon: '👤', handler: fillFirstName },
  { label: 'Nazwisko',           icon: '👤', handler: fillLastName },
  { label: 'Miasto',             icon: '🏙', handler: fillCity },
  { label: 'Ulica',              icon: '🏠', handler: fillStreet },
  { label: 'Kod pocztowy',       icon: '📮', handler: fillPostalCode },
  { label: 'PESEL',              icon: '🆔', handler: fillPesel },
  { label: 'Ustawienia',         icon: '⚙',  handler: openSettings, settings: true },
];
