'use strict';

var ImmutableHashMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function createState(param) {
  return {
          allRegisteredWorkPluginContribute: /* [] */0,
          states: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          pluginData: {
            isDebug: false
          }
        };
}

exports.createState = createState;
/* No side effect */
