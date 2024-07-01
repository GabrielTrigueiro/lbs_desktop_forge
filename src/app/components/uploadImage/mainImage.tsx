import { Box, Button, Skeleton } from "@mui/material";
import { FormikProps } from "formik";
import React, { useRef } from "react";
import styled from "styled-components";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import { IImage } from "./productImages";
import theme from "../../../core/theme/theme";
import { TProductRegister } from "../../../core/models/product";

interface IMainImageProps {
  src: IImage;
  formik: FormikProps<TProductRegister>;
  changeImageOnFocus: (e: IImage) => void;
}

function MainImage({ changeImageOnFocus, src, formik }: IMainImageProps) {
  // referência para o input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // adicionar imagem ao formik
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        const image64String = e.target?.result?.toString().split(",")[1];
        formik.setFieldValue(`productImages.${[src.key]}`, image64String);
        changeImageOnFocus({ url: image64String, key: src.key });
      };

      reader.readAsDataURL(file);
    }
  };

  // remover a imagem atual
  const handleDeleteImage = () => {
    formik.setFieldValue(`productImages.${[src.key]}`, undefined);
    changeImageOnFocus({ url: undefined, key: src.key });
  };

  if (!src) {
    return (
      <SquareContainer>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: "0.2rem" }}
        />
      </SquareContainer>
    );
  }
  return (
    <SquareContainer>
      {!src.url ? (
        <Button component="label" variant="outlined" sx={{ margin: "auto" }}>
          <UploadFileIcon />
          <input
            style={{ display: "none" }}
            type="file"
            accept=".jpeg"
            onChange={handleUploadImage}
            ref={fileInputRef}
          />
        </Button>
      ) : (
        <>
          <ImageOptions>
            <SwapHorizIcon
              sx={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current?.click()}
            />
            <DeleteIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleDeleteImage()}
            />
          </ImageOptions>
          <img
            src={`data:image/jpeg;base64,${src.url}`}
            alt="Main"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0.2rem",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            accept=".jpeg"
            onChange={handleUploadImage}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </>
      )}
    </SquareContainer>
  );
}

export default MainImage;

const SquareContainer = styled(Box)<{ $onFocus?: boolean }>`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: row;
  border-radius: 0.3rem;
  border: 2px solid ${theme.COLORS.GRAY4};
`;

const ImageOptions = styled(Box)<{ $onFocus?: boolean }>`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${theme.COLORS.GRAY2};
  opacity: 0.7;
  &&:hover {
    background-color: ${theme.COLORS.GRAY1};
    opacity: 1;
    color: ${theme.COLORS.WHITE};
  }
`;
