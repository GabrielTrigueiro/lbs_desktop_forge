import { Notification } from "app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";
import { SupplierService } from "../../../core/api/supplier/supplierService";
import { TSupplierRegister } from "../../../core/models/supplier";
import { formatarCEP, removeExtraSpaces, removeNonNumeric, statesOpitions } from "../../../core/utils/globalFunctions";
import { getIn, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { InfoCard, InfoCardContainer, InfoCardTitle } from "../../../app/components/styles";
import GenericTextField from "../../../app/components/genericTextField/GenericTextField";
import { Validations } from "../../../core/utils/validations";
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from "./styles";

function RegisterSupplier() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setValidating] = useState(false);


    const initialValues: TSupplierRegister = {
        stateEnrollment: "",
        nameCompany: "",
        cpforcnpj: "",
        nameReprensatative: "",
        addressDTO: {
            zipCode: "",
            uf: "",
            road: "",
            number: "",
            neighborhood: "",
            city: ""
        },
        contactDTO: {
            telephone: "",
            cell_phone1: "",
            cell_phone2: "",
            email: ""
        },
    };

    function getCepData(ev: any) {
        setValidating(true);
        const cep = ev?.replace(/[^0-9]/g, "");
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.erro === true) {
                    formik.setFieldError("addressDTO.zipCode", "CEP inválido");
                    setValidating(false);
                } else {
                    setValidating(false);

                    formik.setFieldValue(
                        "addressDTO.zipCode",
                        formatarCEP(formik.values.addressDTO.zipCode)
                    );
                    formik.setFieldValue("addressDTO.city", `${data.localidade}`);
                    formik.setFieldValue("addressDTO.uf", `${data.uf}`);
                    formik.setFieldValue("addressDTO.road", `${data.logradouro}`);
                    formik.setFieldValue("addressDTO.neighborhood", `${data.bairro}`);
                    formik.setFieldTouched("addressDTO.zipCode", false);
                }
            })
            .catch((err) => {
                formik.setFieldError("addressDTO.zipCode", "CEP inválido");
                setValidating(false);
            });
    }

    const handleResetStates = () => {
        setIsLoading(false);
        formik.resetForm();
    };

    const callCreateSupplier = async (newUser: TSupplierRegister) => {
        setIsLoading(true)
        let cleanedCollaboratorUser: TSupplierRegister = {
            cpforcnpj: removeNonNumeric(newUser.cpforcnpj) ?? "",
            nameCompany: newUser.nameCompany,
            nameReprensatative: newUser.nameReprensatative,
            stateEnrollment: newUser.stateEnrollment,
            addressDTO: {
                zipCode: removeNonNumeric(newUser.addressDTO.zipCode) ?? "",
                uf: newUser.addressDTO.uf,
                road: newUser.addressDTO.road,
                number: newUser.addressDTO.number,
                neighborhood: newUser.addressDTO.neighborhood,
                city: newUser.addressDTO.city
            },
            contactDTO: {
                telephone: removeNonNumeric(newUser.contactDTO.telephone),
                cell_phone1: removeNonNumeric(newUser.contactDTO.cell_phone1) ?? "",
                cell_phone2: removeNonNumeric(newUser.contactDTO.cell_phone2),
                email: removeExtraSpaces(newUser.contactDTO.email)
            },
        };
        SupplierService.createSupplier(cleanedCollaboratorUser)
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
        validationSchema: Validations.supplierRegisterSchema,
        validateOnChange: false,
        onSubmit: async (values, { setSubmitting }) => {
            setIsLoading(true);
            await callCreateSupplier(values);
            setSubmitting(false);
        },
    });

    return (
        <RegisterPage>
            <RegisterPageHeader>Cadastrar Fornecedor</RegisterPageHeader>
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
                                error={!!formik.errors.cpforcnpj}
                                helperText={formik.errors.cpforcnpj}
                                small
                                name={"cpforcnpj"}
                                label={"CNPJ"}
                                value={formik.values.cpforcnpj}
                                props={{
                                    onChange: formik.handleChange,
                                }}
                            />
                            <GenericTextField<string>
                                error={!!formik.errors.nameCompany}
                                helperText={formik.errors.nameCompany}
                                small
                                name={"nameCompany"}
                                label={"Nome da compania"}
                                value={formik.values.nameCompany}
                                props={{
                                    onChange: formik.handleChange,
                                }}
                            />
                            <GenericTextField<string>
                                error={!!formik.errors.nameReprensatative}
                                helperText={formik.errors.nameReprensatative}
                                small
                                name={"nameReprensatative"}
                                label={"Nome do representante"}
                                value={formik.values.nameReprensatative}
                                props={{
                                    onChange: formik.handleChange,
                                }}
                            />
                            <GenericTextField<string>
                                error={!!formik.errors.stateEnrollment}
                                helperText={formik.errors.stateEnrollment}
                                small
                                name={"stateEnrollment"}
                                label={"Inscrição estadual"}
                                value={formik.values.stateEnrollment}
                                props={{
                                    onChange: formik.handleChange,
                                }}
                            />

                        </InfoCard>

                        <InfoCardContainer sx={{ marginTop: "20px" }}>
                            <InfoCardTitle sx={{ whiteSpace: "nowrap" }}>
                                Informações contato
                            </InfoCardTitle>
                            <InfoCard>
                                <GenericTextField<string>
                                    error={!!formik.errors.contactDTO?.cell_phone1}
                                    helperText={formik.errors.contactDTO?.cell_phone1}
                                    small
                                    name={"contactDTO.cell_phone1"}
                                    label={"Celular 1"}
                                    value={formik.values.contactDTO.cell_phone1}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.contactDTO?.cell_phone2}
                                    helperText={formik.errors.contactDTO?.cell_phone2}
                                    small
                                    name={"contactDTO.cell_phone2"}
                                    label={"Celular 2"}
                                    value={formik.values.contactDTO.cell_phone2!!}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.contactDTO?.telephone}
                                    helperText={formik.errors.contactDTO?.telephone}
                                    small
                                    name={"contactDTO.telephone"}
                                    label={"Telefone"}
                                    value={formik.values.contactDTO.telephone!!}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.contactDTO?.email}
                                    helperText={formik.errors.contactDTO?.email}
                                    small
                                    name={"contactDTO.email"}
                                    label={"Email"}
                                    value={formik.values.contactDTO.email}
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
                                    error={!!formik.errors.addressDTO?.zipCode}
                                    helperText={formik.errors.addressDTO?.zipCode}
                                    small
                                    name={"addressDTO.zipCode"}
                                    label={"CEP"}
                                    value={formik.values.addressDTO.zipCode}
                                    props={{
                                        onChange: formik.handleChange,

                                    }}
                                    onBlur={() => getCepData(formik.values.addressDTO.zipCode)}
                                />
                                <TextField
                                    value={formik.values.addressDTO.uf}
                                    onChange={e => formik.setFieldValue('addressDTO.uf', e.target.value)}
                                    disabled={isValidating}
                                    id="outlined-select-state"
                                    margin="none"
                                    select
                                    label="UF"
                                    size='small'
                                    name="addressDTO.uf"
                                    error={
                                        Boolean(getIn(formik.errors, "addressDTO.uf"))
                                    }
                                    helperText={
                                        getIn(formik.errors, "addressDTO.uf")
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
                                    error={!!formik.errors.addressDTO?.city}
                                    helperText={formik.errors.addressDTO?.city}
                                    small
                                    name={"addressDTO.city"}
                                    label={"Cidade"}
                                    value={formik.values.addressDTO.city}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.addressDTO?.neighborhood}
                                    helperText={formik.errors.addressDTO?.neighborhood}
                                    small
                                    name={"addressDTO.neighborhood"}
                                    label={"Bairro"}
                                    value={formik.values.addressDTO.neighborhood}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.addressDTO?.road}
                                    helperText={formik.errors.addressDTO?.road}
                                    small
                                    name={"addressDTO.road"}
                                    label={"Rua"}
                                    value={formik.values.addressDTO.road}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.addressDTO?.number}
                                    helperText={formik.errors.addressDTO?.number}
                                    small
                                    name={"addressDTO.number"}
                                    label={"Número"}
                                    value={formik.values.addressDTO.number}
                                    props={{
                                        onChange: formik.handleChange,
                                    }}
                                />
                            </InfoCard>
                        </InfoCardContainer>
                    </Box>
                </Box>
                <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
                    <Button onClick={() => navigate("/fornecedores")} variant="outlined">
                        Voltar
                    </Button>
                    <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
                </Box>
            </RegisterPageContent>
        </RegisterPage>
    )
}

export default RegisterSupplier