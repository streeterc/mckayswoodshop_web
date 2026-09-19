import React from 'react';

/** Centred modal on a deep forest scrim. */
export function Dialog({ open = true, title, description, children, footer, onClose, width = 480, style, ...rest }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', padding: 'var(--space-9)',
      background: 'rgba(8,24,15,.52)', backdropFilter: 'blur(2px)', zIndex: 50,
    }}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{
        width, maxWidth: '100%', background: 'var(--surface-card)', border: '1px solid var(--line-hairline)',
        borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-overlay)', overflow: 'hidden', ...style,
      }} {...rest}>
        <div style={{ padding: 'var(--card-pad-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {title && <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-heading)', margin: 0 }}>{title}</h3>}
          {description && <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', margin: 0 }}>{description}</p>}
          {children}
        </div>
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-5)', padding: 'var(--space-6) var(--card-pad-lg)', borderTop: '1px solid var(--line-hairline)', background: 'var(--surface-sunken)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
