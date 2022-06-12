

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";
import * as ExpectTool$Meta3d from "../tool/ExpectTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var feature = JestCucumber.loadFeature("./test/features/extension_file_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var fileData = {
          contents: 1
        };
        return test("load generated extension", (function (param) {
                      Curry._2(param.given, "prepare", (function (param) {
                              FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                              return FileTool$Meta3d.buildFakeTextEncoder();
                            }));
                      Curry._2(param.when, "generate extension and load it", (function (param) {
                              var file = Main$Meta3d.generateExtension({
                                    name: "meta3d-app",
                                    protocol: {
                                      name: "meta3d-app-protocol",
                                      version: "0.3.0"
                                    },
                                    dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                    dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                  }, "\n        (()=>{\"use strict\";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},t={};e.r(t),e.d(t,{createExtensionState:()=>r,getExtensionLife:()=>a,getExtensionService:()=>n,getName:()=>o});let o=()=>\"meta3d-app\",n=(e,[{meta3dTest1ExtensionName:t},o])=>({run:o=>{let n=e.getExtensionState(o,t),{log:r,registerInfo:a}=e.getExtensionService(o,t);return n=a(n,o),r(n),e.setExtensionState(o,t,n)}}),r=()=>null,a=(e,t)=>({onRegister:(e,t)=>(console.log(\"meta3d-app onRegister\"),e),onStart:(e,t)=>(console.log(\"meta3d-app onStart\"),t.run(e))});window.Extension=t})();\n        ");
                              fileData.contents = Main$Meta3d.loadExtension(file);
                              
                            }));
                      Curry._2(param.then, "get package data", (function (param) {
                              return Operators$Meta3dBsJestCucumber.$eq(expect(fileData.contents.extensionPackageData), {
                                          name: "meta3d-app",
                                          protocol: {
                                            name: "meta3d-app-protocol",
                                            version: "0.3.0"
                                          },
                                          dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                          dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                        });
                            }));
                      return Curry._2(param.and, "get func data", (function (param) {
                                    return Operators$Meta3dBsJestCucumber.$eq(expect([
                                                    ExpectTool$Meta3d.isFunction(fileData.contents.extensionFuncData.getExtensionServiceFunc),
                                                    ExpectTool$Meta3d.isFunction(fileData.contents.extensionFuncData.createExtensionStateFunc),
                                                    ExpectTool$Meta3d.isFunction(fileData.contents.extensionFuncData.getExtensionLifeFunc)
                                                  ]), [
                                                true,
                                                true,
                                                true
                                              ]);
                                  }));
                    }));
      }));

export {
  feature ,
  
}
/* feature Not a pure module */
