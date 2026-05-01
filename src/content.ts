import { fillAll } from './filler';
import { Settings } from './settings';

chrome.runtime.onMessage.addListener((message: { action: string; settings: Settings; only?: string[] }) => {
  if (message.action === 'fill') {
    fillAll(message.settings, message.only);
  }
});
