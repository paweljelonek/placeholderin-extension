import { fillAll } from './filler';
import { rules } from './filler/rules';
import { loadSettings, Settings, matchesShortcut } from './settings';
import { showOverlay, getOpenOverlay } from './content/overlay';

let hoveredInput: HTMLInputElement | null = null;
let closeOverlay: (() => void) | null = null;

function dismissOverlay(): void {
  closeOverlay?.();
  closeOverlay = null;
}

document.addEventListener('mouseover', e => {
  const t = e.target;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) {
    hoveredInput = t as HTMLInputElement;
  }
});

document.addEventListener('mouseout', e => {
  if (e.target === hoveredInput) hoveredInput = null;
});

document.addEventListener('keydown', async e => {
  if (e.key === 'Escape') {
    dismissOverlay();
    return;
  }

  if (!hoveredInput) return;

  const settings = await loadSettings();
  if (!matchesShortcut(e, settings.shortcut)) return;

  e.preventDefault();
  dismissOverlay();

  const input = hoveredInput;
  const items = rules
    .filter(r => settings.quickFillItems.includes(r.type))
    .map(r => ({ type: r.type, label: r.label, icon: r.icon }));

  closeOverlay = showOverlay(input, items, type => {
    const rule = rules.find(r => r.type === type);
    if (rule) {
      input.value = rule.generate(settings.locale);
      input.dispatchEvent(new Event('input',  { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    dismissOverlay();
  });
});

document.addEventListener('click', e => {
  const overlay = getOpenOverlay();
  if (overlay && !overlay.contains(e.target as Node)) {
    dismissOverlay();
  }
});

chrome.runtime.onMessage.addListener((message: { action: string; settings: Settings; only?: string[] }) => {
  if (message.action === 'fill') {
    fillAll(message.settings, message.only);
  }
});
