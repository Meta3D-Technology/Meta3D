

import * as Curry from "../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function restore(currentState, targetState) {
  return {
          allRegisteredPipelineContribute: targetState.allRegisteredPipelineContribute,
          states: ListSt$Meta3dCommonlib.reduce(targetState.allRegisteredPipelineContribute, targetState.states, (function (states, param) {
                  var match = param[0];
                  var pipelineName = match.pipelineName;
                  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match.restoreFunc, (function (restoreFunc) {
                                    return ImmutableHashMap$Meta3dCommonlib.set(states, pipelineName, Curry._2(restoreFunc, ImmutableHashMap$Meta3dCommonlib.getExn(currentState.states, pipelineName), ImmutableHashMap$Meta3dCommonlib.getExn(states, pipelineName)));
                                  })), states);
                })),
          contributeData: targetState.contributeData,
          componentContributeData: targetState.componentContributeData,
          gameObjectContribute: targetState.gameObjectContribute,
          usedGameObjectContribute: targetState.usedGameObjectContribute
        };
}

function deepCopy(state) {
  return {
          allRegisteredPipelineContribute: state.allRegisteredPipelineContribute,
          states: ListSt$Meta3dCommonlib.reduce(state.allRegisteredPipelineContribute, state.states, (function (states, param) {
                  var match = param[0];
                  var pipelineName = match.pipelineName;
                  return NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.map(match.deepCopyFunc, (function (deepCopyFunc) {
                                    return ImmutableHashMap$Meta3dCommonlib.set(states, pipelineName, Curry._1(deepCopyFunc, ImmutableHashMap$Meta3dCommonlib.getExn(states, pipelineName)));
                                  })), states);
                })),
          contributeData: state.contributeData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectContribute: state.usedGameObjectContribute
        };
}

export {
  restore ,
  deepCopy ,
}
/* No side effect */
