'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var BufferDirectionLightUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/directionlight/BufferDirectionLightUtils.bs.js");

function setColor(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat3(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorIndex(index), data, typeArr);
}

function setIntensity(index, data, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.setFloat1(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensityIndex(index), data, typeArr);
}

exports.setColor = setColor;
exports.setIntensity = setIntensity;
/* No side effect */
