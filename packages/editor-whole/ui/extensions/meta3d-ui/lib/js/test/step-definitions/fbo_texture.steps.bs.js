'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var JestCucumber = require("jest-cucumber");
var MainTool$Meta3dUi = require("../tool/MainTool.bs.js");
var SinonTool$Meta3dUi = require("../tool/SinonTool.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var ImguiRendererServiceTool$Meta3dUi = require("../tool/ImguiRendererServiceTool.bs.js");

var feature = JestCucumber.loadFeature("./test/features/fbo_texture.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        test("get fbo texture", (function (param) {
                var state = {
                  contents: 1
                };
                var textureID = "t1";
                var result = {
                  contents: 1
                };
                Curry._2(param.given, "set a fbo texture to t1", (function (param) {
                        state.contents = MainTool$Meta3dUi.setFBOTexture(textureID, 5, undefined, undefined);
                      }));
                Curry._2(param.when, "get fbo texture", (function (param) {
                        result.contents = MainTool$Meta3dUi.getFBOTexture(textureID, state.contents, undefined);
                      }));
                Curry._2(param.then, "return t1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(result.contents), NullableSt$Meta3dCommonlib.$$return(5));
                      }));
              }));
        test("add fbo texture", (function (param) {
                var and = param.and;
                var texture = {
                  contents: 1
                };
                var rect = {
                  x: 1,
                  y: 2,
                  width: 10,
                  height: 20
                };
                var result = {
                  contents: 1
                };
                var imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName";
                var imguiRendererService = {
                  contents: 1
                };
                var addFBOTextureStub = {
                  contents: 1
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                Curry._2(param.given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
                Curry._2(and, "prepare imgui renderer service", (function (param) {
                        addFBOTextureStub.contents = Sinon.createEmptyStub(sandbox.contents);
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, addFBOTextureStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                      }));
                Curry._2(and, "prepare fbo texture", (function (param) {
                        texture.contents = {
                          a: 1
                        };
                      }));
                Curry._2(param.when, "add fbo texture", (function (param) {
                        result.contents = MainTool$Meta3dUi.addFBOTexture(sandbox, getExtensionServiceStub.contents, texture.contents, rect, undefined, undefined, undefined, undefined, undefined, undefined, undefined, imguiRendererExtensionProtocolName, 22, undefined);
                      }));
                Curry._2(param.then, "invoke imgui renderer's addFBOTexture", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionServiceStub.contents)),
                                  SinonTool$Meta3dUi.calledWithArg2(Sinon.getCall(0, addFBOTextureStub.contents), texture.contents, rect)
                                ]), [
                              1,
                              true
                            ]);
                      }));
              }));
      }));

exports.feature = feature;
/* feature Not a pure module */
