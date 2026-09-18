import React from 'react';

const GLYPHS = ['cross', 'pine', 'buck', 'lumber'];

/** One of the four logo glyphs, drawn from the supplied artwork. */
export function Mark({ glyph = 'pine', tone = 'green', size = 28, assetBase = '/assets', style, ...rest }) {
  const g = GLYPHS.includes(glyph) ? glyph : 'pine';
  const src = assetBase.replace(/\/$/, '') + '/icon-' + g + '-' + (tone === 'copper' ? 'copper' : 'green') + '.png';
  return <img src={src} alt="" aria-hidden="true" style={{ height: size, width: 'auto', ...style }} {...rest} />;
}
