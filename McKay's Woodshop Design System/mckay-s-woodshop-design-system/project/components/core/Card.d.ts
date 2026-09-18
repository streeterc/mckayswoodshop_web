/**
 * The system's container surface.
 * @startingPoint section="Core" subtitle="Card surfaces, four variants" viewport="700x260"
 */
export interface CardProps {
  children?: React.ReactNode;
  /** default = white on hairline; raised = small shadow; sunken = sand fill; accent = copper border; inverse = forest green. */
  variant?: 'default' | 'raised' | 'sunken' | 'accent' | 'inverse';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds the 1px lift + shadow on hover, for cards that are links. */
  interactive?: boolean;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
