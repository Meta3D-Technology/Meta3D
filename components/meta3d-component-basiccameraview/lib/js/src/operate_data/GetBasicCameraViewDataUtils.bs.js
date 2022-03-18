'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentBasiccameraviewProtocol = require("meta3d-component-basiccameraview-protocol/lib/js/src/Index.bs.js");
var OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("../utils/OperateBasicCameraViewUtils.bs.js");

function getData(state, cameraView, dataName) {
  if (dataName === Index$Meta3dComponentBasiccameraviewProtocol.dataName.active) {
    return OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.getIsActive(state, cameraView);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
