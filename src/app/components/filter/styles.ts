import { Button, FormControl, TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export const ColumnSelect = styled(FormControl)`
  margin: 8px !important;
  min-width: 120px !important;
`;

export const ColumnValueTextField = styled(TextField)`
  margin: 8px !important;
  min-width: 120px !important;
`;

export const FilterButton = styled(Button)`
  margin: 10px !important;
  min-width: 120px !important;
`;
