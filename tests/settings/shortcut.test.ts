import { describe, it, expect } from 'vitest';
import { matchesShortcut, formatShortcut } from '../../src/settings/shortcut';

function keyEvent(key: string, opts: Partial<KeyboardEventInit> = {}): KeyboardEvent {
  return new KeyboardEvent('keydown', {
    key,
    altKey:   false,
    ctrlKey:  false,
    shiftKey: false,
    ...opts,
  });
}

describe('matchesShortcut', () => {
  const shortcut = { key: 'f', altKey: true, ctrlKey: false, shiftKey: true };

  it('returns true when key and all modifiers match', () => {
    expect(matchesShortcut(keyEvent('f', { altKey: true, shiftKey: true }), shortcut)).toBe(true);
  });

  it('is case-insensitive for the key', () => {
    expect(matchesShortcut(keyEvent('F', { altKey: true, shiftKey: true }), shortcut)).toBe(true);
  });

  it('returns false when key differs', () => {
    expect(matchesShortcut(keyEvent('g', { altKey: true, shiftKey: true }), shortcut)).toBe(false);
  });

  it('returns false when altKey does not match', () => {
    expect(matchesShortcut(keyEvent('f', { altKey: false, shiftKey: true }), shortcut)).toBe(false);
  });

  it('returns false when shiftKey does not match', () => {
    expect(matchesShortcut(keyEvent('f', { altKey: true, shiftKey: false }), shortcut)).toBe(false);
  });

  it('returns false when an extra modifier is pressed', () => {
    expect(matchesShortcut(keyEvent('f', { altKey: true, shiftKey: true, ctrlKey: true }), shortcut)).toBe(false);
  });
});

describe('formatShortcut', () => {
  it('formats Ctrl+Alt+Shift+key in correct order', () => {
    expect(formatShortcut({ key: 'f', ctrlKey: true, altKey: true, shiftKey: true })).toBe('Ctrl+Alt+Shift+F');
  });

  it('formats Alt+Shift+key', () => {
    expect(formatShortcut({ key: 'f', ctrlKey: false, altKey: true, shiftKey: true })).toBe('Alt+Shift+F');
  });

  it('formats Ctrl+key without other modifiers', () => {
    expect(formatShortcut({ key: 'k', ctrlKey: true, altKey: false, shiftKey: false })).toBe('Ctrl+K');
  });

  it('formats bare key with no modifiers', () => {
    expect(formatShortcut({ key: 'f', ctrlKey: false, altKey: false, shiftKey: false })).toBe('F');
  });

  it('uppercases multi-character key names', () => {
    expect(formatShortcut({ key: 'enter', ctrlKey: false, altKey: false, shiftKey: false })).toBe('ENTER');
  });
});
