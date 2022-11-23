'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Meta3d_jest = require("meta3d-bs-jest/lib/js/src/meta3d_jest.bs.js");
var TestTool$Meta3dEvent = require("../../tool/event_manager/TestTool.bs.js");
var ManageEventAPI$Meta3dEvent = require("../../tool/api/ManageEventAPI.bs.js");
var CustomEventTool$Meta3dEvent = require("../../tool/event_manager/CustomEventTool.bs.js");

Meta3d_jest.describe("ManageEventAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(undefined);
        beforeEach(function () {
              sandbox.contents = Sinon$1.sandbox.create();
              return TestTool$Meta3dEvent.prepareState(undefined);
            });
        afterEach(function () {
              return Sinon.restoreSandbox(sandbox.contents);
            });
        return Meta3d_jest.describe("test stopPropagation", (function (param) {
                      return Meta3d_jest.describe("test custom global event", (function (param) {
                                    return Meta3d_jest.test("if stopPropagation, less priority handleFunc shouldn't be executed", (function (param) {
                                                  var value = {
                                                    contents: 2
                                                  };
                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 1, (function ($$event, state) {
                                                          value.contents = value.contents - 3 | 0;
                                                          return [
                                                                  state,
                                                                  ManageEventAPI$Meta3dEvent.stopPropagationCustomEvent($$event)
                                                                ];
                                                        }));
                                                  ManageEventAPI$Meta3dEvent.onCustomGlobalEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), 0, (function ($$event, state) {
                                                          value.contents = (value.contents << 1);
                                                          return [
                                                                  state,
                                                                  $$event
                                                                ];
                                                        }));
                                                  ManageEventAPI$Meta3dEvent.triggerCustomGlobalEvent(CustomEventTool$Meta3dEvent.createCustomEvent(CustomEventTool$Meta3dEvent.getPointDownEventName(undefined), undefined, undefined));
                                                  return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), -1);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
