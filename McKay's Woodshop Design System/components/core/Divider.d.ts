/** Hairline rules and the 48×3px copper section rule that sits above display headings. */
export interface DividerProps {
  weight?: 'hair' | 'thick' | 'heavy';
  tone?: 'default' | 'strong' | 'accent' | 'inverse';
  vertical?: boolean;
  style?: React.CSSProperties;
}
export declare function Divider(props: DividerProps): JSX.Element;
