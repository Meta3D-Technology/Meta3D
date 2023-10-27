'use strict';

var TypeArrayUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/TypeArrayUtils.bs.js");
var BufferDirectionLightUtils$Meta3dComponentWorkerUtils = require("./BufferDirectionLightUtils.bs.js");

function getColor(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat3Tuple(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorIndex(index), typeArr);
}

function getIntensity(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensityIndex(index), typeArr);
}

exports.getColor = getColor;
exports.getIntensity = getIntensity;
/* No side effect */
