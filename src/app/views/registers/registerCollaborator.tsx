import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GenericTextField from "../../../app/components/genericTextField/GenericTextField";
import { InfoCard, InfoCardContainer, InfoCardTitle } from "../../../app/components/styles";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { AxiosError } from "axios";
import { CollaboratorService } from "../../../core/api/collaborator/collaboratorService";
import { TCollaboratorRegister } from "../../../core/models/collaborator";
import { convertToBack, formatDate, formatarCEP, removeExtraSpaces, removeNonNumeric, sexoOptions, statesOpitions } from "../../../core/utils/globalFunctions";
import { Dayjs } from "dayjs";
import { getIn, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Validations } from "../../../core/utils/validations";
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from "./styles";

function RegisterCollaborator() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setValidating] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>();
    const [showPassword, setShowPassword] = useState(false);


    const initialValues: TCollaboratorRegister = {
        name: "",
        rg: "",
        cpforcnpj: "",
        birthday: "",
        user: {
            password: "",
            confirmPassword: '',
        },
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
        sexoID: 0,
    };

    const validateInfos = (): boolean => {
        if (formik.values.user.password !== formik.values.user.confirmPassword) {
            formik.setFieldError("user.password", "Senhas não conferem");
            setIsLoading(false);
            return false;
        }
        return true;
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
            formik.setFieldValue("birthday", formatDate(date.toDate()))
    };

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    const handleResetStates = () => {
        setIsLoading(false);
        formik.resetForm();
    };

    const callCreateCollaborator = async (newUser: TCollaboratorRegister) => {
        setIsLoading(true)
        if (validateInfos()) {
            let cleanedCollaboratorUser: TCollaboratorRegister = {
                name: newUser.name,
                rg: removeNonNumeric(newUser.rg) ?? "",
                cpforcnpj: removeNonNumeric(newUser.cpforcnpj) ?? "",
                birthday: convertToBack(newUser.birthday),
                user: {
                    password: newUser.user.password,
                },
                sexoID: newUser.sexoID,
                address: {
                    zipCode: removeNonNumeric(newUser.address.zipCode) ?? "",
                    uf: newUser.address.uf,
                    road: newUser.address.road,
                    number: newUser.address.number,
                    neighborhood: newUser.address.neighborhood,
                    city: newUser.address.city
                },
                contact: {
                    telephone: removeNonNumeric(newUser.contact.telephone),
                    cell_phone1: removeNonNumeric(newUser.contact.cell_phone1) ?? "",
                    cell_phone2: removeNonNumeric(newUser.contact.cell_phone2),
                    email: removeExtraSpaces(newUser.contact.email)
                },
            };
            CollaboratorService.createCollaborator(cleanedCollaboratorUser)
                .then((resp) => {
                    handleResetStates();
                    navigate(-1)
                })
                .catch((err: AxiosError) => {
                    Notification(String(err.message), "error")
                    setIsLoading(false);
                });
        }
    };

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validationSchema: Validations.collaboratorRegisterSchema,
        validateOnChange: false,
        onSubmit: async (values, { setSubmitting }) => {
            await callCreateCollaborator(values);
            setSubmitting(false);
        },
    });

    return (
        <RegisterPage>
            <RegisterPageHeader>Cadastrar Colaborador</RegisterPageHeader>
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
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale="pt-br"
                            >
                                <FormControl error={Boolean(getIn(formik.errors, "birthday"))} fullWidth>
                                    <DateField
                                        size="small"
                                        variant="outlined"
                                        label="Data de Nascimento"
                                        value={selectedDate}
                                        format="DD/MM/YYYY"
                                        onChange={(event) => handleDateChange(event)}
                                        InputProps={{ error: Boolean(getIn(formik.errors, "birthday")) }}
                                        FormHelperTextProps={{
                                            style: {
                                              margin: '1px 10px -5px ',
                                            },
                                          }}
                                    />
                                    {formik.errors.birthday && <FormHelperText>{formik.errors.birthday}</FormHelperText>}
                                </FormControl>
                            </LocalizationProvider>
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
                                Senha da conta
                            </InfoCardTitle>
                            <InfoCard>
                                <GenericTextField<string>
                                    error={!!formik.errors.user?.password}
                                    helperText={formik.errors.user?.password}
                                    small
                                    name={"user.password"}
                                    label={"Senha"}
                                    value={formik.values.user?.password}
                                    props={{
                                        type: showPassword ? "text" : "password",
                                        onChange: formik.handleChange,
                                        InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={togglePassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityIcon />
                                                        ) : (
                                                            <VisibilityOffIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <GenericTextField<string>
                                    error={!!formik.errors.user?.confirmPassword}
                                    helperText={formik.errors.user?.confirmPassword}
                                    small
                                    name={"user.confirmPassword"}
                                    label={"Confirmar senha"}
                                    value={formik.values.user?.confirmPassword!!}
                                    props={{
                                        type: showPassword ? "text" : "password",
                                        onChange: formik.handleChange,
                                        InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={togglePassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityIcon />
                                                        ) : (
                                                            <VisibilityOffIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </InfoCard>
                        </InfoCardContainer>
                    </Box>

                </Box>
                <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
                    <Button onClick={() => navigate("/colaboradores")} variant="outlined">
                        Voltar
                    </Button>
                    <Button disabled={isLoading} onClick={() => formik.handleSubmit()}>Cadastrar</Button>
                </Box>
            </RegisterPageContent>
        </RegisterPage>
    )
}

export default RegisterCollaborator