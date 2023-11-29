

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";
import * as AppManagerTool$Meta3d from "../tool/AppManagerTool.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ExtensionManagerTool$Meta3d from "../tool/ExtensionManagerTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ExtensionFileManagerTool$Meta3d from "../tool/ExtensionFileManagerTool.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var feature = JestCucumber.loadFeature("./test/features/app_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var _prepare = function (given) {
          return Curry._2(given, "prepare", (function (param) {
                        FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                        return FileTool$Meta3d.buildFakeTextEncoder();
                      }));
        };
        test("convert allContributeFileData", (function (param) {
                var given = param.given;
                var firstContribute = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one contribute", (function (param) {
                        firstContribute.contents = ExtensionFileManagerTool$Meta3d.generateContribute("first-contribute", {
                              name: "first-contribute-protocol",
                              version: "^0.5.3"
                            }, "0.0.1", "meta3d", undefined, undefined, undefined, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined), undefined, Caml_option.some(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)), undefined);
                      }));
                Curry._2(param.and, "load them as l1", (function (param) {
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "converted package data is correct", (function (param) {
                        var allContributeFileData = Main$Meta3d.convertAllFileDataForApp([firstContributeFileData.contents]);
                        Operators$Meta3dBsJestCucumber.$eq(expect(ArraySt$Meta3dCommonlib.map(allContributeFileData, Tuple2$Meta3dCommonlib.getFirst)), [{
                                name: "first-contribute",
                                version: "0.0.1",
                                account: "meta3d",
                                protocol: {
                                  name: "first-contribute-protocol",
                                  version: "^0.5.3"
                                },
                                displayName: "",
                                repoLink: "",
                                description: "",
                                dependentPackageStoredInAppProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                dependentBlockProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                              }]);
                      }));
              }));
        test("load and start generated app", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstContribute = {
                  contents: 1
                };
                var e1 = {
                  contents: 1
                };
                var ct1 = {
                  contents: 1
                };
                var p1 = {
                  contents: 1
                };
                var c1 = {
                  contents: 1
                };
                var startPackageProtocolName = {
                  contents: 1
                };
                var configData = {
                  contents: 1
                };
                var configDataResult = {
                  contents: 1
                };
                var state = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "prepare flag", (function (param) {
                        return AppManagerTool$Meta3d.prepareStartFlag(undefined);
                      }));
                Curry._2(given, "generate one contribute", (function (param) {
                        firstContribute.contents = ExtensionFileManagerTool$Meta3d.generateContribute("first-contribute", {
                              name: "first-contribute-protocol",
                              version: "^0.5.3"
                            }, undefined, undefined, undefined, undefined, undefined, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined), undefined, Caml_option.some(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)), undefined);
                      }));
                Curry._2(given, "generate one package as p1 with one extension e1 and one contribute ct1", (function (param) {
                        e1.contents = ExtensionFileManagerTool$Meta3d.generateExtension("package-first-extension", {
                              name: "package-first-extension-protocol",
                              version: "^0.4.1"
                            }, undefined, undefined, undefined, undefined, undefined, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2), undefined, Caml_option.some(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)), undefined);
                        ct1.contents = ExtensionFileManagerTool$Meta3d.generateContribute("package-first-contribute", {
                              name: "package-first-contribute-protocol",
                              version: "^0.5.3"
                            }, undefined, undefined, undefined, undefined, undefined, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined), undefined, Caml_option.some(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)), undefined);
                        var extensionFileData = Main$Meta3d.loadExtension(e1.contents);
                        var contributeFileData = Main$Meta3d.loadContribute(ct1.contents);
                        p1.contents = Main$Meta3d.generatePackage(Main$Meta3d.convertAllFileDataForPackage([extensionFileData], [contributeFileData], ["package-first-extension"]), [], AppManagerTool$Meta3d.buildPackageData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                      }));
                Curry._2(and, "start p1", (function (param) {
                        startPackageProtocolName.contents = "package-first-extension-protocol";
                      }));
                Curry._2(and, "load them and convert as c1", (function (param) {
                        var firstContributeFileData = Main$Meta3d.loadContribute(firstContribute.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForApp([firstContributeFileData]);
                      }));
                Curry._2(and, "prepare config data", (function (param) {
                        configData.contents = [
                          {
                            width: 1,
                            height: 2
                          },
                          {
                            isDebug: true
                          }
                        ];
                      }));
                Curry._2(param.when, "generate app with c1, p1, config data and load it and start it", (function (param) {
                        var match = AppManagerTool$Meta3d.loadApp(undefined, Main$Meta3d.generateApp(c1.contents, [p1.contents], [], AppManagerTool$Meta3d.buildSelectedElements(undefined, undefined), AppManagerTool$Meta3d.buildCustomData(undefined, undefined, undefined), NullableSt$Meta3dCommonlib.$$return(configData.contents), startPackageProtocolName.contents), undefined);
                        var s = match[0];
                        configDataResult.contents = match[2];
                        state.contents = s;
                        Main$Meta3d.startApp([
                              s,
                              match[1],
                              configDataResult.contents
                            ]);
                      }));
                Curry._2(param.then, "e1, ct1 should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "package-first-extension-protocol"),
                                  ExtensionManagerTool$Meta3d.hasContribute(state.contents, "first-contribute-protocol")
                                ]), [
                              true,
                              true
                            ]);
                      }));
                Curry._2(and, "load result should has correct config data", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(configDataResult.contents), configData.contents);
                      }));
                Curry._2(and, "e1 should be started", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(AppManagerTool$Meta3d.getStartFlag(undefined)), 4);
                      }));
              }));
        test("load generated app with package store in app", (function (param) {
                var given = param.given;
                var state = {
                  contents: 1
                };
                var p1 = {
                  contents: 1
                };
                var p1ProtocolName = "p1-protocol";
                _prepare(given);
                Curry._2(given, "prepare flag", (function (param) {
                        return AppManagerTool$Meta3d.prepareStartFlag(undefined);
                      }));
                Curry._2(given, "generate empty package p1", (function (param) {
                        p1.contents = Main$Meta3d.generatePackage([
                              [],
                              []
                            ], [], AppManagerTool$Meta3d.buildPackageData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                      }));
                Curry._2(param.when, "generate app with p1 and load it", (function (param) {
                        var match = AppManagerTool$Meta3d.loadApp(undefined, Main$Meta3d.generateApp([], [], [[
                                    AppManagerTool$Meta3d.buildPackageData(p1ProtocolName, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
                                    p1.contents
                                  ]], AppManagerTool$Meta3d.buildSelectedElements(undefined, undefined), AppManagerTool$Meta3d.buildCustomData(undefined, undefined, undefined), null, ""), undefined);
                        state.contents = match[0];
                      }));
                Curry._2(param.then, "get pacakge of p1's protocol name should return p1", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(AppManagerTool$Meta3d.getPackage(state.contents, p1ProtocolName)), p1.contents);
                      }));
              }));
        test("get all data of app", (function (param) {
                var and = param.and;
                var given = param.given;
                var p1 = {
                  contents: 1
                };
                var p1ProtocolName = "p1-protocol";
                var c1 = {
                  contents: 1
                };
                var a1 = {
                  contents: 1
                };
                var selectedElements = {
                  contents: 1
                };
                var customData = {
                  contents: 1
                };
                var l1 = {
                  contents: 1
                };
                var result = {
                  contents: 1
                };
                var c1Name = "c1";
                _prepare(given);
                Curry._2(given, "generate one package as p1", (function (param) {
                        p1.contents = Main$Meta3d.generatePackage([
                              [],
                              []
                            ], [], AppManagerTool$Meta3d.buildPackageData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                      }));
                Curry._2(and, "generate one contribute as c1", (function (param) {
                        c1.contents = ExtensionFileManagerTool$Meta3d.generateContribute(c1Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
                      }));
                Curry._2(and, "load c1 and convert as l1", (function (param) {
                        l1.contents = Main$Meta3d.convertAllFileDataForApp([Main$Meta3d.loadContribute(c1.contents)]);
                      }));
                Curry._2(and, "generate app with p1, l1, selectedElements, custom data as a1", (function (param) {
                        selectedElements.contents = AppManagerTool$Meta3d.buildSelectedElements(2, undefined);
                        customData.contents = AppManagerTool$Meta3d.buildCustomData([2], undefined, undefined);
                        a1.contents = Main$Meta3d.generateApp(l1.contents, [], [[
                                AppManagerTool$Meta3d.buildPackageData(p1ProtocolName, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
                                p1.contents
                              ]], selectedElements.contents, customData.contents, null, "");
                      }));
                Curry._2(param.when, "get all data of a1", (function (param) {
                        result.contents = Main$Meta3d.getAllDataOfApp(a1.contents);
                      }));
                Curry._2(param.then, "should return parsed p1, parsed c1, selectedElements, custom data", (function (param) {
                        var match = result.contents;
                        var match$1 = match[0];
                        if (match$1.length === 1) {
                          var parsedP1 = match$1[0];
                          var match$2 = match[1];
                          if (match$2[0].length === 0) {
                            var match$3 = match$2[1];
                            if (match$3.length === 1) {
                              var parsedC1 = match$3[0];
                              return Operators$Meta3dBsJestCucumber.$eq(expect([
                                              parsedP1[0][0].name,
                                              parsedC1[0].name,
                                              match[3],
                                              match[4]
                                            ]), [
                                          p1ProtocolName,
                                          c1Name,
                                          selectedElements.contents,
                                          customData.contents
                                        ]);
                            }
                            
                          }
                          
                        }
                        throw {
                              RE_EXN_ID: "Match_failure",
                              _1: [
                                "app_manager.steps.res",
                                1515,
                                12
                              ],
                              Error: new Error()
                            };
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */
