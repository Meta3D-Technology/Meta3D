'use strict';

var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function add(state, gameObject, cameraView) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: state.isActiveMap,
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, cameraView, gameObject),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectBasicCameraViewMap, gameObject, cameraView),
          needDisposedBasicCameraViews: state.needDisposedBasicCameraViews,
          disposedBasicCameraViews: state.disposedBasicCameraViews,
          names: state.names
        };
}

exports.add = add;
/* No side effect */
