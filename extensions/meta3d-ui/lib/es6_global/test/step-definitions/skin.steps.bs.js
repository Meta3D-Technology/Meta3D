

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JestCucumber from "jest-cucumber";
import * as MainTool$Meta3dUi from "../tool/MainTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";

var feature = JestCucumber.loadFeature("./test/features/skin.feature");

JestCucumber.defineFeature(feature, (function (test) {
        return test("register skin", (function (param) {
                      var state = {
                        contents: 1
                      };
                      var skinName = "s1";
                      Curry._2(param.when, "register a skin", (function (param) {
                              state.contents = MainTool$Meta3dUi.registerSkin(skinName, 5, undefined, undefined);
                              
                            }));
                      return Curry._2(param.then, "get skin should return it", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect(MainTool$Meta3dUi.getSkinExn(state.contents, skinName)), MainTool$Meta3dUi.buildSkinContribute(skinName, 5));
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
