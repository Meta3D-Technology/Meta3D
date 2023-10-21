'use strict';


function getIsDebug(state) {
  return state.contributeData.isDebug;
}

function setIsDebug(state, isDebug) {
  return {
          allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
          states: state.states,
          contributeData: {
            isDebug: isDebug
          },
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
