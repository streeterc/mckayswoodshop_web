import React from 'react';

/** Immediate on/off toggle. */
export function Switch({ label, checked = false, disabled = false, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-5)', cursor: disabled ? 'not-allowed' : 'pointer', ...style }} {...rest}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 38, height: 21, flex: '0 0 auto', borderRadius: 'var(--radius-pill)', position: 'relative',
        background: disabled ? 'var(--action-disabled)' : checked ? 'var(--forest-700)' : 'var(--sand-300)',
        transition: 'background-color var(--duration-base) var(--ease-out)',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: checked ? 20 : 3, width: 15, height: 15, borderRadius: 999,
          background: checked ? 'var(--copper-600)' : 'var(--surface-card)', boxShadow: 'var(--shadow-xs)',
          transition: 'left var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out)',
        }} />
      </span>
      {label && <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
