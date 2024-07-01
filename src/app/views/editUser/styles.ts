import { Box } from "@mui/material";
import { StyledCardContent } from "../../../app/components/styles";
import styled from "styled-components";

styled(Box)`
  gap: 2%;
  display: flex;
  width: 50%;
  min-width: 400px;
  margin-bottom: 1%;
`;

export const EditUserBox = styled(Box)`
  display: flex;
  gap: 1em;
  margin-bottom: 2%;
`;

styled(StyledCardContent)`
  flex-direction: "column";
`;