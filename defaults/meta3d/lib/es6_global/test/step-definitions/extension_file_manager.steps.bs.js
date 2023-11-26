

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";
import * as ExpectTool$Meta3d from "../tool/ExpectTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ExtensionFileManagerTool$Meta3d from "../tool/ExtensionFileManagerTool.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var feature = JestCucumber.loadFeature("./test/features/extension_file_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        test("load generated extension", (function (param) {
                var fileData = {
                  contents: 1
                };
                Curry._2(param.given, "prepare", (function (param) {
                        FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                        FileTool$Meta3d.buildFakeTextEncoder();
                      }));
                Curry._2(param.when, "generate extension and load it", (function (param) {
                        var file = ExtensionFileManagerTool$Meta3d.generateExtension("meta3d-app", {
                              name: "meta3d-app-protocol",
                              version: "0.4.1"
                            }, "0.0.1", "meta3d", "d1", "l1", "dp1", " (()=>{\"use strict\";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>\"meta3d-app\",n=(e,[{meta3dTest1ExtensionProtocolName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log(\"meta3d-app onRegister\"),e),onStart:(e,t)=>(console.log(\"meta3d-app onStart\"),t.run(e))});window.Extension=t})(); ", undefined, Caml_option.some(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)), undefined);
                        fileData.contents = Main$Meta3d.loadExtension(file);
                      }));
                Curry._2(param.then, "get package data", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(fileData.contents.extensionPackageData), {
                              name: "meta3d-app",
                              version: "0.0.1",
                              account: "meta3d",
                              protocol: {
                                name: "meta3d-app-protocol",
                                version: "0.4.1"
                              },
                              displayName: "d1",
                              repoLink: "l1",
                              description: "dp1",
                              dependentPackageStoredInAppProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentBlockProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            });
                      }));
                Curry._2(param.and, "get func data", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(ExpectTool$Meta3d.isUint8Array(fileData.contents.extensionFuncData)), true);
                      }));
              }));
        test("load generated contribute", (function (param) {
                var fileData = {
                  contents: 1
                };
                Curry._2(param.given, "prepare", (function (param) {
                        FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                        FileTool$Meta3d.buildFakeTextEncoder();
                      }));
                Curry._2(param.when, "generate contribute and load it", (function (param) {
                        var file = ExtensionFileManagerTool$Meta3d.generateContribute("meta3d-contribute-test1", {
                              name: "meta3d-contribute-test1-protocol",
                              version: "0.4.1"
                            }, "0.0.1", "meta3d", "d1", "l1", "dp1", " (()=>{\"use strict\";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},t={};e.r(t),e.d(t,{getContribute:()=>r,getName:()=>o});let o=()=>\"meta3d-contribute-test1\",r=(e,t)=>({getInfo:()=>(console.log(e,t),\"contribute_test1_info\")});window.Contribute=t})(); ", undefined, Caml_option.some(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)), undefined);
                        fileData.contents = Main$Meta3d.loadContribute(file);
                      }));
                Curry._2(param.then, "get package data", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(fileData.contents.contributePackageData), {
                              name: "meta3d-contribute-test1",
                              version: "0.0.1",
                              account: "meta3d",
                              protocol: {
                                name: "meta3d-contribute-test1-protocol",
                                version: "0.4.1"
                              },
                              displayName: "d1",
                              repoLink: "l1",
                              description: "dp1",
                              dependentPackageStoredInAppProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentBlockProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            });
                      }));
                Curry._2(param.and, "get func data", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(ExpectTool$Meta3d.isUint8Array(fileData.contents.contributeFuncData)), true);
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */
