import { Box, Paper, Typography } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  margin-top: 10px;
  gap: 5px;
  width: 45svw !important;
  display: flex;
  flex-direction: column;
`;

export const InfoLine = styled(Box)`
  padding: 5px;
  margin: "2px 7px";
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-style: italic;
  white-space: nowrap;
`;

export const InfoLabel = styled(Typography)`
  font-size: 17px;
  font-weight: 800 !important;
  color: #000;
`;

export const InfoValue = styled(Typography)`
  font-size: 14px !important;
  color: grey !important;
  max-width: 300px !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
`;

export const TitleHist = styled(Typography)`
  background-color: #49c5db;
  border-radius: 5px;
  text-align: center !important;
  font-size: 18px !important;
  font-weight: bold !important;
  color: #000 !important;
`;

export const ExecutionHistoric = styled(Box)`
  height: 200px;
  overflow-y: scroll;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
`;

export const ExecutionItem = styled(Paper)<{ $active?: boolean }>`
  width: 100% !important;
  height: 70 !important;
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center;
  padding: 0 10px !important;
  border: 1px !important;
  border-radius: 5px !important;
  gap: 5px;
`;

export const ExecutionColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ContactList = styled(Box)`
  gap: 5px;
  width: 55svw !important;
  height: 350px !important;
  overflow-y: auto;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
`;

export const ContactLine = styled(Paper)<{ $active?: boolean }>`
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  padding: 5px !important;
  border: 1px solid !important;
  border-color: ${(props) => (props.$active ? "green" : "red")} !important;
  color: #000 !important;
`;

export const ExecutionsSection = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const ExecutionsList = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0px 0.5rem;
  //background-color: ${({ theme }) => theme.COLORS.WHITE};
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const PaymentSection = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const PaymentListContainer = styled(Box)`
  background-color: ${({ theme }) => theme.COLORS.YELLOW2};
  padding: 1rem;
  display: flex;
  height: 150px;
`;

export const PaymentList = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0px 0.5rem;
  //background-color: ${({ theme }) => theme.COLORS.WHITE};
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const InfoColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;