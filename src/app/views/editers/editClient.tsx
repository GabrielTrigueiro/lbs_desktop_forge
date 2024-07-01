import { TClientBody, TClientUpdate } from '../../../core/models/clientLBS';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { Validations } from '../../../core/utils/validations';
import { getIn, useFormik } from 'formik';
import { deepEqual, formatarCEP, removeNonNumeric, statesOpitions } from '../../../core/utils/globalFunctions';
import { InfoCard, InfoCardContainer, InfoCardTitle } from '../../../app/components/styles';
import GenericTextField from '../../../app/components/genericTextField/GenericTextField';
import { ClientLbsService } from '../../../core/api/client/clientService';
import { AxiosError } from 'axios';
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from './styles';

const EditClient = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isValidating, setValidating] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState<TClientBody | undefined>(location.state?.client);

    useEffect(() => {
        if (!location.state?.client) {
            navigate('/clientes');
        }
    }, [location, navigate]);

    const initialValues: TClientUpdate = {
        name: client?.name || '',
        cep: client?.address.zipCode || '',
        uf: client?.address.uf || '',
        neighborhood: client?.address.neighborhood || '',
        city: client?.address.city || '',
        telephone: client?.contacts.telephone || '',
    };

    const handleResetStates = () => {
        setIsLoading(false);
        formik.resetForm();
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

    const callEditClient = async (updatedUser: TClientUpdate) => {
        setIsLoading(true)

        let cleanedClientUser: TClientUpdate = {
            name: updatedUser.name,
            cep: removeNonNumeric(updatedUser.cep) ?? "",
            uf: updatedUser.uf,
            city: updatedUser.city,
            neighborhood: updatedUser.neighborhood,
            telephone: removeNonNumeric(updatedUser.telephone) ?? "",

        };
        if (client?.id) {
            ClientLbsService.updateClient(cleanedClientUser, String(client.id))
                .then((resp) => {
                    handleResetStates();
                    navigate(-1)
                })
                .catch((err: AxiosError) => {
                    setIsLoading(false);
                });
        }
    };


    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validationSchema: Validations.EditClientShema,
        validateOnChange: false,
        onSubmit: async (values, { setSubmitting }) => {
            await callEditClient(values);
            setSubmitting(false);
        },
    });

    useEffect(() => {
        hasChanges();
    }, [formik.values]);



    return (<>
        <RegisterPage>
            <RegisterPageHeader>Editar Cliente</RegisterPageHeader>
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
                    <Button disabled={isLoading || isValidating} onClick={() => navigate("/clientes")} variant="outlined">
                        Voltar
                    </Button>
                    <Button disabled={!hasChanges() || isLoading || isValidating}
                        onClick={() => formik.handleSubmit()}
                    >Editar
                    </Button>
                </Box>
            </RegisterPageContent>
        </RegisterPage>

    </>
    )
}

export default EditClient