import { Button, CircularProgress, ButtonProps } from "@mui/material";

interface IButtonSpinnerProps extends ButtonProps {
    title: string;
    isLoading: boolean;
    disabled: boolean;
    onClick: () => void;
    sizeSpinner: number;
}

const ButtonCircularProgress: React.FC<IButtonSpinnerProps> = ({title, isLoading, disabled, onClick, sizeSpinner, ...rest}: IButtonSpinnerProps) => {
    return (
        <Button
            {...rest}
            disabled={disabled}
            onClick={onClick}
            //sx={{ width: "100%", height: "40px" }}
        >
            {isLoading ? (
                <CircularProgress size={sizeSpinner} style={{ position: "absolute", top: "50%", left: "50%", marginTop: -12, marginLeft: -12 }} />
            ) : (
                title
            )}
        </Button>
    )
}
export default ButtonCircularProgress;