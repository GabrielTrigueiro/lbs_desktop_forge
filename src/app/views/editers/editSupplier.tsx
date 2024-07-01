import { TSupplierBody, TSupplierRegister, TUpdateSupplier } from "../../../core/models/supplier";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { InfoCard, InfoCardContainer } from "../../../app/components/styles";
import GenericTextField from "../../../app/components/genericTextField/GenericTextField";
import { deepEqual, removeNonNumeric } from "../../../core/utils/globalFunctions";
import { SupplierService } from "../../../core/api/supplier/supplierService";
import { AxiosError } from "axios";
import { Validations } from "../../../core/utils/validations";
import { RegisterPage, RegisterPageContent, RegisterPageHeader } from "./styles";



const EditSupplier = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isValidating, setValidating] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [supplier, setSupplier] = useState<TSupplierBody | undefined>(location.state?.supplier);

    useEffect(() => {
        if (!location.state?.supplier) {
            navigate('/fornecedores');
        }
    }, [location, navigate]);

    const initialValues: TUpdateSupplier = {
        cpforcnpj: supplier?.cpforcnpj || '',
        nameCompany: supplier?.nameCompany || '',
        nameRepresentative: supplier?.nameRepresentative || '',
    };


    const callEditSupplier = async (updatedUser: TUpdateSupplier) => {
        setIsLoading(true)

        let cleanedSupplierUser: TUpdateSupplier = {
            cpforcnpj: removeNonNumeric(updatedUser.cpforcnpj) ?? "",
            nameCompany: updatedUser.nameCompany,
            nameRepresentative: updatedUser.nameRepresentative

        };
        if (supplier?.id) {
            SupplierService.updateSupplier(cleanedSupplierUser, String(supplier.id))
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
        validationSchema: Validations.EditSupplierShema,
        validateOnChange: false,
        onSubmit: async (values, { setSubmitting }) => {
            await callEditSupplier(values);
            setSubmitting(false);
        },
    });

    useEffect(() => {
        hasChanges();
    }, [formik.values]);



    return (<>
        <RegisterPage>
            <RegisterPageHeader>Editar Fornecedor</RegisterPageHeader>
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
                                error={!!formik.errors.nameRepresentative}
                                helperText={formik.errors.nameRepresentative}
                                small
                                name={"nameRepresentative"}
                                label={"Nome do representante"}
                                value={formik.values.nameRepresentative}
                                props={{
                                    onChange: formik.handleChange,
                                }}
                            />
                        </InfoCard>
                    </InfoCardContainer>
                </Box>
                <Box sx={{ gap: " 1rem", display: "flex", flexDirection: "row" }}>
                    <Button disabled={isLoading || isValidating} onClick={() => navigate("/fornecedores")} variant="outlined">
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

export default EditSupplier;