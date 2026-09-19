/** Section switcher inside a page. Active tab is marked by a 2px copper underline. */
export interface TabItem { label: string; value: string; count?: number }
export interface TabsProps {
  tabs?: Array<string | TabItem>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
