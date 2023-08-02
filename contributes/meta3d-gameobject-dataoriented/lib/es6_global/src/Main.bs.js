

import * as ConfigUtils$Meta3dGameobjectDataoriented from "./config/ConfigUtils.bs.js";
import * as CloneGameObjectUtils$Meta3dGameobjectDataoriented from "./CloneGameObjectUtils.bs.js";
import * as CreateGameObjectUtils$Meta3dGameobjectDataoriented from "./CreateGameObjectUtils.bs.js";
import * as GetAllGameObjectUtils$Meta3dGameobjectDataoriented from "./GetAllGameObjectUtils.bs.js";
import * as DisposeGameObjectUtils$Meta3dGameobjectDataoriented from "./DisposeGameObjectUtils.bs.js";
import * as GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented from "./GetNeedDisposedGameObjectsUtils.bs.js";

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

export {
  getContribute ,
}
/* No side effect */
