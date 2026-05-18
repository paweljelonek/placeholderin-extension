import { createActions } from './actions';
import { loadSettings } from '../settings';
import { t, applyI18n } from '../i18n';

async function init(): Promise<void> {
  const [tab]    = await chrome.tabs.query({ active: true, currentWindow: true });
  const settings = await loadSettings();
  const lang     = settings.uiLanguage;

  applyI18n(lang);

  const primaryEl = document.getElementById('action-primary') as HTMLDivElement;
  const gridEl    = document.getElementById('action-grid')    as HTMLDivElement;
  const footerEl  = document.getElementById('action-footer')  as HTMLDivElement;
  const statusEl  = document.getElementById('status')         as HTMLDivElement;

  const buttons: HTMLButtonElement[] = createActions(lang).map(action => {
    const btn = document.createElement('button');

    if (action.primary) {
      btn.className = 'btn-primary';
      btn.innerHTML = `<span class="btn-icon">${action.icon}</span><span>${action.label}</span>`;
      primaryEl.appendChild(btn);
    } else if (action.settings) {
      btn.className = 'btn-settings';
      btn.innerHTML = `<span class="btn-icon">${action.icon}</span><span>${action.label}</span>`;
      footerEl.appendChild(btn);
    } else {
      btn.className = 'btn-field';
      btn.innerHTML = `<span class="btn-icon">${action.icon}</span><span>${action.label}</span>`;
      gridEl.appendChild(btn);
    }

    btn.addEventListener('click', async () => {
      buttons.forEach(b => (b.disabled = true));
      statusEl.textContent = '';

      try {
        const msg = await action.handler(tab ?? null);
        if (msg) statusEl.textContent = msg;
      } catch {
        statusEl.textContent = t('statusNoFields', lang);
      } finally {
        buttons.forEach(b => (b.disabled = false));
      }
    });

    return btn;
  });
}

init();
