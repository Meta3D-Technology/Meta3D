

import * as MutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function createPO(param) {
  return {
          allRegisteredWorkPluginData: /* [] */0,
          states: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          pluginData: {
            isDebug: false
          },
          componentData: {
            allRegisteredComponentData: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
            allUsedComponentData: MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
          },
          gameObjectData: undefined,
          usedGameObjectData: undefined
        };
}

export {
  createPO ,
  
}
/* No side effect */
