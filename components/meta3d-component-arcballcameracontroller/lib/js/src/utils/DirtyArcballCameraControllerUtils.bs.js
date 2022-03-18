'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentArcballcameracontroller = require("../config/ConfigUtils.bs.js");

function mark(state, cameraController, isDirty) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          gameObjectMap: state.gameObjectMap,
          dirtyMap: ImmutableSparseMap$Meta3dCommonlib.set(state.dirtyMap, cameraController, isDirty),
          distanceMap: state.distanceMap,
          minDistanceMap: state.minDistanceMap,
          phiMap: state.phiMap,
          thetaMap: state.thetaMap,
          thetaMarginMap: state.thetaMarginMap,
          targetMap: state.targetMap,
          moveSpeedXMap: state.moveSpeedXMap,
          moveSpeedYMap: state.moveSpeedYMap,
          rotateSpeedMap: state.rotateSpeedMap,
          wheelSpeedMap: state.wheelSpeedMap,
          gameObjectArcballCameraControllerMap: state.gameObjectArcballCameraControllerMap
        };
}

function isDirty(state, cameraController) {
  return MutableSparseMap$Meta3dCommonlib.unsafeGet(state.dirtyMap, cameraController) === Contract$Meta3dCommonlib.ensureCheck(true, (function (isDirty) {
                return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                              return Contract$Meta3dCommonlib.assertIsBool(isDirty);
                            }));
              }), ConfigUtils$Meta3dComponentArcballcameracontroller.getIsDebug(state));
}

exports.mark = mark;
exports.isDirty = isDirty;
/* No side effect */
