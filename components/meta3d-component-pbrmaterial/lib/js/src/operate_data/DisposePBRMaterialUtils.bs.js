'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeTypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/DisposeTypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentPbrmaterial = require("../config/ConfigUtils.bs.js");
var BufferPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/BufferPBRMaterialUtils.bs.js");
var GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("../gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js");

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function deferDisposeComponent(state) {
  var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
  var needDisposedPBRMaterialArray = state.needDisposedPBRMaterialArray;
  return function (param) {
    var component = param[0];
    var newrecord = Caml_obj.caml_obj_dup(state);
    newrecord.needDisposedPBRMaterialArray = ArrayMapUtils$Meta3dCommonlib.addValue(needDisposedPBRMaterialArray, component, param[1]);
    newrecord.gameObjectPBRMaterialMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectPBRMaterialMap, component);
    return newrecord;
  };
}

var _batchRemoveGameObjects = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr;

var _getGameObjects = MutableSparseMap$Meta3dCommonlib.get;

function _isComponentHasNoGameObject(gameObjectsMap, component, gameObjectArr) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(gameObjectsMap, component);
  if (arr !== undefined) {
    return arr.length > 0;
  } else {
    return false;
  }
}

function _disposeData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var defaultSpecular = state.defaultSpecular;
  var defaultDiffuseColor = state.defaultDiffuseColor;
  return function (component) {
    state.diffuseColors = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorIndex(component), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsSize(undefined), defaultDiffuseColor, diffuseColors);
    state.speculars = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularIndex(component), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularsSize(undefined), defaultSpecular, speculars);
    return state;
  };
}

function _removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(disposedComponents, MutableSparseMap$Meta3dCommonlib.remove, needDisposedComponents);
}

function disposeComponents(state, componentDataMap) {
  var needDisposedComponents = GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentPbrmaterial.getIsDebug(state), "component", MutableSparseMap$Meta3dCommonlib.getKeys(componentDataMap), MutableSparseMap$Meta3dCommonlib.getKeys(needDisposedComponents));
  var match = MutableSparseMap$Meta3dCommonlib.reducei(componentDataMap, (function (param, gameObjects, component) {
          var disposedComponents = param[1];
          var state = param[0];
          state.gameObjectsMap = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(state.gameObjectsMap, component, gameObjects);
          if (_isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)) {
            return [
                    state,
                    disposedComponents
                  ];
          } else {
            return [
                    _disposeData(state)(component),
                    ArraySt$Meta3dCommonlib.push(disposedComponents, component)
                  ];
          }
        }), [
        state,
        []
      ]);
  var disposedComponents = match[1];
  var state$1 = match[0];
  state$1.disposedPBRMaterialArray = state$1.disposedPBRMaterialArray.concat(disposedComponents);
  state$1.needDisposedPBRMaterialArray = _removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents);
  
}

exports._removeComponent = _removeComponent;
exports.deferDisposeComponent = deferDisposeComponent;
exports._batchRemoveGameObjects = _batchRemoveGameObjects;
exports._getGameObjects = _getGameObjects;
exports._isComponentHasNoGameObject = _isComponentHasNoGameObject;
exports._disposeData = _disposeData;
exports._removeDisposedComponentsFromNeedDisposedComponents = _removeDisposedComponentsFromNeedDisposedComponents;
exports.disposeComponents = disposeComponents;
/* No side effect */
