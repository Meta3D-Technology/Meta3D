'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var SinonTool$Meta3dUi = require("../tool/SinonTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImguiRendererServiceTool$Meta3dUi = require("../tool/ImguiRendererServiceTool.bs.js");

var feature = JestCucumber.loadFeature("./test/features/begin_window.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        test("invoke imgui renderer's beginWindow", (function (param) {
                var and = param.and;
                var given = param.given;
                var newMeta3dState = {
                  contents: 12
                };
                var imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName";
                var label = {
                  contents: 1
                };
                var imguiRendererService = {
                  contents: 1
                };
                var beginWindowStub = {
                  contents: 1
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                var getExtensionStateStub = {
                  contents: 1
                };
                var setExtensionStateStub = {
                  contents: 1
                };
                Curry._2(given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
                Curry._2(and, "prepare imgui renderer service", (function (param) {
                        beginWindowStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, beginWindowStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                        getExtensionStateStub.contents = Sinon.returns(12, Sinon.createEmptyStub(sandbox.contents));
                        setExtensionStateStub.contents = Sinon.returns(23, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(given, "prepare data", (function (param) {
                        label.contents = "Window";
                      }));
                Curry._2(param.when, "beginWindow", (function (param) {
                        newMeta3dState.contents = MainTool$Meta3dUi.beginWindow(sandbox, label.contents, getExtensionServiceStub.contents, undefined, Caml_option.some(getExtensionStateStub.contents), Caml_option.some(setExtensionStateStub.contents), undefined, undefined, undefined, imguiRendererExtensionProtocolName, 22, undefined);
                      }));
                Curry._2(param.then, "invoke imgui renderer's beginWindow", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionStateStub.contents)),
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionServiceStub.contents)),
                                  SinonTool$Meta3dUi.calledWith(Sinon.getCall(0, beginWindowStub.contents), label.contents)
                                ]), [
                              1,
                              1,
                              true
                            ]);
                      }));
                Curry._2(and, "update imgui renderer state", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  SinonTool$Meta3dUi.calledWithArg3(Sinon.getCall(0, setExtensionStateStub.contents), 22, imguiRendererExtensionProtocolName, 12),
                                  newMeta3dState.contents
                                ]), [
                              true,
                              23
                            ]);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */
