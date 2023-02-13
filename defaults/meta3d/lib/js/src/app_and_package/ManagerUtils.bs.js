'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Semver = require("semver");
var Js_array = require("rescript/lib/js/js_array.js");
var LibUtils$Meta3d = require("../file/LibUtils.bs.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var TextDecoder$Meta3d = require("../file/TextDecoder.bs.js");
var TextEncoder$Meta3d = require("../file/TextEncoder.bs.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ExtensionManager$Meta3d = require("../ExtensionManager.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function generate(param) {
  var encoder = new TextEncoder();
  return [
          new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(param[0], (function (result, param) {
                          return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(param[0]), encoder)), param[1]);
                        }), []))),
          new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (result, param) {
                          return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(param[0]), encoder)), param[1]);
                        }), [])))
        ];
}

function mergeAllPackageBinaryFiles(param) {
  if (param.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            44,
            33
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = param[0];
  var allContributeBinaryUint8File = param[1];
  return function (allPackageBinaryFiles) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(allPackageBinaryFiles, (function (param, param$1) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            66,
                            4
                          ],
                          Error: new Error()
                        };
                  }
                  var allExtensionBinaryUint8File = param[0];
                  var allContributeBinaryUint8File = param[1];
                  var match = BinaryFileOperator$Meta3d.load(param$1);
                  if (match.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            67,
                            10
                          ],
                          Error: new Error()
                        };
                  }
                  var allExtensionBinaryUint8FileInPackage = match[0];
                  var allContributeBinaryUint8FileInPackage = match[1];
                  return [
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(Js_array.concat(BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8FileInPackage.buffer), BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8File.buffer)))),
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(Js_array.concat(BinaryFileOperator$Meta3d.load(allContributeBinaryUint8FileInPackage.buffer), BinaryFileOperator$Meta3d.load(allContributeBinaryUint8File.buffer))))
                        ];
                }), [
                allExtensionBinaryUint8File,
                allContributeBinaryUint8File
              ]);
  };
}

function getContributeFunc(contributeFuncData, decoder) {
  var lib = LibUtils$Meta3d.serializeLib(TextDecoder$Meta3d.decodeUint8Array(contributeFuncData, decoder), "Contribute");
  return LibUtils$Meta3d.getFuncFromLib(lib, "getContribute");
}

function _parse(param) {
  if (param.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            114,
            13
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = param[0];
  var allContributeBinaryUint8File = param[1];
  var decoder = new TextDecoder("utf-8");
  return [
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8File.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            126,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var extensionPackageData = param[0];
                  var extensionFuncData = param[1];
                  var lib = LibUtils$Meta3d.serializeLib(TextDecoder$Meta3d.decodeUint8Array(extensionFuncData, decoder), "Extension");
                  return {
                          extensionPackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(extensionPackageData, decoder))),
                          extensionFuncData: {
                            getExtensionServiceFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionService"),
                            createExtensionStateFunc: LibUtils$Meta3d.getFuncFromLib(lib, "createExtensionState"),
                            getExtensionLifeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionLife")
                          }
                        };
                })),
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allContributeBinaryUint8File.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            144,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var contributePackageData = param[0];
                  var contributeFuncData = param[1];
                  return {
                          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(contributePackageData, decoder))),
                          contributeFuncData: {
                            getContributeFunc: getContributeFunc(contributeFuncData, decoder)
                          }
                        };
                }))
        ];
}

function _prepare(param) {
  return {
          extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          contributeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

function _checkVersion(protocolVersion, dependentProtocolVersion, dependentProtocolName) {
  if (Semver.gte(Semver.minVersion(protocolVersion), Semver.minVersion(dependentProtocolVersion))) {
    return ;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("version not match", "" + dependentProtocolName + "\n              " + protocolVersion + " not match dependentProtocolVersion: " + dependentProtocolVersion + "", "", "", "")));
  }
}

function _checkDependentMap(dependentMap, allDataMap) {
  ArraySt$Meta3dCommonlib.forEach(ImmutableHashMap$Meta3dCommonlib.entries(dependentMap), (function (param) {
          var dependentData = param[1];
          var data = ImmutableHashMap$Meta3dCommonlib.get(allDataMap, dependentData.protocolName);
          var protocolVersion = data !== undefined ? data : Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("not find dependent protocol: " + dependentData.protocolName + "", "", "", "", "")));
          _checkVersion(protocolVersion, dependentData.protocolVersion, dependentData.protocolName);
        }));
}

function _checkAllDependents(param) {
  var allContributeDataArr = param[1];
  var allExtensionDataArr = param[0];
  var allExtensionDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionDataArr, (function (result, param, i) {
          var extensionPackageData = param.extensionPackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, extensionPackageData.protocol.name, extensionPackageData.protocol.version);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  var allContributeDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allContributeDataArr, (function (result, param, i) {
          var contributePackageData = param.contributePackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, contributePackageData.protocol.name, contributePackageData.protocol.version);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  ArraySt$Meta3dCommonlib.forEach(allExtensionDataArr, (function (param) {
          var extensionPackageData = param.extensionPackageData;
          _checkDependentMap(extensionPackageData.dependentExtensionProtocolNameMap, allExtensionDataMap);
          _checkDependentMap(extensionPackageData.dependentContributeProtocolNameMap, allContributeDataMap);
        }));
  ArraySt$Meta3dCommonlib.forEach(allContributeDataArr, (function (param) {
          var contributePackageData = param.contributePackageData;
          _checkDependentMap(contributePackageData.dependentExtensionProtocolNameMap, allExtensionDataMap);
          _checkDependentMap(contributePackageData.dependentContributeProtocolNameMap, allContributeDataMap);
        }));
  return [
          allExtensionDataArr,
          allContributeDataArr
        ];
}

function _convertDependentMap(dependentMap) {
  return ImmutableHashMap$Meta3dCommonlib.map(dependentMap, (function (dependentData) {
                return dependentData.protocolName;
              }));
}

function _run(param) {
  var allExtensionDataArr = param[0];
  var state = ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionDataArr, (function (state, param) {
          var extensionFuncData = param.extensionFuncData;
          var extensionPackageData = param.extensionPackageData;
          return ExtensionManager$Meta3d.registerExtension(state, extensionPackageData.protocol.name, extensionFuncData.getExtensionServiceFunc, extensionFuncData.getExtensionLifeFunc, [
                      ImmutableHashMap$Meta3dCommonlib.map(extensionPackageData.dependentExtensionProtocolNameMap, (function (dependentData) {
                              return dependentData.protocolName;
                            })),
                      ImmutableHashMap$Meta3dCommonlib.map(extensionPackageData.dependentContributeProtocolNameMap, (function (dependentData) {
                              return dependentData.protocolName;
                            }))
                    ], Curry._1(extensionFuncData.createExtensionStateFunc, undefined));
        }), _prepare(undefined));
  var state$1 = ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (state, param) {
          var contributePackageData = param.contributePackageData;
          return ExtensionManager$Meta3d.registerContribute(state, contributePackageData.protocol.name, param.contributeFuncData.getContributeFunc, [
                      ImmutableHashMap$Meta3dCommonlib.map(contributePackageData.dependentExtensionProtocolNameMap, (function (dependentData) {
                              return dependentData.protocolName;
                            })),
                      ImmutableHashMap$Meta3dCommonlib.map(contributePackageData.dependentContributeProtocolNameMap, (function (dependentData) {
                              return dependentData.protocolName;
                            }))
                    ]);
        }), state);
  return [
          state$1,
          allExtensionDataArr
        ];
}

function load(data) {
  return _run(_checkAllDependents(_parse(data)));
}

exports.generate = generate;
exports.mergeAllPackageBinaryFiles = mergeAllPackageBinaryFiles;
exports.getContributeFunc = getContributeFunc;
exports._parse = _parse;
exports._prepare = _prepare;
exports._checkVersion = _checkVersion;
exports._checkDependentMap = _checkDependentMap;
exports._checkAllDependents = _checkAllDependents;
exports._convertDependentMap = _convertDependentMap;
exports._run = _run;
exports.load = load;
/* semver Not a pure module */
