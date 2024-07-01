import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { FormHelperText } from "@mui/material";

import {axiosInstance} from "../../../core/api/axios/axiosInstance";
import {IPage, IResponseBody} from "../../../core/models/utils";


interface IAsyncProps<T> {
  handleOnSelect: (selected: T) => void;
  urlToSearch: string;
  label: string;
  sortField: "name" | "nameRepresentative" | "createdAt";
  style?: React.CSSProperties | undefined;
  error?: string;
  haveError?: boolean;
  variant?: "standard" | "outlined" | "filled" | undefined;
  onClear?: () => void;
  selectedValue?: T | null; // Adicionar esta linha
}

type OptionType = { name: string } | { nameCompany: string };

export default function AsyncAutoComplete<T extends OptionType>({
  handleOnSelect,
  urlToSearch,
  label,
  sortField,
  style,
  error,
  haveError,
  variant,
  onClear,
  selectedValue, // Adicionar esta linha
}: IAsyncProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly T[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const response = await axiosInstance.get<IResponseBody<IPage<T>>>(
          urlToSearch,
          {
            params: {
              page,
              size: rowsPerPage,
              sort: `${sortField},desc`,
            },
          }
        );
        if (active) {
          setOptions(response.data.data.content);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, urlToSearch, selectedValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const getOptionLabel = (option: T): string => {
    if ("name" in option) {
      return option.name;
    } else if ("nameCompany" in option) {
      return option.nameCompany;
    }
    return "";
  };

  return (
    <Autocomplete
      fullWidth
      value={selectedValue} // Adicionar esta linha 
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event: any, value: T | null) => {
        if (value) {
          handleOnSelect(value);
        } else if (onClear) {
          onClear();
        }
      }}
      isOptionEqualToValue={(option, value) => {
        if ("name" in option && "name" in value) {
          return option.name === value.name;
        } else if ("nameCompany" in option && "nameCompany" in value) {
          return option.nameCompany === value.nameCompany;
        }
        return false;
      }}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      style={style}
      loadingText={"Procurando..."}
      renderInput={(params) => (
        <TextField
          {...params}
          size={"small"}
          fullWidth
          style={style}
          label={label}
          error={haveError}
          variant={variant}
          helperText={
            haveError && (
              <FormHelperText sx={{ margin: -0.5, padding: 0 }} error={haveError}>
                {String(error)}
              </FormHelperText>
            )
          }
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
