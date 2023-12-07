'use strict';

var OptionSt$Meta3dCommonlib = require("../OptionSt.bs.js");
var SparseMap$Meta3dCommonlib = require("./SparseMap.bs.js");

function getExn(map, key) {
  return OptionSt$Meta3dCommonlib.getExn(SparseMap$Meta3dCommonlib.get(map, key));
}

function set(map, key, value) {
  var newMap = SparseMap$Meta3dCommonlib.copy(map);
  newMap[key] = value;
  return newMap;
}

function remove(map, key) {
  var newMap = SparseMap$Meta3dCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

function deleteVal(map, key) {
  var newMap = SparseMap$Meta3dCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

var createEmpty = SparseMap$Meta3dCommonlib.createEmpty;

var copy = SparseMap$Meta3dCommonlib.copy;

var unsafeGet = SparseMap$Meta3dCommonlib.unsafeGet;

var get = SparseMap$Meta3dCommonlib.get;

var getNullable = SparseMap$Meta3dCommonlib.getNullable;

var has = SparseMap$Meta3dCommonlib.has;

var map = SparseMap$Meta3dCommonlib.map;

var reducei = SparseMap$Meta3dCommonlib.reducei;

var getValues = SparseMap$Meta3dCommonlib.getValues;

var getKeys = SparseMap$Meta3dCommonlib.getKeys;

exports.createEmpty = createEmpty;
exports.copy = copy;
exports.unsafeGet = unsafeGet;
exports.get = get;
exports.getExn = getExn;
exports.getNullable = getNullable;
exports.has = has;
exports.set = set;
exports.remove = remove;
exports.map = map;
exports.reducei = reducei;
exports.getValues = getValues;
exports.getKeys = getKeys;
exports.deleteVal = deleteVal;
/* No side effect */
