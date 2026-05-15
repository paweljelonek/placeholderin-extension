export interface OverlayItem {
  type: string;
  label: string;
  icon: string;
}

const ATTR = 'data-placeholderin-overlay';

export function getOpenOverlay(): Element | null {
  return document.querySelector(`[${ATTR}]`);
}

export function showOverlay(
  anchor: HTMLElement,
  items: OverlayItem[],
  onSelect: (type: string) => void,
): () => void {
  const overlay = document.createElement('div');
  overlay.setAttribute(ATTR, '');

  Object.assign(overlay.style, {
    position: 'absolute',
    zIndex: '2147483647',
    background: '#ffffff',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,.12)',
    padding: '4px',
    minWidth: '170px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '13px',
    lineHeight: '1',
  });

  items.forEach(item => {
    const btn = document.createElement('button');

    const iconSpan = document.createElement('span');
    iconSpan.textContent = item.icon;
    iconSpan.style.marginRight = '8px';

    const labelSpan = document.createElement('span');
    labelSpan.textContent = item.label;

    btn.appendChild(iconSpan);
    btn.appendChild(labelSpan);

    Object.assign(btn.style, {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '8px 12px',
      background: 'none',
      border: 'none',
      borderRadius: '7px',
      cursor: 'pointer',
      color: '#1f2937',
      fontSize: '13px',
      fontFamily: 'inherit',
      textAlign: 'left',
      boxSizing: 'border-box',
    });

    btn.addEventListener('mouseover', () => { btn.style.background = '#f3f4f6'; });
    btn.addEventListener('mouseout',  () => { btn.style.background = 'none'; });
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => onSelect(item.type));

    overlay.appendChild(btn);
  });

  document.body.appendChild(overlay);
  positionOverlay(overlay, anchor);

  return () => overlay.remove();
}

function positionOverlay(overlay: HTMLElement, anchor: HTMLElement): void {
  const rect = anchor.getBoundingClientRect();
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  overlay.style.top  = `${rect.bottom + scrollY + 4}px`;
  overlay.style.left = `${rect.left   + scrollX}px`;

  const o = overlay.getBoundingClientRect();

  if (o.right > window.innerWidth - 8) {
    overlay.style.left = `${rect.right + scrollX - o.width}px`;
  }
  if (o.bottom > window.innerHeight - 8) {
    overlay.style.top = `${rect.top + scrollY - o.height - 4}px`;
  }
}
