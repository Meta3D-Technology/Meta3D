

import * as ArraySt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

function addPoints(pointArr, points) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(points, ArraySt$Meta3dCommonlib.push, pointArr);
}

var concatArrays = (function(arrays) {
    return [].concat.apply([], arrays)
  });

function getBaseIndex(verticeArr) {
  return verticeArr.length / 2 | 0;
}

export {
  addPoints ,
  concatArrays ,
  getBaseIndex ,
  
}
/* No side effect */
