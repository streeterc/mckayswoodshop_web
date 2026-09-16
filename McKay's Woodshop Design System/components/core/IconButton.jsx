import React from 'react';

const BOX = { sm: 30, md: 36, lg: 42 };

/** Square icon-only control for toolbars and card corners. */
export function IconButton({ children, label, variant = 'ghost', size = 'md', disabled = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const box = BOX[size] || BOX.md;
  const outlined = variant === 'outline';
  const solid = variant === 'solid';
  return (
    <button
      aria-label={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: box, height: box, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${outlined ? 'var(--line-default)' : solid ? 'var(--action-primary)' : 'transparent'}`,
        borderRadius: 'var(--radius-button)',
        background: solid ? (hover ? 'var(--action-primary-hover)' : 'var(--action-primary)') : hover ? 'var(--action-quiet-hover)' : 'transparent',
        color: solid ? 'var(--copper-100)' : disabled ? 'var(--action-disabled-text)' : 'var(--forest-700)',
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'var(--transition-color)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
