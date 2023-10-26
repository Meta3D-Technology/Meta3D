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

var feature = JestCucumber.loadFeature("./test/features/clear.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        test("clear imgui renderer", (function (param) {
                var and = param.and;
                var imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName";
                var clearColor = [
                  1,
                  0.1,
                  0.2,
                  0.3
                ];
                var imguiRendererService = {
                  contents: 1
                };
                var clearStub = {
                  contents: 1
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                var getExtensionStateStub = {
                  contents: 1
                };
                Curry._2(param.given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
                Curry._2(and, "prepare imgui renderer service", (function (param) {
                        clearStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, clearStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                        getExtensionStateStub.contents = Sinon.returns(12, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(param.when, "clear", (function (param) {
                        MainTool$Meta3dUi.clear(sandbox, clearColor, getExtensionServiceStub.contents, undefined, Caml_option.some(getExtensionStateStub.contents), undefined, undefined, undefined, undefined, imguiRendererExtensionProtocolName, 22, undefined);
                      }));
                Curry._2(param.then, "clear imgui renderer", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionStateStub.contents)),
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionServiceStub.contents)),
                                  SinonTool$Meta3dUi.calledWith(Sinon.getCall(0, clearStub.contents), clearColor)
                                ]), [
                              1,
                              1,
                              true
                            ]);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */
