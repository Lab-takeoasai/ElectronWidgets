/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./ScriptServer.ts"/>
import Electron = require("electron");

//import server = require("./ScriptServer");
import angular = require("angular");
import Server = require("../models/ScriptServer");

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
    let script = new Server(this._name, "ls", 1000);
    app.controller("body", ["$scope", "$interval", ($scope, $interval) => {
      $scope.stdout = script.exec();
      /*$interval( () => {
        let result = script.exec();
        $scope.$apply(function () { // $apply is needed to be displayed ASAP (because of AJAX callback)
          $scope.stdout = result;
      }), this._interval; });*/
    }]);
  }


//
}
