

import * as Caml_obj from "../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Js_array from "../../../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as DisposeUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeUtils.bs.js";
import * as ArrayMapUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as DisposeTypeArrayUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/DisposeTypeArrayUtils.bs.js";
import * as ConfigUtils$Meta3dComponentPbrmaterial from "../config/ConfigUtils.bs.js";
import * as DisposeSharedComponentUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeSharedComponentUtils.bs.js";
import * as BufferPBRMaterialUtils$Meta3dComponentWorkerUtils from "../../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/BufferPBRMaterialUtils.bs.js";
import * as GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial from "../gameobject/GetNeedDisposedPBRMaterialsUtils.bs.js";

function deferDisposeComponent(state) {
  var gameObjectPBRMaterialMap = state.gameObjectPBRMaterialMap;
  var needDisposedPBRMaterials = state.needDisposedPBRMaterials;
  return function (param) {
    var gameObject = param[1];
    var newrecord = Caml_obj.obj_dup(state);
    newrecord.needDisposedPBRMaterials = ArrayMapUtils$Meta3dCommonlib.addValue(needDisposedPBRMaterials, param[0], gameObject);
    newrecord.gameObjectPBRMaterialMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectPBRMaterialMap, gameObject);
    return newrecord;
  };
}

function _disposeData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var specularColors = state.specularColors;
  var roughnesses = state.roughnesses;
  var metalnesses = state.metalnesses;
  var transmissions = state.transmissions;
  var iors = state.iors;
  var defaultIOR = state.defaultIOR;
  var defaultTransmission = state.defaultTransmission;
  var defaultMetalness = state.defaultMetalness;
  var defaultRoughness = state.defaultRoughness;
  var defaultSpecularColor = state.defaultSpecularColor;
  var defaultSpecular = state.defaultSpecular;
  var defaultDiffuseColor = state.defaultDiffuseColor;
  var names = state.names;
  return function (material) {
    state.diffuseColors = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(diffuseColors, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorIndex(material), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColorsSize(undefined), defaultDiffuseColor);
    state.speculars = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(speculars, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularIndex(material), defaultSpecular);
    state.specularColors = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32TypeArr(specularColors, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorIndex(material), BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColorsSize(undefined), defaultSpecularColor);
    state.roughnesses = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(roughnesses, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughnessIndex(material), defaultRoughness);
    state.metalnesses = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(metalnesses, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalnessIndex(material), defaultMetalness);
    state.transmissions = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(transmissions, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmissionIndex(material), defaultTransmission);
    state.iors = DisposeTypeArrayUtils$Meta3dCommonlib.deleteAndResetFloat32(iors, BufferPBRMaterialUtils$Meta3dComponentWorkerUtils.getIORIndex(material), defaultIOR);
    MutableSparseMap$Meta3dCommonlib.remove(state.diffuseMap, material);
    MutableSparseMap$Meta3dCommonlib.remove(state.roughnessMap, material);
    MutableSparseMap$Meta3dCommonlib.remove(state.metalnessMap, material);
    MutableSparseMap$Meta3dCommonlib.remove(state.normalMap, material);
    var newrecord = Caml_obj.obj_dup(state);
    newrecord.names = ImmutableSparseMap$Meta3dCommonlib.remove(names, material);
    return newrecord;
  };
}

function disposeComponents(state, materialDataMap) {
  var needDisposedComponents = GetNeedDisposedPBRMaterialsUtils$Meta3dComponentPbrmaterial.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(ConfigUtils$Meta3dComponentPbrmaterial.getIsDebug(state), "material", MutableSparseMap$Meta3dCommonlib.getKeys(materialDataMap), MutableSparseMap$Meta3dCommonlib.getKeys(needDisposedComponents));
  var match = MutableSparseMap$Meta3dCommonlib.reducei(materialDataMap, (function (param, gameObjects, material) {
          var disposedComponents = param[1];
          var state = param[0];
          state.gameObjectsMap = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(state.gameObjectsMap, material, gameObjects);
          if (DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasGameObject(state.gameObjectsMap, material, gameObjects)) {
            return [
                    state,
                    disposedComponents
                  ];
          } else {
            return [
                    _disposeData(state)(material),
                    ArraySt$Meta3dCommonlib.push(disposedComponents, material)
                  ];
          }
        }), [
        state,
        []
      ]);
  var disposedComponents = match[1];
  var state$1 = match[0];
  state$1.disposedPBRMaterials = Js_array.concat(disposedComponents, state$1.disposedPBRMaterials);
  state$1.needDisposedPBRMaterials = DisposeSharedComponentUtils$Meta3dCommonlib.removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents);
  return [
          state$1,
          disposedComponents
        ];
}

export {
  deferDisposeComponent ,
  _disposeData ,
  disposeComponents ,
}
/* No side effect */
