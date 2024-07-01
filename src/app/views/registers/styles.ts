import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const RegisterPage = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  min-height: 100svh;
`;

export const RegisterPageHeader = styled(Typography)`
  padding: 0.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.YELLOW2};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-weight: bold !important;
  font-size: 1.3pc !important;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const RegisterPageContent = styled(Box)`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-left: 4px solid ${({ theme }) => theme.COLORS.YELLOW2};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
`;
