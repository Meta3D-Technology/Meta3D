'use strict';

var Log$Meta3dCommonlib = require("../log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");
var Contract$Meta3dCommonlib = require("../contract/Contract.bs.js");

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

exports._checkBatchAdd = _checkBatchAdd;
exports.batchAdd = batchAdd;
/* No side effect */
