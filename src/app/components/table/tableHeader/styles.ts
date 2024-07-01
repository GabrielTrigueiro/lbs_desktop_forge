import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 5px;
`;
export const ActionSection = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

export const ActionLeftSection = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
`;

export const ActionRightSection = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
`;

export const FilterSection = styled(Box)``;
