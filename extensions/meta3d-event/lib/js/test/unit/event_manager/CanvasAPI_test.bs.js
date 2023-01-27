'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Meta3d_jest = require("meta3d-bs-jest/lib/js/src/meta3d_jest.bs.js");
var TestTool$Meta3dEvent = require("../../tool/event_manager/TestTool.bs.js");
var CanvasAPI$Meta3dEvent = require("../../tool/api/CanvasAPI.bs.js");
var CanvasDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/CanvasDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("../../tool/api/EventExtensionTool.bs.js");

Meta3d_jest.describe("CanvasAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(undefined);
        beforeEach(function () {
              sandbox.contents = Sinon$1.sandbox.create();
              return TestTool$Meta3dEvent.prepareState(undefined);
            });
        afterEach(function () {
              return Sinon.restoreSandbox(sandbox.contents);
            });
        Meta3d_jest.describe("setCanvas", (function (param) {
                Meta3d_jest.test("set canvas", (function (param) {
                        CanvasAPI$Meta3dEvent.setCanvas(2);
                        return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(CanvasDoService$Meta3dEvent.getCanvas(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)))), 2);
                      }));
              }));
      }));

/*  Not a pure module */
