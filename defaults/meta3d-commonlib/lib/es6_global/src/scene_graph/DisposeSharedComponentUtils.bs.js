

import * as ArraySt$Meta3dCommonlib from "../structure/ArraySt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../structure/sparse_map/MutableSparseMap.bs.js";

var _getGameObjects = MutableSparseMap$Meta3dCommonlib.get;

function isComponentHasNoGameObject(gameObjectsMap, component, gameObjectArr) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(gameObjectsMap, component);
  if (arr !== undefined) {
    return arr.length > 0;
  } else {
    return false;
  }
}

function removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(disposedComponents, MutableSparseMap$Meta3dCommonlib.remove, needDisposedComponents);
}

export {
  _getGameObjects ,
  isComponentHasNoGameObject ,
  removeDisposedComponentsFromNeedDisposedComponents ,
  
}
/* No side effect */
