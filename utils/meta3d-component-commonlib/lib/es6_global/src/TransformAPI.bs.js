

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Matrix4$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Quaternion$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as NullableTool$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/test/NullableTool.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";

function lookAt(data, engineCoreService, transform, target, upOpt, param) {
  var up = upOpt !== undefined ? upOpt : [
      0,
      1,
      0
    ];
  return Curry._4(engineCoreService.setComponentData, data, transform, Index$Meta3dComponentTransformProtocol.dataName.rotation, Quaternion$Meta3dCommonlib.setFromMatrix(Matrix4$Meta3dCommonlib.setLookAt(NullableTool$Meta3dCommonlib.getExn(Curry._3(engineCoreService.getComponentData, data, transform, Index$Meta3dComponentTransformProtocol.dataName.position)), target, up)));
}

export {
  lookAt ,
  
}
/* No side effect */
