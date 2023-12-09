'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Semver = require("semver");
var Js_array = require("rescript/lib/js/js_array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
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
  var allExtensionUint8 = param[0];
  var allContributeUint8 = param[1];
  return function (allPackageBinaryFiles) {
    return [
            allExtensionUint8,
            allContributeUint8,
            new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.map(allPackageBinaryFiles, (function (prim) {
                            return new Uint8Array(prim);
                          }))))
          ];
  };
}

function getExtensionFuncDataStr(decoder, extensionFuncData) {
  return TextDecoder$Meta3d.decodeUint8Array(extensionFuncData, decoder);
}

function getExtensionFuncData(encoder, extensionFuncDataStr) {
  return TextEncoder$Meta3d.encodeUint8Array(extensionFuncDataStr, encoder);
}

function getContributeFuncDataStr(decoder, contributeFuncData) {
  return TextDecoder$Meta3d.decodeUint8Array(contributeFuncData, decoder);
}

function getContributeFuncData(encoder, contributeFuncDataStr) {
  return TextEncoder$Meta3d.encodeUint8Array(contributeFuncDataStr, encoder);
}

function getContributeFunc(contributeFuncData, decoder) {
  var lib = LibUtils$Meta3d.serializeLib(TextDecoder$Meta3d.decodeUint8Array(contributeFuncData, decoder), "Contribute");
  return LibUtils$Meta3d.getFuncFromLib(lib, "getContribute");
}

function convertContributeFuncData(contributeFuncData) {
  var decoder = new TextDecoder("utf-8");
  return {
          getContributeFunc: getContributeFunc(contributeFuncData, decoder)
        };
}

function _mergeAllPackageBinaryUint8s(param) {
  if (param.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            87,
            39
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = param[0];
  var allContributeUint8 = param[1];
  return function (allPackageBinaryUint8s) {
    return ArraySt$Meta3dCommonlib.reduceOneParam(allPackageBinaryUint8s, (function (param, param$1) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            92,
                            4
                          ],
                          Error: new Error()
                        };
                  }
                  var allExtensionUint8 = param[0];
                  var allContributeUint8 = param[1];
                  var match = BinaryFileOperator$Meta3d.load(param$1.buffer);
                  if (match.length !== 4) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            93,
                            10
                          ],
                          Error: new Error()
                        };
                  }
                  var allExtensionUint8InPackage = match[0];
                  var allContributeUint8InPackage = match[1];
                  var allSubPackageBinaryUint8s = match[2];
                  return _mergeAllPackageBinaryUint8s([
                                new Uint8Array(BinaryFileOperator$Meta3d.generate(Js_array.concat(BinaryFileOperator$Meta3d.load(allExtensionUint8InPackage.buffer), BinaryFileOperator$Meta3d.load(allExtensionUint8.buffer)))),
                                new Uint8Array(BinaryFileOperator$Meta3d.generate(Js_array.concat(BinaryFileOperator$Meta3d.load(allContributeUint8InPackage.buffer), BinaryFileOperator$Meta3d.load(allContributeUint8.buffer))))
                              ])(BinaryFileOperator$Meta3d.load(allSubPackageBinaryUint8s.buffer));
                }), [
                allExtensionUint8,
                allContributeUint8
              ]);
  };
}

function _parse1(param) {
  if (param.length !== 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            121,
            14
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = param[0];
  var allContributeUint8 = param[1];
  var allPackageBinaryUint8s = param[2];
  var decoder = new TextDecoder("utf-8");
  var match = _mergeAllPackageBinaryUint8s([
          allExtensionUint8,
          allContributeUint8
        ])(BinaryFileOperator$Meta3d.load(allPackageBinaryUint8s.buffer));
  if (match.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            124,
            6
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8$1 = match[0];
  var allContributeUint8$1 = match[1];
  return [
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allExtensionUint8$1.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            132,
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
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allContributeUint8$1.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            150,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var contributePackageData = param[0];
                  var contributeFuncData = param[1];
                  return {
                          contributePackageData: JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(contributePackageData, decoder))),
                          contributeFuncData: convertContributeFuncData(contributeFuncData)
                        };
                }))
        ];
}

function decodePackageData(packageData, decoder) {
  return JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(packageData, decoder)));
}

function _parse(param) {
  if (param.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            172,
            13
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = param[0];
  var allContributeUint8 = param[1];
  var allPackageBinaryUint8s = param[2];
  var decoder = new TextDecoder("utf-8");
  return [
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allExtensionUint8.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            178,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var extensionPackageData = param[0];
                  var extensionFuncData = param[1];
                  return [
                          JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(extensionPackageData, decoder))),
                          extensionFuncData
                        ];
                })),
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allContributeUint8.buffer), 2), (function (param) {
                  if (param.length !== 2) {
                    throw {
                          RE_EXN_ID: "Match_failure",
                          _1: [
                            "ManagerUtils.res",
                            189,
                            34
                          ],
                          Error: new Error()
                        };
                  }
                  var contributePackageData = param[0];
                  var contributeFuncData = param[1];
                  return [
                          JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(contributePackageData, decoder))),
                          contributeFuncData
                        ];
                })),
          ArraySt$Meta3dCommonlib.map(BinaryFileOperator$Meta3d.load(allPackageBinaryUint8s.buffer), (function (prim) {
                  return prim.buffer;
                }))
        ];
}

function parse2(param) {
  if (param.length !== 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            204,
            13
          ],
          Error: new Error()
        };
  }
  var allExtensionUint8 = param[0];
  var allContributeUint8 = param[1];
  var allPackageBinaryUint8s = param[2];
  var packageDataUint8 = param[3];
  var decoder = new TextDecoder("utf-8");
  var match = _parse([
        allExtensionUint8,
        allContributeUint8,
        allPackageBinaryUint8s
      ]);
  return [
          match[0],
          match[1],
          match[2],
          decodePackageData(packageDataUint8, decoder)
        ];
}

function _prepare(param) {
  return {
          extensionServiceMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionStateMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          extensionLifeMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          contributeExceptInputMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          inputMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          packageStoreInAppMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
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
          var blockProtocolName = param[0];
          var data = ImmutableHashMap$Meta3dCommonlib.get(allDataMap, blockProtocolName);
          if (data !== undefined) {
            Caml_option.valFromOption(data);
          } else {
            Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("not find dependent protocol: " + blockProtocolName + "", "", "", "", "")));
          }
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
          _checkDependentMap(param.extensionPackageData.dependentBlockProtocolNameMap, ImmutableHashMap$Meta3dCommonlib.merge(allExtensionDataMap, allContributeDataMap));
        }));
  ArraySt$Meta3dCommonlib.forEach(allContributeDataArr, (function (param) {
          _checkDependentMap(param.contributePackageData.dependentBlockProtocolNameMap, ImmutableHashMap$Meta3dCommonlib.merge(allExtensionDataMap, allContributeDataMap));
        }));
  return [
          allExtensionDataArr,
          allContributeDataArr
        ];
}

function _addGeneratedContribute(param, addGeneratedContributeFunc, selectedElements) {
  return [
          param[0],
          Curry._2(addGeneratedContributeFunc, param[1], selectedElements)
        ];
}

function _run(param) {
  var allExtensionDataArr = param[0];
  var state = ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionDataArr, (function (state, param) {
          var extensionFuncData = param.extensionFuncData;
          return ExtensionManager$Meta3d.registerExtension(state, param.extensionPackageData.protocol.name, extensionFuncData.getExtensionServiceFunc, extensionFuncData.getExtensionLifeFunc, extensionFuncData.createExtensionStateFunc(state, ExtensionManager$Meta3d.buildAPI(undefined)));
        }), _prepare(undefined));
  var state$1 = ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (state, param) {
          return ExtensionManager$Meta3d.registerContribute(state, param.contributePackageData.protocol.name, param.contributeFuncData.getContributeFunc);
        }), state);
  return [
          state$1,
          allExtensionDataArr
        ];
}

function loadApp(addGeneratedContributeFunc, selectedElements, data) {
  return _run(_addGeneratedContribute(_checkAllDependents(_parse1(data)), addGeneratedContributeFunc, selectedElements));
}

function loadPackage(data) {
  return _run(_checkAllDependents(_parse1(data)));
}

var parse3 = _parse;

exports.generate = generate;
exports.mergeAllPackageBinaryFiles = mergeAllPackageBinaryFiles;
exports.getExtensionFuncDataStr = getExtensionFuncDataStr;
exports.getExtensionFuncData = getExtensionFuncData;
exports.getContributeFuncDataStr = getContributeFuncDataStr;
exports.getContributeFuncData = getContributeFuncData;
exports.getContributeFunc = getContributeFunc;
exports.convertContributeFuncData = convertContributeFuncData;
exports._mergeAllPackageBinaryUint8s = _mergeAllPackageBinaryUint8s;
exports._parse1 = _parse1;
exports.decodePackageData = decodePackageData;
exports._parse = _parse;
exports.parse2 = parse2;
exports.parse3 = parse3;
exports._prepare = _prepare;
exports._checkVersion = _checkVersion;
exports._checkDependentMap = _checkDependentMap;
exports._checkAllDependents = _checkAllDependents;
exports._addGeneratedContribute = _addGeneratedContribute;
exports._run = _run;
exports.loadApp = loadApp;
exports.loadPackage = loadPackage;
/* semver Not a pure module */
