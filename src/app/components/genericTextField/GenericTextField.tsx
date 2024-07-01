import React from "react";
import {
  InputProps,
  TextField,
  TextFieldProps,
  FormHelperText,
} from "@mui/material";

import {
  formatDocument,
  formatInt,
  formatPhoneNumber,
  formatRG,
} from "../../../core/utils/globalFunctions";

type TDefaultTextField<T> = {
  name: string;
  label: string;
  value: T;
  props?: InputProps & TextFieldProps;
  small?: boolean;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  onBlur?:
  | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;
  onChange?:
  | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;
  style?: React.CSSProperties | undefined;
};

function GenericTextField<T>({
  name,
  label,
  value,
  props,
  small,
  helperText,
  error,
  type,
  onBlur,
  onChange,
  style,
}: TDefaultTextField<T>) {

  function documentField(name: string) {
    switch (name) {
      case "cpforcnpj":
        return {
          maxLength: 18,
          value: formatDocument(value as string),
        };
      case "login":
        return {
          maxLength: 18,
          value: formatDocument(value as string),
        };
      case "cep":
        return {
          maxLength: 8,
        };
      case "address.zipCode":
        return {
          maxLength: 8,
        };
      case "rg":
        return {
          maxLength: 9,
          value: formatRG(value as string),
        };
      case "contact.telephone":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };

      case "telephone":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "contact.cell_phone1":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "contact.cell_phone2":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "contactDTO.telephone":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "contactDTO.cell_phone1":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "contactDTO.cell_phone2":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "address.number":
        return {
          maxLength: 6,
          value: formatInt(value as string),
        };
      case "addressDTO.number":
        return {
          maxLength: 6,
          value: formatInt(value as string),
        };
      default:
        return {};
    }
  }

  const inputProps = documentField(name);

  return (
    <TextField
      helperText={
        error && (
          <FormHelperText sx={{ margin: -0.5, padding: 0 }} error={error}>
            {String(helperText)}
          </FormHelperText>
        )
      }
      onChange={onChange}
      onBlur={onBlur}
      type={type ? type : undefined}
      size="small"
      variant="outlined"
      autoComplete="off"
      margin="none"
      id={name}
      label={label}
      value={value}
      error={error}
      style={style}
      inputProps={inputProps}
      {...props}
    />
  );
}

export default GenericTextField;
