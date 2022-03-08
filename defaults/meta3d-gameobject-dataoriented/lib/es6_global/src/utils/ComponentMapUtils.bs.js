

import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function batchGetComponent(gameObjects, gameObjectComponentMap) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (arr, gameObject) {
                var component = MutableSparseMap$Meta3dCommonlib.get(gameObjectComponentMap, gameObject);
                if (component !== undefined) {
                  return ArraySt$Meta3dCommonlib.push(arr, component);
                } else {
                  return arr;
                }
              }), []);
}

export {
  batchGetComponent ,
  
}
/* No side effect */
