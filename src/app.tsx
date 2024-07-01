import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "@mui/material";
import FullScreenContainer from "../src/app/components/layout/layout";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PositivoTheme from "./theme";
import Router from "./router";
import store, { persistor } from "./core/redux/store";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();

const root = createRoot(document.body);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={PositivoTheme}>
      <QueryClientProvider client={query}>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <ToastContainer />
            <HashRouter>
              <FullScreenContainer>
                <Router />
              </FullScreenContainer>
            </HashRouter>
          </Provider>
        </PersistGate>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
