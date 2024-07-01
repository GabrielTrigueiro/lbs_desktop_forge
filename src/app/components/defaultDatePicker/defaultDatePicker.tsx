import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePickerProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  minDate?: Date;
}

const DefaultDatePicker = (props: IDatePickerProps) => {
  return (
    <DatePicker
      locale={ptBR}
      dateFormat={"dd/MM/yyyy"}
      selected={props.date}
      onChange={props.setDate}
      minDate={props.minDate}
    />
  );
};

export default DefaultDatePicker;
