

import * as MutableHashMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/MutableHashMap.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function createState(param) {
  return {
          allRegisteredWorkPluginContribute: /* [] */0,
          states: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          pluginData: {
            isDebug: false
          },
          componentContributeData: {
            allComponentContributes: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
            allUsedComponentContributes: MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
          },
          gameObjectContribute: undefined,
          usedGameObjectContribute: undefined
        };
}

export {
  createState ,
  
}
/* No side effect */
