import { AxiosError } from 'axios';
import { getIn, useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { InfoCard, InfoCardContainer, InfoCardTitle } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { Validations } from '../../../core/utils/validations'
import { TIndicationRegister } from '../../../core/models/indication';
import { IndicationService } from '../../../core/api/indication/indicationService';
import { indicationsOptions, sexoOptions } from '../../../core/utils/globalFunctions';
import { Notification } from '../../../app/components/toastNotification/toastNotification';

const RegisterIndication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const initialValues: TIndicationRegister = {
    name: "",
    description: "",
    typeIndicationId: 0
  };

  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callCreateIndication = async (newIndication: TIndicationRegister) => {
    setIsLoading(true)
    let cleanedIndication: TIndicationRegister = {
      name: newIndication.name,
      description: newIndication.description,
      typeIndicationId: newIndication.typeIndicationId
    };
    IndicationService.createIndication(cleanedIndication)
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
    validationSchema: Validations.IndicationRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await callCreateIndication(values);
      setSubmitting(false);
    },
  });

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar Indicação</RegisterPageHeader>
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
              Informações da indicação
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
              <TextField
                value={formik.values.typeIndicationId}
                onChange={e => formik.setFieldValue('typeIndicationId', e.target.value)}
                disabled={isValidating}
                id="outlined-select-state"
                margin="none"
                select
                label="Tipo de indicação"
                size='small'
                name="typeIndicationId"
                error={
                  Boolean(getIn(formik.errors, "typeIndicationId"))
                }
                helperText={
                  getIn(formik.errors, "typeIndicationId")
                }
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 100,
                      },
                    },
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    margin: '1px 10px -5px ',
                  },
                }}
              >
                {indicationsOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/indicacoes")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage >
  )
}

export default RegisterIndication