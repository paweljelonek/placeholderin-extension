import { loadSettings, saveSettings, Locale, Shortcut, formatShortcut } from './settings';
import { rules } from './filler/rules';
import { t, applyI18n, ruleKey } from './i18n';

const localeEl          = document.getElementById('locale')          as HTMLSelectElement;
const uiLanguageEl      = document.getElementById('uiLanguage')      as HTMLSelectElement;
const fillOnlyEmptyEl   = document.getElementById('fillOnlyEmpty')   as HTMLInputElement;
const shortcutDisplayEl = document.getElementById('shortcutDisplay') as HTMLElement;
const shortcutRecordBtn = document.getElementById('shortcutRecord')  as HTMLButtonElement;
const quickFillListEl   = document.getElementById('quickFillList')   as HTMLDivElement;
const saveBtn           = document.getElementById('saveBtn')          as HTMLButtonElement;
const statusEl          = document.getElementById('status')           as HTMLDivElement;

let currentShortcut: Shortcut = { key: 'f', altKey: true, ctrlKey: false, shiftKey: true };
let isRecording = false;
let currentLang: Locale = Locale.EN;

function updateShortcutDisplay(): void {
  shortcutDisplayEl.textContent = formatShortcut(currentShortcut);
}

function startRecording(): void {
  isRecording = true;
  shortcutRecordBtn.textContent = t('settingsShortcutRecording', currentLang);
  shortcutRecordBtn.classList.add('recording');
}

function stopRecording(): void {
  isRecording = false;
  shortcutRecordBtn.textContent = t('settingsShortcutRecord', currentLang);
  shortcutRecordBtn.classList.remove('recording');
}

document.addEventListener('keydown', e => {
  if (!isRecording) return;
  if (e.key === 'Escape') { stopRecording(); return; }
  if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;

  e.preventDefault();
  currentShortcut = {
    key: e.key.toLowerCase(),
    altKey: e.altKey,
    ctrlKey: e.ctrlKey,
    shiftKey: e.shiftKey,
  };
  updateShortcutDisplay();
  stopRecording();
});

shortcutRecordBtn.addEventListener('click', () => {
  if (isRecording) stopRecording(); else startRecording();
});

loadSettings().then(s => {
  currentLang = s.uiLanguage;
  applyI18n(currentLang);
  document.title = `Placeholderin – ${t('settingsTitle', currentLang)}`;

  localeEl.value          = s.locale;
  uiLanguageEl.value      = s.uiLanguage;
  fillOnlyEmptyEl.checked = s.fillOnlyEmpty;
  currentShortcut         = s.shortcut;
  updateShortcutDisplay();
  shortcutRecordBtn.textContent = t('settingsShortcutRecord', currentLang);

  rules.forEach(rule => {
    const row = document.createElement('div');
    row.className = 'setting-row';

    const labelDiv = document.createElement('div');
    labelDiv.className = 'setting-label';
    const strong = document.createElement('strong');
    strong.textContent = `${rule.icon}  ${t(ruleKey(rule.type), currentLang)}`;
    labelDiv.appendChild(strong);

    const toggle = document.createElement('label');
    toggle.className = 'toggle';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.ruleType = rule.type;
    checkbox.className = 'qfi-checkbox';
    checkbox.checked = s.quickFillItems.includes(rule.type);

    const track = document.createElement('span');
    track.className = 'toggle-track';

    toggle.appendChild(checkbox);
    toggle.appendChild(track);
    row.appendChild(labelDiv);
    row.appendChild(toggle);
    quickFillListEl.appendChild(row);
  });

  saveBtn.addEventListener('click', async () => {
    const quickFillItems = Array.from(
      document.querySelectorAll<HTMLInputElement>('.qfi-checkbox')
    )
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.ruleType!);

    const newUiLanguage = uiLanguageEl.value as Locale;
    const langChanged   = newUiLanguage !== s.uiLanguage;

    await saveSettings({
      locale:        localeEl.value as Locale,
      uiLanguage:    newUiLanguage,
      fillOnlyEmpty: fillOnlyEmptyEl.checked,
      shortcut:      currentShortcut,
      quickFillItems,
    });

    if (langChanged) {
      window.location.reload();
    } else {
      statusEl.textContent = t('settingsSaved', currentLang);
      statusEl.className   = 'ok';
      setTimeout(() => { statusEl.textContent = ''; statusEl.className = ''; }, 2000);
    }
  });
});
