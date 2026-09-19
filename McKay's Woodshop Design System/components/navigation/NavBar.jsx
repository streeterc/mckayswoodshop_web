import React from 'react';
import { Logo } from '../brand/Logo.jsx';

/** Site header: knockout logo left, links right, one copper action. Matches the shipped site header. */
export function NavBar({ links = [], active, onNavigate, action, assetBase = '/assets', logoHeight = 68, style, ...rest }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-4) var(--space-9)',
      background: 'var(--surface-inverse)', borderBottom: '1px solid var(--line-on-inverse)', ...style,
    }} {...rest}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(links[0] && (links[0].value || links[0])); }} style={{ border: 'none', display: 'flex' }}>
        <Logo variant="knockout" height={logoHeight} assetBase={assetBase} />
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-9)', marginLeft: 'auto' }}>
        {links.map((l) => {
          const v = typeof l === 'string' ? l : l.value;
          const label = typeof l === 'string' ? l : l.label;
          const on = v === active;
          return (
            <button key={v} onClick={() => onNavigate && onNavigate(v)} style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: on ? 'var(--copper-600)' : 'var(--text-on-forest)',
              font: 'var(--weight-semibold) var(--text-sm)/1 var(--font-ui)',
              textDecorationLine: on ? 'underline' : 'none', textUnderlineOffset: 3,
              transition: 'var(--transition-color)',
            }}>{label}</button>
          );
        })}
      </nav>
      {action}
    </header>
  );
}
