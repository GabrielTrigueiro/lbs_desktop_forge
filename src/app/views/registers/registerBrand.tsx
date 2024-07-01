import { AxiosError } from 'axios';
import { BrandService } from '../../../core/api/brand/brandService';
import { TBrandRegister } from '../../../core/models/brand';
import { Validations } from '../../../core/utils/validations';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { InfoCard, InfoCardContainer, InfoCardTitle } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { Box, Button } from '@mui/material';
import { Notification } from '../../../app/components/toastNotification/toastNotification';

const RegisterBrand = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const initialValues: TBrandRegister = {
    name: "",
    description: ""
  };

  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callCreateBrand = async (newBrand: TBrandRegister) => {
    setIsLoading(true)
    let cleanedBrand: TBrandRegister = {
      name: newBrand.name,
      description: newBrand.description
    };
    BrandService.createBrand(cleanedBrand)
      .then((resp) => {
        handleResetStates();
        navigate(-1)
      })
      .catch((err: AxiosError) => {
        Notification(String(err.message), "error")
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validationSchema: Validations.BrandRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await callCreateBrand(values);
      setSubmitting(false);
    },
  });

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar marca</RegisterPageHeader>
      <RegisterPageContent>
        <Box
          sx={{
            gap: " 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <InfoCardContainer sx={{ width: 350 }}>
            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
              Informações da marca
            </InfoCardTitle>
            <InfoCard>
              <GenericTextField<string>
                error={!!formik.errors.name}
                helperText={formik.errors.name}
                small
                name={"name"}
                label={"Nome"}
                value={formik.values.name}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                small
                name={"description"}
                label={"Descrição"}
                value={formik.values.description}
                props={{
                  onChange: formik.handleChange,
                }} />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/marcas")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage >
  )
}

export default RegisterBrand