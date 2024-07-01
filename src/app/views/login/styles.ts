import { Container, Box } from "@mui/material";
import styled from "styled-components";
import Logo from "../../../assets/logo.svg";

export const LoginContainer = styled(Container)<{ $small?: boolean }>`
  height: ${(props) => (props.$small ? "100vh" : "70%")};
  background: #fff;
  border-radius: 10px;
  flex-direction: ${(props) => (props.$small ? "column" : "row")};
  align-items: ${(props) => (props.$small ? "center" : "")};
  justify-content: ${(props) => (props.$small ? "center" : "")};
  padding: ${(props) => (props.$small ? "2em" : "")};
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY5};
`;

export const LoginLogo = styled(Box)<{ $small?: boolean }>`
  position: relative;
  background-image: url(${Logo});
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${(props) => (props.$small ? "10px" : "10px 0px 0 10px")};
  width: ${(props) => (props.$small ? "80px" : "45%")};
  height: ${(props) => (props.$small ? "80px" : "100%")};
  position: ${(props) => (props.$small ? "absolute" : "")};
  top: ${(props) => (props.$small ? "10%" : "")};
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 85%;
    width: 2.5px;
    background-color: #ccc;
    z-index: 1;
    content: "";
    display: ${(props) => (props.$small ? "none" : "block")};
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    background-size: contain;
    top: 10px;
    &::before {
      display: none;
    }
  }
`;

export const LoginContentBox = styled.form<{ $small?: boolean }>`
  width: ${(props) => (props.$small ? "100%" : "50%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  text-align: center;
  padding: ${(props) => (props.$small ? "0%" : "0 10%")};
  gap: ${(props) => (props.$small ? "3%" : "7%")};
`;
