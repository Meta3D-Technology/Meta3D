

import * as Log$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/index.bs.js";
import * as UpdateTransformUtils$Meta3dComponentTransform from "./UpdateTransformUtils.bs.js";
import * as HierachyTransformUtils$Meta3dComponentTransform from "./HierachyTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$Meta3dComponentTransform from "./ModelMatrixTransformUtils.bs.js";

function setData(state, transform, dataName, dataValue) {
  if (dataName !== Index$Meta3dComponentTransformProtocol.dataName.parent) {
    if (dataName === Index$Meta3dComponentTransformProtocol.dataName.localPosition) {
      return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalPosition(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.localRotation) {
      return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalRotation(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.localScale) {
      return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalScale(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.localEulerAngles) {
      return ModelMatrixTransformUtils$Meta3dComponentTransform.setLocalEulerAngles(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.position) {
      return UpdateTransformUtils$Meta3dComponentTransform.updateAndSetPosition(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.rotation) {
      return UpdateTransformUtils$Meta3dComponentTransform.updateAndSetRotation(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.scale) {
      return UpdateTransformUtils$Meta3dComponentTransform.updateAndSetScale(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.eulerAngles) {
      return UpdateTransformUtils$Meta3dComponentTransform.updateAndSetEulerAngles(state, transform, dataValue);
    } else if (dataName === Index$Meta3dComponentTransformProtocol.dataName.update) {
      return UpdateTransformUtils$Meta3dComponentTransform.mutableUpdate(state, transform);
    } else {
      return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
    }
  }
  var parent = OptionSt$Meta3dCommonlib.fromNullable(dataValue);
  if (parent !== undefined) {
    return HierachyTransformUtils$Meta3dComponentTransform.setParent(state, parent, transform);
  } else {
    return HierachyTransformUtils$Meta3dComponentTransform.removeParent(state, transform);
  }
}

export {
  setData ,
  
}
/* No side effect */
