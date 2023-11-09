'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function getName(state, cameraView) {
  return ImmutableSparseMap$Meta3dCommonlib.getNullable(state.names, cameraView);
}

function setName(state, cameraView, name) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: state.isActiveMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap,
          needDisposedBasicCameraViews: state.needDisposedBasicCameraViews,
          disposedBasicCameraViews: state.disposedBasicCameraViews,
          names: ImmutableSparseMap$Meta3dCommonlib.set(state.names, cameraView, name)
        };
}

function _setAllNotActive(state) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: ImmutableSparseMap$Meta3dCommonlib.map(state.isActiveMap, (function (value) {
                  return false;
                })),
          gameObjectMap: state.gameObjectMap,
          gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap,
          needDisposedBasicCameraViews: state.needDisposedBasicCameraViews,
          disposedBasicCameraViews: state.disposedBasicCameraViews,
          names: state.names
        };
}

function getIsActive(state, cameraView) {
  return OptionSt$Meta3dCommonlib.getWithDefault(ImmutableSparseMap$Meta3dCommonlib.get(state.isActiveMap, cameraView), false);
}

function setIsActive(state, cameraView, isActive) {
  var state$1 = isActive === true ? _setAllNotActive(state) : state;
  return {
          config: state$1.config,
          maxIndex: state$1.maxIndex,
          isActiveMap: ImmutableSparseMap$Meta3dCommonlib.set(state$1.isActiveMap, cameraView, isActive),
          gameObjectMap: state$1.gameObjectMap,
          gameObjectBasicCameraViewMap: state$1.gameObjectBasicCameraViewMap,
          needDisposedBasicCameraViews: state$1.needDisposedBasicCameraViews,
          disposedBasicCameraViews: state$1.disposedBasicCameraViews,
          names: state$1.names
        };
}

exports.getName = getName;
exports.setName = setName;
exports._setAllNotActive = _setAllNotActive;
exports.getIsActive = getIsActive;
exports.setIsActive = setIsActive;
/* No side effect */
