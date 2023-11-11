

import * as TangentsGeometryService$Meta3dComponentCommonlib from "./TangentsGeometryService.bs.js";

function addTangents(param) {
  var vertices = new Float32Array(param[0]);
  var texCoords = new Float32Array(param[1]);
  var normals = new Float32Array(param[2]);
  var indices = new Uint32Array(param[3]);
  return [
          vertices,
          texCoords,
          normals,
          TangentsGeometryService$Meta3dComponentCommonlib.computeTangents(vertices, texCoords, normals, indices),
          indices
        ];
}

export {
  addTangents ,
}
/* No side effect */
