/** Modal for confirmations and short forms. Scrim is forest-900 at 52% with a 2px blur. */
export interface DialogProps {
  open?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  /** Action row, right-aligned, on a sand footer. */
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  style?: React.CSSProperties;
}
export declare function Dialog(props: DialogProps): JSX.Element;
