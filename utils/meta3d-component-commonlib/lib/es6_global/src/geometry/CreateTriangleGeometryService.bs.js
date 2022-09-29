

import * as ComputePointsGeometryService$Meta3dComponentCommonlib from "./ComputePointsGeometryService.bs.js";
import * as CreateDefaultGeometryService$Meta3dComponentCommonlib from "./CreateDefaultGeometryService.bs.js";

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

export {
  create ,
  
}
/* No side effect */
