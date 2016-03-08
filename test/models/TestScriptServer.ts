/// <reference path="../../app/models/ScriptServer.ts"/>
/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts"/>


import sc = require("../../app/models/ScriptServer");

describe("Script は, ", () => {
    beforeEach(() => {
    });

    it("echo $((1+1))に2を返す", () => {
        let result = new sc("echo $((1+1))").exec();
        console.log(result);
        expect(result).toBe(2);
    });

    it("pwd に実行パスを返す", () => {
        let result = new sc("pwd").exec();
        console.log(result);
        expect(result).toBe(2);
    });

});
