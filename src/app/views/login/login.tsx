import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppDispatch } from "../../../core/hooks/reduxHooks";
import { login } from "../../../core/redux/slices/authSlice";
import { Validations } from "../../../core/utils/validations";
import { useCallback, useState } from "react";
import { LoginContainer, LoginContentBox, LoginLogo } from "./styles";
import { useFormik } from "formik";
import { TLogin } from "../../../core/models/user";
import { formatDocument } from "../../../core/utils/globalFunctions";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GenericTextField from "../../../app/components/genericTextField/GenericTextField";
import theme from "../../../core/theme/theme";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const initialValues: TLogin = {
    login: "",
    password: "",
  };

  const handleLogin = useCallback(
    async (values: TLogin) => {
      setIsLoading(true);
      await dispatch(login(values))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    },
    [dispatch]
  );

  const formik = useFormik({
    validateOnChange: false,
    initialValues,
    validationSchema: Validations.loginSchema,
    onSubmit: handleLogin,
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
            marginTop: isSmallScreen ? 0 : "-10px",
          }}
        >
          ACESSAR CONTA
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
          value={formik.values.login}
          label="Usuário"
          name="login"
          error={!!formik.errors.login}
          helperText={formik.errors.login}
          style={{ marginBottom: - 13 }}
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
          value={formik.values.password}
          label="Senha"
          name="password"
          error={!!formik.errors.password}
          helperText={formik.errors.password}
          style={{ marginTop: - 9 }}
        />
        <Typography
          component={Link}
          to="/esqueceuSenha" 
          sx={{
            fontSize: "0.8pc",
            marginRight: -20,
            marginTop: -3,
            textDecoration: "underline",
            color: theme.COLORS.YELLOW2
          }}
        >
          Esqueci minha senha
        </Typography>
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
            <Typography>ACESSAR</Typography>
          </Button>
        )}
        <Typography sx={{ fontSize: "0.8pc", marginTop: 6 }}>V 2.0</Typography>
      </LoginContentBox>
    </LoginContainer>
  );
};

export default Login;
