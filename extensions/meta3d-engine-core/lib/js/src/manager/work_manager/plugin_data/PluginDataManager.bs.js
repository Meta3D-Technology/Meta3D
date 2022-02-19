'use strict';

var StateContainer$Meta3dEngineCore = require("../../../data/StateContainer.bs.js");

function getIsDebug(param) {
  return StateContainer$Meta3dEngineCore.unsafeGetState(undefined).pluginData.isDebug;
}

function setIsDebug(isDebug) {
  var state = StateContainer$Meta3dEngineCore.unsafeGetState(undefined);
  return StateContainer$Meta3dEngineCore.setState({
              allRegisteredWorkPluginData: state.allRegisteredWorkPluginData,
              states: state.states,
              pluginData: {
                isDebug: isDebug
              },
              componentData: state.componentData,
              gameObjectData: state.gameObjectData,
              usedGameObjectData: state.usedGameObjectData
            });
}

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
