'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var CreateTransformUtils$Meta3dComponentTransform = require("./CreateTransformUtils.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentTransform = require("../operate_data/ModelMatrixTransformUtils.bs.js");

function _setData(state, clonedTransform, param) {
  return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalScale(ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalRotation(ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalPosition(state, clonedTransform, param[0]), clonedTransform, param[1]), clonedTransform, param[2]);
}

function _getData(state) {
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  return function (sourceTransform) {
    return [
            ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalPosition(localPositions, sourceTransform),
            ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalRotation(localRotations, sourceTransform),
            ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalScale(localScales, sourceTransform)
          ];
  };
}

function clone(state, countRange, sourceTransform) {
  var dataTuple = _getData(state)(sourceTransform);
  return ArraySt$Meta3dCommonlib.reduceOneParam(countRange, (function (param, param$1) {
                var match = CreateTransformUtils$Meta3dComponentTransform.create(param[0]);
                var clonedTransform = match[1];
                var state = _setData(match[0], clonedTransform, dataTuple);
                return [
                        state,
                        ArraySt$Meta3dCommonlib.push(param[1], clonedTransform)
                      ];
              }), [
              state,
              []
            ]);
}

exports._setData = _setData;
exports._getData = _getData;
exports.clone = clone;
/* No side effect */
