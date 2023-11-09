'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Vector3$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Vector3.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Quaternion$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Quaternion.bs.js");
var TransformAPI$Meta3dComponentCommonlib = require("./TransformAPI.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");

function getDirection(usedDirectionLightContribute, param, usedTransformContribute, light) {
  var getComponentData = param.getComponentData;
  var getComponent = param.getComponent;
  return OptionSt$Meta3dCommonlib.toNullable(OptionSt$Meta3dCommonlib.bind(ArraySt$Meta3dCommonlib.getFirst(Curry._2(param.getComponentGameObjects, usedDirectionLightContribute, light)), (function (gameObject) {
                    return OptionSt$Meta3dCommonlib.map(OptionSt$Meta3dCommonlib.fromNullable(Curry._2(getComponent, usedTransformContribute, gameObject)), (function (transform) {
                                  return Vector3$Meta3dCommonlib.transformQuat(Quaternion$Meta3dCommonlib.setFromEulerAngles(Curry._3(getComponentData, usedTransformContribute, transform, Index$Meta3dComponentTransformProtocol.dataName.eulerAngles)), [
                                              0,
                                              0,
                                              1
                                            ]);
                                }));
                  })));
}

function setDirection(usedDirectionLightContribute, engineCoreService, usedTransformContribute, light, direction) {
  var z = direction[2];
  var y = direction[1];
  var x = direction[0];
  var getComponent = engineCoreService.getComponent;
  return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.bind(ArraySt$Meta3dCommonlib.getFirst(Curry._2(engineCoreService.getComponentGameObjects, usedDirectionLightContribute, light)), (function (gameObject) {
                    return OptionSt$Meta3dCommonlib.map(OptionSt$Meta3dCommonlib.fromNullable(Curry._2(getComponent, usedTransformContribute, gameObject)), (function (transform) {
                                  return TransformAPI$Meta3dComponentCommonlib.lookAt(usedTransformContribute, engineCoreService, transform, [
                                              - x,
                                              - y,
                                              - z
                                            ], [
                                              0,
                                              1,
                                              0
                                            ], undefined);
                                }));
                  })), usedTransformContribute);
}

exports.getDirection = getDirection;
exports.setDirection = setDirection;
/* No side effect */
