/// <reference path="../../typings/main.d.ts"/>

import Electron = require("electron");
// import storage = require("electron-json-storage");

// singleton class
export class WindowManager {

  private static _windowManager: WindowManager = null;
  public static getManager() {
    if (!this._windowManager) {
      this._windowManager = new WindowManager();
    }
    return this._windowManager;
  }
  constructor() {
    if (WindowManager._windowManager) {
      throw new Error("must use the getManager().");
    }
  }

  private _windows: {[key: string]: Electron.BrowserWindow} = {};
  public create(name: string) {
    let window = this.createWindow({}, true);
    // this.mainWindow.loadURL('file://' + __dirname + '/index.html');
    // window.loadURL("http://google.com/");
    this._windows[name] = window;

    window.on("close", () => {
      this._windows[name] = null;
      window = null;
    });
  }

  getWindowNames(): string[] {
    let names: string[] = [];
    for (let n in this._windows) {
      names.push(n);
    }
    return names;
  }
  getWindow(name: string): Electron.BrowserWindow {
    return this._windows[name];
  }
  getWindows(): Electron.BrowserWindow[] {
    let windows: Electron.BrowserWindow[] = [];
    for (let name in this.getWindowNames()) {
      windows.push(this.getWindow[name]);
    }
    return windows;
  }

  closeWindowName(name: string) {
    this.getWindow(name).close();
  }


  private createWindow(config: {[key: string]: string}, visible: boolean): Electron.BrowserWindow {
    let window = new Electron.BrowserWindow( {
      x: +config["x"] || 200,
      y: +config["y"] || 200,
      width: +config["width"] || 200,
      height: +config["height"] || 200,
      minWidth: 50,
      minHeight: 50,
      acceptFirstMouse: true,
      transparent: !visible,
      frame: visible,
      type: visible ? "textured" : "desktop", // type desktop can not be movable
      titleBarStyle: "hidden"
    } );
    return window;
  }
}
