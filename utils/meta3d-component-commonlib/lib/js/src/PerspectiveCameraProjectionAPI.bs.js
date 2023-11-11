'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Matrix4$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/math/Matrix4.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$Meta3dComponentPerspectivecameraprojectionProtocol = require("meta3d-component-perspectivecameraprojection-protocol/lib/js/src/Index.bs.js");

function _getAspect(usedComponentContribute, param, cameraProjection) {
  return OptionSt$Meta3dCommonlib.fromNullable(Curry._3(param.getComponentData, usedComponentContribute, cameraProjection, Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.aspect));
}

function _getNear(usedComponentContribute, param, cameraProjection) {
  return OptionSt$Meta3dCommonlib.fromNullable(Curry._3(param.getComponentData, usedComponentContribute, cameraProjection, Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.near));
}

function _getFar(usedComponentContribute, param, cameraProjection) {
  return OptionSt$Meta3dCommonlib.fromNullable(Curry._3(param.getComponentData, usedComponentContribute, cameraProjection, Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.far));
}

function _getFovy(usedComponentContribute, param, cameraProjection) {
  return OptionSt$Meta3dCommonlib.fromNullable(Curry._3(param.getComponentData, usedComponentContribute, cameraProjection, Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.fovy));
}

function _setPMatrix(usedComponentContribute, param, cameraProjection, pMatrix) {
  return Curry._4(param.setComponentData, usedComponentContribute, cameraProjection, Index$Meta3dComponentPerspectivecameraprojectionProtocol.dataName.pMatrix, pMatrix);
}

function updatePerspectiveCameraProjection(usedComponentContribute, engineCoreService, isDebug, cameraProjection) {
  var aspect = OptionSt$Meta3dCommonlib.getWithDefault(_getAspect(usedComponentContribute, engineCoreService, cameraProjection), -1.0);
  var match = _getFovy(usedComponentContribute, engineCoreService, cameraProjection);
  var match$1 = _getNear(usedComponentContribute, engineCoreService, cameraProjection);
  var match$2 = _getFar(usedComponentContribute, engineCoreService, cameraProjection);
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined) {
    return _setPMatrix(usedComponentContribute, engineCoreService, cameraProjection, Matrix4$Meta3dCommonlib.buildPerspective(Matrix4$Meta3dCommonlib.createIdentityMatrix4(undefined), isDebug, [
                    Caml_option.valFromOption(match),
                    aspect,
                    Caml_option.valFromOption(match$1),
                    Caml_option.valFromOption(match$2)
                  ]));
  }
  return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("update", "fovy,near,far should all exist", "", "", "cameraProjection: " + cameraProjection));
}

exports._getAspect = _getAspect;
exports._getNear = _getNear;
exports._getFar = _getFar;
exports._getFovy = _getFovy;
exports._setPMatrix = _setPMatrix;
exports.updatePerspectiveCameraProjection = updatePerspectiveCameraProjection;
/* No side effect */
