

import * as Most from "most";
import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Semver from "semver";
import * as Js_promise from "../../../../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../../../../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as IdUtils$Frontend from "./utils/IdUtils.bs.js";
import * as MostUtils$Frontend from "./MostUtils.bs.js";
import * as ElementUtils$Frontend from "./utils/ElementUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as ElementVisualUtils$Frontend from "../assemble_space/components/element_assemble/utils/ElementVisualUtils.bs.js";
import * as SelectedElementContributeUtils$Frontend from "./SelectedElementContributeUtils.bs.js";

function _convertAllPackageData(allPackageData) {
  return ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.map(allPackageData, (function (param) {
                    var match = param[0];
                    var entryExtensionProtocolConfigStr = match[4];
                    var tmp = entryExtensionProtocolConfigStr === "" ? undefined : entryExtensionProtocolConfigStr;
                    return {
                            id: IdUtils$Frontend.generateId(function (prim) {
                                  return Math.random();
                                }),
                            protocol: match[0],
                            entryExtensionName: match[1],
                            version: match[2],
                            name: match[3],
                            binaryFile: param[1],
                            isStart: false,
                            protocolConfigStr: tmp
                          };
                  })));
}

function _removeElementContributeFileData(allContributeFileData) {
  return ArraySt$Meta3dCommonlib.filter(allContributeFileData, (function (data) {
                return data[0].protocol.name !== ElementUtils$Frontend.getElementContributeProtocolName(undefined);
              }));
}

function _import(param, stream) {
  var match = param[1];
  var dispatchBatchStorePackagesInApp = match[2];
  var dispatchImportApp = match[1];
  var setFlag = match[0];
  var service = param[0];
  var __x = Most.flatMap((function (param) {
          var match = param[1];
          var allContributeFileData = match[1];
          var allExtensionFileData = match[0];
          var extensionProtocolNames = ArraySt$Meta3dCommonlib.map(allExtensionFileData, (function (param) {
                  return param[0].protocol.name;
                }));
          var contributeProtocolNames = ArraySt$Meta3dCommonlib.map(allContributeFileData, (function (param) {
                  return param[0].protocol.name;
                }));
          var __x = MostUtils$Frontend.concatArray([
                service.backend.batchFindPublishExtensionProtocols(extensionProtocolNames),
                service.backend.batchFindPublishExtensionProtocolConfigs(extensionProtocolNames),
                service.backend.batchFindPublishContributeProtocols(contributeProtocolNames),
                service.backend.batchFindPublishContributeProtocolConfigs(contributeProtocolNames)
              ]);
          return Most.fromPromise(Most.reduce(ArraySt$Meta3dCommonlib.push, [
                          param[0],
                          allExtensionFileData,
                          allContributeFileData,
                          match[2]
                        ], __x));
        }), stream);
  var __x$1 = Most.drain(Most.tap((function (arr) {
              var contributeProtocolConfigs = arr[7];
              var contributeProtocols = arr[6];
              var extensionProtocolConfigs = arr[5];
              var extensionProtocols = arr[4];
              var selectedExtensions = ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.map(arr[1], (function (data) {
                          var extensionPackageData = data[0];
                          var extensionProtocol = OptionSt$Meta3dCommonlib.getExn(ArraySt$Meta3dCommonlib.getFirst(ArraySt$Meta3dCommonlib.filter(extensionProtocols, (function (extensionProtocol) {
                                          if (extensionProtocol.name === extensionPackageData.protocol.name) {
                                            return Semver.satisfies(extensionProtocol.version, extensionPackageData.protocol.version);
                                          } else {
                                            return false;
                                          }
                                        }))));
                          var extensionProtocolConfig = ArraySt$Meta3dCommonlib.getFirst(ArraySt$Meta3dCommonlib.filter(extensionProtocolConfigs, (function (extensionProtocolConfig) {
                                      if (extensionProtocolConfig.name === extensionPackageData.protocol.name) {
                                        return Semver.satisfies(extensionProtocolConfig.version, extensionPackageData.protocol.version);
                                      } else {
                                        return false;
                                      }
                                    })));
                          return [
                                  {
                                    id: IdUtils$Frontend.generateId(function (prim) {
                                          return Math.random();
                                        }),
                                    protocolName: extensionProtocol.name,
                                    protocolVersion: extensionProtocol.version,
                                    protocolIconBase64: extensionProtocol.iconBase64,
                                    protocolDisplayName: extensionProtocol.displayName,
                                    protocolRepoLink: extensionProtocol.repoLink,
                                    protocolDescription: extensionProtocol.description,
                                    data: {
                                      extensionPackageData: {
                                        name: extensionPackageData.name,
                                        version: extensionPackageData.version,
                                        account: extensionPackageData.account,
                                        protocol: extensionPackageData.protocol,
                                        displayName: extensionPackageData.displayName,
                                        repoLink: extensionPackageData.repoLink,
                                        description: extensionPackageData.description,
                                        dependentPackageStoredInAppProtocolNameMap: extensionPackageData.dependentPackageStoredInAppProtocolNameMap,
                                        dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap
                                      },
                                      extensionFuncData: data[1]
                                    },
                                    version: extensionPackageData.version,
                                    account: extensionPackageData.account
                                  },
                                  extensionProtocolConfig
                                ];
                        })));
              var selectedContributes = ListSt$Meta3dCommonlib.fromArray(ArraySt$Meta3dCommonlib.map(_removeElementContributeFileData(arr[2]), (function (data) {
                          var contributePackageData = data[0];
                          var match = ElementVisualUtils$Frontend.isCustomInput(contributePackageData.protocol.name) || ElementVisualUtils$Frontend.isCustomAction(contributePackageData.protocol.name) ? [
                              contributePackageData.protocol.name,
                              contributePackageData.version,
                              ""
                            ] : OptionSt$Meta3dCommonlib.getExn(OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.getFirst(ArraySt$Meta3dCommonlib.filter(contributeProtocols, (function (contributeProtocol) {
                                                if (contributeProtocol.name === contributePackageData.protocol.name) {
                                                  return Semver.satisfies(contributeProtocol.version, contributePackageData.protocol.version);
                                                } else {
                                                  return false;
                                                }
                                              }))), (function (contributeProtocol) {
                                        return [
                                                contributeProtocol.name,
                                                contributeProtocol.version,
                                                contributeProtocol.iconBase64
                                              ];
                                      })));
                          var contributeProtocolConfig = ArraySt$Meta3dCommonlib.getFirst(ArraySt$Meta3dCommonlib.filter(contributeProtocolConfigs, (function (contributeProtocolConfig) {
                                      if (contributeProtocolConfig.name === contributePackageData.protocol.name) {
                                        return Semver.satisfies(contributeProtocolConfig.version, contributePackageData.protocol.version);
                                      } else {
                                        return false;
                                      }
                                    })));
                          return [
                                  {
                                    id: IdUtils$Frontend.generateId(function (prim) {
                                          return Math.random();
                                        }),
                                    protocolName: match[0],
                                    protocolVersion: match[1],
                                    protocolIconBase64: match[2],
                                    data: {
                                      contributePackageData: {
                                        name: contributePackageData.name,
                                        version: contributePackageData.version,
                                        account: contributePackageData.account,
                                        protocol: contributePackageData.protocol,
                                        displayName: contributePackageData.displayName,
                                        repoLink: contributePackageData.repoLink,
                                        description: contributePackageData.description,
                                        dependentPackageStoredInAppProtocolNameMap: contributePackageData.dependentPackageStoredInAppProtocolNameMap,
                                        dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap
                                      },
                                      contributeFuncData: data[1]
                                    },
                                    version: contributePackageData.version,
                                    account: contributePackageData.account
                                  },
                                  contributeProtocolConfig
                                ];
                        })));
              var selectedPackagesStoredInApp = _convertAllPackageData(arr[0]);
              var selectedPackagesNotStoredInApp = _convertAllPackageData(ArraySt$Meta3dCommonlib.reduceOneParam(arr[3], (function (result, binaryFile) {
                          var match = Main$Meta3d.getAllDataOfPackage(binaryFile);
                          return ArraySt$Meta3dCommonlib.push(result, [
                                      match[3],
                                      binaryFile
                                    ]);
                        }), []));
              Curry._1(setFlag, undefined);
              Curry._3(dispatchImportApp, selectedExtensions, SelectedElementContributeUtils$Frontend.removeElementContribute(selectedContributes), ListSt$Meta3dCommonlib.concat(selectedPackagesStoredInApp, selectedPackagesNotStoredInApp));
              Curry._1(dispatchBatchStorePackagesInApp, ListSt$Meta3dCommonlib.map(selectedPackagesStoredInApp, (function (param) {
                          return param.id;
                        })));
            }), __x));
  return Js_promise.$$catch((function (e) {
                return service.console.errorWithExn(e, undefined);
              }), __x$1);
}

function importPackage(param, stream) {
  var match = param[1];
  return _import([
              param[0],
              [
                match[0],
                match[1],
                (function (param) {
                    
                  })
              ]
            ], Most.map((function (param) {
                    return [
                            [],
                            [
                              param[0],
                              param[1],
                              param[2]
                            ]
                          ];
                  }), stream));
}

var importApp = _import;

export {
  _convertAllPackageData ,
  _removeElementContributeFileData ,
  _import ,
  importApp ,
  importPackage ,
}
/* most Not a pure module */
