

import * as Main$Meta3d from "../../src/Main.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

var prepareStartFlag = (function(){window.startFlag = 0});

var prepareInitFlag = (function(){window.initFlag = 0});

var prepareUpdateFlag = (function(){window.updateFlag = 0});

function buildEmptyExtensionFileStr(param) {
  return "window.Extension = { getExtensionService: (api) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } ";
}

function buildEmptyExtensionFileStrWithOnStart(addNumber) {
  return "window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onStart: (meta3dState, service, configData) =>{ window.startFlag += " + addNumber.toString() + " + configData[0].height; } } } }";
}

function buildEmptyExtensionFileStrWithOnInit(addNumber) {
  return "window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += " + addNumber.toString() + " + data; return new Promise((resolve) =>{\nresolve(meta3dState)\n  }) ; } } } }";
}

function buildEmptyExtensionFileStrWithOnUpdate(addNumber) {
  return "window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onUpdate: (meta3dState, service, data) =>{ window.updateFlag += " + addNumber.toString() + " + data; return new Promise((resolve) =>{\nresolve(meta3dState)\n  }) ; } } } }";
}

function buildEmptyContributeFileStr(param) {
  return "window.Contribute = { getContribute: (api) =>{ return {} }}";
}

var getStartFlag = (function(){return window.startFlag});

var getInitFlag = (function(){return window.initFlag});

var getUpdateFlag = (function(){return window.updateFlag});

function getPackage(state, packageProtocolName) {
  return ImmutableHashMap$Meta3dCommonlib.getNullable(state.packageStoreInAppMap, packageProtocolName);
}

function buildPackageData(packageProtocolNameOpt, packageProtocolVersionOpt, packageProtocolIconBase64Opt, packageProtocolConfigStrOpt, entryExtensionNameOpt, packageVersionOpt, packageNameOpt, param) {
  var packageProtocolName = packageProtocolNameOpt !== undefined ? packageProtocolNameOpt : "p1";
  var packageProtocolVersion = packageProtocolVersionOpt !== undefined ? packageProtocolVersionOpt : "^0.0.1";
  var packageProtocolIconBase64 = packageProtocolIconBase64Opt !== undefined ? packageProtocolIconBase64Opt : "ibase64";
  var packageProtocolConfigStr = packageProtocolConfigStrOpt !== undefined ? packageProtocolConfigStrOpt : "";
  var entryExtensionName = entryExtensionNameOpt !== undefined ? entryExtensionNameOpt : "en1";
  var packageVersion = packageVersionOpt !== undefined ? packageVersionOpt : "0.0.1";
  var packageName = packageNameOpt !== undefined ? packageNameOpt : "p1";
  return [
          {
            version: packageProtocolVersion,
            name: packageProtocolName,
            iconBase64: packageProtocolIconBase64
          },
          entryExtensionName,
          packageVersion,
          packageName,
          packageProtocolConfigStr
        ];
}

function buildSelectedElements(data1Opt, param) {
  return [data1Opt !== undefined ? data1Opt : 1];
}

function buildCustomData(customInputsOpt, customActionsOpt, param) {
  var customInputs = customInputsOpt !== undefined ? customInputsOpt : [];
  var customActions = customActionsOpt !== undefined ? customActionsOpt : [];
  return [
          customInputs,
          customActions
        ];
}

function loadApp(addGeneratedContributeFuncOpt, appBinaryFile, param) {
  var addGeneratedContributeFunc = addGeneratedContributeFuncOpt !== undefined ? addGeneratedContributeFuncOpt : (function (allExtensionDataArr, param) {
        return allExtensionDataArr;
      });
  return Main$Meta3d.loadApp(addGeneratedContributeFunc, appBinaryFile);
}

export {
  prepareStartFlag ,
  prepareInitFlag ,
  prepareUpdateFlag ,
  buildEmptyExtensionFileStr ,
  buildEmptyExtensionFileStrWithOnStart ,
  buildEmptyExtensionFileStrWithOnInit ,
  buildEmptyExtensionFileStrWithOnUpdate ,
  buildEmptyContributeFileStr ,
  getStartFlag ,
  getInitFlag ,
  getUpdateFlag ,
  getPackage ,
  buildPackageData ,
  buildSelectedElements ,
  buildCustomData ,
  loadApp ,
}
/* Main-Meta3d Not a pure module */
