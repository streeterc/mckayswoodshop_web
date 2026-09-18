/**
 * A single glyph lifted from the logo grid: the cross, the pine, the buck, the stacked lumber.
 * Used as a section stamp or a quiet ornament — not as a UI icon (use Icon for those).
 */
export interface MarkProps {
  glyph?: 'cross' | 'pine' | 'buck' | 'lumber';
  /** green for light surfaces, copper for forest-green surfaces. */
  tone?: 'green' | 'copper';
  size?: number;
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function Mark(props: MarkProps): JSX.Element;
