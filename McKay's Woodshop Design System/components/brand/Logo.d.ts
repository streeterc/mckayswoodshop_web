/**
 * The McKay's Woodshop lockup, rendered from the supplied raster artwork.
 * Never re-draw the mark — always point at an asset file.
 */
export interface LogoProps {
  /** full = green field lockup; knockout = copper-on-transparent; mark = the four-tile grid on its copper field; mark-green = the four glyphs in forest green on transparent. */
  variant?: 'full' | 'knockout' | 'mark' | 'mark-green';
  /** Rendered height in px. Width follows the artwork's ratio. */
  height?: number;
  /** Path to the design system's assets directory, relative to the consuming page. */
  assetBase?: string;
  title?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
