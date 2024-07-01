import { Typography } from "@mui/material";
import styled from "styled-components";

import theme from '../../../../theme'

export const Display = styled(Typography)`
  display: flex;
  margin: 0.5em auto !important;
  padding: 5px 10px !important;
  font-weight: bold !important;
  border-radius: 10px;
  background-color: ${theme.palette.primary.main};
  color: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    border: 2px solid ${theme.palette.primary.main};
    color: ${theme.palette.primary.main};
  }
`;
