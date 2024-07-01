import styled from "styled-components";
import { TableCell } from "@mui/material";

export const StyledDivDataTable = styled(TableCell)`
  && {
    background-color: ${({ theme }) => theme.COLORS.YELLOW2};
    max-width: 100px !important;
    font-weight: bold;
    color: ${({ theme }) => theme.COLORS.WHITE} !important;
    white-space: nowrap;
  }
`;
