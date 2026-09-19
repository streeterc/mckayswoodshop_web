import React from 'react';

const PADS = { none: 0, sm: 'var(--space-6)', md: 'var(--card-pad)', lg: 'var(--card-pad-lg)' };

/** Container surface: hairline border, 5px corners, shadow only when it lifts. */
export function Card({ children, variant = 'default', padding = 'md', interactive = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const inverse = variant === 'inverse';
  const sunken = variant === 'sunken';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: inverse ? 'var(--surface-inverse)' : sunken ? 'var(--surface-sunken)' : 'var(--surface-card)',
        color: inverse ? 'var(--text-on-forest)' : 'var(--text-body)',
        border: `1px solid ${inverse ? 'var(--forest-700)' : variant === 'accent' ? 'var(--line-accent)' : 'var(--line-hairline)'}`,
        borderRadius: 'var(--radius-card)', padding: PADS[padding] ?? PADS.md,
        boxShadow: interactive && hover ? 'var(--shadow-md)' : variant === 'raised' ? 'var(--shadow-sm)' : 'none',
        transform: interactive && hover ? 'translateY(-1px)' : 'none',
        transition: 'box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
