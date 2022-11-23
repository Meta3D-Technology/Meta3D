

import * as TangentsGeometryService$Meta3dComponentCommonlib from "./geometry/TangentsGeometryService.bs.js";
import * as CreatePlaneGeometryService$Meta3dComponentCommonlib from "./geometry/CreatePlaneGeometryService.bs.js";
import * as CreateSphereGeometryService$Meta3dComponentCommonlib from "./geometry/CreateSphereGeometryService.bs.js";
import * as CreateTriangleGeometryService$Meta3dComponentCommonlib from "./geometry/CreateTriangleGeometryService.bs.js";

var createTriangleGeometry = CreateTriangleGeometryService$Meta3dComponentCommonlib.create;

var createSphereGeometry = CreateSphereGeometryService$Meta3dComponentCommonlib.create;

var createPlaneGeometry = CreatePlaneGeometryService$Meta3dComponentCommonlib.create;

var computeTangents = TangentsGeometryService$Meta3dComponentCommonlib.computeTangents;

export {
  createTriangleGeometry ,
  createSphereGeometry ,
  createPlaneGeometry ,
  computeTangents ,
}
/* No side effect */
