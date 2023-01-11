

import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../structure/sparse_map/MutableSparseMap.bs.js";

function buildSharedBatchDisposeData(components) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(components, (function (dataMap, component) {
                return MutableSparseMap$Meta3dCommonlib.set(dataMap, component, [1]);
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

export {
  buildSharedBatchDisposeData ,
}
/* No side effect */
