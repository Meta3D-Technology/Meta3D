'use strict';

var CreateDefaultGeometryService$Meta3dComponentCommonlib = require("./CreateDefaultGeometryService.bs.js");
var ComputeSpherePointsGeometryService$Meta3dComponentCommonlib = require("./ComputeSpherePointsGeometryService.bs.js");

function create(usedComponentContribute, engineCoreService, radius, bands) {
  return CreateDefaultGeometryService$Meta3dComponentCommonlib.create(usedComponentContribute, engineCoreService, ComputeSpherePointsGeometryService$Meta3dComponentCommonlib.compute(radius, bands));
}

exports.create = create;
/* No side effect */
