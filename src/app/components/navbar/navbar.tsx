import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "core/hooks/reduxHooks";
import { logout } from "../../../core/redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBarBox, StyledAppBar, StyledToolBar, TypographyNav, UserMenu } from "./styles";

function Navbar() {
  const navigate = useNavigate();

  // * get user infos
  const dispatch = useAppDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);

  // * menu states
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // Obtenha a URL atual
  const location = useLocation();

  // Extraia a última parte da URL
  let urlPart = location.pathname.split('/').pop();

  // Verifique se urlPart não é undefined
  if (urlPart) {
    urlPart = urlPart.charAt(0).toUpperCase() + urlPart.slice(1);
  } else {
    urlPart = 'Home';
  }
useEffect (()=> {
  console.log(basicUserInfo)
},[basicUserInfo])
  // * menu actions
  const handleMenuAction = async (action: "logout" | "editUser") => {
    setAnchorElUser(null);
    switch (action) {
      case "logout":
        await dispatch(logout()).then(() => {
          navigate("/login");
        });
        break;
      case "editUser":
        navigate("/editarUsuario");
        break;
      default:
        break;
    }
  };

  if(location.pathname === "/venda"){
    return null
  }

  return (
    <StyledAppBar>
      <StyledToolBar disableGutters>
        <TypographyNav sx={{ fontSize: "1.1pc", fontWeight: "bold", marginLeft: -33.7 }}>{urlPart}</TypographyNav>
        <NavBarBox>
          <UserMenu>
            {/* <Typography >{basicUserInfo?.name}</Typography> */}
            <Tooltip title="Opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </UserMenu>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem onClick={() => handleMenuAction("editUser")}>
              <Typography alignItems={"center"}>Perfil</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction("logout")}>
              <Typography alignItems={"center"}>Sair</Typography>
            </MenuItem>
          </Menu>
        </NavBarBox>
      </StyledToolBar>
    </StyledAppBar>
  );
}
export default Navbar;
