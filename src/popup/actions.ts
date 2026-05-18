import { Action } from './types';
import { t } from '../i18n';
import { Locale } from '../settings';
import { fillForm }       from './handlers/fillForm';
import { fillFirstName }  from './handlers/fillFirstName';
import { fillLastName }   from './handlers/fillLastName';
import { fillCity }       from './handlers/fillCity';
import { fillStreet }     from './handlers/fillStreet';
import { fillPostalCode } from './handlers/fillPostalCode';
import { fillPesel }      from './handlers/fillPesel';
import { fillNip }        from './handlers/fillNip';
import { fillPhone }      from './handlers/fillPhone';
import { openSettings }   from './handlers/openSettings';

export function createActions(lang: Locale): Action[] {
  return [
    { label: t('fillForm',       lang), icon: '✦', handler: fillForm,       primary:  true },
    { label: t('ruleFirstName',  lang), icon: '👤', handler: fillFirstName },
    { label: t('ruleLastName',   lang), icon: '👤', handler: fillLastName },
    { label: t('ruleCity',       lang), icon: '🏙', handler: fillCity },
    { label: t('ruleStreet',     lang), icon: '🏠', handler: fillStreet },
    { label: t('rulePostalCode', lang), icon: '📮', handler: fillPostalCode },
    { label: t('rulePhone',      lang), icon: '📞', handler: fillPhone },
    { label: t('rulePesel',      lang), icon: '🆔', handler: fillPesel },
    { label: t('ruleNip',        lang), icon: '🏢', handler: fillNip },
    { label: t('openSettings',   lang), icon: '⚙',  handler: openSettings,  settings: true },
  ];
}
