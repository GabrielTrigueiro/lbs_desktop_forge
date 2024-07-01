import { AxiosError } from 'axios';
import { BrandService } from '../../../core/api/brand/brandService';
import { TBrandBody, TBrandUpdate } from '../../../core/models/brand';
import { deepEqual } from '../../..//utils/globalFunctions';
import { Validations } from '../../../core/utils/validations';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { InfoCard, InfoCardContainer } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';

const EditBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setBrand] = useState<TBrandBody | undefined>(location.state?.brand);

  useEffect(() => {
    if (!location.state?.brand) {
      navigate('/marcas');
    }
  }, [location, navigate]);

  const initialValues: TBrandUpdate = {
    name: brand?.name || '',
    description: brand?.description || '',
  };


  const callEditBrand = async (updatedBrand: TBrandUpdate) => {
    setIsLoading(true)

    let cleanedBrandUser: TBrandUpdate = {
      name: updatedBrand.name,
      description: updatedBrand.description,
    };
    if (brand?.id) {
      BrandService.updateBrand(cleanedBrandUser, String(brand.id))
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
    validationSchema: Validations.BrandRegisterShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await callEditBrand(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    hasChanges();
  }, [formik.values]);



  return (
    <RegisterPage>
      <RegisterPageHeader>Editar Marca</RegisterPageHeader>
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
          <Button disabled={isLoading} onClick={() => navigate("/marcas")} variant="outlined">
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

export default EditBrand