/** Pill descriptor for filters and attributes — the one place the system uses a full pill radius. */
export interface TagProps {
  children?: React.ReactNode;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onRemove?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
