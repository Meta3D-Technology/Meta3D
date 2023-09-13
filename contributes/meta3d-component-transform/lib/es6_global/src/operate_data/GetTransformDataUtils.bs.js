

import * as Log$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Tuple2$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "./../../../../../meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as DirtyTransformUtils$Meta3dComponentTransform from "./DirtyTransformUtils.bs.js";
import * as UpdateTransformUtils$Meta3dComponentTransform from "./UpdateTransformUtils.bs.js";
import * as HierachyTransformUtils$Meta3dComponentTransform from "./HierachyTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentTransform from "./ModelMatrixTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentWorkerUtils from "./../../../../../meta3d-component-worker-utils/lib/es6_global/src/transform/ModelMatrixTransformUtils.bs.js";

function getData(state, param, param$1) {
  var localToWorldMatrices = state.localToWorldMatrices;
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  var parentMap = state.parentMap;
  var childrenMap = state.childrenMap;
  if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.parent) {
    return HierachyTransformUtils$Meta3dComponentTransform.getNullableParent(parentMap, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.children) {
    return HierachyTransformUtils$Meta3dComponentTransform.getNullableChildren(childrenMap, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.localPosition) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalPosition(localPositions, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.localRotation) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalRotation(localRotations, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.localScale) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalScale(localScales, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.position) {
    return Tuple2$Meta3dCommonlib.getLast(UpdateTransformUtils$Meta3dComponentTransform.updateAndGetPosition(state, param));
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.rotation) {
    return Tuple2$Meta3dCommonlib.getLast(UpdateTransformUtils$Meta3dComponentTransform.updateAndGetRotation(state, param));
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.scale) {
    return Tuple2$Meta3dCommonlib.getLast(UpdateTransformUtils$Meta3dComponentTransform.updateAndGetScale(state, param));
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.localEulerAngles) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.getLocalEulerAngles(localRotations, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.eulerAngles) {
    return Tuple2$Meta3dCommonlib.getLast(UpdateTransformUtils$Meta3dComponentTransform.updateAndGetEulerAngles(state, param));
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.normalMatrix) {
    return ModelMatrixTransformUtils$Meta3dComponentTransform.getNormalMatrix(state, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.localToWorldMatrix) {
    return ModelMatrixTransformUtils$Meta3dComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, param);
  } else if (param$1 === Index$Meta3dComponentTransformProtocol.dataName.dirty) {
    return DirtyTransformUtils$Meta3dComponentTransform.isDirty(state, param);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1 + "", "", "", ""));
  }
}

export {
  getData ,
}
/* No side effect */
