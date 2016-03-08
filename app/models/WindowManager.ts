/// <reference path="../../typings/main.d.ts"/>
import Electron = require("electron");

const storage = require("electron-json-storage");
const glob = require("glob");
const path = require("path");

// singleton class
export class WindowManager {

  // class methods
  private static _windowManager: WindowManager = null;
  public static getManager() {
    if (!this._windowManager) {
      this._windowManager = new WindowManager();
    }
    return this._windowManager;
  }
  _visible: boolean;
  constructor() {
    if (WindowManager._windowManager) {
      throw new Error("must use the getManager().");
    }
    this._visible = true;
  }

  static getConfigureNames() {
    let matches = glob.sync(Electron.app.getPath("userData") + "/*.json");
    return matches.map(($0) => {
      return path.basename($0, ".json");
    });
  }
  restoreWindows() {
    let configNames = WindowManager.getConfigureNames();
    for (let name of configNames) {
      this.create(name);
    }
  }
  toggleVisible() {
    for (let name of this.getWindowNames()) {
      this.closeWindowName(name);
    }
    this._visible = !this._visible;
    this.restoreWindows();
  }

  private _windows: {[key: string]: Electron.BrowserWindow} = {};
  public create(name: string) {
    // storage must need callback
    storage.get(name, (error, config) => {
      if (error) throw error;

      let window = this.createWindow(config, this._visible);
      let htmlPath = path.normalize(Electron.app.getPath("userData") + "/index.html");
      // let htmlPath = path.normalize(__dirname + "/../views/index.html");
      window.loadURL("file://" + htmlPath);

      this._windows[name] = window;

      window.on("close", () => {
        let nConfig = window.getBounds();
        storage.set(name, nConfig, (error) => {
          if (error) throw error;
        });
        this._windows[name] = null;
        window = null;
      });

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

  // private methods
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
