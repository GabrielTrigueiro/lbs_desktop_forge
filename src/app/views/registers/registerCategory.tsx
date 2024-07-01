import { AxiosError } from 'axios';
import { CategoryService } from '../../../core/api/category/categoryService';
import { TCategoryRegister } from '../../../core/models/category';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { Box, Button } from '@mui/material';
import { InfoCard, InfoCardContainer, InfoCardTitle } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { Validations } from '../../../core/utils/validations';
import { Notification } from '../../../app/components/toastNotification/toastNotification';

const RegisterCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const initialValues: TCategoryRegister = {
    name: "",
    description: ""
  };

  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callCreateCategory = async (newCategory: TCategoryRegister) => {
    setIsLoading(true)
    let cleanedCategory: TCategoryRegister = {
      name: newCategory.name,
      description: newCategory.description
    };
    CategoryService.createCategory(cleanedCategory)
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
    validationSchema: Validations.CategoryRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await callCreateCategory(values);
      setSubmitting(false);
    },
  });

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar categoria</RegisterPageHeader>
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
              Informações da categoria
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
          <Button onClick={() => navigate("/categorias")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage >
  )
}

export default RegisterCategory