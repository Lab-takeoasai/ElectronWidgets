/// <reference path="./typings/main.d.ts"/>
/// <reference path="./app/models/WindowManager.ts"/>


import Electron = require("electron");
import wm = require("./app/models/WindowManager");

class MyApplication {
    mainWindow: Electron.BrowserWindow = null;

    constructor(public app: Electron.App) {
      this.app.on("window-all-closed", this.onWindowAllClosed);
      this.app.on("ready", this.onReady);
    }

    onWindowAllClosed() {
      if (process.platform !== "darwin") {
        this.app.quit();
      }
    }

    onReady() {
        wm.WindowManager.restoreWindows();
    }
}

const myapp = new MyApplication(Electron.app);
