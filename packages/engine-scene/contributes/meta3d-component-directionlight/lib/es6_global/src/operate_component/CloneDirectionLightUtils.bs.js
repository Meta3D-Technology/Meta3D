

import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as CloneUtils$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CloneUtils.bs.js";
import * as CreateDirectionLightUtils$Meta3dComponentDirectionlight from "./CreateDirectionLightUtils.bs.js";
import * as GetDirectionLightDataUtils$Meta3dComponentDirectionlight from "../operate_data/GetDirectionLightDataUtils.bs.js";
import * as SetDirectionLightDataUtils$Meta3dComponentDirectionlight from "../operate_data/SetDirectionLightDataUtils.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils from "../../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js";
import * as OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight from "../utils/OperateTypeArrayDirectionLightUtils.bs.js";

function _setData(state) {
  var colors = state.colors;
  var intensities = state.intensities;
  return function (clonedDirectionLight, param) {
    OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setColor(clonedDirectionLight, param[1], colors);
    OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight.setIntensity(clonedDirectionLight, param[2], intensities);
    return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.map(param[0], (function (name) {
                      return SetDirectionLightDataUtils$Meta3dComponentDirectionlight.setName(state, clonedDirectionLight, name);
                    })), state);
  };
}

function _getData(state) {
  var colors = state.colors;
  var intensities = state.intensities;
  return function (sourceDirectionLight) {
    return [
            OptionSt$Meta3dCommonlib.fromNullable(GetDirectionLightDataUtils$Meta3dComponentDirectionlight.getName(state, sourceDirectionLight)),
            OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getColor(sourceDirectionLight, colors),
            OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensity(sourceDirectionLight, intensities)
          ];
  };
}

function clone(state, countRange, sourceDirectionLight) {
  return CloneUtils$Meta3dCommonlib.clone(state, [
              CreateDirectionLightUtils$Meta3dComponentDirectionlight.create,
              _getData,
              _setData
            ], countRange, sourceDirectionLight);
}

export {
  _setData ,
  _getData ,
  clone ,
}
/* No side effect */
