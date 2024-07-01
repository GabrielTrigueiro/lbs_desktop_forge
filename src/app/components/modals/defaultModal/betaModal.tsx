import CloseIcon from "@mui/icons-material/Close";
import {
  Overlay,
  ModalContainer,
  ModalContent,
  StyledModal,
  ModalHeader,
  CloseButton,
  ModalBody,
  ModalFooter,
} from "./style";
import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";

interface IBetaModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const BetaModal = (props: IBetaModal) => {
  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));
  return (
    <Overlay $small={isSmallScreen}>
      <ModalContainer>
        <ModalContent $showModal={true}>
          <StyledModal>
            {props.title ? (
              <ModalHeader>
                {props.title}
                <CloseButton variant="contained" onClick={() => {}}>
                  <CloseIcon />
                </CloseButton>
              </ModalHeader>
            ) : null}
            <ModalBody>{props.body}</ModalBody>
            <ModalFooter>{props.footer}</ModalFooter>
          </StyledModal>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default BetaModal;
