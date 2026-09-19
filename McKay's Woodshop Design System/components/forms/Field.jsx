import React from 'react';

/** Label + help/error wrapper for any form control. */
export function Field({ label, hint, error, required = false, htmlFor, children, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }} {...rest}>
      {label && (
        <label htmlFor={htmlFor} style={{ font: 'var(--weight-semibold) var(--text-2xs)/1.2 var(--font-ui)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-heading)' }}>
          {label}{required && <span style={{ color: 'var(--text-accent)', marginLeft: 4 }}>*</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span style={{ font: 'var(--type-body-sm)', fontSize: 'var(--text-2xs)', color: error ? 'var(--status-danger)' : 'var(--text-muted)' }}>{error || hint}</span>
      )}
    </div>
  );
}
