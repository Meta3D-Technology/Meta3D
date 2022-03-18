'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function createState(isDebug) {
  return {
          config: {
            isDebug: isDebug
          },
          maxIndex: 0,
          isActiveMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined)
        };
}

exports.createState = createState;
/* No side effect */
