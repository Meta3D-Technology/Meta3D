'use strict';

var ConfigUtils$Meta3dGameobjectDataoriented = require("./config/ConfigUtils.bs.js");
var CloneGameObjectUtils$Meta3dGameobjectDataoriented = require("./CloneGameObjectUtils.bs.js");
var CreateGameObjectUtils$Meta3dGameobjectDataoriented = require("./CreateGameObjectUtils.bs.js");
var GetAllGameObjectUtils$Meta3dGameobjectDataoriented = require("./GetAllGameObjectUtils.bs.js");
var DisposeGameObjectUtils$Meta3dGameobjectDataoriented = require("./DisposeGameObjectUtils.bs.js");
var GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented = require("./GetNeedDisposedGameObjectsUtils.bs.js");

function getContribute(api) {
  return {
          createStateFunc: (function (config) {
              return {
                      config: config,
                      maxUID: 0,
                      needDisposedGameObjectArray: []
                    };
            }),
          createGameObjectFunc: CreateGameObjectUtils$Meta3dGameobjectDataoriented.create,
          getNeedDisposedGameObjectsFunc: GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get,
          deferDisposeGameObjectFunc: (function (state, funcs, gameObject) {
              return DisposeGameObjectUtils$Meta3dGameobjectDataoriented.deferDisposeGameObject(state)(funcs, gameObject);
            }),
          disposeGameObjectsFunc: (function (states, funcs, gameObjects) {
              return DisposeGameObjectUtils$Meta3dGameobjectDataoriented.disposeGameObjects(states)(funcs, gameObjects);
            }),
          cloneGameObjectFunc: (function (states, funcs, count, cloneConfig, sourceGameObject) {
              return CloneGameObjectUtils$Meta3dGameobjectDataoriented.clone(states, funcs, ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(states[0]), count, cloneConfig, sourceGameObject);
            }),
          getAllGameObjectsFunc: GetAllGameObjectUtils$Meta3dGameobjectDataoriented.getAll
        };
}

exports.getContribute = getContribute;
/* No side effect */
