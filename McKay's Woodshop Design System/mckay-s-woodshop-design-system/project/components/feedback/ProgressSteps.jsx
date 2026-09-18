import React from 'react';

/** Horizontal build-stage tracker. */
export function ProgressSteps({ steps = [], current = 0, style, ...rest }) {
  return (
    <ol style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, ...style }} {...rest}>
      {steps.map((s, i) => {
        const label = typeof s === 'string' ? s : s.label;
        const meta = typeof s === 'string' ? undefined : s.meta;
        const done = i < current, active = i === current;
        return (
          <li key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minWidth: 0 }}>
            <span style={{ height: 3, background: done || active ? 'var(--copper-600)' : 'var(--sand-200)', marginRight: i === steps.length - 1 ? 0 : 2 }} />
            <span style={{ font: `var(--weight-semibold) var(--text-3xs)/1.2 var(--font-ui)`, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: active ? 'var(--text-heading)' : done ? 'var(--text-muted)' : 'var(--text-faint)' }}>{label}</span>
            {meta && <span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--text-faint)' }}>{meta}</span>}
          </li>
        );
      })}
    </ol>
  );
}
