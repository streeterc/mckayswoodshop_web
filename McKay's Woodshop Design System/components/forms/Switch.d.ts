/** On/off toggle for settings that apply immediately. Knob turns copper when on. */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
