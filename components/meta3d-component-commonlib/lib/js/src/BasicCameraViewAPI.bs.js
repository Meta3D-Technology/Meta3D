'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Matrix4$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Matrix4.bs.js");
var Contract$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/contract/Contract.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var NullableTool$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/test/NullableTool.bs.js");
var Index$Meta3dComponentTransformProtocol = require("meta3d-component-transform-protocol/lib/js/src/Index.bs.js");
var Index$Meta3dComponentBasiccameraviewProtocol = require("meta3d-component-basiccameraview-protocol/lib/js/src/Index.bs.js");

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
                              return Contract$Meta3dCommonlib.Operators.$less$eq(ArraySt$Meta3dCommonlib.length(Log$Meta3dCommonlib.printForDebug(r)), 1);
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

exports.getViewWorldToCameraMatrix = getViewWorldToCameraMatrix;
exports._isActive = _isActive;
exports._checkAtMostTwo = _checkAtMostTwo;
exports.getActiveCameraView = getActiveCameraView;
/* No side effect */
