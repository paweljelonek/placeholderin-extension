const fillBtn = document.getElementById('fillBtn') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLDivElement;

fillBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;

  fillBtn.disabled = true;
  statusEl.textContent = 'Filling…';

  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'fill' });
    statusEl.textContent = 'Done!';
  } catch {
    statusEl.textContent = 'No fields found or page not ready.';
  } finally {
    fillBtn.disabled = false;
  }
});
