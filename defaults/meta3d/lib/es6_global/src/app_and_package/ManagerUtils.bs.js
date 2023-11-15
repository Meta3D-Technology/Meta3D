

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Semver from "semver";
import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as LibUtils$Meta3d from "../file/LibUtils.bs.js";
import * as FileUtils$Meta3d from "../FileUtils.bs.js";
import * as TextDecoder$Meta3d from "../file/TextDecoder.bs.js";
import * as TextEncoder$Meta3d from "../file/TextEncoder.bs.js";
import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ExtensionManager$Meta3d from "../ExtensionManager.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

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

function _mergeAllPackageBinaryUint8s(param) {
  if (param.length !== 2) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            81,
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
                            86,
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
                            87,
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
            115,
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
            118,
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
          ArraySt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.chunk(BinaryFileOperator$Meta3d.load(allContributeUint8$1.buffer), 2), (function (param) {
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

function decodePackageData(packageData, decoder) {
  return JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(packageData, decoder)));
}

function _parse(param) {
  if (param.length !== 3) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "ManagerUtils.res",
            165,
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
                            171,
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
                            182,
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
            197,
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
          contributeExceptActionMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          actionMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
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

function _run(param) {
  var allExtensionDataArr = param[0];
  var state = ArraySt$Meta3dCommonlib.reduceOneParam(allExtensionDataArr, (function (state, param) {
          var extensionFuncData = param.extensionFuncData;
          return ExtensionManager$Meta3d.registerExtension(state, param.extensionPackageData.protocol.name, extensionFuncData.getExtensionServiceFunc, extensionFuncData.getExtensionLifeFunc, Curry._1(extensionFuncData.createExtensionStateFunc, undefined));
        }), _prepare(undefined));
  var state$1 = ArraySt$Meta3dCommonlib.reduceOneParam(param[1], (function (state, param) {
          return ExtensionManager$Meta3d.registerContribute(state, param.contributePackageData.protocol.name, param.contributeFuncData.getContributeFunc);
        }), state);
  return [
          state$1,
          allExtensionDataArr
        ];
}

function load(data) {
  return _run(_checkAllDependents(_parse1(data)));
}

var parse3 = _parse;

export {
  generate ,
  mergeAllPackageBinaryFiles ,
  getExtensionFuncDataStr ,
  getExtensionFuncData ,
  getContributeFuncDataStr ,
  getContributeFuncData ,
  getContributeFunc ,
  _mergeAllPackageBinaryUint8s ,
  _parse1 ,
  decodePackageData ,
  _parse ,
  parse2 ,
  parse3 ,
  _prepare ,
  _checkVersion ,
  _checkDependentMap ,
  _checkAllDependents ,
  _run ,
  load ,
}
/* semver Not a pure module */
