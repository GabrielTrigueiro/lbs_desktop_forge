import { Box, Typography } from "@mui/material";
import styled from "styled-components";

import Logo from "../../../assets/bitBeeLabs.png";

export const FooterContainer = styled(Box)`
  background-color: ${({ theme }) => theme.COLORS.GRAY5} !important;
  box-shadow: none !important;
  bottom: 0;
  width: 100%;
`;

export const InfoFooter = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoBitBee = styled(Box)`
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 47px;
  height: 47px;
  overflow: hidden;
  margin-left: 8px;
`;

export const TypographyNav = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLUE3};
  text-decoration: underline;
`;
