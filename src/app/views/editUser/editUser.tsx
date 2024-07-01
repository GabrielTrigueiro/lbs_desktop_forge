import { Button, Divider, IconButton, InputAdornment } from "@mui/material";
import GenericTextField from "../../../app/components/genericTextField/GenericTextField";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/reduxHooks";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { updateUser } from "../../../core/redux/slices/authSlice";
import Spinner from "../../components/spinner/spinner";
import {
  ContainerCard,
  FormColumn,
  PageContentContainer,
  StyledCardContent,
  StyledCardHeader,
} from "../../components/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { EditUserBox } from "./styles";
import { TEdit } from "core/models/user";
import {
  removeExtraSpaces,
  removeNonNumeric,
} from "core/utils/globalFunctions";

function EditUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [repeatPass, setRepeatPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const basicUserInfo: any = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const initialValues: TEdit = {
    id: basicUserInfo?.id || 0,
    login: basicUserInfo?.login || "",
    name: basicUserInfo?.name || "",
    password: "",
    type: basicUserInfo?.group || "",
  };

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function togglePasswordConfirm() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  // ? password validations
  function validatePass(values: TEdit): boolean {
    if (values.password !== repeatPass) {
      formik.setFieldError("password", "Senhas diferentes");
      return false;
    }
    if (
      values.password.length &&
      repeatPass.length !== 0 &&
      values.password.length &&
      repeatPass.length < 5
    ) {
      formik.setFieldError("password", "Senha deve conter ao menos 5 dígitos");
      return false;
    }
    return true;
  }

  // ! email vindo como sub e nao como email no token
  const areValuesEqual = (): boolean => {
    return (
      removeExtraSpaces(basicUserInfo?.name) ===
        removeExtraSpaces(formik.values.name) &&
      removeNonNumeric(basicUserInfo?.login) ===
        removeNonNumeric(formik.values.login) &&
      formik.values.password === ""
    );
  };

  const handleUpdateUser = async (userToEdit: TEdit) => {
    setIsLoading(true);
    await dispatch(updateUser(userToEdit)).then(() => {
      setIsLoading(false);
    });
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      if (validatePass(values)) {
        let cleanedUser: TEdit = {
          id: values.id,
          login: removeNonNumeric(values.login) || "",
          name: removeExtraSpaces(values.name),
          password: removeExtraSpaces(values.password),
          type: values.type,
        };
        await handleUpdateUser(cleanedUser).then(() => {
          setRepeatPass("");
          formik.setFieldValue("password", "");
          Notification("Atualizado com sucesso", "success");
        });
      }
    },
  });

  useEffect(() => {
    areValuesEqual();
  }, [formik.values.login]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <PageContentContainer>
      <ContainerCard>
        <StyledCardHeader title={"Meus dados"} />
        <Divider />
        <StyledCardContent sx={{ flexDirection: "column" }}>
          <EditUserBox>
            <FormColumn>
              <GenericTextField<string>
                props={{
                  fullWidth: true,
                  onChange: formik.handleChange,
                }}
                value={formik.values.name}
                label="Nome"
                name="name"
              />
              <GenericTextField<string>
                props={{
                  fullWidth: true,
                  onChange: formik.handleChange,
                }}
                value={formik.values.login}
                label="Login"
                name="login"
              />
            </FormColumn>
            <FormColumn>
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
                value={formik.values.password}
                label="Nova senha"
                name="password"
                error={!!formik.errors.password}
                helperText={formik.errors.password}
              />
              <GenericTextField<string>
                props={{
                  type: showPasswordConfirm ? "text" : "password",
                  fullWidth: true,
                  onChange: (e) => setRepeatPass(e.target.value as string),
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordConfirm}
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                value={repeatPass}
                label="Repita a senha"
                name="repeatPass"
                error={!!formik.errors.password}
                helperText={formik.errors.password}
              />
            </FormColumn>
          </EditUserBox>
          <Button
            sx={{ width: 120, height: 35 }}
            disabled={areValuesEqual() || isLoading}
          >
            {isLoading ? <Spinner size={4} state={isLoading} /> : "Atualizar"}
          </Button>
        </StyledCardContent>
      </ContainerCard>
      </PageContentContainer>
    </form>
  );
}

export default EditUser;
