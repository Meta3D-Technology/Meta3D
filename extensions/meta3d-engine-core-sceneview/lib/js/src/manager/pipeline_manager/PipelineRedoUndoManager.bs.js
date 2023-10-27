'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ListSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ListSt.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports.restore = restore;
exports.deepCopy = deepCopy;
/* No side effect */
