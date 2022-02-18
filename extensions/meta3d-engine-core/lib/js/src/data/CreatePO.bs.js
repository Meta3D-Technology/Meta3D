'use strict';

var MutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports.createPO = createPO;
/* No side effect */
