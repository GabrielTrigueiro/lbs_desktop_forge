import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Validations } from "../../../../core/utils/validations";
import { useState } from "react";
import { LoginContainer, LoginContentBox, LoginLogo } from "../styles";
import { useFormik } from "formik";
import { formatDocument } from "../../../../core/utils/globalFunctions";
import GenericTextField from "../../../../app/components/genericTextField/GenericTextField";
import { useLocation, useNavigate } from "react-router-dom";
import { verificationTokenService } from "../../../../core/api/user/userService";

type TRedefinePassword = {
    password: string;
    confirmPassword: string;
}

const RedefinePassword = () => {
    const location = useLocation();
    const currentTheme = useTheme();
    const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function getTokenFromUrl(): string | null {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");
        return token;
    }

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    const initialValues: TRedefinePassword = {
        password: "",
        confirmPassword: "",
    };

    const formik = useFormik({
        validateOnChange: true,
        initialValues,
        validationSchema: Validations.redefinePassword,
        onSubmit: () => {
            setIsLoading(true)
            let userDoc = localStorage.getItem("redefineKey");
            if (getTokenFromUrl() !== undefined)
                verificationTokenService({
                    cod: getTokenFromUrl()!,
                    password: formik.values.password,
                    login: userDoc!
                }).then(() => {
                    setIsLoading(false)
                    navigate('/login')
                    localStorage.removeItem("redefineKey")
                }).catch(() => setIsLoading(false))
        }
    });

    return (
        <LoginContainer
            sx={{ display: "flex" }}
            $small={isSmallScreen}
            maxWidth={isSmallScreen ? "sm" : "md"}
            disableGutters
        >
            <LoginLogo $small={isSmallScreen}></LoginLogo>

            <LoginContentBox onSubmit={formik.handleSubmit} $small={isSmallScreen}>
                <Typography
                    sx={{
                        fontSize: "1.1pc",
                        fontWeight: "bold",
                        marginTop: isSmallScreen ? 0 : "-20px",
                    }}
                >
                    REDEFINIÇÃO DE SENHA
                </Typography>
                <GenericTextField<string>
                    props={{
                        type: showPassword ? "text" : "password",
                        fullWidth: true,
                        onChange: formik.handleChange,
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    onBlur={() => {
                        formik.setFieldValue("cpf", formatDocument(formik.values.password));
                    }}
                    value={formik.values.password}
                    label="Digite sua senha"
                    name="password"
                    error={!!formik.errors.password}
                    helperText={formik.errors.password}
                    style={{ marginBottom: -7 }}
                />

                <GenericTextField<string>
                    props={{
                        type: showPassword ? "text" : "password",
                        fullWidth: true,
                        onChange: formik.handleChange,
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    value={formik.values.confirmPassword}
                    label="Confirme sua senha"
                    name="confirmPassword"
                    error={!!formik.errors.confirmPassword}
                    helperText={formik.errors.confirmPassword}
                    style={{ marginTop: -8 }}
                />


                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        disabled={isLoading}
                        type={"submit"}
                        sx={{
                            fontWeight: "bold",
                            borderRadius: 1,
                            position: "relative",
                            height: "45px",
                        }}
                        fullWidth
                        variant="contained"
                    >
                        <Typography>ENVIAR</Typography>
                    </Button>
                )}
                <Typography sx={{ fontSize: "0.8pc", marginTop: 6 }}>V 2.0</Typography>
            </LoginContentBox>
        </LoginContainer>
    );
};

export default RedefinePassword;
