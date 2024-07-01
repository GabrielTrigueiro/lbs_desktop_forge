import { Step, StepLabel, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StepIconProps } from "@mui/material/StepIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./stepper.css";
import theme from "../../../core/theme/theme";
import { StepContent, StepContentText, StepNumber } from "./style";

interface StepProp extends StepIconProps {
  index: number;
}

interface IProps {
  activeStep: number;
  steps: string[];
}

const DefaultStepper = (props: IProps) => {
  const { steps, activeStep } = props;

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean; index: number };
  }>(({ ownerState }) => ({
    position: "relative",
    width: 170,
    height: 70,
    background: theme.COLORS.WHITE,
    display: "flex",
    alignItems: "center",
    clipPath:
      ownerState.index === 0
        ? "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)"
        : ownerState.index === 5
        ? "polygon(20px 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        : "polygon(20px 50%, 0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)",
    ...(ownerState.active && {
      background: theme.COLORS.BLUE3,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      background: theme.COLORS.GRAY5,
    }),
  }));

  function ColorlibStepIcon(props: StepProp) {
    const { active, completed, className, index } = props;
    const icons: { [index: string]: React.ReactElement } = {
      1: (
        <StepContent>
          {!completed ? (
            <StepNumber active={active} completed={completed}>
              01
            </StepNumber>
          ) : (
            <CheckCircleIcon style={{ color: theme.COLORS.BLUE3 }} />
          )}
          <StepContentText active={active} completed={completed}>
            CPF/CNPJ
          </StepContentText>
        </StepContent>
      ),
      2: (
        <StepContent>
          {!completed ? (
            <StepNumber active={active} completed={completed}>
              02
            </StepNumber>
          ) : (
            <CheckCircleIcon style={{ color: theme.COLORS.BLUE3 }} />
          )}
          <StepContentText active={active} completed={completed}>
            Informações pessoais
          </StepContentText>
        </StepContent>
      ),
      3: (
        <StepContent>
          {!completed ? (
            <StepNumber active={active} completed={completed}>
              03
            </StepNumber>
          ) : (
            <CheckCircleIcon style={{ color: theme.COLORS.BLUE3 }} />
          )}
          <StepContentText active={active} completed={completed}>
            Endereço
          </StepContentText>
        </StepContent>
      ),
      4: (
        <StepContent>
          {!completed ? (
            <StepNumber active={active} completed={completed}>
              04
            </StepNumber>
          ) : (
            <CheckCircleIcon style={{ color: theme.COLORS.BLUE3 }} />
          )}
          <StepContentText active={active} completed={completed}>
            Cupom
          </StepContentText>
        </StepContent>
      ),
      5: (
        <StepContent>
          {!completed ? (
            <StepNumber active={active} completed={completed}>
              05
            </StepNumber>
          ) : (
            <CheckCircleIcon style={{ color: theme.COLORS.BLUE3 }} />
          )}
          <StepContentText active={active} completed={completed}>
            Contrato
          </StepContentText>
        </StepContent>
      ),
      6: (
        <StepContent>
          {!completed ? (
            <StepNumber active={active} completed={completed}>
              06
            </StepNumber>
          ) : (
            <CheckCircleIcon style={{ color: theme.COLORS.BLUE3 }} />
          )}
          <StepContentText active={active} completed={completed}>
            Formas de pagamento
          </StepContentText>
        </StepContent>
      ),
      7: (
        <StepContent>
          <StepContentText active={active}>Pagamento</StepContentText>
        </StepContent>
      ),
    };
    return (
      <ColorlibStepIconRoot
        ownerState={{
          completed,
          active,
          index,
        }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <Stepper
      style={{
        display: "flex",
        padding: 0,
        position: "relative",
        justifyContent: "space-between",
        background: theme.COLORS.GRAY6,
        borderBottom: "2px solid",
        borderBottomColor: theme.COLORS.GRAY4,
      }}
      sx={{
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
      }}
      alternativeLabel
      connector={null}
      activeStep={activeStep}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel
            StepIconComponent={(props) => (
              <ColorlibStepIcon {...props} index={index} />
            )}
          />
        </Step>
      ))}
    </Stepper>
  );
};

export default DefaultStepper;
