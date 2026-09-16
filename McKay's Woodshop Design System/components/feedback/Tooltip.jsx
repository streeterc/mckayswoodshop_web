import React from 'react';

/** Hover label on a deep forest chip. */
export function Tooltip({ label, children, placement = 'top', style, ...rest }) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom'
    ? { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' }
    : { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} {...rest}>
      {children}
      {show && (
        <span role="tooltip" style={{
          position: 'absolute', ...pos, whiteSpace: 'nowrap', zIndex: 40,
          background: 'var(--forest-800)', color: 'var(--copper-100)', padding: '5px 9px', borderRadius: 'var(--radius-xs)',
          font: 'var(--weight-medium) var(--text-3xs)/1.2 var(--font-ui)', letterSpacing: 'var(--tracking-wide)', boxShadow: 'var(--shadow-md)',
        }}>{label}</span>
      )}
    </span>
  );
}
