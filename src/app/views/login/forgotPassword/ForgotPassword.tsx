import {
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Validations } from "../../../../core/utils/validations";
import { useCallback, useState } from "react";
import { LoginContainer, LoginContentBox, LoginLogo } from "../styles";
import { useFormik } from "formik";
import { formatDocument, removeNonNumeric } from "../../../../core/utils/globalFunctions";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GenericTextField from "../../../../app/components/genericTextField/GenericTextField";
import { sendMessegeService } from "../../../../core/api/user/userService";

type TForgotPassword = {
  login: string;
}

const ForgotPassword = () => {
  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: TForgotPassword = {
    login: "",
  };

  const submitUserToResetPassword = useCallback(
    async (login: string) => {
      setIsLoading(true);
      await sendMessegeService(login)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
    },
    []
  );

  const formik = useFormik({
    validateOnChange: false,
    initialValues,
    validationSchema: Validations.forgotPasswordSchema,
    onSubmit: () => {
      let loginCleaned = removeNonNumeric(formik.values.login)
      localStorage.setItem("redefineKey", loginCleaned!)
      submitUserToResetPassword(String(loginCleaned));
    },
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
          ESQUECI MINHA SENHA
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9pc",
            marginTop: isSmallScreen ? 0 : "-5x",
          }}
        >
          Será enviado um link para o email de cadastro, por favor acessar link.
        </Typography>
        <GenericTextField<string>
          props={{
            fullWidth: true,
            onChange: formik.handleChange,
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
          onBlur={() => {
            formik.setFieldValue("login", formatDocument(formik.values.login));
          }}
          value={formik.values.login}
          label="CPF/CNPJ"
          name="login"
          error={!!formik.errors.login}
          helperText={formik.errors.login}
          style={{ marginBottom: -5 }}
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

export default ForgotPassword;
