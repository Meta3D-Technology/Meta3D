

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as StateTool$Meta3d from "../tool/StateTool.bs.js";
import * as ExtensionTool$Meta3d from "../tool/ExtensionTool.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";

var feature = JestCucumber.loadFeature("./test/features/redo_undo.feature");

JestCucumber.defineFeature(feature, (function (test) {
        test("restore state", (function (param) {
                var and = param.and;
                var extensionProtocolName = "e1-protocol";
                var s1 = {
                  contents: 1
                };
                var s2 = {
                  contents: 1
                };
                var state = {
                  contents: 1
                };
                Curry._2(param.given, "create state s1", (function (param) {
                        s1.contents = StateTool$Meta3d.create(undefined);
                      }));
                Curry._2(and, "register extension e1 with s1 that e1's state is es1", (function (param) {
                        var partial_arg = Caml_option.some(NullableSt$Meta3dCommonlib.$$return(function (extensionState) {
                                  return {
                                          data1: ArraySt$Meta3dCommonlib.copy(extensionState.data1)
                                        };
                                }));
                        var partial_arg$1 = Caml_option.some(NullableSt$Meta3dCommonlib.$$return(function (currentExtensionState, targetExtensionState) {
                                  return targetExtensionState;
                                }));
                        s1.contents = Main$Meta3d.registerExtension(s1.contents, extensionProtocolName, (function (param) {
                                return ExtensionTool$Meta3d.buildGetServiceFunc(1, param);
                              }), (function (param, param$1) {
                                return ExtensionTool$Meta3d.buildGetLifeFunc(undefined, undefined, undefined, undefined, partial_arg$1, partial_arg, undefined, param, param$1);
                              }), {
                              data1: []
                            });
                      }));
                Curry._2(and, "deep copy s1 as s2", (function (param) {
                        s2.contents = Main$Meta3d.deepCopy(s1.contents);
                      }));
                Curry._2(and, "change e1's state to es2 with s2", (function (param) {
                        var es1 = Main$Meta3d.getExtensionState(s2.contents, extensionProtocolName);
                        ArraySt$Meta3dCommonlib.push(es1.data1, 1);
                        s2.contents = Main$Meta3d.setExtensionState(s2.contents, extensionProtocolName, es1);
                      }));
                Curry._2(param.when, "restore s2 to s1", (function (param) {
                        state.contents = Main$Meta3d.restore(s2.contents, s1.contents);
                      }));
                Curry._2(param.then, "e1's state should be es1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(Main$Meta3d.getExtensionState(state.contents, extensionProtocolName).data1), []);
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */
