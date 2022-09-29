


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
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

export {
  getIsDebug ,
  setIsDebug ,
  
}
/* No side effect */
