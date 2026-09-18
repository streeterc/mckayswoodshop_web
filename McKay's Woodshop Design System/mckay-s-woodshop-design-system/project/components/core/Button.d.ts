/**
 * The system's action control: uppercase, tightly tracked, 3px corners, no gradient.
 * @startingPoint section="Core" subtitle="Buttons in every tone and size" viewport="700x200"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = forest green fill; accent = copper fill (marketing CTAs); secondary = hairline outline; ghost = text only; danger = barn red. */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render as another element, e.g. "a" for links. */
  as?: 'button' | 'a';
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
