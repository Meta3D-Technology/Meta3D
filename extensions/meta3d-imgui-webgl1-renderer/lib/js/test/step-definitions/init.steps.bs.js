'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Sinon$1 = require("sinon");
var JestCucumber = require("jest-cucumber");
var Operators$Meta3dBsJestCucumber = require("meta3d-bs-jest-cucumber/lib/js/src/Operators.bs.js");
var MainTool$Meta3dImguiWebgl1Renderer = require("../tool/MainTool.bs.js");
var SinonTool$Meta3dImguiWebgl1Renderer = require("../tool/SinonTool.bs.js");
var WebGL1ServiceTool$Meta3dImguiWebgl1Renderer = require("../tool/WebGL1ServiceTool.bs.js");

var feature = JestCucumber.loadFeature("./test/features/init.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var state = {
          contents: 1
        };
        return test("get webgl1 context", (function (param) {
                      var getContextStub = {
                        contents: 1
                      };
                      Curry._2(param.given, "prepare sandbox", (function (param) {
                              sandbox.contents = Sinon$1.sandbox.create();
                              
                            }));
                      Curry._2(param.when, "init", (function (param) {
                              getContextStub.contents = Sinon.returns(2, Sinon.createEmptyStub(sandbox.contents));
                              state.contents = MainTool$Meta3dImguiWebgl1Renderer.init(sandbox, WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, getContextStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), undefined, false, 10, undefined);
                              
                            }));
                      return Curry._2(param.then, "get webgl context with config", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect([
                                                    state.contents.gl,
                                                    SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg2(Sinon.getCall(0, getContextStub.contents), 10, {
                                                          alpha: true,
                                                          depth: true,
                                                          stencil: false,
                                                          antialias: true,
                                                          premultipliedAlpha: true,
                                                          preserveDrawingBuffer: false
                                                        })
                                                  ]), [
                                                2,
                                                true
                                              ]);
                                  }));
                    }));
      }));

exports.feature = feature;
/* feature Not a pure module */
