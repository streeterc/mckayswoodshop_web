import React from 'react';

const TONES = { info: 'var(--forest-600)', success: 'var(--status-success)', warning: 'var(--status-warning)', danger: 'var(--status-danger)' };

/** Transient confirmation. Left edge carries the status colour. */
export function Toast({ title, message, tone = 'info', icon, onDismiss, style, ...rest }) {
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)', width: 360, maxWidth: '100%',
      padding: 'var(--space-6)', background: 'var(--surface-card)', border: '1px solid var(--line-hairline)',
      borderLeft: `3px solid ${TONES[tone] || TONES.info}`, borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-lg)', ...style,
    }} {...rest}>
      {icon && <span style={{ color: TONES[tone] || TONES.info, display: 'flex', marginTop: 1 }}>{icon}</span>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {title && <span style={{ font: 'var(--weight-semibold) var(--text-sm)/1.3 var(--font-ui)', color: 'var(--text-heading)' }}>{title}</span>}
        {message && <span style={{ font: 'var(--type-body-sm)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{message}</span>}
      </div>
      {onDismiss && <button onClick={onDismiss} aria-label="Dismiss" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', fontSize: 15, lineHeight: 1, padding: 0 }}>×</button>}
    </div>
  );
}
