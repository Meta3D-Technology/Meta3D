'use strict';

var ComputePointsGeometryService$Meta3dComponentCommonlib = require("./ComputePointsGeometryService.bs.js");
var CreateDefaultGeometryService$Meta3dComponentCommonlib = require("./CreateDefaultGeometryService.bs.js");

function create(usedComponentContribute, engineCoreService) {
  return CreateDefaultGeometryService$Meta3dComponentCommonlib.create(usedComponentContribute, engineCoreService, ComputePointsGeometryService$Meta3dComponentCommonlib.addTangents([
                  [
                    0.0,
                    0.5,
                    0,
                    -0.5,
                    -0.5,
                    0,
                    0.5,
                    -0.5,
                    0
                  ],
                  [
                    0.5,
                    1,
                    0,
                    0,
                    1,
                    0
                  ],
                  [
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    0,
                    1
                  ],
                  [
                    0,
                    1,
                    2
                  ]
                ]));
}

exports.create = create;
/* No side effect */
