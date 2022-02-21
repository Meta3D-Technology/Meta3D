'use strict';

var StateContainer$Meta3dEngineCore = require("../../../state/StateContainer.bs.js");

function getIsDebug(param) {
  return StateContainer$Meta3dEngineCore.unsafeGetState(undefined).pluginData.isDebug;
}

function setIsDebug(isDebug) {
  var state = StateContainer$Meta3dEngineCore.unsafeGetState(undefined);
  return StateContainer$Meta3dEngineCore.setState({
              allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
              states: state.states,
              pluginData: {
                isDebug: isDebug
              },
              componentData: state.componentData,
              gameObjectContribute: state.gameObjectContribute,
              usedGameObjectData: state.usedGameObjectData
            });
}

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
