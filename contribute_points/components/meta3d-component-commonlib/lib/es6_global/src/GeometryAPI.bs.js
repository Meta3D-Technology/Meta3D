

import * as Curry from "./../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ArraySt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as MutableSparseMap$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "./../../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as DisposeSharedComponentUtils$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/DisposeSharedComponentUtils.bs.js";
import * as TangentsGeometryService$Meta3dComponentCommonlib from "./geometry/TangentsGeometryService.bs.js";
import * as CreatePlaneGeometryService$Meta3dComponentCommonlib from "./geometry/CreatePlaneGeometryService.bs.js";
import * as CreateSphereGeometryService$Meta3dComponentCommonlib from "./geometry/CreateSphereGeometryService.bs.js";
import * as CreateTriangleGeometryService$Meta3dComponentCommonlib from "./geometry/CreateTriangleGeometryService.bs.js";

function getDisposedGeometrys(usedComponentContribute, engineCoreService, geometryDataMap) {
  var gameObjectsMap = NullableSt$Meta3dCommonlib.getExn(Curry._3(engineCoreService.getComponentData, usedComponentContribute, -1, Index$Meta3dComponentGeometryProtocol.dataName.gameObjectsMap));
  return MutableSparseMap$Meta3dCommonlib.reducei(geometryDataMap, (function (disposedComponents, gameObjects, geometry) {
                if (DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasGameObject(gameObjectsMap, geometry, gameObjects)) {
                  return disposedComponents;
                } else {
                  return ArraySt$Meta3dCommonlib.push(disposedComponents, geometry);
                }
              }), []);
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
  getDisposedGeometrys ,
  
}
/* No side effect */
