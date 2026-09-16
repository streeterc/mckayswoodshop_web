import React from 'react';

/** Underlined tab strip. */
export function Tabs({ tabs = [], value, onChange, style, ...rest }) {
  const active = value ?? (tabs[0] && (tabs[0].value || tabs[0]));
  return (
    <div role="tablist" style={{ display: 'flex', gap: 'var(--space-8)', borderBottom: '1px solid var(--line-hairline)', ...style }} {...rest}>
      {tabs.map((t) => {
        const v = typeof t === 'string' ? t : t.value;
        const label = typeof t === 'string' ? t : t.label;
        const count = typeof t === 'string' ? undefined : t.count;
        const on = v === active;
        return (
          <button key={v} role="tab" aria-selected={on} onClick={() => onChange && onChange(v)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)', padding: '0 0 var(--space-5)', margin: 0,
            background: 'none', border: 'none', borderBottom: `2px solid ${on ? 'var(--copper-600)' : 'transparent'}`,
            marginBottom: -1, cursor: 'pointer', color: on ? 'var(--text-heading)' : 'var(--text-muted)',
            font: `var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)`, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
            transition: 'var(--transition-color)',
          }}>
            {label}
            {count !== undefined && <span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--text-faint)' }}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
