/** Status marker: build stage, lead status, stock state. Uppercase, 2px corners, hairline border. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'forest' | 'copper' | 'success' | 'warning' | 'danger';
  /** Show a leading status dot. */
  dot?: boolean;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
