import { describe, it, expect } from 'vitest';
import { firstName } from '../../../src/filler/rules/firstName';
import { lastName } from '../../../src/filler/rules/lastName';
import { city } from '../../../src/filler/rules/city';
import { street } from '../../../src/filler/rules/street';
import { postalCode } from '../../../src/filler/rules/postalCode';
import { pesel } from '../../../src/filler/rules/pesel';
import { nip } from '../../../src/filler/rules/nip';
import { phone } from '../../../src/filler/rules/phone';

function field(attrs: Partial<Pick<HTMLInputElement, 'name' | 'id' | 'placeholder'>> & { autocomplete?: string }): HTMLInputElement {
  const el = document.createElement('input');
  if (attrs.name)         el.name        = attrs.name;
  if (attrs.id)           el.id          = attrs.id;
  if (attrs.placeholder)  el.placeholder = attrs.placeholder;
  if (attrs.autocomplete) el.setAttribute('autocomplete', attrs.autocomplete);
  return el;
}

describe('firstName rule', () => {
  it('matches autocomplete given-name',          () => expect(firstName.test(field({ autocomplete: 'given-name' }))).toBe(true));
  it('matches name first_name (underscore)',      () => expect(firstName.test(field({ name: 'first_name' }))).toBe(true));
  it('matches name first-name (dash)',            () => expect(firstName.test(field({ name: 'first-name' }))).toBe(true));
  it('matches name fname',                       () => expect(firstName.test(field({ name: 'fname' }))).toBe(true));
  it('matches name 02frstname',                  () => expect(firstName.test(field({ name: '02frstname' }))).toBe(true));
  it('matches Polish imie in placeholder',       () => expect(firstName.test(field({ placeholder: 'Imię' }))).toBe(true));
  it('does not match unrelated field',           () => expect(firstName.test(field({ name: 'email' }))).toBe(false));
});

describe('lastName rule', () => {
  it('matches autocomplete family-name',         () => expect(lastName.test(field({ autocomplete: 'family-name' }))).toBe(true));
  it('matches name last_name (underscore)',       () => expect(lastName.test(field({ name: 'last_name' }))).toBe(true));
  it('matches name surname',                     () => expect(lastName.test(field({ name: 'surname' }))).toBe(true));
  it('matches name lname',                       () => expect(lastName.test(field({ name: 'lname' }))).toBe(true));
  it('matches Polish nazwisko in placeholder',   () => expect(lastName.test(field({ placeholder: 'Nazwisko' }))).toBe(true));
  it('does not match unrelated field',           () => expect(lastName.test(field({ name: 'email' }))).toBe(false));
});

describe('city rule', () => {
  it('matches autocomplete address-level2',      () => expect(city.test(field({ autocomplete: 'address-level2' }))).toBe(true));
  it('matches name city',                        () => expect(city.test(field({ name: 'city' }))).toBe(true));
  it('matches name town',                        () => expect(city.test(field({ name: 'town' }))).toBe(true));
  it('does not match address-line2',             () => expect(city.test(field({ autocomplete: 'address-line2' }))).toBe(false));
});

describe('street rule', () => {
  it('matches autocomplete street-address',      () => expect(street.test(field({ autocomplete: 'street-address' }))).toBe(true));
  it('matches autocomplete address-line1',       () => expect(street.test(field({ autocomplete: 'address-line1' }))).toBe(true));
  it('does not match address-line2',             () => expect(street.test(field({ autocomplete: 'address-line2' }))).toBe(false));
});

describe('postalCode rule', () => {
  it('matches autocomplete postal-code',         () => expect(postalCode.test(field({ autocomplete: 'postal-code' }))).toBe(true));
  it('matches name zip',                         () => expect(postalCode.test(field({ name: 'zip' }))).toBe(true));
  it('matches name postcode',                    () => expect(postalCode.test(field({ name: 'postcode' }))).toBe(true));
  it('matches Polish kod pocztowy',              () => expect(postalCode.test(field({ placeholder: 'Kod pocztowy' }))).toBe(true));
});

describe('pesel rule', () => {
  it('matches name pesel',                       () => expect(pesel.test(field({ name: 'pesel' }))).toBe(true));
  it('matches id PESEL (uppercase)',             () => expect(pesel.test(field({ id: 'PESEL' }))).toBe(true));
  it('matches placeholder Numer PESEL',          () => expect(pesel.test(field({ placeholder: 'Numer PESEL' }))).toBe(true));
  it('does not match unrelated field',           () => expect(pesel.test(field({ name: 'email' }))).toBe(false));
});

describe('nip rule', () => {
  it('matches name nip',                         () => expect(nip.test(field({ name: 'nip' }))).toBe(true));
  it('matches id NIP (uppercase)',               () => expect(nip.test(field({ id: 'NIP' }))).toBe(true));
  it('matches placeholder NIP firmy',            () => expect(nip.test(field({ placeholder: 'NIP firmy' }))).toBe(true));
  it('matches name nip_firmy',                   () => expect(nip.test(field({ name: 'nip_firmy' }))).toBe(true));
  it('matches name firma_nip',                   () => expect(nip.test(field({ name: 'firma_nip' }))).toBe(true));
  it('matches name numer_nip',                   () => expect(nip.test(field({ name: 'numer_nip' }))).toBe(true));
  it('matches name company_nip',                 () => expect(nip.test(field({ name: 'company_nip' }))).toBe(true));
  it('matches name nip-firmy (dash)',            () => expect(nip.test(field({ name: 'nip-firmy' }))).toBe(true));
  it('matches name tax_id',                      () => expect(nip.test(field({ name: 'tax_id' }))).toBe(true));
  it('matches name tax-id',                      () => expect(nip.test(field({ name: 'tax-id' }))).toBe(true));
  it('does not match unrelated field',           () => expect(nip.test(field({ name: 'email' }))).toBe(false));
  it('does not match partial word nipple',       () => expect(nip.test(field({ name: 'nipple' }))).toBe(false));
});

describe('phone rule', () => {
  it('matches autocomplete tel',                 () => expect(phone.test(field({ autocomplete: 'tel' }))).toBe(true));
  it('matches autocomplete tel-national',        () => expect(phone.test(field({ autocomplete: 'tel-national' }))).toBe(true));
  it('matches autocomplete tel-local',           () => expect(phone.test(field({ autocomplete: 'tel-local' }))).toBe(true));
  it('matches name tel',                         () => expect(phone.test(field({ name: 'tel' }))).toBe(true));
  it('matches name telefon',                     () => expect(phone.test(field({ name: 'telefon' }))).toBe(true));
  it('matches name telephone',                   () => expect(phone.test(field({ name: 'telephone' }))).toBe(true));
  it('matches name phone',                       () => expect(phone.test(field({ name: 'phone' }))).toBe(true));
  it('matches name mobile',                      () => expect(phone.test(field({ name: 'mobile' }))).toBe(true));
  it('matches name gsm',                         () => expect(phone.test(field({ name: 'gsm' }))).toBe(true));
  it('matches name numer_tel',                   () => expect(phone.test(field({ name: 'numer_tel' }))).toBe(true));
  it('matches name tel_komorkowy',               () => expect(phone.test(field({ name: 'tel_komorkowy' }))).toBe(true));
  it('matches name phone_number',                () => expect(phone.test(field({ name: 'phone_number' }))).toBe(true));
  it('matches name user_phone',                  () => expect(phone.test(field({ name: 'user_phone' }))).toBe(true));
  it('matches name contact_mobile',              () => expect(phone.test(field({ name: 'contact_mobile' }))).toBe(true));
  it('matches name mobile_number',               () => expect(phone.test(field({ name: 'mobile_number' }))).toBe(true));
  it('matches name gsm_number',                  () => expect(phone.test(field({ name: 'gsm_number' }))).toBe(true));
  it('matches placeholder Numer telefonu',       () => expect(phone.test(field({ placeholder: 'Numer telefonu' }))).toBe(true));
  it('does not match name hotel',                () => expect(phone.test(field({ name: 'hotel' }))).toBe(false));
  it('does not match unrelated field',           () => expect(phone.test(field({ name: 'email' }))).toBe(false));
});
