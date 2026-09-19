/**
 * Fixed 232px sidebar used by the client portal. Deep forest field, copper active label.
 * @startingPoint section="Navigation" subtitle="Portal sidebar" viewport="700x320"
 */
export interface SideNavItem { label: string; value?: string; icon?: React.ReactNode; count?: number }
export interface SideNavProps {
  items?: SideNavItem[];
  active?: string;
  onNavigate?: (value: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function SideNav(props: SideNavProps): JSX.Element;
