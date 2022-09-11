'use strict';

var MutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports.createState = createState;
/* No side effect */
