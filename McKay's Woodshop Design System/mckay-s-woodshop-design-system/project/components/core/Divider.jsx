import React from 'react';

/** Rule. `weight="heavy"` is the 3px copper section rule used above headings. */
export function Divider({ weight = 'hair', tone = 'default', vertical = false, style, ...rest }) {
  const px = weight === 'heavy' ? 3 : weight === 'thick' ? 2 : 1;
  const color = tone === 'accent' ? 'var(--line-accent)' : tone === 'strong' ? 'var(--line-strong)' : tone === 'inverse' ? 'var(--line-on-inverse)' : 'var(--line-hairline)';
  return (
    <div role="separator" style={vertical
      ? { width: px, alignSelf: 'stretch', background: color, ...style }
      : { height: px, width: weight === 'heavy' ? 48 : '100%', background: color, ...style }} {...rest} />
  );
}
