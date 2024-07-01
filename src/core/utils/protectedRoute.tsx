import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/reduxHooks";
import SideBar from "../../app/components/sideBar/sideBar";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Navbar from "../../app/components/navbar/navbar";
import theme from "../../theme";
import { ITeste, fetchUserName, logout } from "../../core/redux/slices/authSlice";
import DefaultDialog from "../../app/components/defaultDialog/defaultDialog";
import useExpiredLoginHook from "../../core/hooks/expiredLogin/expiredLoginHook";
import Footer from "../../app/components/footer/Footer";

const AppContainer = styled(Box)`
  flex: 1;
  display: flex;
  overflow-x: hidden;
`;

const Content = styled(Box)`
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  background: ${theme.palette.secondary.dark};
`;

const ProtectedRoute = () => {
  // const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const { isOpen, onClose, onOpen } = useExpiredLoginHook();

  // if (!basicUserInfo?.name) {
  //   let teste: ITeste = {
  //     id: basicUserInfo?.id || 0,
  //     type: basicUserInfo?.group || "",
  //   };
  //   dispatch(fetchUserName(teste));
  // }

  if (localStorage.getItem("userInfo") === null) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <AppContainer>
      <SideBar />
      <Content>
        <Navbar />
        <Outlet />
        <Footer />
      </Content>

      <DefaultDialog
        title="Sessão expirada"
        isOpen={isOpen}
        confirmAction={() => dispatch(logout())}
        onCloseAction={onClose}
        body={<Typography textAlign={"center"}>deslogar?</Typography>}
      />

    </AppContainer>
  );
};

export default ProtectedRoute;
