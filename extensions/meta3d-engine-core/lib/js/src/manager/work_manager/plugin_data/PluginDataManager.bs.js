'use strict';


function getIsDebug(state) {
  return state.pluginData.isDebug;
}

function setIsDebug(state, isDebug) {
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: {
            isDebug: isDebug
          },
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectData: state.usedGameObjectData
        };
}

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
