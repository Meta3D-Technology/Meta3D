

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as APITool$Meta3d from "../tool/APITool.bs.js";
import * as StateTool$Meta3d from "../tool/StateTool.bs.js";
import * as ContributeTool$Meta3d from "../tool/ContributeTool.bs.js";
import * as Expect$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Expect.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var feature = JestCucumber.loadFeature("./test/features/contribute.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var _buildEmptyMapData = function (param) {
          return [
                  ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                  ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                ];
        };
        test("get all contributes by type", (function (param) {
                var state = {
                  contents: 1
                };
                Curry._2(param.given, "register action, component, element, ui control, gameObject, workPlugin contributes", (function (param) {
                        state.contents = StateTool$Meta3d.create(undefined);
                        var partial_arg = {
                          actionName: "a1",
                          handler: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "a1", (function (param, param$1) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg, param, param$1);
                              }), _buildEmptyMapData(undefined));
                        var partial_arg$1 = {
                          componentName: "c1",
                          createComponentFunc: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "c1", (function (param, param$1) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$1, param, param$1);
                              }), _buildEmptyMapData(undefined));
                        var partial_arg$2 = {
                          elementName: "e1",
                          execOrder: 0
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "e1", (function (param, param$1) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$2, param, param$1);
                              }), _buildEmptyMapData(undefined));
                        var partial_arg$3 = {
                          createGameObjectFunc: 1,
                          getAllGameObjectsFunc: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "g1", (function (param, param$1) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$3, param, param$1);
                              }), _buildEmptyMapData(undefined));
                        var partial_arg$4 = {
                          uiControlName: "u1",
                          func: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "u1", (function (param, param$1) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$4, param, param$1);
                              }), _buildEmptyMapData(undefined));
                        var partial_arg$5 = {
                          workPluginName: "w1",
                          allPipelineData: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "w1", (function (param, param$1) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$5, param, param$1);
                              }), _buildEmptyMapData(undefined));
                        
                      }));
                Curry._2(param.when, "get all contributes by each type by api", (function (param) {
                        
                      }));
                return Curry._2(param.then, "get them", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Action */3)),
                                              JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Component */4)),
                                              JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Element */2)),
                                              JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* GameObject */5)),
                                              JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* UIControl */0)),
                                              JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* WorkPlugin */6))
                                            ]), [
                                          "[{\"actionName\":\"a1\",\"handler\":1}]",
                                          "[{\"componentName\":\"c1\",\"createComponentFunc\":1}]",
                                          "[{\"elementName\":\"e1\",\"execOrder\":0}]",
                                          "[{\"createGameObjectFunc\":1,\"getAllGameObjectsFunc\":1}]",
                                          "[{\"uiControlName\":\"u1\",\"func\":1}]",
                                          "[{\"workPluginName\":\"w1\",\"allPipelineData\":1}]"
                                        ]);
                            }));
              }));
        return test("if register contribute with unknown type, error", (function (param) {
                      var state = {
                        contents: 1
                      };
                      Curry._2(param.when, "register unknown type contribute", (function (param) {
                              
                            }));
                      return Curry._2(param.then, "error", (function (param) {
                                    return Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                                    state.contents = StateTool$Meta3d.create(undefined);
                                                    var partial_arg = {
                                                      a1: "a1"
                                                    };
                                                    state.contents = Main$Meta3d.registerContribute(state.contents, "a1", (function (param, param$1) {
                                                            return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg, param, param$1);
                                                          }), _buildEmptyMapData(undefined));
                                                    
                                                  }), "unknown contribute type");
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
