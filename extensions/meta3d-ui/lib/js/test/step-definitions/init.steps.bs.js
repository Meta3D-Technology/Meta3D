'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var Js_promise = require("rescript/lib/js/js_promise.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var SinonTool$Meta3dUi = require("../tool/SinonTool.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImguiRendererServiceTool$Meta3dUi = require("../tool/ImguiRendererServiceTool.bs.js");
var CucumberAsync$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/CucumberAsync.bs.js");

var feature = JestCucumber.loadFeature("./test/features/init.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        test("init imgui renderer", (function (param) {
                var and = param.and;
                var newMeta3dState = {
                  contents: 12
                };
                var imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName";
                var imguiRendererService = {
                  contents: 1
                };
                var initStub = {
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
                Curry._2(param.given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
                Curry._2(and, "prepare imgui renderer service", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        initStub.contents = Sinon.returns(new Promise((function (resolve, reject) {
                                    resolve(13);
                                  })), __x);
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, initStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                        getExtensionStateStub.contents = Sinon.returns(12, Sinon.createEmptyStub(sandbox.contents));
                        setExtensionStateStub.contents = Sinon.returns(23, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(and, "prepare canvas", (function (param) {
                        
                      }));
                CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "init", (function (param) {
                        var __x = MainTool$Meta3dUi.init(sandbox, getExtensionServiceStub.contents, undefined, Caml_option.some(getExtensionStateStub.contents), Caml_option.some(setExtensionStateStub.contents), imguiRendererExtensionProtocolName, false, true, 22, 5, undefined);
                        return Js_promise.then_((function (meta3dState) {
                                      newMeta3dState.contents = meta3dState;
                                      return Promise.resolve(undefined);
                                    }), __x);
                      }));
                Curry._2(param.then, "init imgui renderer", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionStateStub.contents)),
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionServiceStub.contents)),
                                  SinonTool$Meta3dUi.calledWithArg4(Sinon.getCall(0, initStub.contents), 12, false, true, 5)
                                ]), [
                              1,
                              1,
                              true
                            ]);
                      }));
                Curry._2(and, "update imgui renderer state", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  SinonTool$Meta3dUi.calledWithArg3(Sinon.getCall(0, setExtensionStateStub.contents), 22, imguiRendererExtensionProtocolName, 13),
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
