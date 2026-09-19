/** Icon-only control. Always give it a `label` — the icon carries no text. */
export interface IconButtonProps {
  children?: React.ReactNode;
  /** Accessible name, required. */
  label: string;
  variant?: 'ghost' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
