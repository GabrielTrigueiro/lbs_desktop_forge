import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

interface IMenuAction {
  icon: JSX.Element;
  name: string;
  action: () => void;
}

export type TMenuActions = IMenuAction[];

interface IFloatingMenuProps {
  items: TMenuActions;
}

const DefaultFloatingMenu = (props: IFloatingMenuProps) => {
  const { items } = props;

  return (
    <SpeedDial
      ariaLabel="Menu do cliente"
      sx={{
        position: "fixed",
        bottom: 10,
        right: 10,
      }}
      icon={<SpeedDialIcon />}
    >
      {items.map((action) => (
        <SpeedDialAction
          onClick={action.action}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default DefaultFloatingMenu;
