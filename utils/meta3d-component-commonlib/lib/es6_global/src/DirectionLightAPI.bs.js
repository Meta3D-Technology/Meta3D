

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Vector3$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Vector3.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Quaternion$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as TransformAPI$Meta3dComponentCommonlib from "./TransformAPI.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";

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

export {
  getDirection ,
  setDirection ,
}
/* No side effect */
