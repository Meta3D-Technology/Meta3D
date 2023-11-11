

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Log$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Matrix4$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$Meta3dComponentPerspectivecameraprojectionProtocol from "../../../../../node_modules/meta3d-component-perspectivecameraprojection-protocol/lib/es6_global/src/Index.bs.js";

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

export {
  _getAspect ,
  _getNear ,
  _getFar ,
  _getFovy ,
  _setPMatrix ,
  updatePerspectiveCameraProjection ,
}
/* No side effect */
