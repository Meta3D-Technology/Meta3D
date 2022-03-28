

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function getPMatrix(state, cameraProjection) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.pMatrixMap, cameraProjection);
}

function setPMatrix(state, cameraProjection, pMatrix) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: ImmutableSparseMap$Meta3dCommonlib.set(state.pMatrixMap, cameraProjection, pMatrix),
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

function getFovy(state, cameraProjection) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.fovyMap, cameraProjection);
}

function setFovy(state, cameraProjection, fovy) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: ImmutableSparseMap$Meta3dCommonlib.set(state.fovyMap, cameraProjection, fovy),
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

function getAspect(state, cameraProjection) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.aspectMap, cameraProjection);
}

function setAspect(state, cameraProjection, aspect) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: ImmutableSparseMap$Meta3dCommonlib.set(state.aspectMap, cameraProjection, aspect),
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

function getFar(state, cameraProjection) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.farMap, cameraProjection);
}

function setFar(state, cameraProjection, far) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: ImmutableSparseMap$Meta3dCommonlib.set(state.farMap, cameraProjection, far),
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

function getNear(state, cameraProjection) {
  return ImmutableSparseMap$Meta3dCommonlib.get(state.nearMap, cameraProjection);
}

function setNear(state, cameraProjection, near) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: ImmutableSparseMap$Meta3dCommonlib.set(state.nearMap, cameraProjection, near),
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap,
          needDisposedPerspectiveCameraProjections: state.needDisposedPerspectiveCameraProjections,
          disposedPerspectiveCameraProjections: state.disposedPerspectiveCameraProjections
        };
}

export {
  getPMatrix ,
  setPMatrix ,
  getFovy ,
  setFovy ,
  getAspect ,
  setAspect ,
  getFar ,
  setFar ,
  getNear ,
  setNear ,
  
}
/* No side effect */
