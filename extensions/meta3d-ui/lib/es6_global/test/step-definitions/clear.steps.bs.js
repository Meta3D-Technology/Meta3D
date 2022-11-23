

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as SinonTool$Meta3dUi from "../tool/SinonTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImguiRendererServiceTool$Meta3dUi from "../tool/ImguiRendererServiceTool.bs.js";

var feature = JestCucumber.loadFeature("./test/features/clear.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        test("clear imgui renderer", (function (param) {
                var and = param.and;
                var newMeta3dState = {
                  contents: 12
                };
                var imguiRendererExtensionName = "imguiRendererExtensionName";
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
                        clearStub.contents = Sinon.returns(13, Sinon.createEmptyStub(sandbox.contents));
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, clearStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                        getExtensionStateStub.contents = Sinon.returns(12, Sinon.createEmptyStub(sandbox.contents));
                      }));
                Curry._2(param.when, "clear", (function (param) {
                        newMeta3dState.contents = MainTool$Meta3dUi.clear(sandbox, clearColor, getExtensionServiceStub.contents, undefined, Caml_option.some(getExtensionStateStub.contents), undefined, imguiRendererExtensionName, 22, undefined);
                      }));
                Curry._2(param.then, "clear imgui renderer", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionName, getExtensionStateStub.contents)),
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionName, getExtensionServiceStub.contents)),
                                  SinonTool$Meta3dUi.calledWithArg2(Sinon.getCall(0, clearStub.contents), 12, clearColor)
                                ]), [
                              1,
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
