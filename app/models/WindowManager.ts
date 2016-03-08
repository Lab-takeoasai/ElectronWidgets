/// <reference path="../../typings/main.d.ts"/>

// singleton
class WindowManager {

  private static _windowManager: WindowManager = null;
  static getManager() {
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

}
