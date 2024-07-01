import { Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "theme";

export const Container = styled(Grid)`
  padding: 1em;
  border-left: 4px solid;
  border-color: ${theme.palette.primary.main};
  border-radius: 0.3em;
  background-color: #fff;
  display: flex !important;
  flex: 1 !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
`;

export const ChartPaper = styled(Paper)`
  padding: 1%;
  flex: 1;
`;
export const ChartDataRange = styled(Typography)`
  text-align: center;
  font-weight: bold;
`;
