

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as SinonTool$Meta3dUi from "../tool/SinonTool.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImguiRendererServiceTool$Meta3dUi from "../tool/ImguiRendererServiceTool.bs.js";

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
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, addFBOTextureStub.contents, undefined, undefined, undefined, undefined);
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
                        result.contents = MainTool$Meta3dUi.addFBOTexture(sandbox, getExtensionServiceStub.contents, texture.contents, rect, undefined, undefined, undefined, imguiRendererExtensionProtocolName, 22, undefined);
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

export {
  feature ,
}
/* feature Not a pure module */
