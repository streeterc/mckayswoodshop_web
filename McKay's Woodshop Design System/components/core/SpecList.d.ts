/**
 * Label/value list for dimensions, species, finish and lead time. Values are set in the mono face
 * with tabular figures so columns of measurements line up.
 */
export interface SpecItem { label: string; value: string }
export interface SpecListProps {
  items?: SpecItem[];
  columns?: 1 | 2;
  /** Use on forest-green surfaces. */
  inverse?: boolean;
  style?: React.CSSProperties;
}
export declare function SpecList(props: SpecListProps): JSX.Element;
