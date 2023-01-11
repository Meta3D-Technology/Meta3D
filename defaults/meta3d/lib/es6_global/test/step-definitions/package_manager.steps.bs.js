

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_promise from "../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as PackageManagerTool$Meta3d from "../tool/PackageManagerTool.bs.js";
import * as Expect$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Expect.bs.js";
import * as ExtensionManagerTool$Meta3d from "../tool/ExtensionManagerTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as CucumberAsync$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/CucumberAsync.bs.js";

var feature = JestCucumber.loadFeature("./test/features/package_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var firstExtension = {
          contents: 1
        };
        var secondExtension = {
          contents: 1
        };
        var c1 = {
          contents: 1
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare", (function (param) {
                        FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                        return FileTool$Meta3d.buildFakeTextEncoder();
                      }));
        };
        test("not check dependent data", (function (param) {
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
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "1.0.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                      }));
                Curry._2(param.and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        secondExtensionFileData.contents = Main$Meta3d.loadExtension(secondExtension.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "not error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toNotThrow(expect(function (param) {
                                  return Main$Meta3d.convertAllFileDataForPackage([
                                              firstExtensionFileData.contents,
                                              secondExtensionFileData.contents
                                            ], [], []);
                                }));
                      }));
              }));
        test("convert allExtensionFileData and allContributeFileData and empty allPackageEntryExtensionProtocolData", (function (param) {
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
                var entryExtensionName = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate two extensions that the seond is entry", (function (param) {
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
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.6.2"
                                  })
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                        entryExtensionName.contents = "second-extension";
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
                            }, PackageManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        secondExtensionFileData.contents = Main$Meta3d.loadExtension(secondExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "converted package data is correct", (function (param) {
                        var match = Main$Meta3d.convertAllFileDataForPackage([
                              firstExtensionFileData.contents,
                              secondExtensionFileData.contents
                            ], [firstContributeFileData.contents], [entryExtensionName.contents]);
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ArraySt$Meta3dCommonlib.map(match[0], Tuple2$Meta3dCommonlib.getFirst),
                                  ArraySt$Meta3dCommonlib.map(match[1], Tuple2$Meta3dCommonlib.getFirst)
                                ]), [
                              [
                                {
                                  name: "first-extension",
                                  protocolName: "first-extension-protocol",
                                  type_: /* Default */0,
                                  dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", "second-extension-protocol"),
                                  dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", "first-contribute-protocol")
                                },
                                {
                                  name: "second-extension",
                                  protocolName: "second-extension-protocol",
                                  type_: /* Entry */2,
                                  dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                  dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", "first-contribute-protocol")
                                }
                              ],
                              [{
                                  name: "first-contribute",
                                  protocolName: "first-contribute-protocol",
                                  dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                  dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                }]
                            ]);
                      }));
              }));
        test("load generated package", (function (param) {
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
                var entryExtensions = {
                  contents: 1
                };
                var entryExtensionProtocolName = {
                  contents: 1
                };
                var state = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate two extensions", (function (param) {
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
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
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
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
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
                            }, PackageManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "mark the second extension as entry", (function (param) {
                        entryExtensions.contents = ["second-extension"];
                      }));
                Curry._2(and, "load them and convert as c1", (function (param) {
                        var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                        var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                        var firstContributeFileData = Main$Meta3d.loadContribute(firstContribute.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForPackage([
                              firstExtensionFileData,
                              secondExtensionFileData
                            ], [firstContributeFileData], entryExtensions.contents);
                      }));
                Curry._2(param.when, "generate package with c1 and load it", (function (param) {
                        var match = Main$Meta3d.loadPackage(Main$Meta3d.generatePackage(c1.contents, []));
                        entryExtensionProtocolName.contents = match[2];
                        state.contents = match[0];
                      }));
                Curry._2(param.then, "the two extensions should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "first-extension-protocol"),
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "second-extension-protocol")
                                ]), [
                              true,
                              true
                            ]);
                      }));
                Curry._2(and, "the one contribute should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(ExtensionManagerTool$Meta3d.hasContribute(state.contents, "first-contribute-protocol")), true);
                      }));
                Curry._2(and, "load result should has entry extension name", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(entryExtensionProtocolName.contents), "second-extension-protocol");
                      }));
              }));
        test("load generated package which contains other packages", (function (param) {
                var and = param.and;
                var given = param.given;
                var e1 = {
                  contents: 1
                };
                var e2 = {
                  contents: 1
                };
                var e3 = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var c1 = {
                  contents: 1
                };
                var c2 = {
                  contents: 1
                };
                var entryExtensions = {
                  contents: 1
                };
                var entryExtensionProtocolName = {
                  contents: 1
                };
                var p1 = {
                  contents: 1
                };
                var state = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one extension as e1", (function (param) {
                        e1.contents = Main$Meta3d.generateExtension({
                              name: "e1",
                              protocol: {
                                name: "e1-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                      }));
                Curry._2(and, "mark e1 as entry", (function (param) {
                        entryExtensions.contents = ["e1"];
                      }));
                Curry._2(and, "load e1 and convert as c1", (function (param) {
                        var e1FileData = Main$Meta3d.loadExtension(e1.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForPackage([e1FileData], [], entryExtensions.contents);
                      }));
                Curry._2(and, "generate package p1 with c1", (function (param) {
                        p1.contents = Main$Meta3d.generatePackage(c1.contents, []);
                      }));
                Curry._2(and, "generate two extensions", (function (param) {
                        e2.contents = Main$Meta3d.generateExtension({
                              name: "e2",
                              protocol: {
                                name: "e2-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "e3", {
                                    protocolName: "e3-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                        e3.contents = Main$Meta3d.generateExtension({
                              name: "e3",
                              protocol: {
                                name: "e3-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
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
                            }, PackageManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "mark the second extension(e3) as entry", (function (param) {
                        entryExtensions.contents = ["e3"];
                      }));
                Curry._2(and, "load them and convert as c2", (function (param) {
                        var e2FileData = Main$Meta3d.loadExtension(e2.contents);
                        var e3FileData = Main$Meta3d.loadExtension(e3.contents);
                        var firstContributeFileData = Main$Meta3d.loadContribute(firstContribute.contents);
                        c2.contents = Main$Meta3d.convertAllFileDataForPackage([
                              e2FileData,
                              e3FileData
                            ], [firstContributeFileData], entryExtensions.contents);
                      }));
                Curry._2(param.when, "generate package p2 with c2, p1 and load it", (function (param) {
                        var match = Main$Meta3d.loadPackage(Main$Meta3d.generatePackage(c2.contents, [p1.contents]));
                        entryExtensionProtocolName.contents = match[2];
                        state.contents = match[0];
                      }));
                Curry._2(param.then, "the three extensions should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "e1-protocol"),
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "e2-protocol"),
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "e3-protocol")
                                ]), [
                              true,
                              true,
                              true
                            ]);
                      }));
                Curry._2(and, "the one contribute should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(ExtensionManagerTool$Meta3d.hasContribute(state.contents, "first-contribute-protocol")), true);
                      }));
                Curry._2(and, "load result should has entry extension name of e3", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(entryExtensionProtocolName.contents), "e3-protocol");
                      }));
              }));
        var _prepareForLoadAndHandleGeneratedPackage = function (given, and, param) {
          var buildEmptyExtensionFileStrWithLifeHandleForExtension2 = param[2];
          var buildEmptyExtensionFileStrWithLifeHandleForExtension1 = param[1];
          var prepareFlag = param[0];
          var entryExtensionName = {
            contents: 1
          };
          Curry._2(given, "prepare flag", (function (param) {
                  Curry._1(prepareFlag, undefined);
                }));
          Curry._2(given, "generate two extensions", (function (param) {
                  firstExtension.contents = Main$Meta3d.generateExtension({
                        name: "first-extension",
                        protocol: {
                          name: "first-extension-protocol",
                          version: "0.4.1"
                        },
                        dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                        dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                      }, Curry._1(buildEmptyExtensionFileStrWithLifeHandleForExtension1, undefined));
                  secondExtension.contents = Main$Meta3d.generateExtension({
                        name: "second-extension",
                        protocol: {
                          name: "second-extension-protocol",
                          version: "0.5.2"
                        },
                        dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                        dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                      }, Curry._1(buildEmptyExtensionFileStrWithLifeHandleForExtension2, undefined));
                }));
          Curry._2(and, "mark the second extension as entry", (function (param) {
                  entryExtensionName.contents = "second-extension";
                }));
          Curry._2(and, "load them and convert as c1", (function (param) {
                  var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                  var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                  c1.contents = Main$Meta3d.convertAllFileDataForPackage([
                        firstExtensionFileData,
                        secondExtensionFileData
                      ], [], [entryExtensionName.contents]);
                }));
        };
        test("load and init generated package", (function (param) {
                var given = param.given;
                var state = {
                  contents: 1
                };
                _prepare(given);
                _prepareForLoadAndHandleGeneratedPackage(given, param.and, [
                      PackageManagerTool$Meta3d.prepareInitFlag,
                      (function (param) {
                          return PackageManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnInit(1);
                        }),
                      (function (param) {
                          return PackageManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnInit(2);
                        })
                    ]);
                CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "generate package with c1 and load it and init the entry extension", (function (param) {
                        var match = Main$Meta3d.loadPackage(Main$Meta3d.generatePackage(c1.contents, []));
                        var s = match[0];
                        state.contents = s;
                        var __x = Main$Meta3d.initExtension(s, match[2], 10);
                        return Js_promise.then_((function (s) {
                                      state.contents = s;
                                      return Promise.resolve(undefined);
                                    }), __x);
                      }));
                Curry._2(param.then, "the second extension should be inited", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(PackageManagerTool$Meta3d.getInitFlag(undefined)), 12);
                      }));
              }));
        test("load and invoke generated package's entry extension's service", (function (param) {
                var given = param.given;
                var state = {
                  contents: 1
                };
                _prepare(given);
                _prepareForLoadAndHandleGeneratedPackage(given, param.and, [
                      PackageManagerTool$Meta3d.prepareFlagForSevice,
                      (function (param) {
                          return PackageManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined);
                        }),
                      (function (param) {
                          return PackageManagerTool$Meta3d.buildEmptyExtensionFileStrWithService(undefined);
                        })
                    ]);
                Curry._2(param.when, "generate package with c1 and load it and invoke the entry extension's service", (function (param) {
                        var match = Main$Meta3d.loadPackage(Main$Meta3d.generatePackage(c1.contents, []));
                        var s = match[0];
                        state.contents = s;
                        Curry._1(Main$Meta3d.getExtensionService(s, match[2]).func1, 9);
                      }));
                Curry._2(param.then, "the second extension's service should be invoked", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(PackageManagerTool$Meta3d.getServiceFlag(undefined)), 9);
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */
