

import * as Curry from "./../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Matrix4$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Contract$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as OptionSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableTool$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/test/NullableTool.bs.js";
import * as Index$Meta3dComponentTransformProtocol from "./../../../../../../node_modules/meta3d-component-transform-protocol/lib/es6_global/src/Index.bs.js";
import * as Index$Meta3dComponentBasiccameraviewProtocol from "./../../../../../../node_modules/meta3d-component-basiccameraview-protocol/lib/es6_global/src/Index.bs.js";

function getViewWorldToCameraMatrix(usedBasicCameraViewContribute, param, usedTransformContribute, cameraView) {
  var getComponentData = param.getComponentData;
  var getComponent = param.getComponent;
  return OptionSt$Meta3dCommonlib.toNullable(OptionSt$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.bind(ArraySt$Meta3dCommonlib.getFirst(Curry._2(param.getComponentGameObjects, usedBasicCameraViewContribute, cameraView)), (function (gameObject) {
                        return OptionSt$Meta3dCommonlib.fromNullable(Curry._2(getComponent, usedTransformContribute, gameObject));
                      })), (function (transform) {
                    return OptionSt$Meta3dCommonlib.map(OptionSt$Meta3dCommonlib.fromNullable(Curry._3(getComponentData, usedTransformContribute, transform, Index$Meta3dComponentTransformProtocol.dataName.localToWorldMatrix)), (function (localToWorldMatrix) {
                                  return Matrix4$Meta3dCommonlib.invert(Matrix4$Meta3dCommonlib.createIdentityMatrix4(undefined), localToWorldMatrix);
                                }));
                  })));
}

function _isActive(usedComponentContribute, param, cameraView) {
  return NullableTool$Meta3dCommonlib.getExn(Curry._3(param.getComponentData, usedComponentContribute, cameraView, Index$Meta3dComponentBasiccameraviewProtocol.dataName.isActive));
}

function _checkAtMostTwo(activeCameraViews, isDebug) {
  return Contract$Meta3dCommonlib.ensureCheck(activeCameraViews, (function (r) {
                return Contract$Meta3dCommonlib.test(Log$Meta3dCommonlib.buildAssertMessage("only has one active cameraView at most", "not"), (function (param) {
                              return Contract$Meta3dCommonlib.Operators.$less$eq(ArraySt$Meta3dCommonlib.length(r), 1);
                            }));
              }), isDebug);
}

function getActiveCameraView(usedComponentContribute, engineCoreService, isDebug) {
  return OptionSt$Meta3dCommonlib.toNullable(OptionSt$Meta3dCommonlib.map(ArraySt$Meta3dCommonlib.getFirst(_checkAtMostTwo(ArraySt$Meta3dCommonlib.filter(Curry._1(engineCoreService.getAllComponents, usedComponentContribute), (function (param) {
                                return _isActive(usedComponentContribute, engineCoreService, param);
                              })), isDebug)), (function (prim) {
                    return prim;
                  })));
}

export {
  getViewWorldToCameraMatrix ,
  _isActive ,
  _checkAtMostTwo ,
  getActiveCameraView ,
  
}
/* No side effect */
