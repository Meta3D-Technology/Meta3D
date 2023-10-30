

import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as CloneUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CloneUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as CreatePBRMaterialUtils$Meta3dComponentPbrmaterial from "./CreatePBRMaterialUtils.bs.js";
import * as GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "../operate_data/GetPBRMaterialDataUtils.bs.js";
import * as SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "../operate_data/SetPBRMaterialDataUtils.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial from "../utils/OperateTypeArrayPBRMaterialUtils.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function _setData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var specularColors = state.specularColors;
  var roughnesses = state.roughnesses;
  var metalnesses = state.metalnesses;
  var transmissions = state.transmissions;
  var iors = state.iors;
  var normalMap = state.normalMap;
  var metalnessMap = state.metalnessMap;
  var roughnessMap = state.roughnessMap;
  var diffuseMap = state.diffuseMap;
  return function (clonedMaterial, param) {
    var specular = param[2];
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setDiffuseColor(clonedMaterial, param[1], diffuseColors);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecular(clonedMaterial, specular, speculars);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecularColor(clonedMaterial, specular, specularColors);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setRoughness(clonedMaterial, specular, roughnesses);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setMetalness(clonedMaterial, specular, metalnesses);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setTransmission(clonedMaterial, specular, transmissions);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setIOR(clonedMaterial, specular, iors);
    OptionSt$Meta3dCommonlib.map(param[8], (function (diffuseTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(diffuseMap, clonedMaterial, diffuseTexture);
          }));
    OptionSt$Meta3dCommonlib.map(param[9], (function (roughnessTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(roughnessMap, clonedMaterial, roughnessTexture);
          }));
    OptionSt$Meta3dCommonlib.map(param[10], (function (metalnessTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(metalnessMap, clonedMaterial, metalnessTexture);
          }));
    OptionSt$Meta3dCommonlib.map(param[11], (function (normalTexture) {
            return MutableSparseMap$Meta3dCommonlib.set(normalMap, clonedMaterial, normalTexture);
          }));
    return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(param[0], (function (name) {
                      return SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.setName(state, clonedMaterial, name);
                    })), state);
  };
}

function _getData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  var specularColors = state.specularColors;
  var roughnesses = state.roughnesses;
  var metalnesses = state.metalnesses;
  var transmissions = state.transmissions;
  var iors = state.iors;
  var normalMap = state.normalMap;
  var metalnessMap = state.metalnessMap;
  var roughnessMap = state.roughnessMap;
  var diffuseMap = state.diffuseMap;
  return function (sourceMaterial) {
    return [
            OptionSt$Meta3dCommonlib.fromNullable(GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.getName(state, sourceMaterial)),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(sourceMaterial, diffuseColors),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(sourceMaterial, speculars),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecularColor(sourceMaterial, specularColors),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getRoughness(sourceMaterial, roughnesses),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getMetalness(sourceMaterial, metalnesses),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getTransmission(sourceMaterial, transmissions),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getIOR(sourceMaterial, iors),
            MutableSparseMap$Meta3dCommonlib.get(diffuseMap, sourceMaterial),
            MutableSparseMap$Meta3dCommonlib.get(roughnessMap, sourceMaterial),
            MutableSparseMap$Meta3dCommonlib.get(metalnessMap, sourceMaterial),
            MutableSparseMap$Meta3dCommonlib.get(normalMap, sourceMaterial)
          ];
  };
}

function _handleShareMaterial(state, sourceMaterial, countRange) {
  return [
          state,
          Js_array.map((function (param) {
                  return sourceMaterial;
                }), countRange)
        ];
}

function _handleNotShareMaterial(state, sourceMaterial, countRange) {
  return CloneUtils$Meta3dCommonlib.clone(state, [
              CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
              _getData,
              _setData
            ], countRange, sourceMaterial);
}

function clone(state, countRange, param, sourceMaterial) {
  if (param.isShare) {
    return _handleShareMaterial(state, sourceMaterial, countRange);
  } else {
    return _handleNotShareMaterial(state, sourceMaterial, countRange);
  }
}

export {
  _setData ,
  _getData ,
  _handleShareMaterial ,
  _handleNotShareMaterial ,
  clone ,
}
/* No side effect */
