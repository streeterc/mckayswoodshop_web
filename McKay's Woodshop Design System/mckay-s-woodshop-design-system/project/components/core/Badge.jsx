import React from 'react';

const TONES = {
  neutral: ['var(--sand-100)', 'var(--sand-700)', 'var(--sand-200)'],
  forest: ['var(--forest-700)', 'var(--copper-100)', 'var(--forest-700)'],
  copper: ['var(--copper-200)', 'var(--copper-900)', 'var(--copper-300)'],
  success: ['var(--status-success-wash)', 'var(--status-success)', 'var(--moss-100)'],
  warning: ['var(--status-warning-wash)', 'var(--amber-600)', 'var(--status-warning-wash)'],
  danger: ['var(--status-danger-wash)', 'var(--status-danger)', 'var(--status-danger-wash)'],
};

/** Small status marker. */
export function Badge({ children, tone = 'neutral', dot = false, style, ...rest }) {
  const [bg, fg, bd] = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 22, padding: '0 8px',
      background: bg, color: fg, border: `1px solid ${bd}`, borderRadius: 'var(--radius-xs)',
      font: 'var(--weight-semibold) var(--text-3xs)/1 var(--font-ui)',
      letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', whiteSpace: 'nowrap', ...style,
    }} {...rest}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: 999, background: fg }} />}
      {children}
    </span>
  );
}
