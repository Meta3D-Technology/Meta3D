

import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ComputePointsGeometryService$Meta3dComponentCommonlib from "./ComputePointsGeometryService.bs.js";

function compute(radius, bands) {
  var vertices = [];
  var normals = [];
  var texCoords = [];
  var indices = [];
  for(var latNumber = 0; latNumber <= bands; ++latNumber){
    var theta = latNumber * Math.PI / bands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    for(var longNumber = 0; longNumber <= bands; ++longNumber){
      var phi = longNumber * 2 * Math.PI / bands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = radius * cosPhi * sinTheta;
      var y = radius * cosTheta;
      var z = radius * sinPhi * sinTheta;
      var u = 1 - longNumber / bands;
      var v = 1 - latNumber / bands;
      ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(vertices, x), y), z);
      ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(normals, x), y), z);
      ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(texCoords, u), v);
    }
  }
  for(var latNumber$1 = 0; latNumber$1 < bands; ++latNumber$1){
    for(var longNumber$1 = 0; longNumber$1 < bands; ++longNumber$1){
      var first = Math.imul(latNumber$1, bands + 1 | 0) + longNumber$1 | 0;
      var second = (first + bands | 0) + 1 | 0;
      ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(ArraySt$Meta3dCommonlib.push(indices, first + 1 | 0), second), first), first + 1 | 0), second + 1 | 0), second);
    }
  }
  return ComputePointsGeometryService$Meta3dComponentCommonlib.addTangents([
              vertices,
              texCoords,
              normals,
              indices
            ]);
}

export {
  compute ,
  
}
/* No side effect */
