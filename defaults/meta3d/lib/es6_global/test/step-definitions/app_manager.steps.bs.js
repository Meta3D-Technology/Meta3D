

import * as Curry from "./../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";

var feature = JestCucumber.loadFeature("./test/features/app_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        return test("load generated app", (function (param) {
                      var and = param.and;
                      Curry._2(param.given, "prepare", (function (param) {
                              FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                              return FileTool$Meta3d.buildFakeTextEncoder();
                            }));
                      Curry._2(and, "generate two extensions that the seond is started", (function (param) {
                              
                            }));
                      Curry._2(and, "generate one contribute", (function (param) {
                              
                            }));
                      Curry._2(and, "load them", (function (param) {
                              
                            }));
                      Curry._2(param.when, "generate app with them", (function (param) {
                              
                            }));
                      Curry._2(and, "load app", (function (param) {
                              
                            }));
                      Curry._2(param.then, "the two extensions should be registered", (function (param) {
                              
                            }));
                      Curry._2(and, "the one contribute should be registered", (function (param) {
                              
                            }));
                      return Curry._2(and, "the second extension should be started", (function (param) {
                                    
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
