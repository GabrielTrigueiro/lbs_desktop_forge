import { Typography } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionTitle,
} from "./styles";
import React from "react";

interface ICollapseMenuProps {
  expanded: string | false;
  onChangePainel: (
    panel: string
  ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
  id: string;
  title: string;
  body?: React.ReactNode;
  extraAction?: React.ReactNode;
}

const CollapseMenu = (props: ICollapseMenuProps) => {
  return (
    <Accordion
      expanded={props.expanded === props.id}
      onChange={props.onChangePainel(props.id)}
    >
      <AccordionSummary>
        <AccordionTitle>
          <Typography>{props.title}</Typography>
          {props.extraAction}
        </AccordionTitle>
      </AccordionSummary>
      <AccordionDetails>{props.body}</AccordionDetails>
    </Accordion>
  );
};

export default CollapseMenu;
