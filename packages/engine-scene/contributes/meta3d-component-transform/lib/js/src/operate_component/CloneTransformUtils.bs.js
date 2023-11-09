'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var CloneUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/CloneUtils.bs.js");
var CreateTransformUtils$Meta3dComponentTransform = require("./CreateTransformUtils.bs.js");
var GetTransformDataUtils$Meta3dComponentTransform = require("../operate_data/GetTransformDataUtils.bs.js");
var SetTransformDataUtils$Meta3dComponentTransform = require("../operate_data/SetTransformDataUtils.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentTransform = require("../operate_data/ModelMatrixTransformUtils.bs.js");

function _setData(state, clonedTransform, param) {
  return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalScale(ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalRotation(ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalPosition(OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(param[0], (function (name) {
                                return SetTransformDataUtils$Meta3dComponentTransform.setName(state, clonedTransform, name);
                              })), state), clonedTransform, param[1]), clonedTransform, param[2]), clonedTransform, param[3]);
}

function _getData(state) {
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  return function (sourceTransform) {
    return [
            OptionSt$Meta3dCommonlib.fromNullable(GetTransformDataUtils$Meta3dComponentTransform.getName(state, sourceTransform)),
            ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalPosition(localPositions, sourceTransform),
            ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalRotation(localRotations, sourceTransform),
            ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalScale(localScales, sourceTransform)
          ];
  };
}

function clone(state, countRange, sourceTransform) {
  return CloneUtils$Meta3dCommonlib.clone(state, [
              CreateTransformUtils$Meta3dComponentTransform.create,
              _getData,
              _setData
            ], countRange, sourceTransform);
}

exports._setData = _setData;
exports._getData = _getData;
exports.clone = clone;
/* No side effect */
