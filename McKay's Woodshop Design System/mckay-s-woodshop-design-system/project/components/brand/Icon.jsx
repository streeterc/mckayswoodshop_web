import React from 'react';

const CDN = 'https://unpkg.com/lucide-static@0.544.0/icons/';

/** Lucide glyph, tinted with currentColor via CSS mask. */
export function Icon({ name, size = 18, strokeColor, style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flex: '0 0 auto',
        background: strokeColor || 'currentColor',
        WebkitMaskImage: `url(${CDN}${name}.svg)`,
        maskImage: `url(${CDN}${name}.svg)`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        ...style,
      }}
      {...rest}
    />
  );
}
