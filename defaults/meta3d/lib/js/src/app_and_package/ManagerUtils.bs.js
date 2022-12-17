'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Semver = require("semver");
var Js_array = require("rescript/lib/js/js_array.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
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

function _checkVersion(protocolVersion, dependentProtocolVersion, dependentProtocolName) {
  if (Semver.satisfies(Semver.minVersion(protocolVersion), dependentProtocolVersion)) {
    return ;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("version not match", "" + dependentProtocolName + "\n              " + protocolVersion + " not match dependentProtocolVersion: " + dependentProtocolVersion + "", "", "", "")));
  }
}

function _convertDependentMap(dependentMap, allDataMap) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(dependentMap), (function (map, param) {
                var dependentData = param[1];
                var data = ImmutableHashMap$Meta3dCommonlib.get(allDataMap, dependentData.protocolName);
                var match = data !== undefined ? data : Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("not find dependent protocol: " + dependentData.protocolName + "", "", "", "", "")));
                _checkVersion(match[1], dependentData.protocolVersion, dependentData.protocolName);
                return ImmutableHashMap$Meta3dCommonlib.set(map, param[0], match[0]);
              }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

function convertAllFileData(allExtensionFileData, allContributeFileData, allPackageEntryExtensionProtocolData, param) {
  var allContributeNewNames = param[2];
  var match = param[1];
  var entryExtensionNames = match[1];
  var startExtensionNames = match[0];
  var allExtensionNewNames = param[0];
  var allExtensionDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
          var extensionPackageData = param.extensionPackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, extensionPackageData.protocol.name, [
                      ArraySt$Meta3dCommonlib.getExn(allExtensionNewNames, i),
                      extensionPackageData.protocol.version
                    ]);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  var allExtensionDataMap$1 = ArraySt$Meta3dCommonlib.reduceOneParam(allPackageEntryExtensionProtocolData, (function (allExtensionDataMap, param) {
          var match = param[0];
          return ImmutableHashMap$Meta3dCommonlib.set(allExtensionDataMap, match.name, [
                      param[1],
                      match.version
                    ]);
        }), allExtensionDataMap);
  var allContributeDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
          var contributePackageData = param.contributePackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, contributePackageData.protocol.name, [
                      ArraySt$Meta3dCommonlib.getExn(allContributeNewNames, i),
                      contributePackageData.protocol.version
                    ]);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
  return [
          ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
                  var extensionPackageData = param.extensionPackageData;
                  var newName = ArraySt$Meta3dCommonlib.getExn(allExtensionNewNames, i);
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: newName,
                                type_: ArraySt$Meta3dCommonlib.includes(startExtensionNames, newName) ? /* Start */1 : (
                                    ArraySt$Meta3dCommonlib.includes(entryExtensionNames, newName) ? /* Entry */2 : /* Default */0
                                  ),
                                dependentExtensionNameMap: _convertDependentMap(extensionPackageData.dependentExtensionNameMap, allExtensionDataMap$1),
                                dependentContributeNameMap: _convertDependentMap(extensionPackageData.dependentContributeNameMap, allContributeDataMap)
                              },
                              param.extensionFuncData
                            ]);
                }), []),
          ArraySt$Meta3dCommonlib.reduceOneParami(allContributeFileData, (function (result, param, i) {
                  var contributePackageData = param.contributePackageData;
                  var newName = ArraySt$Meta3dCommonlib.getExn(allContributeNewNames, i);
                  return ArraySt$Meta3dCommonlib.push(result, [
                              {
                                name: newName,
                                dependentExtensionNameMap: _convertDependentMap(contributePackageData.dependentExtensionNameMap, allExtensionDataMap$1),
                                dependentContributeNameMap: _convertDependentMap(contributePackageData.dependentContributeNameMap, allContributeDataMap)
                              },
                              param.contributeFuncData
                            ]);
                }), [])
        ];
}

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
            217,
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
                            239,
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
                            240,
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
            287,
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
                            299,
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
                            317,
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

function _run(param) {
  var allExtensionDataArr = param[0];
  var state = ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionDataArr, (function (state, param) {
          var extensionFuncData = param.extensionFuncData;
          var extensionPackageData = param.extensionPackageData;
          return ExtensionManager$Meta3d.registerExtension(state, extensionPackageData.name, extensionFuncData.getExtensionServiceFunc, extensionFuncData.getExtensionLifeFunc, [
                      extensionPackageData.dependentExtensionNameMap,
                      extensionPackageData.dependentContributeNameMap
                    ], Curry._1(extensionFuncData.createExtensionStateFunc, undefined));
        }), _prepare(undefined));
  var state$1 = ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (state, param) {
          var contributePackageData = param.contributePackageData;
          return ExtensionManager$Meta3d.registerContribute(state, contributePackageData.name, param.contributeFuncData.getContributeFunc, [
                      contributePackageData.dependentExtensionNameMap,
                      contributePackageData.dependentContributeNameMap
                    ]);
        }), state);
  return [
          state$1,
          allExtensionDataArr
        ];
}

function load(data) {
  return _run(_parse(data));
}

function getSpecificExtensionName(allExtensionDataArr, extensionType) {
  var startExtensions = ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
          return param.extensionPackageData.type_ === extensionType;
        }));
  if (ArraySt$Meta3dCommonlib.length(startExtensions) !== 1) {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("should only has one type extension", "", "", "", "")));
  } else {
    return Caml_array.get(startExtensions, 0).extensionPackageData.name;
  }
}

exports._checkVersion = _checkVersion;
exports._convertDependentMap = _convertDependentMap;
exports.convertAllFileData = convertAllFileData;
exports.generate = generate;
exports.mergeAllPackageBinaryFiles = mergeAllPackageBinaryFiles;
exports.getContributeFunc = getContributeFunc;
exports._parse = _parse;
exports._prepare = _prepare;
exports._run = _run;
exports.load = load;
exports.getSpecificExtensionName = getSpecificExtensionName;
/* semver Not a pure module */
