

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";
import * as Sinon$1 from "sinon";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImguiRendererServiceTool$Meta3dUi from "../tool/ImguiRendererServiceTool.bs.js";

var feature = JestCucumber.loadFeature("./test/features/context.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var sandbox = {
          contents: 1
        };
        test("get context", (function (param) {
                var and = param.and;
                var context = {
                  contents: 1
                };
                var result = {
                  contents: 1
                };
                var imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName";
                var imguiRendererService = {
                  contents: 1
                };
                var getContextStub = {
                  contents: 1
                };
                var getExtensionServiceStub = {
                  contents: 1
                };
                Curry._2(param.given, "prepare sandbox", (function (param) {
                        sandbox.contents = Sinon$1.sandbox.create();
                      }));
                Curry._2(and, "prepare imgui renderer service", (function (param) {
                        context.contents = {
                          a: 1
                        };
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getContextStub.contents = Sinon.returns(context.contents, __x);
                        imguiRendererService.contents = ImguiRendererServiceTool$Meta3dUi.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, getContextStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "prepare api", (function (param) {
                        var __x = Sinon.createEmptyStub(sandbox.contents);
                        getExtensionServiceStub.contents = Sinon.returns(imguiRendererService.contents, __x);
                      }));
                Curry._2(param.when, "get context", (function (param) {
                        result.contents = MainTool$Meta3dUi.getContext(sandbox, getExtensionServiceStub.contents, undefined, undefined, undefined, undefined, undefined, undefined, imguiRendererExtensionProtocolName, 22, undefined);
                      }));
                Curry._2(param.then, "return context", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  result.contents,
                                  Sinon.getCallCount(Sinon.withTwoArgs(22, imguiRendererExtensionProtocolName, getExtensionServiceStub.contents)),
                                  Sinon.getCallCount(getContextStub.contents)
                                ]), [
                              context.contents,
                              1,
                              1
                            ]);
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */
