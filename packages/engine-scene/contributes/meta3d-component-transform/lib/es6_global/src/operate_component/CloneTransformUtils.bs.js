

import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as CloneUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CloneUtils.bs.js";
import * as CreateTransformUtils$Meta3dComponentTransform from "./CreateTransformUtils.bs.js";
import * as GetTransformDataUtils$Meta3dComponentTransform from "../operate_data/GetTransformDataUtils.bs.js";
import * as SetTransformDataUtils$Meta3dComponentTransform from "../operate_data/SetTransformDataUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentTransform from "../operate_data/ModelMatrixTransformUtils.bs.js";

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

export {
  _setData ,
  _getData ,
  clone ,
}
/* No side effect */
