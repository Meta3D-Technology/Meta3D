'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var DisposeSharedComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeSharedComponentUtils.bs.js");
var TangentsGeometryService$Meta3dComponentCommonlib = require("./geometry/TangentsGeometryService.bs.js");
var CreatePlaneGeometryService$Meta3dComponentCommonlib = require("./geometry/CreatePlaneGeometryService.bs.js");
var CreateSphereGeometryService$Meta3dComponentCommonlib = require("./geometry/CreateSphereGeometryService.bs.js");
var CreateTriangleGeometryService$Meta3dComponentCommonlib = require("./geometry/CreateTriangleGeometryService.bs.js");

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

exports.createTriangleGeometry = createTriangleGeometry;
exports.createSphereGeometry = createSphereGeometry;
exports.createPlaneGeometry = createPlaneGeometry;
exports.computeTangents = computeTangents;
exports.getDisposedGeometrys = getDisposedGeometrys;
/* No side effect */
