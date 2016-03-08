/// <reference path="../../typings/main.d.ts"/>
import Electron = require("electron");

const execSync = require("child_process").execSync;


export class ScriptServer {
  _name: string;
  _command: string;
  _interval: number;
  constructor(name: string, command: string, interval: number) {
    this._name = name;
    this._command = command;
    this._interval = interval;
  }
  exec() {
    return execSync(this._command);
  }

}
