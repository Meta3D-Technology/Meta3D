

import * as CreateDefaultGeometryService$Meta3dComponentCommonlib from "./CreateDefaultGeometryService.bs.js";
import * as ComputeSpherePointsGeometryService$Meta3dComponentCommonlib from "./ComputeSpherePointsGeometryService.bs.js";

function create(usedComponentContribute, engineCoreService, radius, bands) {
  return CreateDefaultGeometryService$Meta3dComponentCommonlib.create(usedComponentContribute, engineCoreService, ComputeSpherePointsGeometryService$Meta3dComponentCommonlib.compute(radius, bands));
}

export {
  create ,
}
/* No side effect */
