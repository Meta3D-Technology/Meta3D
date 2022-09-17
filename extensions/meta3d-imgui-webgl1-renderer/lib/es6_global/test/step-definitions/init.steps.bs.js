

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as JestCucumber from "jest-cucumber";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as MainTool$Meta3dImguiWebgl1Renderer from "../tool/MainTool.bs.js";
import * as SinonTool$Meta3dImguiWebgl1Renderer from "../tool/SinonTool.bs.js";
import * as WebGL1ServiceTool$Meta3dImguiWebgl1Renderer from "../tool/WebGL1ServiceTool.bs.js";

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

export {
  feature ,
  
}
/* feature Not a pure module */
