'use strict';

var TangentsGeometryService$Meta3dComponentCommonlib = require("./geometry/TangentsGeometryService.bs.js");
var CreatePlaneGeometryService$Meta3dComponentCommonlib = require("./geometry/CreatePlaneGeometryService.bs.js");
var CreateSphereGeometryService$Meta3dComponentCommonlib = require("./geometry/CreateSphereGeometryService.bs.js");
var CreateTriangleGeometryService$Meta3dComponentCommonlib = require("./geometry/CreateTriangleGeometryService.bs.js");

var createTriangleGeometry = CreateTriangleGeometryService$Meta3dComponentCommonlib.create;

var createSphereGeometry = CreateSphereGeometryService$Meta3dComponentCommonlib.create;

var createPlaneGeometry = CreatePlaneGeometryService$Meta3dComponentCommonlib.create;

var computeTangents = TangentsGeometryService$Meta3dComponentCommonlib.computeTangents;

exports.createTriangleGeometry = createTriangleGeometry;
exports.createSphereGeometry = createSphereGeometry;
exports.createPlaneGeometry = createPlaneGeometry;
exports.computeTangents = computeTangents;
/* No side effect */
