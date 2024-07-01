import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

import DefaultModal from "../modals/defaultModal/defaultModal";
import {
  ColumnSelect,
  ColumnValueTextField,
  Container,
  FilterButton,
} from "./styles";
import DefaultDatePicker from "../defaultDatePicker/defaultDatePicker";
import {TSaleStatusType} from "../../../core/models/sale";
import {TSelectOption} from "../../../core/models/utils";


export interface ISelectItem {
  name: string;
  value: any;
  type?: "texto" | "date" | "number" | "status" | "type";
}

interface IFilterProps {
  title: string;
  changePage?: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;

  items: ISelectItem[];
  onChangeFilter: any;
}

function DefaultFilter(props: IFilterProps) {
  const { onClose, items, onChangeFilter, isOpen, onOpen, title, changePage } = props;

  const [search, setSearch] = useState<string | undefined>("");
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [statusType, setStatusType] = useState<TSaleStatusType>("PAGO");
  const [type, setType] = useState("");
  const [select, setSelect] = useState<string>("");
  const [tempSelect, setTempSelect] = useState<TSelectOption>({
    value: "",
    displayValue: "",
    type: undefined,
  });

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setSearch(event?.target.value);

  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };

  const handleChangeStatusSelect = (event: SelectChangeEvent) => {
    setStatusType(event.target.value as TSaleStatusType);
  };

  const handleChangeTypeSelect = (event: SelectChangeEvent) => {
    setType(event.target.value as "BOLETO" | "PIX");
  };

  const onCloseModal = () => {
    onClose();
    setSearch("");
    setSelect("");
    setNewDate(null);
    setTempSelect({ displayValue: "", value: "" });
  };

  function disableAction(): boolean {
    if (select) {
      if (tempSelect.type === "texto") {
        return !search;
      }
      if (tempSelect.type === "status") {
        return !statusType;
      }
      if (tempSelect.type === "date") {
        return !newDate;
      }
      if (tempSelect.type === "type") {
        return !type;
      }
    }
    return true;
  }

  const submitFilter = () => {
    if (select) {
      if (tempSelect.type === "texto") {
        onChangeFilter((prevState: any) => ({
          ...prevState,
          [select as any]: search,
        }));
      }
      if (tempSelect.type === "status") {
        onChangeFilter((prevState: any) => ({
          ...prevState,
          [select as any]: statusType,
        }));
      }
      if (tempSelect.type === "date") {
        onChangeFilter((prevState: any) => ({
          ...prevState,
          [select as any]: formatDate(newDate),
        }));
      }
      if (tempSelect.type === "type") {
        onChangeFilter((prevState: any) => ({
          ...prevState,
          [select as any]: type,
        }));
      }
    }
    setSelect("");
    setNewDate(null);
    onCloseModal();

    if (changePage) {
      changePage(0);
    }

  };

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onCloseModal}
      onOpen={onOpen}
      title={title}
    >
      <Container>
        <ColumnSelect variant="standard" size="small">
          <InputLabel htmlFor="coluna-select">Coluna</InputLabel>
          <Select value={select} onChange={handleChangeSelect} label="Coluna">
            {items.map((item) => (
              <MenuItem
                onClick={() =>
                  tempSelect.type !== item.type &&
                  setTempSelect((prev) => ({
                    ...prev,
                    type: item.type,
                  }))
                }
                key={item.name}
                value={item.value}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </ColumnSelect>
        {tempSelect.type === "date" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "12px",
            }}
          >
            <Typography fontSize={"0.7pc"}>Escolha a data</Typography>
            <DefaultDatePicker date={newDate} setDate={setNewDate} />
          </Box>
        )}
        {tempSelect.type === "texto" && (
          <ColumnValueTextField
            size={"small"}
            variant="standard"
            label="Valor"
            value={search}
            onChange={handleChangeSearch}
          />
        )}
        {tempSelect.type === "status" && (
          <ColumnSelect variant="standard" size="small">
            <InputLabel htmlFor="coluna-select">Status</InputLabel>
            <Select
              value={statusType}
              onChange={handleChangeStatusSelect}
              label="Status"
            >
              <MenuItem key={"PEDENTE"} value={"PENDENTE"}>
                Pendente
              </MenuItem>
              <MenuItem key={"EM_PAGAMENTO"} value={"EM_PAGAMENTO"}>
                Em pagamento
              </MenuItem>
              <MenuItem key={"PAGO"} value={"PAGO"}>
                Pago
              </MenuItem>
            </Select>
          </ColumnSelect>
        )}
        {tempSelect.type === "type" && (
          <ColumnSelect variant="standard" size="small">
            <InputLabel htmlFor="coluna-select">Tipo</InputLabel>
            <Select value={type} onChange={handleChangeTypeSelect} label="Tipo">
              <MenuItem key={"Pix"} value={"PIX"}>
                Pix
              </MenuItem>
              <MenuItem key={"BOLETO"} value={"BOLETO"}>
                Boleto
              </MenuItem>
            </Select>
          </ColumnSelect>
        )}
      </Container>

      <FilterButton
        disabled={disableAction()}
        onClick={() => submitFilter()}
        variant="contained"
      >
        Adicionar
      </FilterButton>
    </DefaultModal>
  );
}

export default DefaultFilter;
