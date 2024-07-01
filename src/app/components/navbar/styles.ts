import { Box, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import styled from "styled-components";

export const StyledAppBar = styled(AppBar)`
  background-color: transparent !important;
  box-shadow: none !important;
  position: static !important;
  width: 100%;
  height: 9vh;
  margin-bottom: 33px;
  padding: 1%;
  margin-top: -8px;
`;

export const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0 0.4%;
  margin-left: 16.5em;
`;

export const NavBarBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-right: 0;
`;

export const UserMenu = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0.5em;
  margin-right: -0.4em;
`;

export const TypographyNav = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.YELLOW2};
`;
