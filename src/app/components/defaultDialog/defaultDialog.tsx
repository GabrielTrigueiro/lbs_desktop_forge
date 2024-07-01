import * as React from "react";
import Button from "@mui/material/Button";

import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
} from "./styles";
interface IDialogProps {
  isOpen: boolean;
  title: string;
  onCloseAction: () => void;
  confirmAction: () => void;
  body?: React.ReactNode;
  disabled?: boolean;
}

const DefaultDialog = (props: IDialogProps) => {
  return (
    <StyledDialog open={props.isOpen}>
      <StyledDialogTitle>{props.title}</StyledDialogTitle>
      {props.body && <StyledDialogContent>{props.body}</StyledDialogContent>}
      <StyledDialogActions>
        <Button variant="contained" onClick={props.onCloseAction}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          disabled={props.disabled}
          onClick={props.confirmAction}
          autoFocus
        >
          Confirmar
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default DefaultDialog;
