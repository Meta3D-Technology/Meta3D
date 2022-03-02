

import * as CreateGameObjectUtils$Meta3dGameobjectDataoriented from "./CreateGameObjectUtils.bs.js";
import * as GetAllGameObjectUtils$Meta3dGameobjectDataoriented from "./GetAllGameObjectUtils.bs.js";

function getGameObjectContribute(param) {
  return {
          createStateFunc: (function (param) {
              return {
                      maxUID: 0
                    };
            }),
          createGameObjectFunc: CreateGameObjectUtils$Meta3dGameobjectDataoriented.create,
          getAllGameObjectsFunc: GetAllGameObjectUtils$Meta3dGameobjectDataoriented.getAll
        };
}

export {
  getGameObjectContribute ,
  
}
/* No side effect */
