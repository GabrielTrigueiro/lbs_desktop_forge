import React from "react";
import { TextField } from "@mui/material";
import CurrencyInput from "react-currency-input-field";

interface ICurrencyTextFieldProps {
  label: string;
  stateFunction: (value: React.SetStateAction<string | undefined>) => void;
  amount: string | undefined;
  size?: "small" | "medium";
}

const CurrencyTextField = ({
  amount,
  stateFunction,
  label,
  size,
}: ICurrencyTextFieldProps) => {
  const handleAmountChange = (value: any) => {
    stateFunction(value);
  };

  return (
    <TextField
      sx={{ width: "100%" }}
      size={size}
      autoComplete="off"
      label={label}
      variant="outlined"
      InputProps={{
        inputComponent: CurrencyInput as any,
        inputProps: {
          prefix: "R$ ",
          decimalSeparator: ",",
          groupSeparator: ".",
          allowNegativeValue: false,
          decimalScale: 2,
          onValueChange: handleAmountChange,
        },
        value: amount,
      }}
    />
  );
};

export default CurrencyTextField;
