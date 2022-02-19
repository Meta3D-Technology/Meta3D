

import * as StateContainer$Meta3dEngineCore from "../../../data/StateContainer.bs.js";

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

export {
  getIsDebug ,
  setIsDebug ,
  
}
/* No side effect */
