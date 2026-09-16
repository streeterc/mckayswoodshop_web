/** Transient status message, bottom-right, 360px wide, 3px status edge. */
export interface ToastProps {
  title?: string;
  message?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
