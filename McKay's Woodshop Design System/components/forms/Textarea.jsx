import React from 'react';

/** Multi-line text input. */
export function Textarea({ invalid = false, disabled = false, rows = 4, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea rows={rows} disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        width: '100%', padding: 'var(--space-5) var(--field-pad-x)', background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
        border: `1px solid ${invalid ? 'var(--status-danger)' : focus ? 'var(--forest-600)' : 'var(--line-default)'}`,
        borderRadius: 'var(--radius-field)', font: 'var(--type-body-sm)', color: 'var(--text-heading)', resize: 'vertical',
        outline: 'none', boxShadow: focus ? '0 0 0 3px rgba(209,127,81,.22)' : 'none', transition: 'var(--transition-color), box-shadow var(--duration-fast) var(--ease-out)',
        ...style,
      }} {...rest} />
  );
}
