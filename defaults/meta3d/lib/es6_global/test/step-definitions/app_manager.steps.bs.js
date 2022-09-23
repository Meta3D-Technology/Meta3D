

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";
import * as AppManagerTool$Meta3d from "../tool/AppManagerTool.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Expect$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Expect.bs.js";
import * as ExtensionManagerTool$Meta3d from "../tool/ExtensionManagerTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var feature = JestCucumber.loadFeature("./test/features/app_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var _prepare = function (given) {
          return Curry._2(given, "prepare", (function (param) {
                        FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                        return FileTool$Meta3d.buildFakeTextEncoder();
                      }));
        };
        test("version not match case1", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var secondExtensionFileData = {
                  contents: 1
                };
                var allExtensionNewNames = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate two extensions that version not match", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", {
                                    protocolName: "second-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "1.0.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                        
                      }));
                Curry._2(and, "prepare new names", (function (param) {
                        allExtensionNewNames.contents = [
                          "first-extension",
                          "second-extension"
                        ];
                        
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        secondExtensionFileData.contents = Main$Meta3d.loadExtension(secondExtension.contents);
                        
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                return Curry._2(param.then, "error", (function (param) {
                              return Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                              return Main$Meta3d.convertAllFileDataForApp([
                                                          firstExtensionFileData.contents,
                                                          secondExtensionFileData.contents
                                                        ], [], [
                                                          allExtensionNewNames.contents,
                                                          [],
                                                          []
                                                        ]);
                                            }), "version not match");
                            }));
              }));
        test("version not match case2", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                var allExtensionNewNames = {
                  contents: 1
                };
                var allContributeNewNames = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one extension", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        
                      }));
                Curry._2(and, "generate one contribute that version not match", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: ">=0.1.0 < 0.5.0"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                        
                      }));
                Curry._2(and, "prepare new names", (function (param) {
                        allExtensionNewNames.contents = ["first-extension"];
                        allContributeNewNames.contents = ["first-contribute"];
                        
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                        
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                return Curry._2(param.then, "error", (function (param) {
                              return Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                              return Main$Meta3d.convertAllFileDataForApp([firstExtensionFileData.contents], [firstContributeFileData.contents], [
                                                          allExtensionNewNames.contents,
                                                          [],
                                                          allContributeNewNames.contents
                                                        ]);
                                            }), "version not match");
                            }));
              }));
        test("version match case1", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                var allExtensionNewNames = {
                  contents: 1
                };
                var allContributeNewNames = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one extension", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.3.0"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        
                      }));
                Curry._2(and, "generate one contribute that version match", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: "^0.3.0"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                        
                      }));
                Curry._2(and, "prepare new names", (function (param) {
                        allExtensionNewNames.contents = ["first-extension"];
                        allContributeNewNames.contents = ["first-contribute"];
                        
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                        
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                return Curry._2(param.then, "not error", (function (param) {
                              return Expect$Meta3dBsJestCucumber.toNotThrow(expect(function (param) {
                                              return Main$Meta3d.convertAllFileDataForApp([firstExtensionFileData.contents], [firstContributeFileData.contents], [
                                                          allExtensionNewNames.contents,
                                                          [],
                                                          allContributeNewNames.contents
                                                        ]);
                                            }));
                            }));
              }));
        test("convert allExtensionFileData and allContributeFileData", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var secondExtensionFileData = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                var allExtensionNewNames = {
                  contents: 1
                };
                var allContributeNewNames = {
                  contents: 1
                };
                var isStartedExtensions = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate two extensions that the seond is started", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", {
                                    protocolName: "second-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                        isStartedExtensions.contents = ["second-extension"];
                        
                      }));
                Curry._2(and, "generate one contribute", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: "0.5.3"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                        
                      }));
                Curry._2(and, "prepare new names", (function (param) {
                        allExtensionNewNames.contents = [
                          "first-new-extension",
                          "second-extension"
                        ];
                        allContributeNewNames.contents = ["first-new-contribute"];
                        
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        secondExtensionFileData.contents = Main$Meta3d.loadExtension(secondExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                        
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                return Curry._2(param.then, "converted package data is correct", (function (param) {
                              var match = Main$Meta3d.convertAllFileDataForApp([
                                    firstExtensionFileData.contents,
                                    secondExtensionFileData.contents
                                  ], [firstContributeFileData.contents], [
                                    allExtensionNewNames.contents,
                                    isStartedExtensions.contents,
                                    allContributeNewNames.contents
                                  ]);
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              ArraySt$Meta3dCommonlib.map(match[0], Tuple2$Meta3dCommonlib.getFirst),
                                              ArraySt$Meta3dCommonlib.map(match[1], Tuple2$Meta3dCommonlib.getFirst)
                                            ]), [
                                          [
                                            {
                                              name: "first-new-extension",
                                              isStart: false,
                                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", "second-extension"),
                                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", "first-new-contribute")
                                            },
                                            {
                                              name: "second-extension",
                                              isStart: true,
                                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", "first-new-contribute")
                                            }
                                          ],
                                          [{
                                              name: "first-new-contribute",
                                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                            }]
                                        ]);
                            }));
              }));
        test("load and start generated app", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var c1 = {
                  contents: 1
                };
                var allExtensionNewNames = {
                  contents: 1
                };
                var allContributeNewNames = {
                  contents: 1
                };
                var isStartedExtensions = {
                  contents: 1
                };
                var state = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "prepare flag", (function (param) {
                        return AppManagerTool$Meta3d.prepareFlag(undefined);
                      }));
                Curry._2(and, "generate two extensions", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", {
                                    protocolName: "second-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                        
                      }));
                Curry._2(and, "generate one contribute", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: "0.5.3"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                        
                      }));
                Curry._2(and, "prepare new names and start the second extension", (function (param) {
                        allExtensionNewNames.contents = [
                          "first-extension",
                          "second-new-extension"
                        ];
                        allContributeNewNames.contents = ["first-new-contribute"];
                        isStartedExtensions.contents = ["second-new-extension"];
                        
                      }));
                Curry._2(and, "load them and convert as c1", (function (param) {
                        var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                        var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                        var firstContributeFileData = Main$Meta3d.loadContribute(firstContribute.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForApp([
                              firstExtensionFileData,
                              secondExtensionFileData
                            ], [firstContributeFileData], [
                              allExtensionNewNames.contents,
                              isStartedExtensions.contents,
                              allContributeNewNames.contents
                            ]);
                        
                      }));
                Curry._2(param.when, "generate app with c1 and load it and start it", (function (param) {
                        var match = Main$Meta3d.loadApp(Main$Meta3d.generateApp(c1.contents));
                        var s = match[0];
                        state.contents = s;
                        return Main$Meta3d.startApp([
                                    s,
                                    match[1]
                                  ]);
                      }));
                Curry._2(param.then, "the two extensions should be registered", (function (param) {
                        return Operators$Meta3dBsJestCucumber.$eq(expect([
                                        ExtensionManagerTool$Meta3d.hasExtension(state.contents, "first-extension"),
                                        ExtensionManagerTool$Meta3d.hasExtension(state.contents, "second-new-extension")
                                      ]), [
                                    true,
                                    true
                                  ]);
                      }));
                Curry._2(and, "the one contribute should be registered", (function (param) {
                        return Operators$Meta3dBsJestCucumber.$eq(expect(ExtensionManagerTool$Meta3d.hasContribute(state.contents, "first-new-contribute")), true);
                      }));
                return Curry._2(and, "the second extension should be started", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect(AppManagerTool$Meta3d.getFlag(undefined)), 2);
                            }));
              }));
        return test("if two extension need start, error", (function (param) {
                      var and = param.and;
                      var given = param.given;
                      var firstExtension = {
                        contents: 1
                      };
                      var secondExtension = {
                        contents: 1
                      };
                      var c1 = {
                        contents: 1
                      };
                      var allExtensionNewNames = {
                        contents: 1
                      };
                      var isStartedExtensions = {
                        contents: 1
                      };
                      var loadData = {
                        contents: 1
                      };
                      _prepare(given);
                      Curry._2(given, "prepare flag", (function (param) {
                              return AppManagerTool$Meta3d.prepareFlag(undefined);
                            }));
                      Curry._2(and, "generate two extensions", (function (param) {
                              firstExtension.contents = Main$Meta3d.generateExtension({
                                    name: "first-extension",
                                    protocol: {
                                      name: "first-extension-protocol",
                                      version: "0.4.1"
                                    },
                                    dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                    dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                  }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                              secondExtension.contents = Main$Meta3d.generateExtension({
                                    name: "second-extension",
                                    protocol: {
                                      name: "second-extension-protocol",
                                      version: "0.5.2"
                                    },
                                    dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                    dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                  }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                              
                            }));
                      Curry._2(and, "start them", (function (param) {
                              allExtensionNewNames.contents = [
                                "first-extension",
                                "second-extension"
                              ];
                              isStartedExtensions.contents = [
                                "first-extension",
                                "second-extension"
                              ];
                              
                            }));
                      Curry._2(and, "load them and convert as c1", (function (param) {
                              var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                              var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                              c1.contents = Main$Meta3d.convertAllFileDataForApp([
                                    firstExtensionFileData,
                                    secondExtensionFileData
                                  ], [], [
                                    allExtensionNewNames.contents,
                                    isStartedExtensions.contents,
                                    []
                                  ]);
                              
                            }));
                      Curry._2(param.when, "generate app with c1 and load it", (function (param) {
                              loadData.contents = Main$Meta3d.loadApp(Main$Meta3d.generateApp(c1.contents));
                              
                            }));
                      return Curry._2(param.then, "start it should error", (function (param) {
                                    return Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                                    return Main$Meta3d.startApp(loadData.contents);
                                                  }), "should only has one start extension");
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
