import React from 'react';

/** Removable or selectable descriptor chip (species, finish, room). */
export function Tag({ children, selected = false, onRemove, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px',
        background: selected ? 'var(--forest-700)' : hover && interactive ? 'var(--sand-100)' : 'var(--surface-card)',
        color: selected ? 'var(--copper-100)' : 'var(--text-body)',
        border: `1px solid ${selected ? 'var(--forest-700)' : 'var(--line-default)'}`,
        borderRadius: 'var(--radius-pill)', font: 'var(--type-body-sm)', fontSize: 'var(--text-2xs)',
        cursor: interactive ? 'pointer' : 'default', transition: 'var(--transition-color)', whiteSpace: 'nowrap', ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <span onClick={(e) => { e.stopPropagation(); onRemove(e); }} style={{ cursor: 'pointer', opacity: .6, fontSize: 13, lineHeight: 1 }}>×</span>
      )}
    </span>
  );
}
