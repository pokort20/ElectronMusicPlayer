import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    title: "AvaloniaPlayer",
    minWidth: 1200,
    minHeight: 600,
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5247/");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
