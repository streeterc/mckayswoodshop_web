/**
 * The marketing site header — forest-green bar, knockout logo, sentence-case links (copper + underlined when current), one copper action.
 * @startingPoint section="Navigation" subtitle="Site header on forest green" viewport="700x140"
 */
export interface NavLink { label: string; value: string }
export interface NavBarProps {
  links?: Array<string | NavLink>;
  active?: string;
  onNavigate?: (value: string) => void;
  /** Usually a single <Button variant="accent" size="sm">. */
  action?: React.ReactNode;
  assetBase?: string;
  /** Knockout logo height in px. Defaults to 68 (4.25rem), matching the live site. */
  logoHeight?: number;
  style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
