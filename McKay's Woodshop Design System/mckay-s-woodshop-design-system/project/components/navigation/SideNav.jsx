import React from 'react';

/** Product sidebar for the client portal. */
export function SideNav({ items = [], active, onNavigate, header, footer, style, ...rest }) {
  return (
    <aside style={{
      width: 232, flex: '0 0 232px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
      padding: 'var(--space-7) var(--space-5)', background: 'var(--surface-inverse-deep)', color: 'var(--text-on-forest)', ...style,
    }} {...rest}>
      {header}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {items.map((it) => {
          const v = it.value || it.label;
          const on = v === active;
          return (
            <button key={v} onClick={() => onNavigate && onNavigate(v)} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-5)', padding: '9px var(--space-5)', textAlign: 'left',
              background: on ? 'var(--forest-600)' : 'transparent', border: 'none', borderRadius: 'var(--radius-sm)',
              color: on ? 'var(--copper-200)' : 'var(--forest-200)', cursor: 'pointer',
              font: `var(--weight-${on ? 'semibold' : 'regular'}) var(--text-sm)/1.2 var(--font-ui)`,
              transition: 'var(--transition-color)',
            }}>
              {it.icon}
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.count !== undefined && <span style={{ font: 'var(--type-spec)', fontSize: 'var(--text-3xs)', color: 'var(--forest-300)' }}>{it.count}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto' }}>{footer}</div>
    </aside>
  );
}
