'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeTypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/DisposeTypeArrayUtils.bs.js");
var ConfigUtils$Meta3dComponentPbrmaterial = require("../config/ConfigUtils.bs.js");
var DisposeSharedComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeSharedComponentUtils.bs.js");
var BufferPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/BufferPBRMaterialUtils.bs.js");
var GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial = require("../gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js");

function deferDisposeComponent(state) {
  var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
  var needDisposedPBRMaterials = state.needDisposedPBRMaterials;
  return function (param) {
    var gameObject = param[1];
    var newrecord = Caml_obj.caml_obj_dup(state);
    newrecord.needDisposedPBRMaterials = ArrayMapUtils$Meta3dCommonlib.addValue(needDisposedPBRMaterials, param[0], gameObject);
    newrecord.gameObjectPBRMaterialMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectPBRMaterialMap, gameObject);
    return newrecord;
  };
}

function _disposeData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var defaultSpecular = state.defaultSpecular;
  var defaultDiffuseColor = state.defaultDiffuseColor;
  return function (component) {
    state.diffuseColors = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(diffuseColors, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorIndex(component), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsSize(undefined), defaultDiffuseColor);
    state.speculars = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(speculars, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularIndex(component), defaultSpecular);
    return state;
  };
}

function disposeComponents(state, componentDataMap) {
  var needDisposedComponents = GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentPbrmaterial.getIsDebug(state), "component", MutableSparseMap$Meta3dCommonlib.getKeys(componentDataMap), MutableSparseMap$Meta3dCommonlib.getKeys(needDisposedComponents));
  var match = MutableSparseMap$Meta3dCommonlib.reducei(componentDataMap, (function (param, gameObjects, component) {
          var disposedComponents = param[1];
          var state = param[0];
          state.gameObjectsMap = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(state.gameObjectsMap, component, gameObjects);
          if (DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)) {
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
  state$1.disposedPBRMaterials = state$1.disposedPBRMaterials.concat(disposedComponents);
  state$1.needDisposedPBRMaterials = DisposeSharedComponentUtils$Meta3dCommonlib.removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents);
  return state$1;
}

exports.deferDisposeComponent = deferDisposeComponent;
exports._disposeData = _disposeData;
exports.disposeComponents = disposeComponents;
/* No side effect */
