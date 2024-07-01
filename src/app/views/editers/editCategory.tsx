import { AxiosError } from 'axios';
import { CategoryService } from '../../../core/api/category/categoryService';
import { TCategoryBody, TCategoryUpdate } from '../../../core/models/category';
import { deepEqual } from '../../../core/utils/globalFunctions';
import { Validations } from '../../../core/utils/validations';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { InfoCard, InfoCardContainer } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';

const EditCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<TCategoryBody | undefined>(location.state?.category);

  useEffect(() => {
    if (!location.state?.category) {
      navigate('/categorias');
    }
  }, [location, navigate]);

  const initialValues: TCategoryUpdate = {
    name: category?.name || '',
    description: category?.description || '',
  };


  const callEditCategory = async (updatedCategory: TCategoryUpdate) => {
    setIsLoading(true)

    let cleanedCategory: TCategoryUpdate = {
      name: updatedCategory.name,
      description: updatedCategory.description,
    };
    if (category?.id) {
      CategoryService.updateCategory(cleanedCategory, String(category.id))
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
    validationSchema: Validations.CategoryRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await callEditCategory(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    hasChanges();
  }, [formik.values]);



  return (
    <RegisterPage>
      <RegisterPageHeader>Editar Categoria</RegisterPageHeader>
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
          <Button disabled={isLoading} onClick={() => navigate("/categorias")} variant="outlined">
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

export default EditCategory