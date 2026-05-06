import { loadSettings } from '../../settings';

export async function fillPhone(tab: chrome.tabs.Tab | null): Promise<string> {
  if (!tab?.id) throw new Error('No active tab');
  const settings = await loadSettings();
  await chrome.tabs.sendMessage(tab.id, { action: 'fill', settings, only: ['phone'] });
  return 'Done!';
}
