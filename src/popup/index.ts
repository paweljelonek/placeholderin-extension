import { actions } from './actions';

async function init(): Promise<void> {
  const [tab]     = await chrome.tabs.query({ active: true, currentWindow: true });
  const container = document.getElementById('actions') as HTMLDivElement;
  const statusEl  = document.getElementById('status')  as HTMLDivElement;

  const buttons: HTMLButtonElement[] = actions.map(action => {
    const btn = document.createElement('button');
    btn.textContent = action.label;

    btn.addEventListener('click', async () => {
      buttons.forEach(b => (b.disabled = true));
      statusEl.textContent = '';

      try {
        const msg = await action.handler(tab ?? null);
        if (msg) statusEl.textContent = msg;
      } catch {
        statusEl.textContent = 'No fields found or page not ready.';
      } finally {
        buttons.forEach(b => (b.disabled = false));
      }
    });

    container.appendChild(btn);
    return btn;
  });
}

init();
