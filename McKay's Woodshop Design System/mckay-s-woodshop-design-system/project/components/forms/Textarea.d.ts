/** Multi-line input for project briefs and shop notes. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  rows?: number;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
