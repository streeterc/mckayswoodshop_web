/**
 * The build-stage tracker: measure, design, mill, assemble, finish, install.
 * Completed and current stages carry the copper rule; upcoming ones stay sand.
 */
export interface ProgressStep { label: string; meta?: string }
export interface ProgressStepsProps {
  steps?: Array<string | ProgressStep>;
  /** Index of the current stage. */
  current?: number;
  style?: React.CSSProperties;
}
export declare function ProgressSteps(props: ProgressStepsProps): JSX.Element;
