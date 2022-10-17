'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Tuple2$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var DirtyTransformUtils$Meta3dComponentTransform = require("./DirtyTransformUtils.bs.js");
var UpdateTransformUtils$Meta3dComponentTransform = require("./UpdateTransformUtils.bs.js");
var HierachyTransformUtils$Meta3dComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentTransform = require("./ModelMatrixTransformUtils.bs.js");
var ModelMatrixTransformUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");

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
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
