import React from "react";
import {
    InputProps,
    TextField,
    TextFieldProps,
    FormHelperText,
} from "@mui/material";

type TDefaultTextField<T> = {
    name: string;
    label: string;
    value: string;
    props?: InputProps & TextFieldProps;
    small?: boolean;
    priceNumber: number | undefined;
    setPriceNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
    error?: boolean | undefined;
    helperText?: React.ReactNode;
    type?: React.HTMLInputTypeAttribute;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleFormattedChange?: (value: string) => void;
    style?: React.CSSProperties | undefined;
    disabled?: boolean | undefined;
};

function PriceTextField<T>({
    name,
    label,
    value,
    props,
    helperText,
    error,
    type,
    onBlur,
    onChange,
    handleFormattedChange,
    style,
    priceNumber,
    setPriceNumber,
    disabled
}: TDefaultTextField<T>) {


    // onChange para atualizar o valor do campo de texto.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = Number(inputValue.replace(/\D/g, "")) / 100;
        setPriceNumber(numericValue);
        if (handleFormattedChange) {
            handleFormattedChange(inputValue);
        } else if (onChange) {
            onChange(e);
        }
    };

     // Formata o valor a ser exibido no campo de texto.
    const formattedDisplayValue = (priceNumber || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).replace("R$", "").replace(",", ".");

    return (
        <TextField
            disabled={disabled}
            helperText={
                error && (
                    <FormHelperText sx={{ margin: -0.5, padding: 0 }} error={error}>
                        {String(helperText)}
                    </FormHelperText>
                )
            }
            onChange={handleInputChange}
            onBlur={onBlur}
            type={type ? type : undefined}
            variant="outlined"
            size="small"
            autoComplete="off"
            margin="none"
            id={name}
            label={label}
            value={formattedDisplayValue}
            error={error}
            style={style}
            InputProps={{
                startAdornment: <span>R$</span>,
            }}
            {...props}
        />
    );
}

export default PriceTextField;
