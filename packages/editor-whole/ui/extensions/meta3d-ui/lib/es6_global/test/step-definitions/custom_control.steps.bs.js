

import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var feature = JestCucumber.loadFeature("./test/features/custom_control.feature");

JestCucumber.defineFeature(feature, (function (test) {
        test("register custom control", (function (param) {
                var state = {
                  contents: 1
                };
                var uiControlName = "c1";
                Curry._2(param.when, "register a custom control", (function (param) {
                        state.contents = MainTool$Meta3dUi.registerUIControl(uiControlName, 5, undefined, undefined, undefined);
                      }));
                Curry._2(param.then, "get custom control func should return it's func", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getUIControlFuncExn(state.contents, uiControlName)), 5);
                      }));
              }));
        test("get custom control's state", (function (param) {
                var when = param.when;
                var state = {
                  contents: 1
                };
                var uiControlName = "c1";
                var c1State = ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "a", 1);
                Curry._2(when, "set custom control's state to s1", (function (param) {
                        state.contents = MainTool$Meta3dUi.createState(undefined);
                        state.contents = MainTool$Meta3dUi.setUIControlState(state.contents, uiControlName, c1State);
                      }));
                Curry._2(when, "get custom control's state", (function (param) {
                        
                      }));
                Curry._2(param.then, "return s1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getUIControlState(state.contents, uiControlName)), NullableSt$Meta3dCommonlib.$$return(c1State));
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */
