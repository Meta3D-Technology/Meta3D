'use strict';

var CreateGameObjectUtils$Meta3dGameobjectDataoriented = require("./CreateGameObjectUtils.bs.js");
var GetAllGameObjectUtils$Meta3dGameobjectDataoriented = require("./GetAllGameObjectUtils.bs.js");
var DisposeGameObjectUtils$Meta3dGameobjectDataoriented = require("./DisposeGameObjectUtils.bs.js");

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
          deferDisposeGameObjectFunc: (function (state, gameObject) {
              return DisposeGameObjectUtils$Meta3dGameobjectDataoriented.deferDisposeGameObjectFunc(state)(gameObject);
            }),
          batchDisposeGameObjectsFunc: (function (states, batchDisposeTransformsFunc, gameObjects) {
              return DisposeGameObjectUtils$Meta3dGameobjectDataoriented.batchDisposeGameObjectsFunc(states)(batchDisposeTransformsFunc, gameObjects);
            }),
          getAllGameObjectsFunc: GetAllGameObjectUtils$Meta3dGameobjectDataoriented.getAll
        };
}

exports.getGameObjectContribute = getGameObjectContribute;
/* No side effect */
