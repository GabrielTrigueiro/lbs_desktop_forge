import {
  SvgIconTypeMap,
  ListItemButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useAppSelector } from "../../../core/hooks/reduxHooks";
import useSideBarHook from "../../../core/hooks/sideBarHook";
import { TRole, verifyRole } from "../../../core/utils/roles";
import { IconType } from "react-icons";
import { useResolvedPath, useMatch, Link } from "react-router-dom";
import theme from "../../../theme"
import COLORS from '../../../core/theme/theme'

type TSideBarItem = {
  icon: IconType | (OverridableComponent<SvgIconTypeMap> & { muiName: string });
  link: string;
  label: string;
  acepptRoles: TRole[];
  notAcceptGroup?: string;
};

function SideBarItem({
  icon: Icon,
  label,
  link,
  acepptRoles,
  notAcceptGroup,
}: TSideBarItem) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isOpen, onClose } = useSideBarHook();
  const resolvedPath = useResolvedPath(link);
  const match = useMatch({ path: resolvedPath.pathname, end: false });
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);

  if (
    !verifyRole(basicUserInfo?.roles, acepptRoles) ||
    basicUserInfo?.group === notAcceptGroup
  )
    return null;

  return (
    <Tooltip title={!isOpen ? label : ""} followCursor>
      <Link
        onClick={isMobile ? onClose : undefined}
        style={{ width: "100%", borderRadius: "10px" }}
        to={link}
      >
        <ListItemButton
          selected={!!match}
          sx={{
            "&.Mui-selected": {
              background: (theme) => theme.palette.primary.main,
              color: "#fff",
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "rgba(255, 255, 255, 0.5)",
              transition: "color 0.3s",
            },
            ":hover": {
              background: COLORS.COLORS.YELLOW,
              color: "#fff",
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
            },
            "&:hover, &.Mui-selected:hover": {
              background: COLORS.COLORS.YELLOW,
              color: "#fff",
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
            },
            "&:not(:hover):not(.Mui-selected) .MuiSvgIcon-root": {
              color: "#8c8c8c",
            },
            animation: "ease",
            transition: "all 0.3s ease",
            width: "100%",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            padding: "5%",
            ...(!isOpen && {
              height: 40,
              justifyContent: "center",
            }),
          }}
        >
          {!isOpen ? (
            <Icon />
          ) : (
            <>
              <Icon />
              {label}
            </>
          )}
        </ListItemButton>

      </Link>
    </Tooltip>
  );
}

export default SideBarItem;
