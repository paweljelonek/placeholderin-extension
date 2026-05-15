import { describe, it, expect, beforeEach } from 'vitest';
import { showOverlay, getOpenOverlay } from '../../src/content/overlay';

const ITEMS = [
  { type: 'firstName', label: 'Imię',     icon: '👤' },
  { type: 'lastName',  label: 'Nazwisko', icon: '👤' },
];

function makeAnchor(): HTMLInputElement {
  const el = document.createElement('input');
  document.body.appendChild(el);
  return el;
}

beforeEach(() => {
  document.querySelectorAll('[data-placeholderin-overlay]').forEach(el => el.remove());
  document.body.innerHTML = '';
});

describe('showOverlay', () => {
  it('appends the overlay to document.body', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, ITEMS, () => {});

    expect(document.querySelector('[data-placeholderin-overlay]')).not.toBeNull();
    close();
  });

  it('renders one button per item', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, ITEMS, () => {});

    const buttons = document.querySelectorAll('[data-placeholderin-overlay] button');
    expect(buttons).toHaveLength(ITEMS.length);
    close();
  });

  it('button text contains the item label', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, ITEMS, () => {});

    const buttons = document.querySelectorAll('[data-placeholderin-overlay] button');
    expect(buttons[0].textContent).toContain('Imię');
    expect(buttons[1].textContent).toContain('Nazwisko');
    close();
  });

  it('calls onSelect with the correct type on button click', () => {
    const anchor = makeAnchor();
    const selected: string[] = [];
    const close = showOverlay(anchor, ITEMS, type => selected.push(type));

    (document.querySelector('[data-placeholderin-overlay] button') as HTMLButtonElement).click();

    expect(selected).toEqual(['firstName']);
    close();
  });

  it('calls onSelect for each button independently', () => {
    const anchor = makeAnchor();
    const selected: string[] = [];
    const close = showOverlay(anchor, ITEMS, type => selected.push(type));

    const buttons = document.querySelectorAll<HTMLButtonElement>('[data-placeholderin-overlay] button');
    buttons[1].click();

    expect(selected).toEqual(['lastName']);
    close();
  });

  it('cleanup function removes the overlay from the DOM', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, ITEMS, () => {});

    close();

    expect(document.querySelector('[data-placeholderin-overlay]')).toBeNull();
  });

  it('renders an empty overlay when items list is empty', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, [], () => {});

    expect(document.querySelector('[data-placeholderin-overlay]')).not.toBeNull();
    expect(document.querySelectorAll('[data-placeholderin-overlay] button')).toHaveLength(0);
    close();
  });
});

describe('getOpenOverlay', () => {
  it('returns null when no overlay exists', () => {
    expect(getOpenOverlay()).toBeNull();
  });

  it('returns the overlay element while it is open', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, ITEMS, () => {});

    expect(getOpenOverlay()).toBeInstanceOf(Element);
    close();
  });

  it('returns null after the overlay is closed', () => {
    const anchor = makeAnchor();
    const close = showOverlay(anchor, ITEMS, () => {});
    close();

    expect(getOpenOverlay()).toBeNull();
  });
});
