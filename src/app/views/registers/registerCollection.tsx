import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { Box, Button } from '@mui/material';
import { InfoCard, InfoCardContainer, InfoCardTitle } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { Validations } from '../../../core/utils/validations';
import { TCollectionRegister } from '../../../core/models/collection';
import { CollectionService } from '../../../core/api/collection/collectionService';
import { Notification } from '../../../app/components/toastNotification/toastNotification';

const RegisterCollection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const initialValues: TCollectionRegister = {
    name: "",
    description: ""
  };

  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callCreateCollection = async (newCollection: TCollectionRegister) => {
    setIsLoading(true)
    let cleanedCollection: TCollectionRegister = {
      name: newCollection.name,
      description: newCollection.description
    };
    CollectionService.createCollection(cleanedCollection)
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
    validationSchema: Validations.CollectionRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await callCreateCollection(values);
      setSubmitting(false);
    },
  });

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar Coleção</RegisterPageHeader>
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
              Informações da Coleção
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
          <Button onClick={() => navigate("/colecoes")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage >
  )
}

export default RegisterCollection