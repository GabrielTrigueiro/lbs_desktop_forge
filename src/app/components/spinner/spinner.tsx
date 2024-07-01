import { SyncLoader } from "react-spinners";
import React from "react";
import theme from "../../../core/theme/theme";

interface ISpinnerProps {
  color?: string;
  size?: number;
  state: boolean;
  css?: React.CSSProperties;
}

const Spinner = (props: ISpinnerProps) => {
  return (
    <SyncLoader
      cssOverride={props.css}
      loading={props.state}
      size={props.size ? props.size : 5}
      speedMultiplier={0.5}
      color={props.color ? props.color : theme.COLORS.YELLOW2}
    />
  );
};

export default Spinner;
