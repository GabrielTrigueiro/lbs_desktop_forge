import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const StepContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0px 30px;
`;

export const StepNumber = styled(Box)<{
  active?: boolean;
  completed?: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  padding: 5px;
  border: 3px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: ${({ theme, active, completed }) =>
    completed
      ? theme.COLORS.BLACK
      : active
      ? theme.COLORS.WHITE
      : theme.COLORS.GRAY3} !important;
  color: ${({ theme, active, completed }) =>
    completed
      ? theme.COLORS.BLACK
      : active
      ? theme.COLORS.WHITE
      : theme.COLORS.GRAY3} !important;
  font-weight: bold;
`;

export const StepContentText = styled(Typography)<{
  active?: boolean;
  completed?: boolean;
}>`
  font-size: ${({ theme }) => theme.FONTS_SIZE.LG} !important;
  color: ${({ theme, active, completed }) =>
    completed
      ? theme.COLORS.BLACK
      : active
      ? theme.COLORS.WHITE
      : theme.COLORS.GRAY3} !important;
  text-overflow: ellipsis;
  font-weight: bold !important;
  text-align: center;
  padding-right: 2pc;
`;
