

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function unsafeGetGameObjectData(state) {
  return OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
}

function setGameObjectContribute(state, gameObjectContribute) {
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: gameObjectContribute,
          usedGameObjectData: state.usedGameObjectData
        };
}

function createAndSetState(state) {
  var match = OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentContributeData: state.componentContributeData,
          gameObjectContribute: state.gameObjectContribute,
          usedGameObjectData: {
            state: Curry._1(match.createStateFunc, undefined),
            createGameObjectFunc: match.createGameObjectFunc,
            getAllGameObjectsFunc: match.getAllGameObjectsFunc
          }
        };
}

function _unsafeGetGameObjectRelatedData(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(param.usedGameObjectData);
}

function _setGameObjectStateToStateState(state, data, gameObjectState) {
  data.state = gameObjectState;
  state.usedGameObjectData = data;
  return state;
}

function createGameObject(state) {
  var data = _unsafeGetGameObjectRelatedData(state);
  var match = data.createGameObjectFunc(data.state);
  return [
          _setGameObjectStateToStateState(state, data, match[0]),
          match[1]
        ];
}

function getAllGameObjects(state) {
  var data = _unsafeGetGameObjectRelatedData(state);
  return data.getAllGameObjectsFunc(data.state);
}

export {
  unsafeGetGameObjectData ,
  setGameObjectContribute ,
  createAndSetState ,
  _unsafeGetGameObjectRelatedData ,
  _setGameObjectStateToStateState ,
  createGameObject ,
  getAllGameObjects ,
  
}
/* No side effect */
