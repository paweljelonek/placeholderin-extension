import { describe, it, expect, beforeEach } from 'vitest';
import { t, ruleKey, applyI18n } from '../../src/i18n';

describe('t()', () => {
  it('returns English message for known key in "en"', () => {
    expect(t('fillForm', 'en')).toBe('Fill form');
  });

  it('returns Polish message for known key in "pl"', () => {
    expect(t('fillForm', 'pl')).toBe('Wypełnij formularz');
  });

  it('returns English message for all rule keys in "en"', () => {
    expect(t('ruleFirstName',  'en')).toBe('First name');
    expect(t('ruleLastName',   'en')).toBe('Last name');
    expect(t('ruleCity',       'en')).toBe('City');
    expect(t('ruleStreet',     'en')).toBe('Street');
    expect(t('rulePostalCode', 'en')).toBe('Postal code');
    expect(t('rulePesel',      'en')).toBe('PESEL');
    expect(t('ruleNip',        'en')).toBe('NIP');
    expect(t('rulePhone',      'en')).toBe('Phone');
  });

  it('returns Polish message for all rule keys in "pl"', () => {
    expect(t('ruleFirstName',  'pl')).toBe('Imię');
    expect(t('ruleLastName',   'pl')).toBe('Nazwisko');
    expect(t('ruleCity',       'pl')).toBe('Miasto');
    expect(t('ruleStreet',     'pl')).toBe('Ulica');
    expect(t('rulePostalCode', 'pl')).toBe('Kod pocztowy');
    expect(t('rulePesel',      'pl')).toBe('PESEL');
    expect(t('ruleNip',        'pl')).toBe('NIP');
    expect(t('rulePhone',      'pl')).toBe('Telefon');
  });

  it('falls back to English when language is not in catalogue', () => {
    expect(t('fillForm', 'xx' as 'en')).toBe('Fill form');
  });

  it('returns French message for known key in "fr"', () => {
    expect(t('fillForm', 'fr')).toBe('Remplir le formulaire');
  });

  it('returns French message for all rule keys in "fr"', () => {
    expect(t('ruleFirstName',  'fr')).toBe('Prénom');
    expect(t('ruleLastName',   'fr')).toBe('Nom de famille');
    expect(t('ruleCity',       'fr')).toBe('Ville');
    expect(t('ruleStreet',     'fr')).toBe('Rue');
    expect(t('rulePostalCode', 'fr')).toBe('Code postal');
    expect(t('rulePhone',      'fr')).toBe('Téléphone');
  });

  it('returns Spanish message for known key in "es"', () => {
    expect(t('fillForm', 'es')).toBe('Rellenar formulario');
  });

  it('returns Spanish message for all rule keys in "es"', () => {
    expect(t('ruleFirstName',  'es')).toBe('Nombre');
    expect(t('ruleLastName',   'es')).toBe('Apellido');
    expect(t('ruleCity',       'es')).toBe('Ciudad');
    expect(t('ruleStreet',     'es')).toBe('Calle');
    expect(t('rulePostalCode', 'es')).toBe('Código postal');
    expect(t('rulePhone',      'es')).toBe('Teléfono');
  });
});

describe('ruleKey()', () => {
  it('capitalises the first letter and prepends "rule"', () => {
    expect(ruleKey('firstName')).toBe('ruleFirstName');
    expect(ruleKey('lastName')).toBe('ruleLastName');
    expect(ruleKey('city')).toBe('ruleCity');
    expect(ruleKey('street')).toBe('ruleStreet');
    expect(ruleKey('postalCode')).toBe('rulePostalCode');
    expect(ruleKey('pesel')).toBe('rulePesel');
    expect(ruleKey('nip')).toBe('ruleNip');
    expect(ruleKey('phone')).toBe('rulePhone');
  });
});

describe('applyI18n()', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('lang');
  });

  it('sets document.documentElement.lang', () => {
    applyI18n('pl');
    expect(document.documentElement.lang).toBe('pl');
  });

  it('replaces textContent of elements with data-i18n in English', () => {
    const el = document.createElement('div');
    el.dataset.i18n = 'fillForm';
    document.body.appendChild(el);

    applyI18n('en');

    expect(el.textContent).toBe('Fill form');
  });

  it('replaces textContent of elements with data-i18n in Polish', () => {
    const el = document.createElement('div');
    el.dataset.i18n = 'fillForm';
    document.body.appendChild(el);

    applyI18n('pl');

    expect(el.textContent).toBe('Wypełnij formularz');
  });

  it('translates multiple elements at once', () => {
    const a = document.createElement('span');
    a.dataset.i18n = 'settingsSave';
    const b = document.createElement('span');
    b.dataset.i18n = 'openSettings';
    document.body.append(a, b);

    applyI18n('pl');

    expect(a.textContent).toBe('Zapisz');
    expect(b.textContent).toBe('Ustawienia');
  });

  it('leaves elements without data-i18n untouched', () => {
    const el = document.createElement('p');
    el.textContent = 'static text';
    document.body.appendChild(el);

    applyI18n('en');

    expect(el.textContent).toBe('static text');
  });
});
