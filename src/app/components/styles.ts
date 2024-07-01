import theme from "../../theme";
import styled from "styled-components";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

// * form
export const FormContainer = styled.form`
  flex: 1;
  display: flex;
`;

// * Page components Box
export const ContentTitle = styled(Typography)`
    color: ${({ theme }) => theme.COLORS.YELLOW2} !important;
  font-size: 1.7rem !important;
  font-weight: bold !important;
  padding-left: 1rem;
`;

export const ContentHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5%;
`;

export const PageContentContainer = styled(Box)`
  padding: 1%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: -15px;
  min-height: 100svh;
`;

// * Page components Card
export const ContainerCard = styled(Card) <{ $full?: boolean }>`
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.$full ? "95%" : "70%")};
  width: 100%;
  flex-grow: 1;
  max-height: 50svh;
`;

export const StyledCardHeader = styled(CardHeader)`
  background: #f8f9fc;
  color: ${theme.palette.primary.main};
`;

export const StyledCardContent = styled(CardContent)`
  gap: 2%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormColumn = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const FormColumnTitle = styled(Box)`
  border-bottom: 2px solid ${theme.palette.primary.main};
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${theme.palette.primary.dark};
`;

// Display infos
export const Container = styled(Box)`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.YELLOW2} !important;
  font-size: 1.7rem !important;
  font-weight: bold !important;
  padding-left: 1rem;
`;

export const InfosSection = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 10px 1rem;
`;

export const InfoCardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InfoCardTitle = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.WHITE} !important;
  background: ${({ theme }) => theme.COLORS.YELLOW2} !important;
  font-size: ${({ theme }) => theme.FONTS_SIZE.LG} !important;
  font-weight: bold !important;
  width: max-content;
  border-radius: 10px 10px 0 0;
  padding: 0 0.5rem;
`;

export const InfoCard = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.COLORS.YELLOW2};
  padding: 0.3rem;
  width: 100%;
  gap: 0.5rem;
`;

// texto
export const InfoRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const InfoKey = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLACK} !important;
  font-size: ${({ theme }) => theme.FONTS_SIZE.MD} !important;
  font-weight: bold !important;
`;

export const InfoValue = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLACK} !important;
  font-size: ${({ theme }) => theme.FONTS_SIZE.MD} !important;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
