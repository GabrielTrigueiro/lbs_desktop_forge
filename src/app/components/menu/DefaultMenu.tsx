import { Menu, MenuItem, PopoverVirtualElement } from "@mui/material";
import React from "react";

export interface IMenuItemProps {
  label: string;
  function: () => void;
}

interface IDefaultMenuProps {
  anchor:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined;
  status: boolean;
  onClose: () => void;
  menuItems: IMenuItemProps[];
}

const DefaultMenu: React.FC<IDefaultMenuProps> = ({
  anchor,
  menuItems,
  onClose,
  status,
}) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchor}
      open={status}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.function}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};
export default DefaultMenu;
