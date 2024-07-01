import { AxiosError } from 'axios';
import { deepEqual } from '../../../core/utils/globalFunctions';
import { Validations } from '../../../core/utils/validations';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { InfoCard, InfoCardContainer } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { TIndicationBody, TIndicationUpdate } from '../../../core/models/indication';
import { IndicationService } from '../../../core/api/indication/indicationService';

const EditIndication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [indication, setIndication] = useState<TIndicationBody | undefined>(location.state?.indication);

  useEffect(() => {
    if (!location.state?.indication) {
      navigate('/indicacoes');
    }
  }, [location, navigate]);

  const initialValues: TIndicationUpdate = {
    name: indication?.name || '',
    description: indication?.description || '',
  };


  const callEditIndication = async (updatedIndication: TIndicationUpdate) => {
    setIsLoading(true)

    let cleanedIndication: TIndicationUpdate = {
      name: updatedIndication.name,
      description: updatedIndication.description,
    };
    if (indication?.id) {
      IndicationService.updateIndication(cleanedIndication, String(indication.id))
        .then((resp) => {
          handleResetStates();
          navigate(-1)
        })
        .catch((err: AxiosError) => {
          setIsLoading(false);
        });
    }
  };


  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const hasChanges = () => {
    return !deepEqual(formik.values, initialValues);
  };


  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validationSchema: Validations.EditIndicationShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await callEditIndication(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    hasChanges();
  }, [formik.values]);



  return (
    <RegisterPage>
      <RegisterPageHeader>Editar Indicação</RegisterPageHeader>
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
                }}
              />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button disabled={isLoading} onClick={() => navigate("/indicacoes")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={!hasChanges() || isLoading}
            onClick={() => formik.handleSubmit()}
          >Editar
          </Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  )
}

export default EditIndication