'use strict';

var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var DisposeSharedComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeSharedComponentUtils.bs.js");
var TangentsGeometryService$Meta3dComponentCommonlib = require("./geometry/TangentsGeometryService.bs.js");
var CreatePlaneGeometryService$Meta3dComponentCommonlib = require("./geometry/CreatePlaneGeometryService.bs.js");
var CreateSphereGeometryService$Meta3dComponentCommonlib = require("./geometry/CreateSphereGeometryService.bs.js");
var CreateTriangleGeometryService$Meta3dComponentCommonlib = require("./geometry/CreateTriangleGeometryService.bs.js");

function isActuallyDispose(state, geometry, gameObjects) {
  return !DisposeSharedComponentUtils$Meta3dCommonlib.isComponentHasGameObject(ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(MutableSparseMap$Meta3dCommonlib.copy(state.gameObjectsMap), geometry, gameObjects), geometry, gameObjects);
}

var createTriangleGeometry = CreateTriangleGeometryService$Meta3dComponentCommonlib.create;

var createSphereGeometry = CreateSphereGeometryService$Meta3dComponentCommonlib.create;

var createPlaneGeometry = CreatePlaneGeometryService$Meta3dComponentCommonlib.create;

var computeTangents = TangentsGeometryService$Meta3dComponentCommonlib.computeTangents;

exports.createTriangleGeometry = createTriangleGeometry;
exports.createSphereGeometry = createSphereGeometry;
exports.createPlaneGeometry = createPlaneGeometry;
exports.computeTangents = computeTangents;
exports.isActuallyDispose = isActuallyDispose;
/* No side effect */
