/** Native select matched to Input's box. Options accept strings or {label,value}. */
export interface SelectOption { label: string; value: string }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<string | SelectOption>;
  placeholder?: string;
  invalid?: boolean;
}
export declare function Select(props: SelectProps): JSX.Element;
