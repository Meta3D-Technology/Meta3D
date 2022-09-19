'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Meta3d_jest = require("meta3d-bs-jest/lib/js/src/meta3d_jest.bs.js");
var MainTool$Meta3dEvent = require("../../tool/event_manager/MainTool.bs.js");
var TestTool$Meta3dEvent = require("../../tool/event_manager/TestTool.bs.js");
var BrowserDoService$Meta3dEvent = require("../../../src/event_manager/service/browser/BrowserDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");

Meta3d_jest.describe("BrowserAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(undefined);
        beforeEach(function () {
              sandbox.contents = Sinon$1.sandbox.create();
              return TestTool$Meta3dEvent.prepareState(undefined);
            });
        afterEach(function () {
              return Sinon.restoreSandbox(sandbox.contents);
            });
        return Meta3d_jest.describe("setBrowser", (function (param) {
                      return Meta3d_jest.test("set browser", (function (param) {
                                    MainTool$Meta3dEvent.setBrowser(/* IOS */3);
                                    return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(BrowserDoService$Meta3dEvent.getBrowser(ContainerManager$Meta3dEvent.getState(undefined))), /* IOS */3);
                                  }));
                    }));
      }));

/*  Not a pure module */
