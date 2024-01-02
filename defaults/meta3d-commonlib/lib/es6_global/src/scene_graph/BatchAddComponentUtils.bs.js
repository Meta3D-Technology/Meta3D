

import * as Log$Meta3dCommonlib from "../log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";
import * as Contract$Meta3dCommonlib from "../contract/Contract.bs.js";

function _checkBatchAdd(isDebug, gameObjects, components) {
  Contract$Meta3dCommonlib.requireCheck((function (param) {
          var gameObjectCount = gameObjects.length;
          var componentCount = components.length;
          Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("one gameObject should add one component", "" + gameObjectCount + " gameObject add " + componentCount + " components"), (function (param) {
                  return Contract$Meta3dCommonlib.Operators.$eq(gameObjectCount, componentCount);
                }));
        }), isDebug);
}

function batchAdd(componentState, addComponentFunc, isDebug, gameObjects, components) {
  _checkBatchAdd(isDebug, gameObjects, components);
  return ArraySt$Meta3dCommonlib.reduceOneParami(gameObjects, (function (componentState, gameObject, index) {
                return addComponentFunc(componentState, gameObject, components[index]);
              }), componentState);
}

export {
  _checkBatchAdd ,
  batchAdd ,
}
/* No side effect */
