

import * as CreateGameObjectUtils$Meta3dGameobjectDataoriented from "./CreateGameObjectUtils.bs.js";
import * as GetAllGameObjectUtils$Meta3dGameobjectDataoriented from "./GetAllGameObjectUtils.bs.js";
import * as DisposeGameObjectUtils$Meta3dGameobjectDataoriented from "./DisposeGameObjectUtils.bs.js";

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

export {
  getGameObjectContribute ,
  
}
/* No side effect */
