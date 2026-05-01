import { loadSettings } from './settings';

const fillBtn   = document.getElementById('fillBtn')   as HTMLButtonElement;
const statusEl  = document.getElementById('status')    as HTMLDivElement;
const optionsBtn = document.getElementById('optionsBtn') as HTMLButtonElement;

optionsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());

fillBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;

  fillBtn.disabled = true;
  statusEl.textContent = 'Filling...';

  try {
    const settings = await loadSettings();
    await chrome.tabs.sendMessage(tab.id, { action: 'fill', settings });
    statusEl.textContent = 'Done!';
  } catch {
    statusEl.textContent = 'No fields found or page not ready.';
  } finally {
    fillBtn.disabled = false;
  }
});
