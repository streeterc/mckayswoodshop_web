import React from 'react';

/** Monospace dimension/spec table used on project and piece pages. */
export function SpecList({ items = [], columns = 1, inverse = false, style, ...rest }) {
  return (
    <dl style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`, gap: '0 var(--space-9)', margin: 0, ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)', padding: 'var(--space-4) 0', borderBottom: `1px solid ${inverse ? 'var(--line-on-inverse)' : 'var(--line-hairline)'}` }}>
          <dt style={{ font: 'var(--weight-semibold) var(--text-3xs)/1.2 var(--font-ui)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--text-on-forest-muted)' : 'var(--text-muted)', minWidth: 96 }}>{it.label}</dt>
          <dd style={{ margin: 0, marginLeft: 'auto', font: 'var(--type-spec)', fontSize: 'var(--text-sm)', color: inverse ? 'var(--text-on-forest)' : 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
