

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as JestCucumber from "jest-cucumber";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as MainTool$Meta3dImguiWebgl1Renderer from "../tool/MainTool.bs.js";
import * as SinonTool$Meta3dImguiWebgl1Renderer from "../tool/SinonTool.bs.js";
import * as WebGL1ServiceTool$Meta3dImguiWebgl1Renderer from "../tool/WebGL1ServiceTool.bs.js";

var feature = JestCucumber.loadFeature("./test/features/clear.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        var state = {
          contents: 1
        };
        var webgl1Service = {
          contents: 1
        };
        return test("clear", (function (param) {
                      var and = param.and;
                      var clearColorStub = {
                        contents: 1
                      };
                      var clearStub = {
                        contents: 1
                      };
                      var getColorBufferBitStub = {
                        contents: 1
                      };
                      var getDepthBufferBitStub = {
                        contents: 1
                      };
                      var getStencilBufferBitStub = {
                        contents: 1
                      };
                      Curry._2(param.given, "prepare sandbox", (function (param) {
                              sandbox.contents = Sinon$1.sandbox.create();
                              
                            }));
                      Curry._2(and, "prepare webgl1 service", (function (param) {
                              clearColorStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              clearStub.contents = Sinon.createEmptyStub(sandbox.contents);
                              getColorBufferBitStub.contents = Sinon.returns(1, Sinon.createEmptyStub(sandbox.contents));
                              getDepthBufferBitStub.contents = Sinon.returns(2, Sinon.createEmptyStub(sandbox.contents));
                              getStencilBufferBitStub.contents = Sinon.returns(3, Sinon.createEmptyStub(sandbox.contents));
                              webgl1Service.contents = WebGL1ServiceTool$Meta3dImguiWebgl1Renderer.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, clearColorStub.contents, clearStub.contents, getColorBufferBitStub.contents, getDepthBufferBitStub.contents, getStencilBufferBitStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                              
                            }));
                      Curry._2(and, "prepare webgl context", (function (param) {
                              var init = MainTool$Meta3dImguiWebgl1Renderer.createState(undefined);
                              state.contents = {
                                isDebug: init.isDebug,
                                drawData: init.drawData,
                                gl: 2,
                                noTextureShaderData: init.noTextureShaderData,
                                lastWebglData: init.lastWebglData
                              };
                              
                            }));
                      Curry._2(param.when, "clear", (function (param) {
                              return MainTool$Meta3dImguiWebgl1Renderer.clear(sandbox, [
                                          1,
                                          0.1,
                                          0.2,
                                          0.3
                                        ], webgl1Service.contents, state.contents, undefined);
                            }));
                      Curry._2(param.then, "clear color", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect(SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg5(clearColorStub.contents, 1, 0.1, 0.2, 0.3, 2)), true);
                            }));
                      return Curry._2(and, "clear", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(SinonTool$Meta3dImguiWebgl1Renderer.calledWithArg2(clearStub.contents, 3, 2)), true);
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
