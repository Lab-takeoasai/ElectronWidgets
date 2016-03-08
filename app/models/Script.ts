/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./ScriptServer.ts"/>
import Electron = require("electron");
import angular = require("angular");
import Server = require("../models/ScriptServer");

// Script is called by Browser
class Script {
  _name: string;
  _command: string;
  _interval: number;
  constructor(name, command, interval) {
    this._name = name;
    this._command = command;
    this._interval = interval;
  }
  exec() {
    let app = angular.module(this._name, []);
    let script = new Server(this._command);
    app.controller("body", ["$scope", "$interval", ($scope, $interval) => {
      $interval(() => {
        $scope.stdout = script.exec();
      }, this._interval);
    }]);
  }
}
