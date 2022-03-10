

import * as Caml_option from "./../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function _getComponents(gameObjectComponentMap, gameObjects) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(gameObjects, (function (arr, gameObject) {
                var component = MutableSparseMap$Meta3dCommonlib.get(gameObjectComponentMap, gameObject);
                if (component !== undefined) {
                  return ArraySt$Meta3dCommonlib.push(arr, Caml_option.valFromOption(component));
                } else {
                  return arr;
                }
              }), []);
}

function get(param, gameObjects) {
  return _getComponents(param.gameObjectGeometryMap, ArraySt$Meta3dCommonlib.map(gameObjects, (function (prim) {
                    return prim;
                  })));
}

export {
  _getComponents ,
  get ,
  
}
/* No side effect */
