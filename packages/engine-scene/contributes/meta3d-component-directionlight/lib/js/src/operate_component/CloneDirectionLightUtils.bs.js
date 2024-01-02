'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var CloneUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/CloneUtils.bs.js");
var CreateDirectionLightUtils$Meta3dComponentDirectionlight = require("./CreateDirectionLightUtils.bs.js");
var GetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("../operate_data/GetDirectionLightDataUtils.bs.js");
var SetDirectionLightDataUtils$Meta3dComponentDirectionlight = require("../operate_data/SetDirectionLightDataUtils.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js");
var OperateTypeArrayDirectionLightUtils$Meta3dComponentDirectionlight = require("../utils/OperateTypeArrayDirectionLightUtils.bs.js");

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

exports._setData = _setData;
exports._getData = _getData;
exports.clone = clone;
/* No side effect */
