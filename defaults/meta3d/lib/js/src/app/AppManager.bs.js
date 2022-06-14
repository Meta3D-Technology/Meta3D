'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Semver = require("semver");
var LibUtils$Meta3d = require("../file/LibUtils.bs.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ExtensionManager$Meta3d = require("../ExtensionManager.bs.js");
var BinaryFileOperator$Meta3d = require("../file/BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function _checkVersion(protocolVersion, dependentProtocolVersion) {
  if (Semver.satisfies(protocolVersion, dependentProtocolVersion)) {
    return ;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("version not match", protocolVersion + " not match dependentProtocolVersion:" + dependentProtocolVersion, "", "", "")));
  }
}

function _convertDependentMap(dependentMap, allDataMap) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(ImmutableHashMap$Meta3dCommonlib.entries(dependentMap), (function (map, param) {
                var dependentData = param[1];
                var data = ImmutableHashMap$Meta3dCommonlib.get(allDataMap, dependentData.protocolName);
                var match = data !== undefined ? data : Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("not find dependent protocol: " + dependentData.protocolName, "", "", "", "")));
                _checkVersion(match[1], dependentData.protocolVersion);
                return ImmutableHashMap$Meta3dCommonlib.set(map, param[0], match[0]);
              }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

function convertAllFileData(allExtensionFileData, allContributeFileData, param) {
  var allContributeNewNames = param[2];
  var isStartedExtensions = param[1];
  var allExtensionNewNames = param[0];
  var allExtensionDataMap = ArraySt$Meta3dCommonlib.reduceOneParami(allExtensionFileData, (function (result, param, i) {
          var extensionPackageData = param.extensionPackageData;
          return ImmutableHashMap$Meta3dCommonlib.set(result, extensionPackageData.protocol.name, [
                      ArraySt$Meta3dCommonlib.getExn(allExtensionNewNames, i),
                      extensionPackageData.protocol.version
                    ]);
        }), ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined));
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
                                isStart: ArraySt$Meta3dCommonlib.includes(isStartedExtensions, newName),
                                dependentExtensionNameMap: _convertDependentMap(extensionPackageData.dependentExtensionNameMap, allExtensionDataMap),
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
                                dependentExtensionNameMap: _convertDependentMap(contributePackageData.dependentExtensionNameMap, allExtensionDataMap),
                                dependentContributeNameMap: _convertDependentMap(contributePackageData.dependentContributeNameMap, allContributeDataMap)
                              },
                              param.contributeFuncData
                            ]);
                }), [])
        ];
}

function generate(param) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate([
              new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(param[0], (function (result, param) {
                              return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, encoder.encode(JSON.stringify(param[0]))), param[1]);
                            }), []))),
              new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (result, param) {
                              return ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(result, encoder.encode(JSON.stringify(param[0]))), param[1]);
                            }), [])))
            ]);
}

function _parse(appBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var match = BinaryFileOperator$Meta3d.load(appBinaryFile);
  if (match.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "AppManager.res",
            191,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionBinaryUint8File = match[0];
  var allContributeBinaryUint8File = match[1];
  return [
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allExtensionBinaryUint8File.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "AppManager.res",
                            198,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var extensionPackageData = param[0];
                  var extensionFuncData = param[1];
                  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(extensionFuncData), "Extension");
                  return {
                          extensionPackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(decoder.decode(extensionPackageData))),
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
                            "AppManager.res",
                            216,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var contributePackageData = param[0];
                  var contributeFuncData = param[1];
                  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(contributeFuncData), "Contribute");
                  return {
                          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(decoder.decode(contributePackageData))),
                          contributeFuncData: {
                            getContributeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getContribute")
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

function _getStartExtensionNames(allExtensionDataArr) {
  return ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.filter(allExtensionDataArr, (function (param) {
                    return param.extensionPackageData.isStart;
                  })), (function (param) {
                return param.extensionPackageData.name;
              }));
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
  return ExtensionManager$Meta3d.startExtensions(state$1, _getStartExtensionNames(allExtensionDataArr));
}

function load(appBinaryFile) {
  return _run(_parse(appBinaryFile));
}

exports._checkVersion = _checkVersion;
exports._convertDependentMap = _convertDependentMap;
exports.convertAllFileData = convertAllFileData;
exports.generate = generate;
exports._parse = _parse;
exports._prepare = _prepare;
exports._getStartExtensionNames = _getStartExtensionNames;
exports._run = _run;
exports.load = load;
/* semver Not a pure module */
