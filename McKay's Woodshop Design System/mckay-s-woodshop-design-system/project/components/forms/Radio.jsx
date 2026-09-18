import React from 'react';

/** Single-choice control. */
export function Radio({ label, checked = false, disabled = false, name, value, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 'var(--space-4)', cursor: disabled ? 'not-allowed' : 'pointer', ...style }} {...rest}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 17, height: 17, marginTop: 2, flex: '0 0 auto', display: 'grid', placeItems: 'center', borderRadius: 999,
        border: `1px solid ${checked ? 'var(--forest-700)' : 'var(--line-default)'}`,
        background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)', transition: 'var(--transition-color)',
      }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--forest-700)' }} />}
      </span>
      {label && <span style={{ font: 'var(--type-body-sm)', color: disabled ? 'var(--text-faint)' : 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
