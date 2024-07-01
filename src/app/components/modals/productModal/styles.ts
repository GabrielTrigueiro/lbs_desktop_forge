import { Box } from "@mui/material";
import styled from "styled-components";
import theme from "../../../../core/theme/theme";

export const MainContainer = styled(Box)`
  width: 850px;
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;

export const LeftContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  padding: 0.3rem;
`;

export const ImagesContainer = styled(Box)`
  flex: 1;
  gap: 1;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const Images = styled(Box)`
  display: flex;
  flex-direction: row;
  flex: 5;
  width: 100%;
  height: 100%;
  gap: 2;
`;

export const MiniImages = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  gap: 1;
`;

export const BigImage = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 3;
  width: 100%;
  height: 220px;
`;

export const PriceContainer = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  width: 100%;
`;

export const InputsPrice = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 9;
  gap: 0.5rem;
`;

export const ProfitInPercentage = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 5px;
`;

export const RightContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 0.3rem;
`;

export const InfosContainer = styled(Box)`
  flex: 1;
  padding: 0.3rem;
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
`;

export const RowAlign = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const AddInfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 7px;
  border: 1px solid;
  border-color: ${theme.COLORS.GRAY4};
  padding: 0.3rem;
  gap: 0.5rem;
`;
