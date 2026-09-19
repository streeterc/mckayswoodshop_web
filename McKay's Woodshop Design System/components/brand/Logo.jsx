import React from 'react';

const ASSETS = {
  full: 'logo-full.png',
  knockout: 'logo-full-knockout.png',
  mark: 'logo-mark.png',
  'mark-green': 'logo-mark-green.png',
};

/** Brand lockup. `variant` picks which supplied artwork file is used. */
export function Logo({ variant = 'full', height = 72, assetBase = '/assets', title = "McKay's Woodshop", style, ...rest }) {
  const src = assetBase.replace(/\/$/, '') + '/' + (ASSETS[variant] || ASSETS.full);
  return (
    <img
      src={src}
      alt={title}
      style={{ height, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
}
