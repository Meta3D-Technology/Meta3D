'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Main$Meta3d = require("meta3d/lib/js/src/Main.bs.js");
var Meta3d_jest = require("meta3d-bs-jest/lib/js/src/meta3d_jest.bs.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var TestTool$Meta3dEvent = require("../../tool/event_manager/TestTool.bs.js");
var ManageEventAPI$Meta3dEvent = require("../../tool/api/ManageEventAPI.bs.js");
var CustomEventTool$Meta3dEvent = require("../../tool/event_manager/CustomEventTool.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("../../tool/api/EventExtensionTool.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");
var ManageEventAPIForSrc$Meta3dEvent = require("../../../src/event_manager/api/ManageEventAPIForSrc.bs.js");

Meta3d_jest.describe("ManageEventAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(undefined);
        beforeEach(function () {
              sandbox.contents = Sinon$1.sandbox.create();
              return TestTool$Meta3dEvent.prepareState(undefined);
            });
        afterEach(function () {
              return Sinon.restoreSandbox(sandbox.contents);
            });
        Meta3d_jest.describe("test stopPropagation", (function (param) {
                Meta3d_jest.describe("test custom global event", (function (param) {
                        Meta3d_jest.test("if stopPropagation, less priority handleFunc shouldn't be executed", (function (param) {
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
                Meta3d_jest.describe("test custom global event2", (function (param) {
                        var _buildAPI = function (param) {
                          var init = Main$Meta3d.buildAPI(undefined);
                          return {
                                  registerExtension: init.registerExtension,
                                  getExtensionService: init.getExtensionService,
                                  getExtensionState: (function (meta3dState, extensionProtocolName) {
                                      return {
                                              actionContributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                              eventManagerState: ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined))
                                            };
                                    }),
                                  setExtensionState: (function (meta3dState, extensionProtocolName, extensionState) {
                                      return meta3dState;
                                    }),
                                  getPackageService: init.getPackageService,
                                  registerContribute: init.registerContribute,
                                  getContribute: init.getContribute,
                                  getAllContributesByType: init.getAllContributesByType,
                                  getPackage: init.getPackage,
                                  restore: init.restore,
                                  deepCopy: init.deepCopy,
                                  nullable: init.nullable,
                                  immutable: init.immutable,
                                  action: init.action,
                                  uiControl: init.uiControl,
                                  backend: init.backend,
                                  message: init.message
                                };
                        };
                        Meta3d_jest.test("test", (function (param) {
                                var value = {
                                  contents: 2
                                };
                                var eventExtensionProtocolName = "eventExtensionProtocolName";
                                var eventName = "e1";
                                var meta3dState = ManageEventAPIForSrc$Meta3dEvent.onCustomGlobalEvent2(_buildAPI(undefined), 11, eventExtensionProtocolName, [
                                      eventName,
                                      1,
                                      (function (meta3dState, $$event) {
                                          value.contents = value.contents - 3 | 0;
                                          return meta3dState;
                                        })
                                    ]);
                                ManageEventAPIForSrc$Meta3dEvent.triggerCustomGlobalEvent2(_buildAPI(undefined), meta3dState, eventExtensionProtocolName, ManageEventAPIForSrc$Meta3dEvent.createCustomEvent(eventName, Js_null_undefined.fromOption(undefined)));
                                return Curry._2(Meta3d_jest.Expect.Operators.$eq, Meta3d_jest.Expect.expect(value.contents), -1);
                              }));
                      }));
              }));
      }));

/*  Not a pure module */
