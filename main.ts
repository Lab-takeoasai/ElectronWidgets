/// <reference path="./typings/main.d.ts"/>
/// <reference path="./typings/main/ambient/github-electron/github-electron.d.ts"/>

import Electron = require("electron");

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
        this.mainWindow = new Electron.BrowserWindow({
            width: 800,
            height: 400,
            minWidth: 500,
            minHeight: 200,
            acceptFirstMouse: true,
            titleBarStyle: "hidden"
        });

        // this.mainWindow.loadURL('file://' + __dirname + '/index.html');
        this.mainWindow.loadURL("http://google.com/");

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
    }
}

const myapp = new MyApplication(Electron.app);
