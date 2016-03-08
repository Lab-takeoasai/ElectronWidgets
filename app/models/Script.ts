/// <reference path="../../typings/main.d.ts"/>
/// <reference path="./ScriptServer.ts"/>
import Electron = require("electron");

//import server = require("./ScriptServer");
import angular = require("angular");

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
    //let script = new server.ScriptServer(this._name, this._command, this._interval);
  //  let script = new server.ScriptServer("1", "ls", 1000);
    app.controller("body", ["$scope", ($scope) => {
      $scope.stdout = "loading";
      /*$interval( () => {
        let result = script.exec();
        $scope.$apply(function () { // $apply is needed to be displayed ASAP (because of AJAX callback)
          $scope.stdout = result;
      }), this._interval; });*/
    }]);
  }


//
}
