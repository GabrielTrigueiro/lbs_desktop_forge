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
import { TCollectionBody, TCollectionUpdate } from '../../../core/models/collection';
import { CollectionService } from '../../../core/api/collection/collectionService';

const EditCollection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState<TCollectionBody | undefined>(location.state?.collection);

  useEffect(() => {
    if (!location.state?.collection) {
      navigate('/colecoes');
    }
  }, [location, navigate]);

  const initialValues: TCollectionUpdate = {
    name: collection?.name || '',
    description: collection?.description || '',
  };


  const callEditCollection = async (updatedCollection: TCollectionUpdate) => {
    setIsLoading(true)

    let cleanedCollection: TCollectionUpdate = {
      name: updatedCollection.name,
      description: updatedCollection.description,
    };
    if (collection?.id) {
      CollectionService.updateCollection(cleanedCollection, String(collection.id))
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
    validationSchema: Validations.CollectionRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await callEditCollection(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    hasChanges();
  }, [formik.values]);



  return (
    <RegisterPage>
      <RegisterPageHeader>Editar Coleções</RegisterPageHeader>
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
          <Button disabled={isLoading} onClick={() => navigate("/colecoes")} variant="outlined">
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

export default EditCollection