/** 40px text input, 3px corners, copper focus ring. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  invalid?: boolean;
  disabled?: boolean;
  /** Leading adornment, usually an Icon. */
  prefix?: React.ReactNode;
}
export declare function Input(props: InputProps): JSX.Element;
