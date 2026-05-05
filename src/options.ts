import { loadSettings, saveSettings, Locale } from './settings';

const localeEl        = document.getElementById('locale')        as HTMLSelectElement;
const fillOnlyEmptyEl = document.getElementById('fillOnlyEmpty') as HTMLInputElement;
const saveBtn         = document.getElementById('saveBtn')        as HTMLButtonElement;
const statusEl        = document.getElementById('status')         as HTMLDivElement;

loadSettings().then(s => {
  localeEl.value          = s.locale;
  fillOnlyEmptyEl.checked = s.fillOnlyEmpty;
});

saveBtn.addEventListener('click', async () => {
  await saveSettings({
    locale:        localeEl.value as Locale,
    fillOnlyEmpty: fillOnlyEmptyEl.checked,
  });
  statusEl.textContent = '✓ Zapisano';
  statusEl.className = 'ok';
  setTimeout(() => { statusEl.textContent = ''; statusEl.className = ''; }, 2000);
});
