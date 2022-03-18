'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentBasiccameraviewProtocol = require("meta3d-component-basiccameraview-protocol/lib/js/src/Index.bs.js");
var OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview = require("../utils/OperateBasicCameraViewUtils.bs.js");

function setData(state, cameraView, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentBasiccameraviewProtocol.dataName.active) {
    return OperateBasicCameraViewUtils$Meta3dComponentBasiccameraview.setIsActive(state, cameraView, dataValue);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.setData = setData;
/* No side effect */
