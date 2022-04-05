

import * as ArraySt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param) {
  var needDisposedGeometrys = param.needDisposedGeometrys;
  return MutableSparseMap$Meta3dCommonlib.reducei(needDisposedGeometrys, (function (result, gameObjects, component) {
                return MutableSparseMap$Meta3dCommonlib.set(result, component, ArraySt$Meta3dCommonlib.removeDuplicateItems(gameObjects));
              }), MutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined));
}

export {
  get ,
  
}
/* No side effect */
