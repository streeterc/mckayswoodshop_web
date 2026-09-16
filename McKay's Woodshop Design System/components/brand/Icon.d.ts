/**
 * Lucide icon wrapper. The brand ships no icon set of its own, so Lucide (1.5px stroke, square caps)
 * is the documented substitution — see readme.md > Iconography.
 */
export interface IconProps {
  /** Lucide icon name, kebab-case, e.g. "ruler", "hammer", "calendar-days". */
  name: string;
  size?: number;
  /** Override the tint; defaults to currentColor. */
  strokeColor?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
