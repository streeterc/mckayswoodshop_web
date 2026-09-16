import React from 'react';
import { Logo } from '../brand/Logo.jsx';

/** Site header: logo left, links centre-right, one action. */
export function NavBar({ links = [], active, onNavigate, action, assetBase = '/assets', logoHeight = 30, style, ...rest }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-10)', height: 76, padding: '0 var(--space-9)',
      background: 'var(--surface-inverse)', borderBottom: '1px solid var(--forest-800)', ...style,
    }} {...rest}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(links[0] && (links[0].value || links[0])); }} style={{ border: 'none', display: 'flex' }}>
        <Logo variant="knockout" height={logoHeight} assetBase={assetBase} />
      </a>
      <nav style={{ display: 'flex', gap: 'var(--space-8)', marginLeft: 'auto' }}>
        {links.map((l) => {
          const v = typeof l === 'string' ? l : l.value;
          const label = typeof l === 'string' ? l : l.label;
          const on = v === active;
          return (
            <button key={v} onClick={() => onNavigate && onNavigate(v)} style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: on ? 'var(--copper-500)' : 'var(--forest-200)',
              font: 'var(--weight-semibold) var(--text-2xs)/1 var(--font-ui)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
              transition: 'var(--transition-color)',
            }}>{label}</button>
          );
        })}
      </nav>
      {action}
    </header>
  );
}
