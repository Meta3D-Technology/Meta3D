'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var UpdateTransformUtils$Meta3dComponentTransform = require("./UpdateTransformUtils.bs.js");
var HierachyTransformUtils$Meta3dComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentTransform = require("./ModelMatrixTransformUtils.bs.js");

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
      return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName + "", "", "", ""));
    }
  }
  var parent = OptionSt$Meta3dCommonlib.fromNullable(dataValue);
  if (parent !== undefined) {
    return HierachyTransformUtils$Meta3dComponentTransform.setParent(state, parent, transform);
  } else {
    return HierachyTransformUtils$Meta3dComponentTransform.removeParent(state, transform);
  }
}

exports.setData = setData;
/* No side effect */
