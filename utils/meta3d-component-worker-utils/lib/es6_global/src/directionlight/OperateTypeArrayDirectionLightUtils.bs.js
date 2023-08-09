

import * as TypeArrayUtils$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/TypeArrayUtils.bs.js";
import * as BufferDirectionLightUtils$Meta3dComponentWorkerUtils from "./BufferDirectionLightUtils.bs.js";

function getColor(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat3Tuple(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getColorIndex(index), typeArr);
}

function getIntensity(index, typeArr) {
  return TypeArrayUtils$Meta3dCommonlib.getFloat1(BufferDirectionLightUtils$Meta3dComponentWorkerUtils.getIntensityIndex(index), typeArr);
}

export {
  getColor ,
  getIntensity ,
}
/* No side effect */
