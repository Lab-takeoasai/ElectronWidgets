import Electron = require("electron");

const execSync = require("child_process").execSync;

// does commands only
class ScriptServer {
  _command: string;
  constructor(command: string) {
    this._command = command;
  }
  exec() {
    return execSync(this._command, {encoding: "utf8"});
  }
}
export = ScriptServer;
