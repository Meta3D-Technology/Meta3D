

import * as StateContainer$Meta3dEngineCore from "../../../state/StateContainer.bs.js";

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

export {
  getIsDebug ,
  setIsDebug ,
  
}
/* No side effect */
