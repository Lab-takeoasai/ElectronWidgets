/// <reference path="../../typings/main.d.ts" />

import Electron = require("electron");
const path = require("path");

class Link {

  // create symbolic
  static createSymbolicToNode(name: string) {
    //  let userPath = __dirname + "/../../node_modules/app/models/ScriptServer.js";
    // let execPath = __dirname + "/../../app/models/ScriptServer.js";
    let userPath = __dirname + "/../../node_modules/app";
    let execPath = __dirname + "/../../app";
    let fs = require("fs");
    if (!fs.existsSync(userPath)) {
      fs.symlink(execPath, userPath, (err) => {
        console.log(err || "Done.");
      });
    }
  }

  // create symbolic link to Script.js to angular & command line tools
  static createScriptPath() {
    let userPath = Electron.app.getPath("userData") + "/Script.js";
    // let execPath = __dirname + "/../../build/app.js";
    let execPath = __dirname + "/Script.js";

    let fs = require("fs");
    if (!fs.existsSync(userPath)) {
      fs.symlink(execPath, userPath, (err) => {
        console.log(err || "Done.");
      });
    }
  }
  static copyHTML(name: string) {
    let userPath = Electron.app.getPath("userData") + "/Script.js";
    let execPath = Electron.app.getPath("module") + "/copy.html";

  }
}
export = Link;
