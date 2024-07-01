import { app, BrowserWindow } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();

  // Configuração da Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self' 'unsafe-inline' data:;",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
            "font-src 'self' data: https://fonts.gstatic.com;",
            "connect-src 'self' https://api.lbs-new.bitbeelabs.tech;",
          ].join(" "),
        },
      });
    }
  );
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
