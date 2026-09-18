import React from 'react';

/** Square checkbox with the brand's 2px corner. */
export function Checkbox({ label, checked = false, disabled = false, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 'var(--space-4)', cursor: disabled ? 'not-allowed' : 'pointer', ...style }} {...rest}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 17, height: 17, marginTop: 2, flex: '0 0 auto', display: 'grid', placeItems: 'center',
        border: `1px solid ${checked ? 'var(--forest-700)' : 'var(--line-default)'}`, borderRadius: 'var(--radius-xs)',
        background: disabled ? 'var(--surface-sunken)' : checked ? 'var(--forest-700)' : 'var(--surface-card)',
        transition: 'var(--transition-color)',
      }}>
        {checked && <span style={{ width: 9, height: 5, borderLeft: '2px solid var(--copper-100)', borderBottom: '2px solid var(--copper-100)', transform: 'rotate(-45deg) translate(1px,-1px)' }} />}
      </span>
      {label && <span style={{ font: 'var(--type-body-sm)', color: disabled ? 'var(--text-faint)' : 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
