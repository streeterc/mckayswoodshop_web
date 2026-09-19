import React from 'react';

/** Native select, styled to match Input. */
export function Select({ options = [], invalid = false, disabled = false, placeholder, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', ...style }}>
      <select disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', height: 40, padding: '0 32px 0 var(--field-pad-x)', appearance: 'none',
          background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
          border: `1px solid ${invalid ? 'var(--status-danger)' : focus ? 'var(--forest-600)' : 'var(--line-default)'}`,
          borderRadius: 'var(--radius-field)', font: 'var(--type-body-sm)', color: 'var(--text-heading)',
          outline: 'none', boxShadow: focus ? '0 0 0 3px rgba(209,127,81,.22)' : 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        }} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const value = typeof o === 'string' ? o : o.value;
          const label = typeof o === 'string' ? o : o.label;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      <span aria-hidden="true" style={{ position: 'absolute', right: 12, top: 17, width: 8, height: 5, background: 'var(--text-muted)', clipPath: 'polygon(0 0,100% 0,50% 100%)', pointerEvents: 'none' }} />
    </div>
  );
}
