/// <reference path="./typings/main.d.ts"/>
/// <reference path="./app/models/WindowManager.ts"/>
/// <reference path="./app/models/Link.ts"/>

import Electron = require("electron");
import wm = require("./app/models/WindowManager");
import Menubar = require("./app/models/Menubar");
import Link = require("./app/models/Link");

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
        wm.WindowManager.getManager().restoreWindows();
        Menubar.getMenubar();
        Link.createScriptPath();

        let x = Electron.app.getAppPath();
        console.log(x);
    }
}

const myapp = new MyApplication(Electron.app);
