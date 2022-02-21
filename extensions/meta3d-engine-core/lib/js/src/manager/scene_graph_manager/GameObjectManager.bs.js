'use strict';

var Curry = require("rescript/lib/js/curry.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");

function unsafeGetGameObjectData(state) {
  return OptionSt$Meta3dCommonlib.unsafeGet(state.gameObjectContribute);
}

function setGameObjectData(state, gameObjectContribute) {
  return {
          allRegisteredWorkPluginContribute: state.allRegisteredWorkPluginContribute,
          states: state.states,
          pluginData: state.pluginData,
          componentData: state.componentData,
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
          componentData: state.componentData,
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

function _setGameObjectStateToStateState(poState, data, gameObjectState) {
  data.state = gameObjectState;
  poState.usedGameObjectData = data;
  return poState;
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

exports.unsafeGetGameObjectData = unsafeGetGameObjectData;
exports.setGameObjectData = setGameObjectData;
exports.createAndSetState = createAndSetState;
exports._unsafeGetGameObjectRelatedData = _unsafeGetGameObjectRelatedData;
exports._setGameObjectStateToStateState = _setGameObjectStateToStateState;
exports.createGameObject = createGameObject;
exports.getAllGameObjects = getAllGameObjects;
/* No side effect */
