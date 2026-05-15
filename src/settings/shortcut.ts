import { Shortcut } from './types';

export function matchesShortcut(e: KeyboardEvent, s: Shortcut): boolean {
  return (
    e.key.toLowerCase() === s.key.toLowerCase() &&
    e.altKey === s.altKey &&
    e.ctrlKey === s.ctrlKey &&
    e.shiftKey === s.shiftKey
  );
}

export function formatShortcut(s: Shortcut): string {
  const parts: string[] = [];
  if (s.ctrlKey) parts.push('Ctrl');
  if (s.altKey) parts.push('Alt');
  if (s.shiftKey) parts.push('Shift');
  parts.push(s.key.toUpperCase());
  return parts.join('+');
}
