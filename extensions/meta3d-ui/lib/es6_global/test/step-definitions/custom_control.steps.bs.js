

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";

var feature = JestCucumber.loadFeature("./test/features/custom_control.feature");

JestCucumber.defineFeature(feature, (function (test) {
        return test("register custom control", (function (param) {
                      var state = {
                        contents: 1
                      };
                      var uiControlName = "c1";
                      Curry._2(param.when, "register a custom control", (function (param) {
                              state.contents = MainTool$Meta3dUi.registerUIControl(uiControlName, 5, undefined, undefined);
                              
                            }));
                      return Curry._2(param.then, "get custom control should return it", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getUIControlExn(state.contents, uiControlName)), 5);
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
