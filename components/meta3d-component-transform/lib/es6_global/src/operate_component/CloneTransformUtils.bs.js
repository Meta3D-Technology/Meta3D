

import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as CreateTransformUtils$Meta3dComponentTransform from "./CreateTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentTransform from "../operate_data/ModelMatrixTransformUtils.bs.js";

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

export {
  _setData ,
  _getData ,
  clone ,
  
}
/* No side effect */
