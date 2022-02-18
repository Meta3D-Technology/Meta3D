'use strict';

var POContainer$Meta3dEngineCore = require("../../../data/POContainer.bs.js");

function getIsDebug(param) {
  return POContainer$Meta3dEngineCore.unsafeGetPO(undefined).pluginData.isDebug;
}

function setIsDebug(isDebug) {
  var po = POContainer$Meta3dEngineCore.unsafeGetPO(undefined);
  return POContainer$Meta3dEngineCore.setPO({
              allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
              states: po.states,
              pluginData: {
                isDebug: isDebug
              },
              componentData: po.componentData,
              gameObjectData: po.gameObjectData,
              usedGameObjectData: po.usedGameObjectData
            });
}

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
