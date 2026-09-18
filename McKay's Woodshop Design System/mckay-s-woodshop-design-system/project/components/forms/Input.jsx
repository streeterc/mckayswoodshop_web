import React from 'react';

const fieldBox = (focus, invalid, disabled) => ({
  width: '100%', height: 40, padding: '0 var(--field-pad-x)',
  background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
  border: `1px solid ${invalid ? 'var(--status-danger)' : focus ? 'var(--forest-600)' : 'var(--line-default)'}`,
  borderRadius: 'var(--radius-field)', font: 'var(--type-body-sm)', color: 'var(--text-heading)',
  outline: 'none', boxShadow: focus ? '0 0 0 3px rgba(209,127,81,.22)' : 'none',
  transition: 'var(--transition-color), box-shadow var(--duration-fast) var(--ease-out)',
});

/** Single-line text input. */
export function Input({ invalid = false, disabled = false, prefix, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const box = fieldBox(focus, invalid, disabled);
  if (prefix) {
    return (
      <div style={{ ...box, display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '0 var(--field-pad-x)', ...style }}>
        <span style={{ color: 'var(--text-muted)', display: 'flex' }}>{prefix}</span>
        <input disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'var(--type-body-sm)', color: 'var(--text-heading)', minWidth: 0 }} {...rest} />
      </div>
    );
  }
  return <input disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ ...box, ...style }} {...rest} />;
}
