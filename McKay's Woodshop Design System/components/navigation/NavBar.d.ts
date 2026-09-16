/**
 * The marketing site header — forest-green bar, knockout logo, uppercase links, one copper action.
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
  style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
