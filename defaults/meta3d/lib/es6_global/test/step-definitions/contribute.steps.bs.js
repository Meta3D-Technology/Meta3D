

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as APITool$Meta3d from "../tool/APITool.bs.js";
import * as StateTool$Meta3d from "../tool/StateTool.bs.js";
import * as ContributeTool$Meta3d from "../tool/ContributeTool.bs.js";
import * as Expect$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Expect.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";

var feature = JestCucumber.loadFeature("./test/features/contribute.feature");

function _buildAction(actionName) {
  return {
          actionName: actionName,
          handler: 1
        };
}

JestCucumber.defineFeature(feature, (function (test) {
        test("get all contributes by type", (function (param) {
                var state = {
                  contents: 1
                };
                Curry._2(param.given, "register action, component, element, ui control, skin, gameObject, pipeline contributes", (function (param) {
                        state.contents = StateTool$Meta3d.create(undefined);
                        var partial_arg = {
                          actionName: "a1",
                          handler: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "a1-protocol", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg, param);
                              }));
                        var partial_arg$1 = {
                          componentName: "c1",
                          createComponentFunc: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "c1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$1, param);
                              }));
                        var partial_arg$2 = {
                          elementName: "e1",
                          execOrder: 0
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "e1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$2, param);
                              }));
                        var partial_arg$3 = {
                          createGameObjectFunc: 1,
                          getAllGameObjectsFunc: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "g1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$3, param);
                              }));
                        var partial_arg$4 = {
                          uiControlName: "u1",
                          func: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "u1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$4, param);
                              }));
                        var partial_arg$5 = {
                          skinName: "s1",
                          skin: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "s1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$5, param);
                              }));
                        var partial_arg$6 = {
                          pipelineName: "w1",
                          allPipelineData: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "w1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg$6, param);
                              }));
                      }));
                Curry._2(param.when, "get all contributes by each type by api", (function (param) {
                        
                      }));
                Curry._2(param.then, "get them", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Action */3)),
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Component */4)),
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Element */2)),
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* GameObject */5)),
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* UIControl */0)),
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Skin */1)),
                                  JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Pipeline */6))
                                ]), [
                              "[{\"actionName\":\"a1\",\"handler\":1}]",
                              "[{\"componentName\":\"c1\",\"createComponentFunc\":1}]",
                              "[{\"elementName\":\"e1\",\"execOrder\":0}]",
                              "[{\"createGameObjectFunc\":1,\"getAllGameObjectsFunc\":1}]",
                              "[{\"uiControlName\":\"u1\",\"func\":1}]",
                              "[{\"skinName\":\"s1\",\"skin\":1}]",
                              "[{\"pipelineName\":\"w1\",\"allPipelineData\":1}]"
                            ]);
                      }));
              }));
        test("register contribute with unknown type", (function (param) {
                var state = {
                  contents: 1
                };
                Curry._2(param.when, "register unknown type contribute", (function (param) {
                        state.contents = StateTool$Meta3d.create(undefined);
                        var partial_arg = {
                          a1: "a1"
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, "a1", (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg, param);
                              }));
                      }));
                Curry._2(param.and, "get all contributes by input type by api", (function (param) {
                        
                      }));
                Curry._2(param.then, "get empty", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(JSON.stringify(APITool$Meta3d.buildAPI(undefined).getAllContributesByType(state.contents, /* Input */7))), "[]");
                      }));
              }));
        test("register contribute which is not input and already registered before", (function (param) {
                var state = {
                  contents: 1
                };
                var protocolName = "p1";
                Curry._2(param.given, "register contribute of protocol name p1", (function (param) {
                        state.contents = StateTool$Meta3d.create(undefined);
                        state.contents = Main$Meta3d.registerContribute(state.contents, protocolName, (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(1, param);
                              }));
                      }));
                Curry._2(param.when, "register contribute of protocol name p1", (function (param) {
                        
                      }));
                Curry._2(param.then, "error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                  state.contents = Main$Meta3d.registerContribute(state.contents, protocolName, (function (param) {
                                          return ContributeTool$Meta3d.buildGetContributeFunc(1, param);
                                        }));
                                }), "already register extension or contribute of protocol: " + protocolName + "");
                      }));
              }));
        test("register contribute which is input and already registered before", (function (param) {
                var state = {
                  contents: 1
                };
                var protocolName = "p1";
                Curry._2(param.given, "register input a1 of protocol name p1", (function (param) {
                        state.contents = StateTool$Meta3d.create(undefined);
                        var partial_arg = {
                          inputName: "a1",
                          func: 1
                        };
                        state.contents = Main$Meta3d.registerContribute(state.contents, protocolName, (function (param) {
                                return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg, param);
                              }));
                      }));
                Curry._2(param.when, "register input a2 of protocol name p1", (function (param) {
                        
                      }));
                Curry._2(param.then, "not error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toNotThrow(expect(function (param) {
                                  var partial_arg = {
                                    inputName: "a2",
                                    func: 1
                                  };
                                  state.contents = Main$Meta3d.registerContribute(state.contents, protocolName, (function (param) {
                                          return ContributeTool$Meta3d.buildGetContributeFunc(partial_arg, param);
                                        }));
                                }));
                      }));
              }));
      }));

export {
  feature ,
  _buildAction ,
}
/* feature Not a pure module */
