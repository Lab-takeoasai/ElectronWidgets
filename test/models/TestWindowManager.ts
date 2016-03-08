/// <reference path="../../app/models/WindowManager.ts"/>
/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts"/>

describe("WindowManager classは, ", () => {
    beforeEach(() => {
        this.windowManager = WindowManager.getManager();
    });

    it("常に同じsingleton", () => {
        let result = this.windowManager;
        expect(result).toBe(WindowManager.getManager());
    });
});
