import { Box } from "@mui/material";
import { FormikProps } from "formik";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

import MainImage from "./mainImage";
import MiniatureImage from "./miniatureImage";
import { TProductImage, TProductRegister } from "../../../core/models/product";

interface IProductImagesProps {
  formik: FormikProps<TProductRegister>;
}

export interface IImage {
  url?: string;
  key: keyof TProductImage;
}

function ProductImages({ formik }: IProductImagesProps) {
  // Estado para a URL e chave da imagem em foco
  const [imageOnFocus, setImageOnFocus] = useState<IImage>({
    url: formik.values.productImages?.imageOne,
    key: "imageOne",
  });

  useEffect(() => {
    console.log(formik.values.productImages);
  }, [formik.values.productImages]);

  return (
    <Container>
      <Miniatures>
        <MiniatureImage
          src={{ url: formik.values.productImages?.imageOne, key: "imageOne" }}
          changeOnFocus={setImageOnFocus}
          focusImage={imageOnFocus}
        />
        <MiniatureImage
          src={{ url: formik.values.productImages?.imageTwo, key: "imageTwo" }}
          changeOnFocus={setImageOnFocus}
          focusImage={imageOnFocus}
        />
        <MiniatureImage
          src={{
            url: formik.values.productImages?.imageThree,
            key: "imageThree",
          }}
          changeOnFocus={setImageOnFocus}
          focusImage={imageOnFocus}
        />
      </Miniatures>
      <MainImage
        src={imageOnFocus}
        formik={formik}
        changeImageOnFocus={setImageOnFocus}
      />
    </Container>
  );
}

export default ProductImages;

const Container = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const Miniatures = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
