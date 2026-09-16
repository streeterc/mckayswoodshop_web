import React from 'react';

const SIZES={sm:{h:32,px:12,font:'var(--text-2xs)',gap:6},md:{h:40,px:16,font:'var(--text-sm)',gap:8},lg:{h:48,px:22,font:'var(--text-md)',gap:10}};

const TONES = {
  primary: { bg: 'var(--action-primary)', fg: 'var(--copper-100)', bd: 'var(--action-primary)', bgHover: 'var(--action-primary-hover)' },
  accent: { bg: 'var(--action-accent)', fg: 'var(--forest-800)', bd: 'var(--action-accent)', bgHover: 'var(--action-accent-hover)' },
  secondary: { bg: 'transparent', fg: 'var(--forest-700)', bd: 'var(--line-strong)', bgHover: 'var(--sand-100)' },
  ghost: { bg: 'transparent', fg: 'var(--forest-700)', bd: 'transparent', bgHover: 'var(--action-quiet-hover)' },
  danger: { bg: 'var(--status-danger)', fg: '#fff', bd: 'var(--status-danger)', bgHover: 'var(--barn-600)' },
};

/** Primary action control. One accent or primary button per view region. */
export function Button({ children, variant = 'primary', size = 'md', block = false, disabled = false, iconLeft, iconRight, as = 'button', style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const t = TONES[variant] || TONES.primary;
  const El = as;
  return (
    <El
      disabled={El === 'button' ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      style={{
        display: block ? 'flex' : 'inline-flex', width: block ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: s.gap,
        height: s.h, padding: `0 ${s.px}px`, border: `1px solid ${disabled ? 'var(--action-disabled)' : t.bd}`,
        borderRadius: 'var(--radius-button)',
        background: disabled ? 'var(--action-disabled)' : (hover ? t.bgHover : t.bg),
        color: disabled ? 'var(--action-disabled-text)' : t.fg,
        font: `var(--weight-semibold) ${s.font}/1 var(--font-ui)`,
        letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
        transform: down && !disabled ? 'translateY(1px)' : 'none',
        boxShadow: down && !disabled ? 'var(--inset-press)' : 'none',
        transition: 'var(--transition-color), var(--transition-transform)',
        ...style,
      }}
      {...rest}
    >
      {iconLeft}{children}{iconRight}
    </El>
  );
}
