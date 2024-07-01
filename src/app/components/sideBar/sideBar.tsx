import { Link, useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMediaQuery } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShareIcon from '@mui/icons-material/Share';
import CategoryIcon from '@mui/icons-material/Category';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LabelIcon from '@mui/icons-material/Label';
import useSideBarHook from "../../../core/hooks/sideBarHook";
import { useAppSelector } from "../../../core/hooks/reduxHooks";
import theme from "../../../theme";
import SideBarItem from "../sideBarItem/sideBarItem";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { IconList, IconWrapper, LogoSidebarMax, LogoSidebarMin, SideBarBody, SideBarToggle } from "./styles";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  ...transitionMixin(theme, theme.transitions.duration.enteringScreen),
  [theme.breakpoints.down("sm")]: {
    width: "100svw",
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme, theme.transitions.duration.leavingScreen),
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
});

const transitionMixin = (theme: Theme, duration: number): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
  "& .MuiDrawer-paper": {
    ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
    border: "none",
  },
}));

function SideBar() {
  const { isOpen, onClose, onOpen } = useSideBarHook();
  const location = useLocation();

  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logoRedirectUrl = basicUserInfo?.group === "CLIENT" ? "/aulas" : "/dashboard";

  if(location.pathname === "/venda"){
    return null
  }

  return (
    <Drawer
      sx={{
        textAlign: "center",
        overflow: "hidden",
      }}
      variant={"permanent"}
      open={isOpen}
      onClose={onClose}
    >
      <Link to={logoRedirectUrl}>
        {isOpen ? <LogoSidebarMax /> : <LogoSidebarMin />}
      </Link>


      <SideBarBody>
        <IconList $isOpen={isOpen}>
          <SideBarItem
            icon={PersonIcon}
            link="/clientes"
            label="Clientes"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={GroupIcon}
            link="/colaboradores"
            label="Colaboradores"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={ShareIcon}
            link="/indicacoes"
            label="Indicações"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={InventoryIcon}
            link="/fornecedores"
            label="Fornecedores"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={CategoryIcon}
            link="/categorias"
            label="Categorias"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={LabelIcon}
            link="/marcas"
            label="Marcas"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={CollectionsBookmarkIcon}
            link="/colecoes"
            label="Coleções"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={SellIcon}
            link="/produtos"
            label="Produtos"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
          <SideBarItem
            icon={ShoppingBasketIcon}
            link="/venda"
            label="Caixa"
            notAcceptGroup="CLIENT"
            acepptRoles={[
              "ROLE_SELLER",
              "ROLE_INDICATIONS",
              "ROLE_COURSES",
              "ROLE_ADMIN",
            ]}
          />
        </IconList>

        {/* toggle do side bar */}
      </SideBarBody>
      {!isMobile && (
        <SideBarToggle onClick={isOpen ? onClose : onOpen}>
          {isOpen ? (
            <IconWrapper className="icon">
              <ChevronLeftIcon color="primary" sx={{ border: "2px solid" }} className="icon" />
            </IconWrapper>
          ) : (
            <IconWrapper className="icon">
              <ChevronRightIcon color="primary" sx={{ border: "2px solid" }} className="icon" />
            </IconWrapper>
          )}
        </SideBarToggle>
      )}
    </Drawer>
  );
}

export default SideBar;
