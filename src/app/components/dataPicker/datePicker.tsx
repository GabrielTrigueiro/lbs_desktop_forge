import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateCalendar,
  DateField,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { ButtonsContainer, Container, SecondContainer, StyledDivCalendar, StyledDivPrimaryCalendar, StyledDivTextCalendar } from "./styles";
import dayjs, { Dayjs } from "dayjs";
import DefaultModal, { IModalProps } from "../modals/defaultModal/defaultModal";
import { Notification } from "../toastNotification/toastNotification";
import "dayjs/locale/pt-br";

interface IDataPicker extends IModalProps {
  initialDate: Dayjs | null | undefined;
  endDate?: Dayjs | null | undefined;
  setInitialDate: Dispatch<SetStateAction<Dayjs | null | undefined>>;
  setFinalDate: Dispatch<SetStateAction<Dayjs | null | undefined>>;
  typeOfDatePicker: string;
}

type TDataPicker = Omit<IDataPicker, "children">;

export default function DataPicker(props: Readonly<TDataPicker>) {
  const { isOpen, onClose, onOpen, title, typeOfDatePicker } = props;

  return (
    <DefaultModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <DatePickerModal {...props} typeOfDatePicker={typeOfDatePicker} />
    </DefaultModal>
  );
}

const DatePickerModal = (props: Readonly<TDataPicker>) => {
  const { initialDate: propInitialDate, endDate: propEndDate, setFinalDate, setInitialDate, onClose, typeOfDatePicker } = props;

  const [initialDate, setLocalInitialDate] = useState<Dayjs | null | undefined>(propInitialDate);
  const [endDate, setLocalEndDate] = useState<Dayjs | null | undefined>(propEndDate);

  useEffect(() => {
    if (typeOfDatePicker === "mes" && !initialDate) {
      setLocalInitialDate(dayjs().startOf("month"));
    }
  }, [typeOfDatePicker, initialDate]);

  const handleEnviarClick = () => {
    if (endDate && initialDate && endDate.isBefore(initialDate)) {
      Notification("A data final não pode ser anterior a data inicial", "warning");
      return;
    }
    setInitialDate(initialDate);
    setFinalDate(endDate);
    onClose();
  };

  const getMinDateForEndDate = (selectedDate: Dayjs | null | undefined) => {
    if (typeOfDatePicker === "mes" && selectedDate) {
      return selectedDate.startOf("month");
    }
    return dayjs("2024-01-01");
  };

  const getMaxDateForEndDate = (selectedDate: Dayjs | null | undefined) => {
    if (typeOfDatePicker === "mes" && selectedDate) {
      return selectedDate.endOf("month");
    }
    return dayjs("2024-12-31");
  };

  const handleLastThreeMonthsClick = () => {
    const today = dayjs();
    const lastThreeMonthsStart = today.subtract(1, "month").startOf("month");
    const lastThreeMonthsEnd = today.endOf("month");
    setLocalInitialDate(lastThreeMonthsStart);
    setLocalEndDate(lastThreeMonthsEnd);
  };

  const handleThisMonthClick = () => {
    const today = dayjs();
    const ThisMonthStart = today.subtract(0, "month").startOf("month");
    const ThisMonthEnd = today.subtract(0, "month").endOf("month");
    setLocalInitialDate(ThisMonthStart);
    setLocalEndDate(ThisMonthEnd);
  };

  const handleLastWeekClick = () => {
    const today = dayjs();
    const lastWeekStart = today.subtract(7, "day").startOf("day");
    const lastWeekEnd = today.endOf("day");
    setLocalInitialDate(lastWeekStart);
    setLocalEndDate(lastWeekEnd);
  };

  const handleLastMonthClick = () => {
    const today = dayjs();
    const lastMonthStart = today.subtract(1, "month").startOf("month");
    const lastMonthEnd = today.subtract(1, "month").endOf("month");
    setLocalInitialDate(lastMonthStart);
    setLocalEndDate(lastMonthEnd);
  };

  const handleTodayClick = () => {
    const today = dayjs().startOf("day");
    setLocalInitialDate(today);
    setLocalEndDate(today);
  };

  return (
    <Container>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
      >
        <SecondContainer>
          <StyledDivPrimaryCalendar>
            <StyledDivTextCalendar>
              <DateField
                size={"small"}
                variant={"standard"}
                label="Data Inicial"
                value={initialDate}
                format="DD/MM/YYYY"
                onChange={(value) => setLocalInitialDate(value)}
                minDate={dayjs("2024-01-01")}
                maxDate={dayjs().endOf("month")}
              />
              <DateField
                size={"small"}
                variant={"standard"}
                label="Data Final"
                value={endDate}
                format="DD/MM/YYYY"
                onChange={(value) => setLocalEndDate(value)}
                minDate={getMinDateForEndDate(initialDate)}
                maxDate={getMaxDateForEndDate(initialDate)}
              />
            </StyledDivTextCalendar>
            <StyledDivCalendar>
              <DateCalendar
                value={initialDate}
                onChange={(value) => setLocalInitialDate(value)}
                minDate={dayjs("2024-01-01")}
                maxDate={dayjs().endOf("month")}
              />
              <DateCalendar
                value={endDate}
                onChange={(value) => setLocalEndDate(value)}
                minDate={getMinDateForEndDate(initialDate)}
                maxDate={getMaxDateForEndDate(initialDate)}
              />
            </StyledDivCalendar>
          </StyledDivPrimaryCalendar>
          <ButtonsContainer>
            {typeOfDatePicker === "ano" && (
              <Button variant="outlined" sx={{ margin: "7px", width: "11svw" }} onClick={handleLastThreeMonthsClick}>Últimos 3 meses</Button>
            )}
            <Button variant="outlined" sx={{ margin: "7px", width: "11svw" }} onClick={handleLastWeekClick}>Última semana</Button>
            <Button variant="outlined" sx={{ margin: "7px", width: "11svw" }} onClick={handleLastMonthClick}>Último mês</Button>
            <Button variant="outlined" sx={{ margin: "7px", width: "11svw" }} onClick={handleThisMonthClick}>Este mês</Button>
            <Button variant="outlined" sx={{ margin: "7px", width: "11svw" }} onClick={handleTodayClick}>Hoje</Button>
          </ButtonsContainer>
        </SecondContainer>
        <Button
          sx={{ width: "10svw", marginTop: "30px" }}
          component="label"
          variant="contained"
          onClick={handleEnviarClick}
        >
          Enviar
        </Button>
      </LocalizationProvider>
    </Container>
  );
};

