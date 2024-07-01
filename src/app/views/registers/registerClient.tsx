import { Box, Button, FormControl, FormHelperText, MenuItem, TextField } from '@mui/material'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import GenericTextField from '../../../app/components/genericTextField/GenericTextField'
import { InfoCardContainer, InfoCardTitle, InfoCard } from '../../../app/components/styles'
import { Notification } from '../../../app/components/toastNotification/toastNotification'
import { AxiosError } from 'axios'
import { ClientLbsService } from '../../../core/api/client/clientService'
import { TClientRegister } from '../../../core/models/clientLBS'
import { sexoOptions, convertToBack, formatDate, formatarCEP, removeExtraSpaces, removeNonNumeric, statesOpitions, maritialStatusOptions } from '../../../core/utils/globalFunctions'
import { Validations } from '../../../core/utils/validations'
import { Dayjs } from 'dayjs'
import { getIn, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles'
import AsyncAutoComplete from '../../../app/components/assyncronusAutoComplete/AssyncAutoComplete'
import { INDICATION_LIST } from '../../../core/utils/constants'
import { TIndicationBody } from '../../../core/models/indication'

function RegisterClient() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setValidating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>();

  const initialValues: TClientRegister = {
    name: "",
    rg: "",
    cpforcnpj: "",
    birthDate: "",
    maritalStatus: "",
    address: {
      zipCode: "",
      uf: "",
      road: "",
      number: "",
      neighborhood: "",
      city: ""
    },
    contact: {
      telephone: "",
      cell_phone1: "",
      cell_phone2: "",
      email: ""
    },
    indicationId: undefined,
    sexoID: undefined
  };

  function getCepData(ev: any) {
    setValidating(true);
    const cep = ev?.replace(/[^0-9]/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro === true) {
          formik.setFieldError("address.zipCode", "CEP inválido");
          setValidating(false);
        } else {
          setValidating(false);

          formik.setFieldValue(
            "address.zipCode",
            formatarCEP(formik.values.address.zipCode)
          );
          formik.setFieldValue("address.city", `${data.localidade}`);
          formik.setFieldValue("address.uf", `${data.uf}`);
          formik.setFieldValue("address.road", `${data.logradouro}`);
          formik.setFieldValue("address.neighborhood", `${data.bairro}`);
          formik.setFieldTouched("address.zipCode", false);
        }
      })
      .catch((err) => {
        formik.setFieldError("address.zipCode", "CEP inválido");
        setValidating(false);
      });
  }

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date)
      formik.setFieldValue("birthDate", formatDate(date.toDate()))
  };


  const handleResetStates = () => {
    setIsLoading(false);
    formik.resetForm();
  };

  const handleSelectIndication = (selected: TIndicationBody) => {
    console.log("Selecionado: ", selected);
    formik.setFieldValue("indicationId", selected.id);
  };

  const callCreateClient = async (newUser: TClientRegister) => {
    setIsLoading(true)
    let cleanedClientUser: TClientRegister = {
      name: newUser.name,
      cpforcnpj: removeNonNumeric(newUser.cpforcnpj) ?? "",
      birthDate: convertToBack(newUser.birthDate),
      rg: removeNonNumeric(newUser.rg) ?? "",
      sexoID: newUser.sexoID,
      indicationId: newUser.indicationId,
      maritalStatus: newUser.maritalStatus,
      address: {
        city: newUser.address.city,
        neighborhood: newUser.address.neighborhood,
        number: newUser.address.number,
        road: newUser.address.road,
        uf: newUser.address.uf,
        zipCode: removeNonNumeric(newUser.address.zipCode) ?? ""
      },
      contact: {
        email: removeExtraSpaces(newUser.contact.email),
        cell_phone2: removeNonNumeric(newUser.contact.cell_phone2),
        cell_phone1: removeNonNumeric(newUser.contact.cell_phone1) ?? "",
        telephone: removeNonNumeric(newUser.contact.telephone)
      }

    };
    ClientLbsService.createClient(cleanedClientUser)
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
    validationSchema: Validations.clientRegisterSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      await callCreateClient(values);
      setSubmitting(false);
    },
  });

  return (
    <RegisterPage>
      <RegisterPageHeader>Cadastrar Cliente</RegisterPageHeader>
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
              Informações pessoais
            </InfoCardTitle>
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
                error={!!formik.errors.rg}
                helperText={formik.errors.rg}
                small
                name={"rg"}
                label={"RG"}
                value={formik.values.rg}
                props={{
                  onChange: formik.handleChange,
                }}
              />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
              >
                <FormControl error={Boolean(getIn(formik.errors, "birthDate"))} fullWidth>
                  <DateField
                    size="small"
                    variant="outlined"
                    label="Data de Nascimento"
                    value={selectedDate}
                    format="DD/MM/YYYY"
                    onChange={(event) => handleDateChange(event)}
                    InputProps={{ error: Boolean(getIn(formik.errors, "birthDate")) }}
                    FormHelperTextProps={{
                      style: {
                        margin: '1px 10px -5px ',
                      },
                    }}
                  />
                  {formik.errors.birthDate && <FormHelperText>{formik.errors.birthDate}</FormHelperText>}
                </FormControl>
              </LocalizationProvider>
              <TextField
                value={formik.values.sexoID}
                onChange={e => formik.setFieldValue('sexoID', e.target.value)}
                disabled={isValidating}
                id="outlined-select-state"
                margin="none"
                select
                label="Sexo"
                size='small'
                name="sexoID"
                error={
                  Boolean(getIn(formik.errors, "sexoID"))
                }
                helperText={
                  getIn(formik.errors, "sexoID")
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
                {sexoOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                value={formik.values.maritalStatus}
                onChange={e => formik.setFieldValue('maritalStatus', e.target.value)}
                disabled={isValidating}
                id="outlined-select-state"
                margin="none"
                select
                label="Estado civil"
                size='small'
                name="maritalStatus"
                error={
                  Boolean(getIn(formik.errors, "maritalStatus"))
                }
                helperText={
                  getIn(formik.errors, "maritalStatus")
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
                {maritialStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

            </InfoCard>

            <InfoCardContainer sx={{ marginTop: "20px" }}>
              <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
                Informações contato
              </InfoCardTitle>
              <InfoCard>
                <GenericTextField<string>
                  error={!!formik.errors.contact?.cell_phone1}
                  helperText={formik.errors.contact?.cell_phone1}
                  small
                  name={"contact.cell_phone1"}
                  label={"Celular 1"}
                  value={formik.values.contact.cell_phone1}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.contact?.cell_phone2}
                  helperText={formik.errors.contact?.cell_phone2}
                  small
                  name={"contact.cell_phone2"}
                  label={"Celular 2"}
                  value={formik.values.contact.cell_phone2!!}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.contact?.telephone}
                  helperText={formik.errors.contact?.telephone}
                  small
                  name={"contact.telephone"}
                  label={"Telefone"}
                  value={formik.values.contact.telephone!!}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.contact?.email}
                  helperText={formik.errors.contact?.email}
                  small
                  name={"contact.email"}
                  label={"Email"}
                  value={formik.values.contact.email}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
              </InfoCard>
            </InfoCardContainer>
          </InfoCardContainer>
          <Box>
            <InfoCardContainer sx={{ width: 350 }}>
              <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
                Informações de endereço
              </InfoCardTitle>
              <InfoCard>
                <GenericTextField<string>
                  error={!!formik.errors.address?.zipCode}
                  helperText={formik.errors.address?.zipCode}
                  small
                  name={"address.zipCode"}
                  label={"CEP"}
                  value={formik.values.address.zipCode}
                  props={{
                    onChange: formik.handleChange,
                  }}
                  onBlur={() => getCepData(formik.values.address.zipCode)}
                />
                <TextField
                  value={formik.values.address.uf}
                  onChange={e => formik.setFieldValue('address.uf', e.target.value)}
                  disabled={isValidating}
                  id="outlined-select-state"
                  margin="none"
                  select
                  label="UF"
                  size='small'
                  name="address.uf"
                  error={
                    Boolean(getIn(formik.errors, "address.uf"))
                  }
                  helperText={
                    getIn(formik.errors, "address.uf")
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
                  error={!!formik.errors.address?.city}
                  helperText={formik.errors.address?.city}
                  small
                  name={"address.city"}
                  label={"Cidade"}
                  value={formik.values.address.city}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.address?.neighborhood}
                  helperText={formik.errors.address?.neighborhood}
                  small
                  name={"address.neighborhood"}
                  label={"Bairro"}
                  value={formik.values.address.neighborhood}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.address?.road}
                  helperText={formik.errors.address?.road}
                  small
                  name={"address.road"}
                  label={"Rua"}
                  value={formik.values.address.road}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
                <GenericTextField<string>
                  error={!!formik.errors.address?.number}
                  helperText={formik.errors.address?.number}
                  small
                  name={"address.number"}
                  label={"Número"}
                  value={formik.values.address.number}
                  props={{
                    onChange: formik.handleChange,
                  }}
                />
              </InfoCard>
            </InfoCardContainer>
            <InfoCardContainer sx={{ marginTop: "20px" }}>
              <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
                Indicação
              </InfoCardTitle>
              <InfoCard>
                <AsyncAutoComplete
                  label="Atribuir indicação"
                  handleOnSelect={handleSelectIndication}
                  urlToSearch={INDICATION_LIST}
                  sortField="name"
                  error={formik.errors.indicationId}
                  haveError={!!formik.errors.indicationId}
                  onClear={() => formik.setFieldValue("indicationId", undefined)}
                />
              </InfoCard>
            </InfoCardContainer>
          </Box>

        </Box>
        <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
          <Button onClick={() => navigate("/clientes")} variant="outlined">
            Voltar
          </Button>
          <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
        </Box>
      </RegisterPageContent>
    </RegisterPage>
  )
}

export default RegisterClient