'use strict';

var ArraySt$Meta3dCommonlib = require("../structure/ArraySt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("../structure/sparse_map/MutableSparseMap.bs.js");

var _getGameObjects = MutableSparseMap$Meta3dCommonlib.get;

function isComponentHasGameObject(gameObjectsMap, component, gameObjectArr) {
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

exports._getGameObjects = _getGameObjects;
exports.isComponentHasGameObject = isComponentHasGameObject;
exports.removeDisposedComponentsFromNeedDisposedComponents = removeDisposedComponentsFromNeedDisposedComponents;
/* No side effect */
