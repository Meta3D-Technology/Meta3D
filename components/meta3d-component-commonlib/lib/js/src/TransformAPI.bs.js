'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Matrix4$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Matrix4.bs.js");
var Quaternion$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Quaternion.bs.js");
var NullableTool$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/test/NullableTool.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");

function lookAt(data, engineCoreService, transform, target, upOpt, param) {
  var up = upOpt !== undefined ? upOpt : [
      0,
      1,
      0
    ];
  return Curry._4(engineCoreService.setComponentData, data, transform, Index$Meta3dComponentTransformProtocol.dataName.rotation, Quaternion$Meta3dCommonlib.setFromMatrix(Matrix4$Meta3dCommonlib.setLookAt(NullableTool$Meta3dCommonlib.getExn(Curry._3(engineCoreService.getComponentData, data, transform, Index$Meta3dComponentTransformProtocol.dataName.position)), target, up)));
}

exports.lookAt = lookAt;
/* No side effect */
