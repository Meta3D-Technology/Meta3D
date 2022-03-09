'use strict';

var CreateGameObjectUtils$Meta3dGameobjectDataoriented = require("./CreateGameObjectUtils.bs.js");
var GetAllGameObjectUtils$Meta3dGameobjectDataoriented = require("./GetAllGameObjectUtils.bs.js");
var DisposeGameObjectUtils$Meta3dGameobjectDataoriented = require("./DisposeGameObjectUtils.bs.js");
var GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented = require("./GetNeedDisposedGameObjectsUtils.bs.js");

function getGameObjectContribute(param) {
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
          getAllGameObjectsFunc: GetAllGameObjectUtils$Meta3dGameobjectDataoriented.getAll
        };
}

exports.getGameObjectContribute = getGameObjectContribute;
/* No side effect */
