'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");

function addPoints(pointArr, points) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(points, ArraySt$Meta3dCommonlib.push, pointArr);
}

var concatArrays = (function(arrays) {
    return [].concat.apply([], arrays)
  });

function getBaseIndex(verticeArr) {
  return verticeArr.length / 2 | 0;
}

exports.addPoints = addPoints;
exports.concatArrays = concatArrays;
exports.getBaseIndex = getBaseIndex;
/* No side effect */
