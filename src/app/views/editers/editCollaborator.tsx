import { TCollaboratorBody, TCollaboratorUpdate } from "../../../core/models/collaborator";
import { Validations } from "../../../core/utils/validations";
import { getIn, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { InfoCard, InfoCardContainer } from "../../../app/components/styles";
import GenericTextField from "../../../app/components/genericTextField/GenericTextField";
import { deepEqual, formatarCEP, removeNonNumeric, statesOpitions } from "../../../core/utils/globalFunctions";
import { CollaboratorService } from "../../../core/api/collaborator/collaboratorService";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from "./styles";

const EditCollaborator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);
  const [collaborator, setCollaborator] = useState<TCollaboratorBody | undefined>(location.state?.collaborator);

  useEffect(() => {
    if (!location.state?.collaborator) {
      navigate('/colaboradores');
    }
  }, [location, navigate]);

  const initialValues: TCollaboratorUpdate = {
    name: collaborator?.name || '',
    cpforcnpj: collaborator?.cpforcnpj || '',
    cep: collaborator?.address.zipCode || '',
    city: collaborator?.address.city || '',
    neighborhood: collaborator?.address.neighborhood || '',
    uf: collaborator?.address.uf || '',
    telephone: collaborator?.contacts.telephone || '',
  };
  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const callEditCollaborator = async (updatedUser: TCollaboratorUpdate) => {
    setIsLoading(true)

    let cleanedCollaboratorUser: TCollaboratorUpdate = {
      name: updatedUser.name,
      cpforcnpj: removeNonNumeric(updatedUser.cpforcnpj) ?? "",
      cep: removeNonNumeric(updatedUser.cep) ?? "",
      uf: updatedUser.uf,
      city: updatedUser.city,
      neighborhood: updatedUser.neighborhood,
      telephone: removeNonNumeric(updatedUser.telephone) ?? "",

    };
    if (collaborator?.id) {
      CollaboratorService.updateCollaborator(cleanedCollaboratorUser, String(collaborator.id))
        .then((resp) => {
          handleResetStates();
          navigate(-1)
        })
        .catch((err: AxiosError) => {
          Notification(err.message, "error");
          setIsLoading(false);
        });
    }
  };



  const hasChanges = () => {
    return !deepEqual(formik.values, initialValues);
  };

  function getCepData(ev: any) {
    setValidating(true);
    const cep = ev?.replace(/[^0-9]/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro === true) {
          formik.setFieldError("cep", "CEP inválido");
          setValidating(false);
        } else {
          setValidating(false);
          console.log(formik.values.cep);

          formik.setFieldValue(
            "cep",
            formatarCEP(formik.values.cep)
          );
          formik.setFieldValue("city", `${data.localidade}`);
          formik.setFieldValue("uf", `${data.uf}`);
          formik.setFieldValue("neighborhood", `${data.bairro}`);
          formik.setFieldTouched("cep", false);
        }
      })
      .catch((err) => {
        formik.setFieldError("cep", "CEP inválido");
        setValidating(false);
      });
  }

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validationSchema: Validations.EditCollaboratorShema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      await callEditCollaborator(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    hasChanges();
  }, [formik.values]);

  return (<>
    <RegisterPage>
      <RegisterPageHeader>Editar Colaborador</RegisterPageHeader>
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
                label={"Nome completo"}
                value={formik.values.name}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.cpforcnpj}
                helperText={formik.errors.cpforcnpj}
                small
                name={"cpforcnpj"}
                label={"CPF / CNPJ"}
                value={formik.values.cpforcnpj}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.cep}
                helperText={formik.errors.cep}
                small
                name={"cep"}
                label={"CEP"}
                value={formik.values.cep}
                props={{
                  onChange: formik.handleChange,

                }}
                onBlur={() => getCepData(formik.values.cep)}
              />
              <TextField
                value={formik.values.uf}
                onChange={e => formik.setFieldValue('uf', e.target.value)}
                disabled={isValidating}
                id="outlined-select-state"
                margin="none"
                select
                label="UF"
                size='small'
                name="uf"
                error={
                  Boolean(getIn(formik.errors, "uf"))
                }
                helperText={
                  getIn(formik.errors, "uf")
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
                {statesOpitions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <GenericTextField<string>
                error={!!formik.errors.city}
                helperText={formik.errors.city}
                small
                name={"city"}
                label={"Cidade"}
                value={formik.values.city}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.neighborhood}
                helperText={formik.errors.neighborhood}
                small
                name={"neighborhood"}
                label={"Bairro"}
                value={formik.values.neighborhood}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <GenericTextField<string>
                error={!!formik.errors.telephone}
                helperText={formik.errors.telephone}
                small
                name={"telephone"}
                label={"Telefone"}
                value={formik.values.telephone}
                props={{
                  onChange: formik.handleChange,
                }}
              />
            </InfoCard>
          </InfoCardContainer>
        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button disabled={isLoading || isValidating} onClick={() => navigate("/colaboradores")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={!hasChanges() || isLoading} onClick={() => formik.handleSubmit()}>Editar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>

  </>
  )
}

export default EditCollaborator