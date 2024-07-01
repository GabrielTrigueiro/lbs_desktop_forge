import { Box, Skeleton } from "@mui/material";
import React, { useMemo } from "react";
import styled from "styled-components";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { IImage } from "./productImages";
import theme from "../../../core/theme/theme";

interface IMiniatureImageProps {
  changeOnFocus: (e: IImage) => void;
  src: IImage;
  focusImage: IImage;
}

function MiniatureImage({
  changeOnFocus,
  src,
  focusImage,
}: IMiniatureImageProps) {
  // monitora constantemente se a miniatura está selecionada
  const isFocused = useMemo(() => focusImage.key === src.key, [focusImage]);

  // skeleton caso não tenha imagem
  if (!src) {
    return (
      <MiniContainer>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </MiniContainer>
    );
  }
  return (
    <MiniContainer $onFocus={isFocused} onClick={() => changeOnFocus(src)}>
      {src.url ? (
        <img
          src={`data:image/jpeg;base64,${src.url}`}
          alt="Miniature"
          style={{ width: "100%", height: "100%", borderRadius: "0.2rem", objectFit: 'cover' }}
        />
      ) : (
        <DisabledByDefaultIcon sx={{ margin: "auto" }} />
      )}
    </MiniContainer>
  );
}

export default MiniatureImage;

const MiniContainer = styled(Box)<{ $onFocus?: boolean }>`
  width: 60px;
  height: 60px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.3rem;
  border: ${({ $onFocus }) =>
    $onFocus
      ? `2px solid ${theme.COLORS.YELLOW}`
      : `2px solid ${theme.COLORS.GRAY4}`};
  color: ${({ $onFocus }) =>
    $onFocus ? `${theme.COLORS.YELLOW}` : `${theme.COLORS.GRAY4}`};
  &&:hover {
    border: ${({ $onFocus }) =>
      $onFocus
        ? `2px solid ${theme.COLORS.YELLOW}`
        : `2px solid ${theme.COLORS.GRAY5}`};
    color: ${({ $onFocus }) =>
      $onFocus ? `${theme.COLORS.YELLOW}` : `${theme.COLORS.GRAY5}`};
  }
`;
