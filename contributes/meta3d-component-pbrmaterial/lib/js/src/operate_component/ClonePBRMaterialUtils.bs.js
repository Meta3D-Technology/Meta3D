'use strict';

var CloneUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/CloneUtils.bs.js");
var CreatePBRMaterialUtils$Meta3dComponentPbrmaterial = require("./CreatePBRMaterialUtils.bs.js");
var OperateTypeArrayPBRMaterialUtils$Meta3dComponentPbrmaterial = require("../utils/OperateTypeArrayPBRMaterialUtils.bs.js");
var OperateTypeArrayPBRMaterialUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/pbrmaterial/OperateTypeArrayPBRMaterialUtils.bs.js");

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
          countRange.map(function (param) {
                return sourceMaterial;
              })
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

exports._setData = _setData;
exports._getData = _getData;
exports._handleShareMaterial = _handleShareMaterial;
exports._handleNotShareMaterial = _handleNotShareMaterial;
exports.clone = clone;
/* No side effect */
