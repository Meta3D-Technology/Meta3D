

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
}
/* No side effect */
