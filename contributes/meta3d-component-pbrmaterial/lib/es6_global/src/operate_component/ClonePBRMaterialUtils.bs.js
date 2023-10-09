

import * as Js_array from "../../../../../../node_modules/rescript/lib/es6/js_array.js";
import * as CloneUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CloneUtils.bs.js";
import * as CreatePBRMaterialUtils$Meta3dComponentPbrmaterial from "./CreatePBRMaterialUtils.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial from "../utils/OperateTypeArrayPBRMaterialUtils.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils from "../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js";

function _setData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  return function (clonedMaterial, param) {
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setDiffuseColor(clonedMaterial, param[0], diffuseColors);
    OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial.setSpecular(clonedMaterial, param[1], speculars);
    return state;
  };
}

function _getData(state) {
  var diffuseColors = state.diffuseColors;
  var speculars = state.speculars;
  return function (sourceMaterial) {
    return [
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getDiffuseColor(sourceMaterial, diffuseColors),
            OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils.getSpecular(sourceMaterial, speculars)
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
