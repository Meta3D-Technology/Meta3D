

import * as ArrayMapUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as DisposeSharedComponentUtils$Meta3dCommonlib from "./../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeSharedComponentUtils.bs.js";
import * as TangentsGeometryService$Meta3dComponentCommonlib from "./geometry/TangentsGeometryService.bs.js";
import * as CreatePlaneGeometryService$Meta3dComponentCommonlib from "./geometry/CreatePlaneGeometryService.bs.js";
import * as CreateSphereGeometryService$Meta3dComponentCommonlib from "./geometry/CreateSphereGeometryService.bs.js";
import * as CreateTriangleGeometryService$Meta3dComponentCommonlib from "./geometry/CreateTriangleGeometryService.bs.js";

function isActuallyDispose(state, geometry, gameObjects) {
  return !DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasGameObject(ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectsMap), geometry, gameObjects), geometry, gameObjects);
}

var createTriangleGeometry = CreateTriangleGeometryService$Meta3dComponentCommonlib.create;

var createSphereGeometry = CreateSphereGeometryService$Meta3dComponentCommonlib.create;

var createPlaneGeometry = CreatePlaneGeometryService$Meta3dComponentCommonlib.create;

var computeTangents = TangentsGeometryService$Meta3dComponentCommonlib.computeTangents;

export {
  createTriangleGeometry ,
  createSphereGeometry ,
  createPlaneGeometry ,
  computeTangents ,
  isActuallyDispose ,
}
/* No side effect */
