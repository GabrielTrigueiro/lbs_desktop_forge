import { AxiosError } from 'axios';
import { ProductService } from '../../../core/api/product/productService';
import { TProductBody, TProductUpdate } from '../../../core/models/product';
import { activeOptins, deepEqual } from '../../../core/utils/globalFunctions';
import { getIn, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { InfoCard, InfoCardContainer } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { Validations } from '../../../core/utils/validations';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<TProductBody | undefined>(location.state?.product);

  useEffect(() => {
    if (!location.state?.product) {
      navigate('/produtos');
    }
  }, [location, navigate]);

  const initialValues = {
    name: product?.name || '',
    active: product?.active === true ? 1 : product?.active === false ? 2 : 2 ,
    amount: product?.amount || 0,
    codManual: product?.codManual || '',
    qrCode: product?.qrCode || '',
    sku: product?.sku || ''
  };


  const callEditProduct = async (updatedProduct: any) => {
    setIsLoading(true)

    let cleanedProduct: TProductUpdate = {
      name: updatedProduct.name,
      active: updatedProduct.active  === 1 ? true : updatedProduct.active === 2 ? false : false,
      amount: updatedProduct.amount,
      codManual: updatedProduct.codManual,
      qrCode: updatedProduct.qrCode,
      sku: updatedProduct.sku

    };
    if (product?.id) {
      ProductService.updateProduct(cleanedProduct, String(product.id))
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
    validationSchema: Validations.editProductSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await callEditProduct(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    hasChanges();
  }, [formik.values]);



  return (
    <RegisterPage>
      <RegisterPageHeader>Editar Produto</RegisterPageHeader>
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
              <GenericTextField<number>
                error={!!formik.errors.amount}
                helperText={formik.errors.amount}
                small
                name={"amount"}
                label={"Quantidade"}
                value={formik.values.amount}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.sku}
                helperText={formik.errors.sku}
                small
                name={"sku"}
                label={"Sku"}
                value={formik.values.sku}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.qrCode}
                helperText={formik.errors.qrCode}
                small
                name={"qrCode"}
                label={"QrCode"}
                value={formik.values.qrCode}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.codManual}
                helperText={formik.errors.codManual}
                small
                name={"codManual"}
                label={"Códido do manual"}
                value={formik.values.codManual}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <TextField
                value={formik.values.active}
                onChange={e => formik.setFieldValue('active', e.target.value)}
                id="outlined-select-state"
                margin="none"
                select
                label="Ativar ou desativar"
                size='small'
                name="active"
                error={
                  Boolean(getIn(formik.errors, "active"))
                }
                helperText={
                  getIn(formik.errors, "active")
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
                {activeOptins.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button disabled={isLoading} onClick={() => navigate("/produtos")} variant="outlined">
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

export default EditProduct